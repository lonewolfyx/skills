# Mirror Constants, Variables, Function Bodies, Derived Mirrors, and Intermediate Mirror Constants

## Applicability

Use this reference when adding variables, constants, temporary values, derived values, function bodies, mapping tables, configuration objects, or intermediate constants that copy, rename, relay, or lightly derive existing values.

## Best Practices

1. Use the single source value directly instead of creating a synonym mirror.
2. Create a new constant or variable only when it expresses new domain semantics, isolates a real variation point, stabilizes a public API, or lowers caller cognitive load.
3. Give derived values explicit business meaning and keep them near the trusted owner of the derivation rule.
4. Allow intermediate constants only when they name complex expressions, document business conditions, avoid repeated computation, or improve correctness.
5. Merge function bodies that are identical or behaviorally equivalent into one implementation.

## Do Not

1. Do not create mirror constants.
2. Do not create mirror variables.
3. Do not create mirror function bodies.
4. Do not create derived mirrors.
5. Do not create intermediate mirror constants.


## Definitions

A mirror constant, variable, or function is a new binding whose value or behavior is the same as another trusted source and whose name does not add domain meaning, boundary ownership, or a real variation point.

A derived mirror is a lightly transformed copy that can drift from the source without owning a distinct business rule.

Allowed intermediate values must satisfy at least one condition: name a complex expression, express a business predicate, avoid repeated computation, prevent an ordering or correctness bug, or document a boundary-specific conversion.

## Examples

```ts
// Bad: mirror value with no new semantics.
const activeStatus = USER_STATUS.ACTIVE

// Good: business predicate names a decision, not a mirror.
const canInviteUser = user.status === USER_STATUS.ACTIVE && user.invitesRemaining > 0
```
