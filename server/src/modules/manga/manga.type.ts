import { BaseModel, _defaultBaseModel } from '@/types';

export interface Manga extends BaseModel {
  content: string;

  description: string;

  contents: any[];

  comments: string[];

  shares: string[];

  tags: string[];

  minutes_to_read: number;

  previous: string[];

  same: string[];
}

export const _manga: Manga = {
  content: '',
  description: '',
  contents: [],
  comments: [],
  shares: [],
  tags: [],
  minutes_to_read: 0,
  previous: [],
  same: [],
  ..._defaultBaseModel,
};
