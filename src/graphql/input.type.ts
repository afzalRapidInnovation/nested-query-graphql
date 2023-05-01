import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PersonInput {
  @Field()
  name: string;
}
@InputType()
export class PetsInput {
  @Field()
  name: string;

  @Field()
  ownerId: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  personId: string;

  @Field()
  name: string;

  @Field()
  petId: string;
}
