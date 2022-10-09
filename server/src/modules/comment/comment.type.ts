import { BaseInformationModel, BaseModel } from '@/types';

export interface Comment extends BaseModel {
  content: string;

  replies: string[];
}
