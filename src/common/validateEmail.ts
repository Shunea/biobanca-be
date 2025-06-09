import { HttpException, HttpStatus } from "@nestjs/common";

export async function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.match(emailRegex)) {
        throw new HttpException('Adresa de email nu este valida!', HttpStatus.BAD_REQUEST);
    }
}
