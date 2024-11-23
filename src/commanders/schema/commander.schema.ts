import { Schema } from 'mongoose';

export const CommanderSchema = new Schema({
  scryfallId: { type: String, required: true },
  name: { type: String, required: true },
  colors: [{ type: String }],
});
