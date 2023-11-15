import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReturnCategory } from './dtos/return-category.dot';
import { CategoryService } from './category.service';
import { Roles } from 'src/decorators/role.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CategoryEntity } from './entity/category.entity';
import { CreateCategory } from './dtos/create-category.dto';

@Controller('category')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ){}

    @Roles(UserType.Admin)
    @Get()
    async findAllCategories(): Promise<ReturnCategory[]> {
        return (await this.categoryService.findAllCategories()).map(
            (category) => new ReturnCategory(category),
        ) 
    }
    
    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async createCategory( @Body() createCategory: CreateCategory): Promise<CategoryEntity> {
        return this.categoryService.createCategory(createCategory)
    }

}
