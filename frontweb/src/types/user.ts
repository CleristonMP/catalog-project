export type Role = {
  id: number;
  authority: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: Role[];
};

export type UserForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: Role[];
  emailConfirmation: string;
  passwordConfirmation: string;
};
