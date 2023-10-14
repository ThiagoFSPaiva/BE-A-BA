import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entity/address.entity';
import { UserService } from 'src/user/user.service';

@Controller('address')
export class AddressController {

    constructor(
        private readonly addressService: AddressService,
    ){}

    @Get()
    async getAllAddress() : Promise<AddressEntity[]> {
        return this.addressService.getAllAddress();
    }

    @UsePipes(ValidationPipe) 
    @Post('/:userId')
    async createAddress(@Body() createAddress: CreateAddressDto, @Param('userId') userId: number): Promise<AddressEntity> {
        return this.addressService.createAddress(createAddress,userId);
    }
}
