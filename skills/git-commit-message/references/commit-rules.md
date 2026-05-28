# Commit Rules Reference

## Baseline Specs

- Conventional Commits 1.0.0 defines the core shape as `type[optional scope]: description`, with `feat` and `fix` carrying SemVer meaning and other types allowed by convention.
- Angular's commit-message guidance emphasizes a concise imperative subject, optional scope, blank-line-separated body/footer, and a subject that explains the change clearly without trailing punctuation.

## Repository-First Rule

Always prefer the repository's own validator over generic standards.
In this repository, [`scripts/verify-commit.js`](../scripts/verify-commit.js) is the source of truth for what passes the `commit-msg` hook.

Current validator regex:

```js
/^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?(!)?: .{1,50}/
```

This means:

- `revert: ` is optional and only valid as a prefix.
- The allowed `type` values are fixed to the list inside the regex.
- `scope` is optional.
- `!` is optional and marks a breaking change.
- The header must contain `: ` after the type or `type(scope)`.
- The subject must be at least 1 character and no more than 50 characters.

## Alignment With Conventional Commits

- `!` is supported in the header for breaking changes, matching Conventional Commits.
- Do not assume any arbitrary type is allowed. Types such as `fixup`, `deps`, or `revert` as the primary type will fail unless the validator is updated.
- Do not rely on body/footer content to rescue an invalid first line. The hook checks the first line pattern.

## Practical Writing Guidance

- Use imperative voice: `add`, `fix`, `update`, `refactor`, `remove`.
- Keep the subject specific enough to explain the dominant change.
- Omit the scope when it would be vague or redundant.
- Prefer the most specific local type instead of defaulting to `chore`.
- When the change is breaking, prefer adding `!` in the header and explain the impact in the body/footer when helpful.

## Examples

```text
feat(parser): add support for inline math
fix(cli): handle empty config path
feat(api)!: remove legacy token endpoint
docs(readme): clarify installation steps
dx(devtools): speed up local lint workflow
types(api): narrow response payload types
release: cut v1.4.0
```

## Source Material

- Conventional Commits 1.0.0: <https://www.conventionalcommits.org/en/v1.0.0/>
- Angular commit message guidelines: <https://github.com/angular/angular/blob/main/contributing-docs/commit-message-guidelines.md>
