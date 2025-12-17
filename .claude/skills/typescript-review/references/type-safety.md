# Type Safety Guide

## Table of Contents

1. [Strict Mode](#strict-mode)
2. [any型の回避](#any型の回避)
3. [Type Guards](#type-guards)
4. [Null Safety](#null-safety)
5. [型アサーションの適切な使用](#型アサーションの適切な使用)

---

## Strict Mode

`tsconfig.json`で`strict: true`を有効にする。これにより以下が有効化される:

- `noImplicitAny` - 暗黙のany禁止
- `strictNullChecks` - null/undefined厳密チェック
- `strictFunctionTypes` - 関数型の厳密チェック
- `strictBindCallApply` - bind/call/applyの厳密チェック
- `strictPropertyInitialization` - プロパティ初期化チェック
- `noImplicitThis` - 暗黙のthis禁止
- `alwaysStrict` - use strict出力

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

---

## any型の回避

### Bad: any型の使用

```typescript
function processData(data: any) {
  return data.value; // 型チェックなし
}

const response: any = await fetch(url);
```

### Good: 具体的な型定義

```typescript
interface ApiResponse {
  value: string;
  status: number;
}

function processData(data: ApiResponse) {
  return data.value; // 型安全
}
```

### Good: unknownの使用

外部データなど型が不明な場合は`unknown`を使用し、Type Guardで絞り込む:

```typescript
function processUnknown(data: unknown) {
  if (typeof data === "object" && data !== null && "value" in data) {
    return (data as { value: string }).value;
  }
  throw new Error("Invalid data");
}
```

---

## Type Guards

### typeof Guard

```typescript
function format(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}
```

### instanceof Guard

```typescript
function handleError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}
```

### Custom Type Guard

```typescript
interface User {
  id: number;
  name: string;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    typeof (value as User).id === "number" &&
    typeof (value as User).name === "string"
  );
}

function processUser(data: unknown) {
  if (isUser(data)) {
    console.log(data.name); // 型安全
  }
}
```

### in演算子

```typescript
interface Cat {
  meow(): void;
}
interface Dog {
  bark(): void;
}

function makeSound(animal: Cat | Dog) {
  if ("meow" in animal) {
    animal.meow();
  } else {
    animal.bark();
  }
}
```

---

## Null Safety

### Optional Chaining

```typescript
// Bad
const name = user && user.profile && user.profile.name;

// Good
const name = user?.profile?.name;
```

### Nullish Coalescing

```typescript
// Bad - 0や""もfalseとして扱われる
const value = input || "default";

// Good - null/undefinedのみ
const value = input ?? "default";
```

### Non-null Assertion (慎重に使用)

```typescript
// 使用を避ける
const element = document.getElementById("app")!;

// 推奨: null checkを行う
const element = document.getElementById("app");
if (!element) {
  throw new Error("Element not found");
}
```

---

## 型アサーションの適切な使用

### Bad: 型アサーションの乱用

```typescript
const data = response as UserData; // 検証なし
const element = event.target as HTMLInputElement; // 危険
```

### Good: Type Guardで検証

```typescript
function isUserData(data: unknown): data is UserData {
  // 検証ロジック
}

if (isUserData(response)) {
  const data = response; // 型安全
}
```

### Good: HTMLElement型の安全な扱い

```typescript
function handleInput(event: Event) {
  const target = event.target;
  if (target instanceof HTMLInputElement) {
    console.log(target.value); // 型安全
  }
}
```

### 許容されるケース

DOMやライブラリAPIで型が明確な場合のみ:

```typescript
// querySelector は型引数をサポート
const input = document.querySelector<HTMLInputElement>("#email");
if (input) {
  input.value = "test@example.com";
}
```
