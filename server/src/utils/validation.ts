import { throwErr } from './common';
import { $queryByList } from './mongoDB';
import { ValidateError } from '@/core/errors/ValidateError';

export const $refValidation = async ({
  collection,
  list,
  refKey = '_id',
  Refname,
}: {
  collection: string;
  list: string[];
  Refname?: string;
  refKey?: string;
}) => {
  (await $queryByList({ collection: collection, values: list, key: refKey })) ||
    throwErr(
      new ValidateError('not_found', [
        {
          path: Refname || collection,
          message: `${Refname || collection} not found`,
        },
      ]),
    );
  return true;
};
