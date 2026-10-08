# MCP 2026-07-28 wire migration note

This repository is a JavaScript MCP server. The current
`@modelcontextprotocol/sdk` (1.32.1) speaks the 2025-11-25 wire. No JS SDK
release yet speaks 2026-07-28, so this PR ships the **shim only** and the
honest estate claim stays `wire version unpinned` / max `2025-11-25` until
the JS SDK ships a 2026-07-28 release.

## What changed

* `mcp2026_shim.js` vendored (or `mcp2026_shim.py` if using Python transport).
* `MIGRATION_NOTE.md` documents the JS SDK status honestly.

## Deadline

The old wire dies **2027-07-28**.

## Verify

```bash
PYTHONPATH= /opt/homebrew/bin/python3.11 ~/clawd/mcp_wire_audit.py audit --local autonomous-vehicles-ai
```
