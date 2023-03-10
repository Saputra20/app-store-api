import {
  RolePermissionEnum,
  AdminPermissionEnum,
  OwnerPermissionEnum,
  MerchantPermissionEnum,
} from '../enum/permissions';

export const Menu = [
  {
    title: 'Home',
    route: 'home',
    icon: 'UsersIcon',
  },
  {
    title: 'Role Management',
    route: 'role',
    icon: 'UsersIcon',
    key: RolePermissionEnum.ROLE_READ,
    permissions: Object.values(RolePermissionEnum),
  },
  {
    title: 'Admin Management',
    route: 'admin',
    icon: 'UsersIcon',
    key: AdminPermissionEnum.ADMIN_READ,
    permissions: Object.values(AdminPermissionEnum),
  },
  {
    title: 'Owner Management',
    route: 'owner',
    icon: 'UsersIcon',
    key: OwnerPermissionEnum.OWNER_READ,
    permissions: Object.values(OwnerPermissionEnum),
  },
  {
    title: 'Merchant Management',
    route: 'owner',
    icon: 'UsersIcon',
    key: MerchantPermissionEnum.MERCHANT_READ,
    permissions: Object.values(MerchantPermissionEnum),
  },
];
