import { ObjectId } from 'mongodb';

export type UserStatus = 'active' | 'inactive' | 'suspended';

export type UserRole = 'admin' | 'user' | 'guest' | 'creator';

export const RolesWeight = {
  admin: 100,
  user: 50,
  creator: 10,
  guest: 0,
};

export type Gender = 'male' | 'female' | 'other';

export type User = {
  // User ID
  id: string;
  // Full name
  full_name: string;
  _full_name_alias?: string[];
  // Email
  email: string;
  // Email verified
  email_verified: boolean;
  // Phone number (e.g. +84909******)
  phone: string;
  // User roles (e.g. ["user", "admin"])
  roles: Array<UserRole>;
  // User avatar
  picture?: string;
  // Gender
  gender?: Gender;
  // Date of birth (E.g. 1990-01-31)
  dob?: string;
  // Encrypted login password
  password?: string;
  // Status
  status: UserStatus;
  // Subscribed email subscription
  subscribed_email_subscription?: boolean;
  // User metadata
  metadata?: {
    // A note by admin
    admin_note?: string;
  };

  saved_news?: string[];

  favorite_news?: string[];
  // Date and time user was created
  created_at: Date;
  // Date and time user was last updated
  updated_at: Date;

  followings?: ObjectId[];
};

export type CreateUpdateUserInput = Pick<User, 'full_name' | 'email' | 'phone' | 'password' | 'picture'>;

export type UserOutput = Omit<User, 'password'>;

export type UserPublicResponse = Pick<User, 'id' | 'full_name' | 'picture'>;
