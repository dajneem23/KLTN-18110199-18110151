import { BaseModel, _defaultBaseModel } from '@/types';

export interface Manga extends BaseModel {
  content: string;

  description: string;

  comments: string[];

  shares: string[];

  tags: string[];

  minutes_to_read: number;

  previous_stories: string[];

  same_stories: string[];
}

export const _manga: Manga = {
  content: '',
  description: '',
  comments: [],
  shares: [],
  tags: [],
  minutes_to_read: 0,
  previous_stories: [],
  same_stories: [],
  ..._defaultBaseModel,
};
