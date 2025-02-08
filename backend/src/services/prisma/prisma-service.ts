import {
  HttpStatus,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      if (params.action === 'create') {
        const collectionName = `${params.model}`; // Nome dinâmico da coleção

        // Obter o próximo ID da coleção `counters`
        const nextId = await this.idGenerator.upsert({
          where: {
            collectionName,
          },
          create: {
            collectionName,
            id: 1,
          },
          update: {
            id: {
              increment: 1,
            },
          },
        });

        params.args.data.id = nextId.id;
      }

      return next(params);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  static errorExceptions(e: any) {
    let message;
    let status;

    switch (e.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = ['Email already exists'];
        break;

      case 'P2023':
        status = HttpStatus.NOT_FOUND;
        message = ['User not found'];
        break;

      default:
        status = HttpStatus.BAD_REQUEST;
        message = [
          'Error on database - CODE ' + e.code + ' - MESSAGE: ' + e.message,
        ];
    }

    return {
      message,
      status,
    };
  }
}
