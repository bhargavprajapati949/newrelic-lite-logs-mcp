# newrelic-lite-logs-mcp

Read-only New Relic Logs MCP server for VS Code.

This project helps teams use AI to debug issues by fetching New Relic logs through MCP without requiring a premium New Relic MCP plan.

## Why this project

- Read-only access to logs through NRQL.
- VS Code MCP compatible.
- API key auth by default, cookie fallback for emergencies.
- Built-in redaction and query guardrails.

## Tooling included

- search_logs
- get_error_logs
- summarize_log_patterns
- discover_infra_context
- dry_run_query

## Requirements

- Node.js 20+
- npm
- New Relic User API key
- New Relic account id

## Quick start for maintainers

1. Install dependencies.

```bash
npm install
```

2. Build.

```bash
npm run build
```

3. Run tests.

```bash
npm test
```

## VS Code setup for teammates (no clone/build)

This is the primary usage model.

1. Teammate sets local environment variables.

```bash
export NEW_RELIC_DEFAULT_AUTH_MODE=api_key_only
export NEW_RELIC_ACCOUNT_ID=1867676
export NEW_RELIC_API_KEY="YOUR_REAL_NEW_RELIC_USER_API_KEY"
export NEW_RELIC_COOKIE=""
```

2. Teammate adds this block to VS Code mcp.json.

```json
{
  "servers": {
    "newrelic-lite-logs-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "github:bhargavprajapati949/newrelic-lite-logs-mcp#main"],
      "env": {
        "NEW_RELIC_DEFAULT_AUTH_MODE": "api_key_only",
        "NEW_RELIC_ACCOUNT_ID": "${env:NEW_RELIC_ACCOUNT_ID}",
        "NEW_RELIC_API_KEY": "${env:NEW_RELIC_API_KEY}",
        "NEW_RELIC_COOKIE": "${env:NEW_RELIC_COOKIE}",
        "NEW_RELIC_VERBOSE_LOGS": "0"
      }
    }
  }
}
```

3. Restart VS Code.
4. Open MCP server list/dropdown.
5. Start/select newrelic-lite-logs-mcp.
6. Ask the AI to call search_logs or get_error_logs.

## VS Code setup for local development

Project-level config is available in .vscode/mcp.json and runs dist/index.js from the workspace.

## Authentication modes

Default mode:

- NEW_RELIC_DEFAULT_AUTH_MODE=api_key_only
- NEW_RELIC_API_KEY=...

Emergency fallback:

- NEW_RELIC_DEFAULT_AUTH_MODE=cookie
- NEW_RELIC_COOKIE=...

Cookie mode should only be used as fallback because session cookies are short-lived.

## Safety and limits

- Read-only query enforcement.
- At least one time boundary required (since/until or inline NRQL SINCE/UNTIL).
- Max rows per request: 5000.
- Sensitive data redaction in outputs.

## Scripts

- npm run build
- npm run dev
- npm run start
- npm run test
- npm run test:coverage
- npm run typecheck

## CI

GitHub Actions workflow runs:

- typecheck
- build
- test with coverage

Coverage artifacts are uploaded in each run.

## Publishing checklist

1. Confirm no secrets are committed.
2. Ensure .env.example uses placeholders only.
3. Push to main.
4. Tag a release, then recommend teammates pin to tag instead of main.

Example pinned reference:

- github:bhargavprajapati949/newrelic-lite-logs-mcp#v1.0.0

## Security checklist

- Never commit real API keys or cookies.
- Rotate credentials immediately if exposed.
- Keep secrets in local environment variables only.

## Troubleshooting

401 authentication required:

- verify NEW_RELIC_API_KEY is valid and active
- verify key has NerdGraph query access
- verify VS Code process can read your env vars

Server not visible in MCP list:

- validate mcp.json syntax
- restart VS Code

No logs returned:

- use larger time windows
- validate account id
- verify data exists in New Relic for that period

## Project structure

- src/index.ts
- src/newrelic.ts
- src/security.ts
- tests/security.test.ts
- .vscode/mcp.json
- .github/workflows/ci.yml

## License

ISC
