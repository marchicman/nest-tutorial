import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async editUser(userId: number, dto: EditUserDto) {
        const user = await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...dto, // grazie alla pipe globale whitelist che rimuove i campi non presenti nel dto o vuoti possiamo fare questo 
            }
        });

        delete user.hash;

        return user;
    }
}
