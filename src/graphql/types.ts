import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PersonType {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => [PetsType], { nullable: true })
  pets?: PetsType[];
}

@ObjectType()
export class PetsType {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  name: string;

  // @Field(() => PersonType, { nullable: true })
  ownerId: PersonType;
}

@ObjectType()
export class UpdateUserResponse {
  @Field()
  message: string;
}
