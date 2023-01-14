export interface MongoArtifacts {
  _id: string;
}

// L - loading; E - error
export type LE<T> = T & {
  isLoading?: boolean;
  error?: string | Error;
};

export interface User extends MongoArtifacts {
  email: string;
  fullname: string;
  password: string;
  gender: string;
  country: string;
  subjects: Array<{ name: string; percent: string; level: string }>;
  auth?: {
    local?: {
      accessToken?: string;
      refreshToken?: string;
    };
  };
}
