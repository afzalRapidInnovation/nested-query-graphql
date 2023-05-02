import * as mongoose from 'mongoose';

export const PersonSchema = new mongoose.Schema({
  name: String,
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pets' }],
});

export const PetsSchema = new mongoose.Schema({
  name: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
});
