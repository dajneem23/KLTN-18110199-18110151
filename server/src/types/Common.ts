import { UserRole } from '@/modules';
import { ObjectId } from 'mongodb';

export interface BaseQuery {
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: 'desc' | 'asc';
  q?: string;
}

export type PaginationResult<T> = { total_count: number; items: T[] };

export type T = any;

export type CurrencyCode = 'VND' | 'USD';

export enum LANGUAGE_CODE {
  VI = 'vi',
  EN = 'en',
  FR = 'fr',
  DE = 'de',
}

export enum ORDER {
  DESC = 'DESC',
  ASC = 'ASC',
}

export enum USER_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum CRAWL_CONTENT_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum CONTENT_TYPE {
  WEB = 'web',
  TELEGRAM = 'telegram',
  TWITTER = 'twitter',
  PROJECT = 'project',
}
export type HeaderParams = {
  'x-uid': string;
};

export enum CATEGORY_TYPE {
  LISTENING = 'listening',
  WIKIBLOCK = 'wikiblock',
  EVENT = 'event',
  NEWS = 'news',
  RELATED_NEWS = 'related_news',
  BLOCKCHAIN = 'blockchain',
  APPLICATION = 'application',
  CONSENSUS = 'consensus',
  CRYPTO_ASSET = 'crypto_asset',
  PERSON = 'person',
  PRODUCT = 'product',
  COMPANY = 'company',
  CRYPTO = 'crypto',
  EXPLORATION = 'exploration',
  SUB_EXPLORATION = 'sub_exploration',
  INVESTOR = 'investor',
}
export type BaseModel = {
  _id?: string;

  foreign_id?: string;

  record_id?: string;

  metadata?: {
    _admin_note?: string;
    storage?: string;
  };

  need_review?: boolean;

  review_status?: string;

  reviewed?: boolean;

  updated_by?: string;

  updated_at?: Date;

  created_by?: string;

  created_at?: Date;

  deleted_by?: string;

  deleted_at?: Date;

  deleted?: boolean;
};

export interface BaseInformationModel extends BaseModel {
  id?: ObjectId;

  name?: string;
  // location?: string;

  about?: string;

  categories?: ObjectId[];

  verified?: boolean;

  sponsored?: boolean;

  tel?: string;

  email?: string;

  avatar?: string;

  short_description?: string;
  urls: {
    url: string;
    type: string;
  }[];
}

export type ContractAddress = {
  owner: string;
  address?: string;
  url?: string;
};
export enum EventType {
  ONLINE = 'online',
  OFFLINE = 'offline',
  VIRTUAL = 'virtual',
}
export enum SponsorType {
  COMPANY = 'company',
  PERSON = 'person',
}
export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
}
export type Sponsor = {
  id: string;
  name?: string;
  type?: SponsorType;
};
export type Agenda = {
  time?: Date;
  description?: string;
};

export const defaultFilter = {
  deleted: false,
};
export type BaseServiceInput = {
  _id?: string;
  _content: {
    [key: string]: any;
  };
  _subject?: string;
  _query?: {
    page?: number;
    per_page?: number;
    sort_by?: string;
    sort_order?: 'desc' | 'asc';
  };
  _filter?: {
    q: string;
    [key: string]: any;
  };
  _permission?: 'public' | 'private';
  _role?: UserRole;
};

export type BaseServiceOutput = {
  code?: number;
  result?: Event | any;
  total_count?: number;
  data?: Array<any>;
};

export type IcoDetail = {
  investor_supply?: string;
  total_supply?: string;
  hard_cap?: string;
  start_date?: string;
  end_date?: string;
};

export enum LANG_CODE {
  VI = 'vi',
  // EN = 'en',
  FR = 'fr',
  DE = 'de',
  CN = 'cn',
  JP = 'jp',
}

export const PRIVATE_KEYS = [
  'updated_at',
  // 'created_at',
  'deleted_at',
  'deleted_by',
  'updated_by',
  'created_by',
  'deleted',
  'trans',
];

export enum COLLECTION_NAMES {
  events = 'events',
  news = 'news',
  projects = 'projects',
  persons = 'persons',
  companies = 'companies',
  organizations = 'organizations',
  funds = 'funds',
  users = 'users',
  categories = 'categories',
  tags = 'tags',
  verifications = 'verifications',
  glossaries = 'glossaries',
  blockchains = 'blockchains',
  products = 'products',
  countries = 'countries',
  'auth-sessions' = 'auth-sessions',
  coins = 'coins',
  settings = 'settings',
  exchanges = 'exchanges',
}
/**
 *  @description - Remove all special characters from a string to make it a valid URL
 */
export const RemoveSlugPattern = /[`~!@#$%^&*()+{}[\]\\|,.//?;':"]/g;
