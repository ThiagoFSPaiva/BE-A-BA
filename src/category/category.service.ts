import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { Repository } from 'typeorm';
import { CreateCategory } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
    ){}

    async findAllCategories(): Promise<CategoryEntity[]> {
        const categories = await this.categoryRepository.find();


        if(!categories || categories.length ===0) {
            throw new NotFoundException("Categoria não existe")
        }

        return categories
    }

    async findCategoryName(name: string): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne ({
            where: {
                name,
            }
        })

        if(!category) {
            throw new NotFoundException(`Não foi encontrado a categoria ${name}`)
        }

        return category;
    }


    async createCategory(createCategory: CreateCategory): Promise<CategoryEntity> {
        const category = await this.findCategoryName(createCategory.name).catch(() => undefined);

        if(category) {
            throw new BadRequestException(`Categoria ${category.name} já existe!`)
        }

        return this.categoryRepository.save(createCategory)
    }


}
