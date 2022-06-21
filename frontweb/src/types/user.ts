type Role = {
  id: number;
  authority?: 'ROLE_OPERATOR' | 'ROLE_ADMIN';
}

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: Role[];
};
