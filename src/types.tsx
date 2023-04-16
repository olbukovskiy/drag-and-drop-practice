export type Issue = {
  id: string;
  title: string;
  login: string;
  number: number;
  state: string;
  created_at: string;
  comments: number;
};

export type Links = {
  owner: string;
  repo: string;
};

export type ResponseType = {
  id: number;
  title: string;
  user: { login: string };
  number: number;
  state: string;
  created_at: string;
  comments: number;
};

export type SearchQueryParts = {
  repo: string;
  owner: string;
};

export type ChangeData = {
  id: string;
  state?: string;
};

export type EventTargetType = {
  searchQuery: { value: string };
};

export type StateKeys = ("all" | "open" | "closed")[];
