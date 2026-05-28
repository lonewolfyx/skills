# Scenario-Based Naming Guide

Naming conventions must reflect the business domain and usage context. This document provides scenario-specific naming patterns to ensure identifiers are semantically accurate, not just syntactically correct.

## API Layer

### Functions

API layer functions should clearly indicate the HTTP method and the resource being operated on.

```typescript
// Bad — vague names
function data() { ... }
function handler() { ... }

// Good — clear verb + resource
function getUserById(id: string) { ... }
function createUser(payload: ICreateUserPayload) { ... }
function updateOrderStatus(orderId: string, status: orderStatus) { ... }
function deleteCartItem(itemId: string) { ... }
function fetchProductList(params: IListParams) { ... }
```

### Variables

```typescript
// Bad — generic names
const result = await api.get('/users')
const data = response.body

// Good — descriptive names reflecting the business concept
const userListResponse = await api.get('/users')
const paginatedUsers = response.body
```

### Config Parameters

```typescript
// Bad
const apiConfig = {
    baseUrl: 'https://api.example.com',
    timeout: 5000,
    retryCount: 3,
}

// Good
const apiConfig = {
    api_base_url: 'https://api.example.com',
    request_timeout: 5000,
    max_retry_count: 3,
    enable_request_log: true,
}
```

## Data Models and Entities

### Variables

Entity-related variables should use the entity name as the noun, with qualifiers as needed.

```typescript
// Bad
const u = getUser()
const temp = orders.filter(...)
const flag = user.isActive

// Good
const currentUser = getUser()
const pendingOrders = orders.filter(...)
const isUserActive = user.isActive
```

### Functions

Model/entity functions should describe the operation on the entity.

```typescript
// Bad
function process(u: IUser) { ... }

// Good
function validateUserEmail(email: string) { ... }
function formatUserDisplayName(user: IUser) { ... }
function calculateOrderTotal(items: IOrderItem[]) { ... }
```

## UI Components and Events

### Event Handlers

UI event handlers should follow the `on` + `handle` pattern consistently.

```typescript
// Bad — inconsistent naming
function click() { ... }
function doSubmit() { ... }
function changeHandler() { ... }

// Good — consistent on/handle pattern
function onSubmit() { ... }
function handleChange() { ... }
function onClickConfirm() { ... }
```

### State Variables

UI state variables should clearly describe what they track.

```typescript
// Bad
const loading = ref(false)
const show = ref(false)
const err = ref(null)

// Good
const isLoading = ref(false)
const isModalVisible = ref(false)
const errorMessage = ref<string | null>(null)
```

## Store / State Management

### Functions (Actions)

Store actions should describe the business operation, not the implementation detail.

```typescript
// Bad
function set(data: ICart) { ... }
function reset() { ... }

// Good
function addToCart(item: ICartItem) { ... }
function clearCart() { ... }
function applyCoupon(code: string) { ... }
```

### Variables (State)

State variables should describe what they hold with appropriate prefixes.

```typescript
// Bad
const items = ref<ICartItem[]>([])
const total = ref(0)
const flag = ref(false)

// Good
const cartItems = ref<ICartItem[]>([])
const cartTotal = ref(0)
const isCartOpen = ref(false)
```

### Constants

Store-related constants should describe the state key or action type.

```typescript
// Bad
const KEY = 'cart'
const ACTION_ADD = 'addItem'

// Good
const CART_STORAGE_KEY = 'cart'
const CART_ITEM_LIMIT = 50
```

## Utility and Helper Functions

Utility functions should be generic and their names should describe the transformation.

```typescript
// Bad — too specific for a utility
function doThing(input: string) { ... }

// Good — clear transformation intent
function capitalizeFirstLetter(str: string) { ... }
function debounce(fn: Function, delay: number) { ... }
function parseQueryString(url: string) { ... }
function deepClone<T>(obj: T): T { ... }
```

## Configuration and Environment

### Constants vs Config Parameters

Clear separation between compile-time constants and runtime configuration:

```typescript
// Compile-time constants — UPPER_SNAKE_CASE
const APP_NAME = 'MyApp'
const DEFAULT_PAGE_SIZE = 20
const SUPPORTED_LOCALES = Object.freeze(['en', 'zh', 'ja'] as const)

// Runtime config — lower_snake_case in the config object
const appConfig = {
    app_name: process.env.APP_NAME || APP_NAME,
    default_page_size: Number(process.env.DEFAULT_PAGE_SIZE) || DEFAULT_PAGE_SIZE,
    enable_dark_mode: true,
    session_timeout: 3600,
    cors_allowed_origins: ['https://example.com'],
}
```

### Feature Flags

Feature flags are config parameters — use lower_snake_case:

```typescript
// Bad
const ENABLE_NEW_DASHBOARD = true
const featureFlagBeta = false

// Good
const featureFlags = {
    enable_new_dashboard: true,
    show_beta_features: false,
    use_legacy_api: false,
}
```

## Common Anti-Patterns

### Mixed Conventions

```typescript
// Bad — mixing conventions in the same scope
const USER_LIMIT = 100          // looks like a constant
let currentPage = 1             // correct variable
const fetchData = () => {}      // looks like a variable
function LOAD_DATA() {}         // looks like a constant

// Good — each identifier follows its role's convention
const USER_LIMIT = 100          // constant
let currentPage = 1             // variable
function fetchData() {}         // function
```

### Abbreviations

```typescript
// Bad — over-abbreviated
function getUsrInf(id: string) { ... }
const ordLst = fetchOrders()

// Good — clear and readable
function getUserInfo(id: string) { ... }
const orderList = fetchOrders()
```


Exception: well-known abbreviations that are universally understood in the domain:

```typescript
// Acceptable abbreviations
function parseHTML(content: string) { ... }
function generateUUID() { ... }
const apiURL = 'https://api.example.com'
const maxHTTPRetries = 3
```

### Domain Mismatch

```typescript
// Bad — using config naming for a constant, or constant naming for a config
const MAX_ITEMS = config.max_items   // MAX_ITEMS is a variable (computed)
const timeout = 5000                 // timeout is a constant (primitive literal)

// Good
const maxItems = config.max_items    // variable (computed from config)
const DEFAULT_TIMEOUT = 5000         // constant (primitive literal)
const TIMEOUT_MS = 5000              // constant (primitive literal)
```
