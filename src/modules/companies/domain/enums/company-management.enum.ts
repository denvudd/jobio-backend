export enum CompanyInvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  EXPIRED = 'expired',
}

export enum CompanyRoleType {
  ADMIN = 'admin',
  MEMBER = 'member',
}

export enum CompanyPermissionList {
  CREATE_JOBS = 'create_jobs',
  EDIT_JOBS = 'edit_jobs',
  DELETE_JOBS = 'delete_jobs',
  PUBLISH_JOBS = 'publish_jobs',

  VIEW_CANDIDATES = 'view_candidates',
  CONTACT_CANDIDATES = 'contact_candidates',
  MANAGE_APPLICATIONS = 'manage_applications',

  INVITE_USERS = 'invite_users',
  REMOVE_USERS = 'remove_users',
  MANAGE_USER_ROLES = 'manage_user_roles',
  EDIT_COMPANY_INFO = 'edit_company_info',
  DELETE_COMPANY = 'delete_company',
  VIEW_ANALYTICS = 'view_analytics',
  EXPORT_DATA = 'export_data',
  MANAGE_COMPANY_SETTINGS = 'manage_company_settings',
}
