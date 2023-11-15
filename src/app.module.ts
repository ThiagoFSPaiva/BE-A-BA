import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TemplateModule } from './template/template.module';
import { CampoModule } from './campo/campo.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtModule} from '@nestjs/jwt';
import { EmailModule } from './email/email.module';
import { CategoryModule } from './category/category.module';

 
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      synchronize: true,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`], 
    }),
    AuthModule,
    TemplateModule,
    CampoModule,
    JwtModule,
    EmailModule,
    CategoryModule
    
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  
})
export class AppModule {}
