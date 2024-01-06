import mongoose from "mongoose";

export interface Address {
  premisesLine: string
  localityLine: string
  city: string
  state: string
  pinCode: string
}

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  isVerified: string;
  name?: string;
  address?: Address;
  designation?: string
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    defaultValue: false
  },
  name: {
    type: String
  },
  designation: {
    type: String
  },
  address: {
    type: Object,
    default: {}
  }
});

export default mongoose.model<UserDocument>("User", UserSchema);