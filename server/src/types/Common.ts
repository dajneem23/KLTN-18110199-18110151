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

  twitter?: string;

  telegram?: string;

  facebook?: string;

  instagram?: string;

  linkedin?: string;

  github?: string;

  medium?: string;

  discord?: string;

  youtube?: string;

  website?: string;

  websites?: string[];

  blog?: string;

  reddit?: string;

  gitter?: string;

  bitcoin_talk?: string;

  rocket_chat?: string;

  video?: string;

  explorer?: string;
}

export enum WorkType {
  CURRENT = 'current',
  PREVIOUS = 'previous',
}

export enum DEVELOPMENT_STATUS {
  WORKING_PRODUCT = 'working_product',
  ON_GOING_DEVELOPMENT = 'on_going_development',
  ALPHA_VERSION = 'alpha_version',
  BETA_VERSION = 'beta_version',
  DEFUNCT = 'defunct',
  UNKNOWN = 'unknown',
  PROTOTYPE_MVP = 'prototype_mvp',
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

export type TeamPerson = {
  name: string;
  position: string;
  contacts?: Array<{
    name: string;
    url: string;
  }>;
};
export type Support = {
  name: string;
  url: string;
};
export type ResearchPaper = {
  title: string;
  url: string;
};

export type Technology = {
  blockchain?: string;
  hash_algorithm?: string;
  consensus?: string;
  'org._structure'?: string;
  open_source?: string;
  hardware_wallet?: string;
  development_status?: string;
};
export type IcoDetail = {
  investor_supply?: string;
  total_supply?: string;
  hard_cap?: string;
  start_date?: string;
  end_date?: string;
};

export type ProductInfomation = {
  parent_company?: string;
  team_location?: string;
  blockchain?: string;
  token?: string;
  release?: string;
  software_license?: string;
};
export type App = {
  name: string;
  url: string;
};
export type Media = {
  type: string;
  url: string;
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
export type ForeignReLationship = {
  name: string;
  foreign_id: string;
  type?: string;
  [key: string]: any;
};
export enum NewsStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  APPROVE = 'approve',
  PROCESSING = 'processing',
  PUBLISHED = 'published',
}
export enum FundraisingRound {
  UNKNOWN = 'Unknown',
  PRE_SEED = 'Pre-Seed',
  SEED = 'Seed',
  ANGEL = 'Angel',
  INVESTORS = 'Investors',
  BRIDGE = 'Bridge',
  MEZZABINE = 'Mezzanine',
  PRE_PUBLIC = 'Pre-Public',
  PUBLIC = 'Public',
  SERIES_A = 'Series A',
  SERIES_B = 'Series B',
  SERIES_C = 'Series C',
  SERIES_D = 'Series D',
  SERIES_E = 'Series E',
  SERIES_F = 'Series F',
}
export type FundraisingRoundDetail = {
  round_name: string;
  valuation?: string;
  description?: string;
  announcement?: string;
  amount?: number;
  anum?: string;
  number_of_rounds?: string;
  record_id?: string;
  stage: FundraisingRound | string;
  posts?: string[];
  date: Date;
};
