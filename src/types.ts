export type AuthMode = "api_key_only" | "cookie";

export interface AccountContext {
  accountId: number;
  authMode: AuthMode;
  totalLogsInWindow: number;
  latestLogTimestamp: string | number | null;
  since?: string;
  until?: string;
}

export interface FieldMapping {
  service?: string;
  environment?: string;
  region?: string;
  cluster?: string;
  pod?: string;
  host?: string;
}

export interface ZeroResultDiagnostics {
  probableCause: string;
  missingFields: string[];
  availableFieldSample: string[];
  suggestions: string[];
}

export interface SchemaDiscoveryResult {
  summary: string;
  accountContext: AccountContext;
  availableFields: string[];
  fieldMapping: FieldMapping;
  topValues: Record<string, string[]>;
  suggestions: string[];
}

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
  accountContext: AccountContext;
  diagnostics?: ZeroResultDiagnostics;
}

export interface DryRunResult {
  valid: boolean;
  normalizedQuery: string;
  warnings: string[];
  accountContext: Pick<AccountContext, "accountId" | "authMode">;
}

export interface InfraContext {
  generatedAt: string;
  accountId: number;
  services: string[];
  hosts: string[];
  clusters: string[];
  environments: string[];
  regions: string[];
  pods: string[];
  fieldMapping: FieldMapping;
  source: string;
}
