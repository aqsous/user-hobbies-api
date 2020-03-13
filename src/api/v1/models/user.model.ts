import * as Mongoose from "mongoose";

export interface IUser extends Mongoose.Document {
  name: string;
  hobbies: Array<any>;
  createdAt: Date;
  updateAt: Date;
}

export const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  hobbies: {
    type: [Mongoose.Schema.Types.ObjectId],
    ref: 'Hobby',
    default: []
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  collection: 'User',
  timestamps: true
});

export const UserModel = Mongoose.model<IUser>("User", UserSchema);
