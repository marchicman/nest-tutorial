import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),  // carica il file .env nel codice. è possbile fare un custom module che eredita da questo se ci sono esigenze particolari come controllo tipo di parametri di configurazione
            AuthModule, 
            UserModule, 
            BookmarkModule, 
            PrismaModule],
})
export class AppModule {}
