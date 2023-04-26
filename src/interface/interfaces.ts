interface ProviderResponse {
  id: string;
  status: string;
  message: string;
}

export interface Friend {
  id: string;
  name: string;
  age: number;
  friends: Friend[];
}

export interface User {
  id: string;
  name: string;
  age: number;
  friends: Friend[];
  providerResponse: ProviderResponse;
}
