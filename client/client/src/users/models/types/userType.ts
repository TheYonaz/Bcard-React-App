export type AddressType = {
  state?: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
};

export type ImageType = { url?: string; alt?: string };

export type UserNameType = { first: string; middle?: string; last: string };

type UserType = {
  name: UserNameType;
  phone: string;
  email: string;
  password?: string;
  isBusiness: boolean;
  image: ImageType;
  address: AddressType;
};

export type TokenType = { _id: string; isBusiness: boolean; isAdmin: boolean };

export type Login = Pick<UserType, "email" | "password">;

export type RegistrationForm = {
  _id?: string;
  first: string;
  middle: string;
  last: string;
  phone: string;
  email: string;
  password: string;
  url: string;
  alt: string;
  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zip: string;
  isBusiness: boolean;
};

export type RegistrationFormErrors = Partial<RegistrationForm>;
export type RegistrationEditForm = {
  _id?: string;
  first: string;
  middle: string;
  last: string;
  phone: string;
  email: string;
  url: string;
  alt: string;
  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zip: string;
  isBusiness: boolean;
  isAdmin?: boolean;
};
export type EditUserFormErrors = Partial<RegistrationEditForm>;

export type UserRegistered = {
  name: {
    first: string;
    middle?: string;
    last: string;
    _id?: string;
  };
  email: string;
  _id: string;
};

export type userMapToModelType = {
  _id: string;
  first: string;
  middle: string;
  last: string;
  phone: string;
  email: string;
  password: string;
  url: string;
  alt: string;
  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zip: string;
  isBusiness: boolean;
  user_id: string | undefined;
  isAdmin: boolean;
};
export type NormalizedEditUser = {
  _id?: string;
  name: { first: string; middle: string; last: string };
  phone: string;
  email: string;
  // password: string;
  image: {
    url: string;
    alt: string;
  };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
  isBusiness: boolean;
};

export default UserType;
