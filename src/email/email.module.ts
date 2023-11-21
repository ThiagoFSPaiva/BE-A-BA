import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailService } from './email.service';

@Module({


    imports: [  
  
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                auth: {
                    user: 'thiagofellipe151@gmail.com',
                    pass: 'tlrmkpzscbgrjwyo',
                }
            }

        }),
    ],

    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule { }
