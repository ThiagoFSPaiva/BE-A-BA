import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';

import { CategoryService } from './category.service';
import { Roles } from 'src/decorators/role.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CategoryEntity } from './entity/category.entity';
import { CreateCategory } from './dtos/create-category.dto';
import { UpdateCategory } from './dtos/update-category.dto';
import { ReturnCategory } from './dtos/return-category.dto';
import { DeleteResult } from 'typeorm';

@Controller('category')
export class CategoryController {

  constructor(
    private readonly categoryService: CategoryService
  ) { }

  @Roles(UserType.Admin)
  @Get()
  async findAllCategories(): Promise<ReturnCategory[]> {
    return this.categoryService.findAllCategories();
  }


  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createCategory(@Body() createCategory: CreateCategory): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategory)
  }

  @Get(':categoryId')
  async findCategoryById(
    @Param('categoryId') categoryId: number,
  ): Promise<ReturnCategory> {
    return new ReturnCategory(
      await this.categoryService.findCategoryById(categoryId),
    );
  }

  @Roles(UserType.Admin)
  @Delete(':categoryId')
  async deleteCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<DeleteResult> {
    return this.categoryService.deleteCategory(categoryId);
  }

  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Put(':categoryId')
  async editCategory(
    @Param('categoryId') categoryId: number,
    @Body() updateCategory: UpdateCategory,
  ): Promise<CategoryEntity> {
    return this.categoryService.editCategory(categoryId, updateCategory);
  }
}





