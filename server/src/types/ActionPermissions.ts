export interface Action {
  [key: string]: string[];
}

const ACTION_V1: Action = {
  'GET|users': ['user:list', 'user:view'],
};

const ACTION_V2: Action = {};

export const ACTION_PERMISSION: { [key: string]: Action } = { v1: ACTION_V1, v2: ACTION_V2 };
