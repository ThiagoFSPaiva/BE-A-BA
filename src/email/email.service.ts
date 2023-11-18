import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SESClient } from '@aws-sdk/client-ses';

@Injectable()
export class EmailService {


    constructor(private readonly mailerService: MailerService) {}

    async sendMatriculaEmail(email: string, matricula: string): Promise<void> {
        await this.mailerService.sendMail({
            to: email,
            from: 'thiagofellipe151@gmail.com',
            subject: 'Matrícula',
            text: `Sua matrícula é: ${matricula}`,
            html: `<p>Sua matrícula é: <b>${matricula}</b></p>`,
        });
    }

}
