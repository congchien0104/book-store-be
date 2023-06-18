import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUserDoc, IUserModel } from '../interfaces/user.interface';



const userSchema = new mongoose.Schema<IUserDoc, IUserModel>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        // validate(value: string) {
        //   if (!validator.isEmail(value)) {
        //     throw new Error('Invalid email');
        //   }
        // },
      },
      password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        // validate(value: string) {
        //   if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        //     throw new Error('Password must contain at least one letter and one number');
        //   }
        // },
        private: true, // used by the toJSON plugin
      },
      role: {
        type: String,
        //enum: roles,
        default: 'user',
      },
      isEmailVerified: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.static('isEmailTaken', async function (email: string, excludeUserId: mongoose.ObjectId): Promise<boolean> {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
});

userSchema.method('isPasswordMatch', async function (password: string): Promise<boolean> {
  const user = this;
  return bcrypt.compare(password, user.password);
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model<IUserDoc, IUserModel>('User', userSchema);

export default User;