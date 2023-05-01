import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonSchema, PetsSchema } from './schema/schema';
import { AppResolver, PetsResolver } from './app.resolver';

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
    MongooseModule.forRoot('mongodb://localhost:27017/wated'),
    MongooseModule.forFeature([
      { name: 'Person', schema: PersonSchema },
      { name: 'Pets', schema: PetsSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, PetsResolver],
})
export class AppModule {}
