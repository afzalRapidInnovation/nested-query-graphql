import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { PersonType, PetsType } from './graphql/types';

// NOTE -1st
// @Query(() => PersonType, {
//   name: 'getPerson',
// })
// async person(@Args('id') id: string): Promise<Person> {
//   return this.appService.getPersonByIdPopulate(id);
// }

// NOTE - 2ND

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

  // @ResolveField(() => [PetsType], { name: 'pets' })
  // async pets(@Parent() person: PersonType) {
  //   const pets = await this.appService.getPetsByOwnerIdPopulate(person._id);
  //   console.log(pets);
  //   return pets;
  // }
}

// @ResolveField(() => PersonType, {
//   name: 'owner',
// })
// async getOwnerDetails(@Parent() personType: PersonType) {
//   const { _id } = personType;
//   const person = await this.appService.getPersonByIdPopulate(_id);
//   return person;
// }

// NOTE - 1ST
// @Resolver((of) => PetsType)
// export class PetsResolver {
//   constructor(private readonly appService: AppService) {}

//   @

//   @ResolveField(() => PersonType, { name: 'owner' })
//   async getOwner(@Parent() pets: PetsType): Promise<PersonType> {
//     const { _id } = pets.ownerId;
//     const owner: any = await this.appService.getPersonByIdPopulate(_id);
//     return owner;
//   }
// }

// const car = {
//   name,
//   id,

// }

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
