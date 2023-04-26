import { HttpStatus, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { FriendResolver, UserResolver } from './app.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FriendsSchema,
  FriendsSchemaDb,
  Users,
  UsersSchema,
} from './schema/schema';
import mongoose from 'mongoose';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => ({
        autoSchemaFile: 'src/schema.gql',
        debug: false,
        context: async ({ req, res, payload }) => ({ req, res, payload }),
        plugins: [],
        playground: true,
      }),
    }),
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: FriendsSchema.name, schema: FriendsSchemaDb },
    ]),

    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://localhost:27017/nested',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserResolver, FriendResolver],
})
export class AppModule {}
