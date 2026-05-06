import { describe, expect, it } from "vitest";
import { ensureTimeBound, enforceReadOnlyQuery, redactObject } from "../src/security.js";

describe("query guardrails", () => {
  it("rejects mutation-like query", () => {
    expect(() => enforceReadOnlyQuery("DELETE FROM Log SINCE 1 hour ago")).toThrow(/read-only/i);
  });

  it("requires at least one time bound", () => {
    expect(() => ensureTimeBound("SELECT * FROM Log")).toThrow(/since\/until/i);
    expect(() => ensureTimeBound("SELECT * FROM Log", "30 minutes ago", undefined)).not.toThrow();
  });
});

describe("redaction", () => {
  it("redacts sensitive values", () => {
    const input = {
      email: "user@example.com",
      message: "Bearer abcd.efgh.ijkl",
      cookie: "session=123",
    };

    const out = redactObject(input);
    expect(out.redactionCount).toBeGreaterThan(0);
    expect(String(out.redacted.email)).toContain("REDACTED");
    expect(String(out.redacted.cookie)).toContain("REDACTED");
  });
});
