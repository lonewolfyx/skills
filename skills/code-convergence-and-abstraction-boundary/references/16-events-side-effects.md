# Duplicate Events, Subscriptions, and Side Effects

## Applicability

Use this reference when code touches event listeners, subscriptions, timers, keyboard shortcuts, resize, scroll, visibility changes, watchers, store subscriptions, or lifecycle side effects.

## Best Practices

1. Encapsulate event listeners in composables.
2. Encapsulate timers in composables or services.
3. Require subscriptions to return an unsubscribe function.
4. Give every side effect a clear creation point and cleanup point.
5. Keep one trigger boundary for each side effect instead of triggering the same effect from watchers, events, and store subscriptions.

## Do Not

1. Do not repeatedly register the same event listener.
2. Do not repeatedly register the same subscription.
3. Do not repeatedly create the same timer.
4. Do not create event listeners, subscriptions, or timers without unified cleanup.
5. Do not implement the same keyboard shortcut separately in multiple components.
6. Do not implement the same resize, scroll, or `visibilitychange` logic separately in multiple components.
7. Do not scatter side-effect logic across multiple lifecycle hooks without a unified owner.
8. Do not trigger the same side effect from `watch`, events, and store subscriptions without an explicit boundary.

## Additional Constraints

1. Each subscription must have one lifecycle owner responsible for registration, cleanup, and dependency changes.
2. Do not create anonymous listener functions when cleanup requires the same function identity.
3. Repeated debounce, throttle, visibility, resize, scroll, keyboard, or polling behavior must converge into a single side-effect boundary.
4. Side effects that update shared state must not be duplicated in both UI components and stores.
