export type Role = {
  id: number;
  authority: string;
}

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  emailConfirmation: string;
  password: string;
  passwordConfirmation: string;
  roles: Role[];
};
