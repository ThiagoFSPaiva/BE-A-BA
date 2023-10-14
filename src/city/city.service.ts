import { Injectable, NotFoundException } from '@nestjs/common';
import { CityEntity } from './entity/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>
    ){}


    async getAllCitiesPorId(stateId: number): Promise<CityEntity[]> {
        return this.cityRepository.find({
            where: {
                stateId: stateId
            }
        });
    }

    async getCitybyId(cityId: number): Promise<CityEntity> {
        const city = await this.cityRepository.findOne({
            where: {
                id: cityId
            }
        });

        if(!city) {
            throw new NotFoundException('City not found');
        }

        return city;
    }
}
