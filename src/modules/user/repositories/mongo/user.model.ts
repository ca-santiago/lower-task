
import { toLower } from 'lodash';
import mongoose, { Schema, model, Document, Model } from 'mongoose'
import { UserPersistenceDTO } from '../../mappers/repository.dto';


// 2) Document
export interface UserDocument extends UserPersistenceDTO, Document {
  id: string
}

const UserSchema = new Schema<UserDocument>({
  _id: String,
  name: {
    required: true,
    type: {
      first: String,
      last: String
    }
  },
  email: {
    unique: true, index: true,
    type: String, required: true,
    set: toLower
  },
  password: { type: String, required: true },
  isEmailVerified: { type: Boolean, required: true },
  createdAt: {
    required: true, type: String
  },
  phoneNumber: {
    required: false,
    type: {
      prefix: String,
      value: Number
    }
  },
  dob: {
    type: String,
  },
  picture: {
    required: false,
    type: {
      baseName: String,
      format: String,
      large: String,
      small: String,
      thumbnail: String,
    }
  },
  bio: {
    type: String, required: true, minlength: 0,
  },
  followers: {
    type: Number, required: true,
  },
  likes: {
    type: Number, required: true,
  }
})

const UserModel = model<UserDocument>('User', UserSchema);

export {
  UserModel
}
