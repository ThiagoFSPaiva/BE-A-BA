import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailService } from './email.service';

@Module({


    imports: [  
  
        MailerModule.forRoot({
       
            transport: {
                host:'email-smtp.sa-east-1.amazonaws.com',
                auth: {
                    user: 'AKIAZFWLRVBFZ43GRN6M',
                    pass: 'BCeVGnLIpSEFxa4vMZkY2eRHrr2LO4ORArM61728e7Xe'
                }
            }

        }),
    ],

    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule { }
