export type AuthMode = "api_key_only" | "cookie";

export interface QueryMeta {
  durationMs: number;
  rowsReturned: number;
  capped: boolean;
  redactionCount: number;
  nextPageToken?: string;
  accountId: number;
  authMode: AuthMode;
}

export interface QueryResult {
  summary: string;
  rows: Array<Record<string, unknown>>;
  meta: QueryMeta;
  query: string;
}

export interface DryRunResult {
  valid: boolean;
  normalizedQuery: string;
  warnings: string[];
}

export interface InfraContext {
  generatedAt: string;
  accountId: number;
  services: string[];
  hosts: string[];
  clusters: string[];
  environments: string[];
  source: string;
}
