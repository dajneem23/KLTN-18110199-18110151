import { BaseModel, _defaultBaseModel } from '@/types';

export interface Comment extends BaseModel {
  content: string;

  replies: string[];

  images: string[];

  type?: string;
}

export const _comment: Comment = {
  content: '',
  replies: [],
  images: [],
  ..._defaultBaseModel,
};
