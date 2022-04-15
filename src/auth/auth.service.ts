import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { userInfo } from "os";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    async signup(dto: AuthDto) {
        // generate the password hash
        const hash = await argon.hash(dto.password);
        try {
            // save the user in the db
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
                // select: {
                //     id: true,
                //     email: true,
                //     createdAt: true
                // }
            });
            delete user.hash; // dirty solution in attesa di parlare di transformer

            // return the saved user    
            return user;
        } catch(error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    // duplicate key
                    throw new ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }

    signin() {
        return {
            msg: 'I am signed in'
        };
    }
}