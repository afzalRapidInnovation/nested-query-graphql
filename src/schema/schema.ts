import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema } from '@nestjs/mongoose';
import mongoose, { Schema as MongooseSchema } from 'mongoose';

export const UsersMongooseProvider = 'Users';

export const UsersCollectionName = 'users';
export type UsersDocument = Users & Document;

export const FriendsMongooseProvider = 'Friends';

export const FriendsCollectionName = 'friends';
export type FriendsDocument = FriendsSchema & Document;

@ObjectType()
@Schema({ timestamps: true })
export class FriendsSchema {
  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  age: number;
}

@ObjectType()
export class FriendsResponse {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  age: number;
}

@ObjectType()
export class Friends {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'friends',
  })
  friendId: string;
}

@ObjectType()
@Schema({ timestamps: true })
export class Users {
  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  age: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'friends',
  })
  friends: FriendsResponse[];
}
const UsersSchema = SchemaFactory.createForClass(Users);
const FriendsSchemaDb = SchemaFactory.createForClass(FriendsSchema);

export { UsersSchema, FriendsSchemaDb };
