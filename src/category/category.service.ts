import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCategory } from './dtos/create-category.dto';
import { TemplateService } from 'src/template/template.service';
import { UpdateCategory } from './dtos/update-category.dto';
import { CountTemplate } from 'src/template/dtos/count-template.dto';
import { ReturnCategory } from './dtos/return-category.dto';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
        @Inject(forwardRef(() => TemplateService))
        private readonly templateService: TemplateService,
    ) { }


    findAmountCategoryInProducts(
        category: CategoryEntity,
        countList: CountTemplate[],
    ): number {
        const count = countList.find(
            (itemCount) => itemCount.category_id === category.id,
        );

        if (count) {
            return count.total;
        }

        return 0;
    }

    async findAllCategories(): Promise<ReturnCategory[]> {
        const categories = await this.categoryRepository.find({
            order: {
                id: 'ASC'
            }
        });

        const count = await this.templateService.countProdutsByCategoryId();

        if (!categories || categories.length === 0) {
            throw new NotFoundException('Categories empty');
        }

        return categories.map(
            (category) =>
                new ReturnCategory(
                    category,
                    this.findAmountCategoryInProducts(category, count),
                ),
        );
    }

    async findCategoryById(categoryId: number): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne({
            where: {
                id: categoryId
            }
        })

        if (!category) {
            throw new NotFoundException(`Id da categoria ${categoryId} não encontrado`)
        }

        return category
    }

    async findCategoryName(name: string): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne({
            where: {
                name,
            }
        })

        if (!category) {
            throw new NotFoundException(`Não foi encontrado a categoria ${name}`)
        }

        return category;
    }


    async createCategory(createCategory: CreateCategory): Promise<CategoryEntity> {
        const category = await this.findCategoryName(createCategory.name).catch(() => undefined);

        if (category) {
            throw new BadRequestException(`Categoria ${category.name} já existe!`)
        }

        return this.categoryRepository.save(createCategory)
    }


    async deleteCategory(categoryId: number): Promise<DeleteResult> {
        return this.categoryRepository.delete({ id: categoryId });
    }

    async editCategory(
        categoryId: number,
        updateCategory: UpdateCategory,
    ): Promise<CategoryEntity> {
        const category = await this.findCategoryById(categoryId);

        return this.categoryRepository.save({
            ...category,
            ...updateCategory,
        });
    }

}
