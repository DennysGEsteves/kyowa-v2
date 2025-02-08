import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers/auth/auth-controller';
import { SignInUseCase } from 'src/usecases/auth/signin-usecase';
import { UserModule } from '../user-module';
import { JwtModule } from '@nestjs/jwt';

const EXPIRES_IN = '8h';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [SignInUseCase],
})
export class AuthModule {}
