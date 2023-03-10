import {
  RolePermissionEnum,
  AdminPermissionEnum,
  MerchantPermissionEnum,
  OwnerPermissionEnum,
} from './permissions';

export enum GeneralPermissionEnum {
  ALL = 'ALL',
  DEFAULT = 'DEFAULT',
}

export const PermissionEnum = {
  ...GeneralPermissionEnum,
  ...RolePermissionEnum,
  ...AdminPermissionEnum,
  ...MerchantPermissionEnum,
  ...OwnerPermissionEnum,
};
