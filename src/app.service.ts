import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { PersonType, PetsType } from './graphql/types';
// import { Person } from './interfaces/person.interface';
// import { Pets } from './interfaces/pets.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Person') private readonly personModel: Model<Person>,
    @InjectModel('Pets') private readonly petsModel: Model<Pets>,
  ) {
    this.getPetsByOwnerIdPopulate('617a1781d743311f35d464fc');
  }

  async getPersonByIdPopulate(id: string): Promise<Person> {
    const person: any = await this.personModel
      .findById(id)
      .populate('pets')
      .exec();
    return person;
  }

  async getPetsByOwnerIdPopulate(ownerId: string): Promise<PetsType[]> {
    const pets: any = await this.petsModel
      .find({ ownerId })
      .populate('ownerId')
      .exec();
    console.log(pets);
    return pets;
  }

  async getPersonById(id: string): Promise<Person> {
    return await this.personModel.findById(id).exec();
  }

  async getPetsByOwnerId(ownerId: string): Promise<Pets[]> {
    return await this.petsModel.find({ ownerId }).exec();
  }

  async getPetByIdWithPopulate(id: string): Promise<Pets> {
    // const pet = await this.petsModel.findById(id).populate('owner').exec();
    const pet = await this.petsModel.findById(id).exec();
    if (!pet) {
      throw new NotFoundException(`Pet with id ${id} not found`);
    }
    return pet;
  }

  async searchPetByOwnerId(ownerId: string, name: string) {
    const regexName = new RegExp(name, 'i');
    const pets = await this.petsModel.find({
      ownerId,
      // name: { $regex: name },
      name: { $regex: regexName },
    });

    return pets;
  }

  async searchPetByName(name: string) {
    const regexName = new RegExp(name, 'i');
    const pets = await this.petsModel.find({
      name: { $regex: regexName },
    });

    return pets;
  }

  // async getPetsByOwnerId(ownerId: string): Promise<Pets[]> {
  //   const owner = await this.personModel.findById(ownerId);
  //   if (!owner) {
  //     throw new NotFoundException('Owner not found');
  //   }
  //   const petIds = owner.pets.map((pet) => pet.toString());
  //   return this.petsModel
  //     .find({ ownerId: { $in: petIds } })
  //     .populate('owner')
  //     .exec();
  // }
}
