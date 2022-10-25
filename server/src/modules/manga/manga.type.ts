import { BaseModel, _defaultBaseModel } from '@/types';

export interface Manga extends BaseModel {
  content: string;

  description: string;

  image?: string;

  images?: string[];

  chapters: string[];

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
  chapters: [],
  contents: [],
  comments: [],
  shares: [],
  tags: [],
  minutes_to_read: 0,
  previous: [],
  same: [],
  ..._defaultBaseModel,
};

export interface MangaChapter extends BaseModel {
  content: string;

  description: string;

  contents: any[];

  images: string[];

  comments: string[];

  shares: string[];

  tags: string[];

  minutes_to_read: number;

  previous: string[];

  same: string[];
}
export const _mangaChapter: MangaChapter = {
  content: '',
  description: '',
  images: [],
  contents: [],
  comments: [],
  shares: [],
  tags: [],
  minutes_to_read: 0,
  previous: [],
  same: [],
  ..._defaultBaseModel,
};
