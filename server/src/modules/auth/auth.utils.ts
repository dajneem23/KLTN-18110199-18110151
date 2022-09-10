import { RolesWeight } from '@/modules';

export const getHighestRole = (roles: string[]) => {
  return roles.reduce((prev, curr) => {
    return RolesWeight[prev] > RolesWeight[curr] ? prev : curr;
  }, roles[0]);
};
