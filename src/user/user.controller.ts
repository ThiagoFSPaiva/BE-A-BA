import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UserType } from './enum/user-type.enum';
import { UserId } from 'src/decorators/user-id.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { StatusType } from './enum/status-type.enum';
import { DeleteResult } from 'typeorm';
import { UpdateUserDto } from './dtos/updateUser.dto';



@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }


  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }


  @Roles(UserType.Admin)
  @Get('/getAllUsers')
  async getAllUser(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUsers()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: string): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.getUserById(userId),
    );
  }

  @Get('/matricula/:matricula')
  async getUserByMatricula(matricula: string): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.getUserByMatricula(matricula),
    );
  }


  @Roles(UserType.Admin)
  @Delete('/:userId')
  @UsePipes(ValidationPipe)
  async deleteTemplate(@Param('userId') userId: string): Promise<DeleteResult> {
    return this.userService.deleteUser(userId);
  }

  @Get()
  async getInfoUser(@UserId() userId: string): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.getUserById(userId),
    );
  }

  @Patch(':id')
  async updateStatus(@Param('id') id: string, @Body() body: { status: StatusType }) {
    const { status } = body;
    return this.userService.updateStatus(id, status);
  }

  @Roles(UserType.Admin)
  @Put('/:userId')
  @UsePipes(ValidationPipe)
  async updateTemplate(@Body() updateUser: UpdateUserDto, @Param('userId') userId: string): Promise<UserEntity> {
    return this.userService.updateTemplate(updateUser, userId);
  }


}
