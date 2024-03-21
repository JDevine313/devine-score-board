import { ObjectId } from "mongodb";

export default interface Player {
  _id?: ObjectId;
  name: string;
  phoneNumber: string;
  number?: number;
}
