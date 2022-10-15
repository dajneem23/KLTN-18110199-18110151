import { RolesWeight } from '@/modules';

export const getHighestRole = (roles: string[]) => {
  return +roles.reduce((prev: any, curr: any) => {
    return Math.max(+RolesWeight[prev as keyof typeof RolesWeight], +RolesWeight[curr as keyof typeof RolesWeight]);
  }, roles[0]);
};
