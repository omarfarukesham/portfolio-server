import { Schema, model, Document } from 'mongoose'

export interface IUserIdentity extends Document {
  email?: string
  phone?: string
  createdAt: Date
  updatedAt: Date
}

const userIdentitySchema = new Schema<IUserIdentity>(
  {
    email: {
      type: String,
      sparse: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      sparse: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true },
)

export const UserIdentityModel = model<IUserIdentity>('UserIdentity', userIdentitySchema)