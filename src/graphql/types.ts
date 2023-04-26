import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => [Friend], { nullable: true })
  friends: Friend[];
}

@ObjectType()
export class Friend {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => [Friend], { nullable: true })
  friends: Friend[];
}

@ObjectType()
export class UserType {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => [Friend], { nullable: true })
  friends: Friend[];
}

@ObjectType()
export class FriendType {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => [Friend], { nullable: true })
  friends: Friend[];
}
