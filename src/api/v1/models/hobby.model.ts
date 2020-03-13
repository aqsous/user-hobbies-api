import * as Mongoose from "mongoose";

export interface IHobby extends Mongoose.Document {
  name: string;
  passionLevel: string;
  year: number;
  createdAt: Date;
  updateAt: Date;
}

export const HobbySchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  passionLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Very High']
  },
  year: {
    type: Number,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  collection: 'Hobby',
  timestamps: true
});

export const HobbyModel = Mongoose.model<IHobby>("Hobby", HobbySchema);
