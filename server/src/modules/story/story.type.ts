import { BaseModel, _defaultBaseModel } from '@/types';

export interface Story extends BaseModel {
  content: string;

  description: string;

  reacts: string[];

  comments: string[];

  images: string[];

  shares: string[];

  tags: string[];

  minutes_to_read: number;

  previous_stories: string[];

  same_stories: string[];
}

export const _story: Story = {
  content: '',
  description: '',
  reacts: [],
  comments: [],
  shares: [],
  images: [],
  tags: [],
  minutes_to_read: 0,
  previous_stories: [],
  same_stories: [],
  ..._defaultBaseModel,
};
