import mongoose from "mongoose";

export interface Address {
  premisesLine: string
  localityLine: string
  city: string
  state: string
  pinCode: string
}

interface UserDocument extends mongoose.Document {
  name: string;
  designation: string
  address: Address;
}

const DashUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  address:{
    type:Object,
    default: {}
  }
});

export default mongoose.model<UserDocument>("DashUser", DashUserSchema);