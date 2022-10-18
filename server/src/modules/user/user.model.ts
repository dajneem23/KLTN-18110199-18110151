import { Service, Token } from 'typedi';
import { User } from './user.type';
import { keys } from 'ts-transformer-keys';
import { BaseModel } from '../base/base.model';

const COLLECTION_NAME = 'users';
const TOKEN_NAME = '_userModel';
export const userModelToken = new Token<UserModel>(TOKEN_NAME);
@Service(userModelToken)
export class UserModel extends BaseModel {
  constructor() {
    super({
      collectionName: COLLECTION_NAME,
      _keys: keys<User>(),
      indexes: [
        {
          field: {
            email: 1,
          },
        },
        // {
        //   field: {
        //     email: 'text',
        //   },
        // },
        // {
        //   field: {
        //     slug: 1,
        //   },
        //   options: {
        //     unique: true,
        //   },
        // },
      ],
    });
  }
}
