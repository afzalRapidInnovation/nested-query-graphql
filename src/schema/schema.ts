import * as mongoose from 'mongoose';

export const PersonSchema = new mongoose.Schema({
  // _id: { type: new mongoose.Types.ObjectId() },
  name: String,
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pets' }],
});

export const PetsSchema = new mongoose.Schema({
  // _id: { type: new mongoose.Types.ObjectId() },
  name: String,
  // ownerId: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
});
