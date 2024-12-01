import { Document, Types } from 'mongoose';

export interface Deck extends Document {
  name: string;
  commander: Types.ObjectId;
  cards: Types.ObjectId[];
  createdAt: Date;
}
