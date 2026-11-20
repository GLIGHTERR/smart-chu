export type Session = {
  accessToken: string;
  ownerId: string;
};

export type Credentials = {
  email: string;
  password: string;
};

export type RegistrationValues = Credentials & {
  confirmPassword: string;
  displayName: string;
  phone: string;
};
