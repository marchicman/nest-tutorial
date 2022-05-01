import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // serve per rendere il modulo e i suoi service disponibili in tutto l'applicativo senza un'importazione esplicita
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
