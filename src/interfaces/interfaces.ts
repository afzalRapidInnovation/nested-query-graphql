interface Person {
  _id: string;
  name: string;
  pets: Pets[];
}

interface Pets {
  _id: string;
  name: string;
  ownerId: string;
  owner: Person;
}
