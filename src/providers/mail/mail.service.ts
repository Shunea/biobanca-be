import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { Injectable } from '@nestjs/common';

dotenv.config();

const nodemailer = require("nodemailer");

@Injectable()
export class MailService {
  constructor() {}

  async accountActivation(email: string, code: string, password: string) {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_KEY,
      },
    });

    const template = this.getTemplate({
      password: password,
      resetPasswordUrl: `${process.env.FRONT_RESET_PASSWORD_URL}?code=${code}`,
      activationAccountUrl: `${process.env.FRONT_URL}/activate-account?code=${code}`
    }, 'src/providers/mail/templates/activation_template.hbs');

    await transporter.sendMail({
      from: 'USMF<noreply.covid19@usmf.md>',
      to: email,
      subject: 'Activare cont',
      html: template,
    });
  }

  async resetPassword(email: string, code: string) {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_KEY,
      },
    });

    const template = this.getTemplate({
      resetPasswordUrl: `${process.env.FRONT_RESET_PASSWORD_URL}?code=${code}`
    }, 'src/providers/mail/templates/reset_password_template.hbs');

    await transporter.sendMail({
      from: 'USMF<noreply.covid19@usmf.md>',
      to: email,
      subject: 'Resetare parola',
      html: template,
    });
  }

  readHTMLFile(filePath: string) {
    const template = readFileSync(filePath, 'utf8');
    return template;
  }

  getTemplate(
    info: {
      password?: string;
      activationAccountUrl?: string;
      resetPasswordUrl?: string;
    },
    path: string,
  ) {
    let template = this.readHTMLFile(path);

    const year = new Date().getFullYear();

    template = template.replace('{{year}}', year.toString());

    if (info.password) {
      template = template.replace('{{password}}', info.password);
    }

    if (info.activationAccountUrl) {
      template = template.replace('{{activationAccountUrl}}', info.activationAccountUrl);
    }

    if (info.resetPasswordUrl) {
      template = template.replace('{{resetPasswordUrl}}', info.resetPasswordUrl);
    }

    return template;
  }
}
