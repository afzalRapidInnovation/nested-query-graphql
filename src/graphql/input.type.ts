import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

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

  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  petId?: string;
}
