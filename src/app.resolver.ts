import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AppService } from './app.service';
import { PersonType, PetsType, UpdateUserResponse } from './graphql/types';
import { UpdateUserInput } from './graphql/input.type';

@Resolver(() => PersonType)
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => PersonType)
  async getPerson(@Args('id') id: string) {
    return this.appService.getPersonByIdPopulate(id);
  }

  @ResolveField(() => [PetsType], { name: 'pets' })
  async pets(@Parent() person: PersonType) {
    const pets = await this.appService.getPetsByOwnerId(person._id);
    console.log(pets);
    return pets;
  }

  @Mutation(() => UpdateUserResponse, {
    name: 'updateUser',
  })
  async updateUser(@Args('input') updateUserInput: UpdateUserInput) {
    return await this.appService.updateUserById(updateUserInput);
  }

  @ResolveField(() => [PetsType], { name: 'searchOwnerPets' })
  async searchOwnerPets(
    @Parent() person: PersonType,
    @Args('search') search: string,
  ) {
    const pets = await this.appService.searchPetByOwnerId(person._id, search);
    console.log(pets);
    return pets;
  }

  @ResolveField(() => [PetsType], { name: 'SearchPets' })
  async searchPets(
    @Parent() person: PersonType,
    @Args('search') search: string,
  ) {
    const pets = await this.appService.searchPetByName(search);
    console.log(pets);
    return pets;
  }
}
@Resolver(() => PetsType)
export class PetsResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => PetsType, {
    name: 'gtePetById',
  })
  async getPetById(@Args('id') id: string) {
    return this.appService.getPetByIdWithPopulate(id);
  }

  @ResolveField(() => PersonType, { name: 'owner' })
  async owner(@Parent() pets: PetsType) {
    const ownerId = pets.ownerId._id;
    const owner = await this.appService.getPersonById(ownerId);
    console.log(owner);
    return owner;
  }
}
