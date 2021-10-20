import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb+srv://admin:QOVtljjlsfWxUS9N@cluster0.bfohk.mongodb.net/cs741-project?retryWrites=true&w=majority'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
