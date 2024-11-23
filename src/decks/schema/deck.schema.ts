import { Schema, Types } from 'mongoose';

export const DeckSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  commander: {
    type: Types.ObjectId,
    ref: 'Card', 
    required: true,
  },
  cards: [
    {
      type: Types.ObjectId,
      ref: 'Card', 
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

DeckSchema.index({ name: 1 });
