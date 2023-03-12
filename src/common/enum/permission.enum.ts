import {
  RolePermissionEnum,
  AdminPermissionEnum,
  MerchantPermissionEnum,
  OwnerPermissionEnum,
  CustomerPermissionEnum,
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
  ...CustomerPermissionEnum,
};
