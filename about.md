# rice-opencode

Personal OpenCode configuration preset with optional experimental packages.

## What is this?

This repository contains my OpenCode-AI configuration, including:

- **Custom agents** - Specialized AI agent prompts for different tasks
- **Templates** - Reusable LaTeX templates for IEEE papers and SIT/UofG reports
- **MCP server configs** - GitHub, Context7, DeepWiki, Exa search, Hound fetch, DDG fallback

## Structure

```
├── agents/           # Agent prompt files
├── commands/         # Slash commands
├── skills/           # Skills
├── packages/viz/     # Experimental viz plugin package (not loaded by default)
├── pandoc/
│   ├── assets/       # Logo images (SIT, UofG)
│   └── templates/    # LaTeX templates
└── opencode.json     # Main OpenCode config preset
```

## Architecture Notes

The stable surface is the config/preset layer: `agents`, `commands`, `skills`,
and `opencode.json`.

The legacy `packages/docs` plugin and `docs-workflow` skill were removed in
favor of Quarto. Their useful templates and logos remain under the root
`pandoc/` directory.

### Experimental package

`packages/viz` exists for future chart/diagram/table generation ideas.

It is currently:

- private
- not loaded by default
- not part of the stable user-facing path

`packages/viz` and `packages/shared` remain optional package-level work and are
not part of the stable default harness.

## Agents

| Agent | Model | Purpose |
|-------|-------|---------|
| plan | GPT-5.5 | Requirements analysis and execution planning |
| chat | GPT-5.5 | General interactive agent |
| build | GPT-5.5 | High-agency implementation and verification |
| explore | GPT-5.5 | Fast codebase navigation and file discovery |
| docs-first-coder | GPT-5.5 | Documentation-verified coding |
| code-checker | GPT-5.5 | Code review and verification |
| document-proofreader | GPT-5.5 | Academic proofreading and argument review |

## Document Templates

Quarto supersedes the removed custom docs plugin. The repository retains IEEE
and SIT/UofG LaTeX templates plus logos under `pandoc/` for reuse with Quarto,
Pandoc, or direct LaTeX workflows.

## Setup

1. Copy to `~/.config/opencode/` or use as project-local config
2. Create local secret files:
   ```
   GITHUB_PAT=your_github_pat
   CONTEXT7_API_KEY=your_context7_key
   ```
   Save the raw Exa API key without a trailing newline in `~/.config/opencode/.exa-api-key`, then run `chmod 600 ~/.config/opencode/.exa-api-key`.
3. Install dependencies: `bun install` or `npm install`
4. Prewarm the pinned Hound tool: `uvx --from 'hound-mcp[all]==12.4.1' hound -v`
5. Run `uvx --from 'hound-mcp[all]==12.4.1' hound --doctor`, then install Chromium only if the doctor reports it missing
6. Verify Exa and Hound with `opencode mcp list`; Exa uses the `x-api-key` header and has OAuth disabled

## Notes

- `opencode.json` uses `{env:VAR}` and `{file:path}` substitutions for secrets - safe to commit
- open-web search routes to `exa_web_search_exa`; known-URL retrieval routes to `hound_smart_fetch`
- Hound's duplicate `hound_smart_search` tool is disabled
- `researcher-mcp` still expects a shell-script launcher path for now
- Actual API keys should be in `.env` or `~/.config/opencode/.exa-api-key`, outside tracked config
- Quarto is preferred for document authoring; retained templates require LaTeX for PDF output
