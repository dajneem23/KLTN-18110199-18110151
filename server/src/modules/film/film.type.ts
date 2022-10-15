import { BaseModel, _defaultBaseModel } from '@/types';

export interface Film extends BaseModel {
  content: string;

  description: string;

  contents: any[];

  comments: string[];

  shares: string[];

  tags: string[];
}

export const _Film: Film = {
  content: '',
  description: '',
  contents: [],
  comments: [],
  shares: [],
  tags: [],
  ..._defaultBaseModel,
};
