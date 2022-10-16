import { BaseModel, _defaultBaseModel } from '@/types';

export interface Category extends BaseModel {
  name: string;
  types: string[];
  title: string;
  description: string;
  sub: string[];
}
export const _category: Category = {
  name: '',
  types: [],
  title: '',
  description: '',
  sub: [],
  ..._defaultBaseModel,
};
