import { BaseModel, _defaultBaseModel } from '@/types';

export interface Film extends BaseModel {
  description: string;

  contents: any[];

  images?: string[];

  comments: string[];

  shares: string[];

  tags: string[];

  minutes_to_read: number;

  previous: string[];

  same: string[];
}

export const _Film: Film = {
  description: '',
  contents: [],
  comments: [],
  shares: [],
  tags: [],
  previous: [],
  minutes_to_read: 0,
  same: [],
  ..._defaultBaseModel,
};
