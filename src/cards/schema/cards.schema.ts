import { Schema } from 'mongoose';

export const CardSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  colors: { type: [String], required: true },
  type_line: { type: String, required: true },
  image_uris: {
    normal: { type: String },
  },
  rarity: { type: String, required: true },
});
