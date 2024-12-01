import { Schema } from 'mongoose';

export const CardSchema = new Schema({
  scryfallId: { type: String, required: true },
  name: { type: String, required: true },
  colors: [{ type: String }],
});
