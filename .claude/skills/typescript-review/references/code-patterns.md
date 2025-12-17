# Code Patterns Guide

## Table of Contents

1. [Import/Export](#importexport)
2. [関数設計](#関数設計)
3. [非同期処理](#非同期処理)
4. [モジュール設計](#モジュール設計)
5. [命名規則](#命名規則)
6. [高度な型機能](#高度な型機能)

---

## Import/Export

### 型のみのImport

型のみをインポートする場合は`import type`を使用:

```typescript
// Bad
import { User, UserService } from "./user";

// Good
import type { User } from "./user";
import { UserService } from "./user";

// Good: 混在する場合
import { UserService, type User, type UserRole } from "./user";
```

### Export

```typescript
// 名前付きエクスポート推奨
export interface Config {}
export function createConfig(): Config {}

// デフォルトエクスポートは避ける（リファクタリングが困難）
// Bad
export default class UserService {}

// Good
export class UserService {}
```

---

## 関数設計

### パラメータと戻り値の型

```typescript
// Bad: 型が不明確
function process(data, options) {
  // ...
}

// Good: 明確な型定義
interface ProcessOptions {
  format: "json" | "xml";
  validate?: boolean;
}

interface ProcessResult {
  success: boolean;
  data: unknown;
}

function process(data: unknown, options: ProcessOptions): ProcessResult {
  // ...
}
```

### デフォルトパラメータ

```typescript
// Bad: undefinedチェックが必要
function greet(name: string | undefined) {
  const displayName = name ?? "Guest";
}

// Good: デフォルト値
function greet(name: string = "Guest") {
  console.log(`Hello, ${name}`);
}
```

### オプショナルパラメータ vs オブジェクト引数

```typescript
// Bad: 多数のオプショナル引数
function createUser(
  name: string,
  email?: string,
  age?: number,
  role?: string
) {}

// Good: オプションオブジェクト
interface CreateUserOptions {
  name: string;
  email?: string;
  age?: number;
  role?: string;
}

function createUser(options: CreateUserOptions) {}
```

### 関数オーバーロード

```typescript
// 入力に応じて戻り値型が変わる場合
function parse(input: string): object;
function parse(input: string, asArray: true): unknown[];
function parse(input: string, asArray?: boolean): object | unknown[] {
  const result = JSON.parse(input);
  return asArray ? (Array.isArray(result) ? result : [result]) : result;
}
```

---

## 非同期処理

### Promise.allで並列実行

```typescript
// Bad: 順次実行
const user = await getUser(id);
const posts = await getPosts(id);
const comments = await getComments(id);

// Good: 並列実行
const [user, posts, comments] = await Promise.all([
  getUser(id),
  getPosts(id),
  getComments(id),
]);
```

### フラットな構造

```typescript
// Bad: ネストされたasync/await
async function processData() {
  return await fetch(url).then(async (res) => {
    const data = await res.json();
    return await transform(data);
  });
}

// Good: フラットな構造
async function processData() {
  const response = await fetch(url);
  const data = await response.json();
  return transform(data);
}
```

### エラーハンドリング

```typescript
// Bad: 全てを catch
async function fetchData() {
  try {
    const data = await api.get("/data");
    return process(data);
  } catch (e) {
    console.error(e); // どのエラーか不明
  }
}

// Good: 具体的なエラー処理
class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

async function fetchData(): Promise<Data | null> {
  try {
    const response = await api.get("/data");
    if (!response.ok) {
      throw new ApiError(response.status, "API request failed");
    }
    return process(await response.json());
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`API Error ${error.status}: ${error.message}`);
      return null;
    }
    throw error; // 予期しないエラーは再スロー
  }
}
```

---

## モジュール設計

### 単一責任の原則

```typescript
// Bad: 複数の責任
// user.ts
export class User {}
export function validateUser() {}
export function formatUserEmail() {}
export async function sendUserNotification() {}

// Good: 責任の分離
// user/model.ts
export class User {}

// user/validation.ts
export function validateUser() {}

// user/formatter.ts
export function formatUserEmail() {}

// user/notification.ts
export async function sendUserNotification() {}

// user/index.ts (barrel export)
export * from "./model";
export * from "./validation";
export * from "./formatter";
export * from "./notification";
```

### 依存性注入

```typescript
// Bad: 直接依存
class UserService {
  private db = new Database();

  async getUser(id: string) {
    return this.db.query(`SELECT * FROM users WHERE id = ?`, [id]);
  }
}

// Good: 依存性注入
interface IDatabase {
  query<T>(sql: string, params: unknown[]): Promise<T>;
}

class UserService {
  constructor(private db: IDatabase) {}

  async getUser(id: string) {
    return this.db.query(`SELECT * FROM users WHERE id = ?`, [id]);
  }
}

// テストでモック可能
const mockDb: IDatabase = {
  query: async () => [{ id: "1", name: "Test" }],
};
const service = new UserService(mockDb);
```

---

## 命名規則

| 種類             | 規則        | 例                              |
| ---------------- | ----------- | ------------------------------- |
| interface        | PascalCase  | `UserProfile`, `ApiResponse`    |
| type alias       | PascalCase  | `UserId`, `ResponseStatus`      |
| class            | PascalCase  | `UserService`, `HttpClient`     |
| function         | camelCase   | `getUser`, `formatDate`         |
| variable         | camelCase   | `userName`, `isValid`           |
| constant         | UPPER_SNAKE | `MAX_RETRIES`, `API_BASE_URL`   |
| enum             | PascalCase  | `UserRole`, `HttpStatus`        |
| enum member      | PascalCase  | `UserRole.Admin`                |
| generic type     | T, K, V等   | `Array<T>`, `Map<K, V>`         |
| private property | \_prefix    | `_internalState` (非推奨: #使用) |

### ファイル命名

```
user.service.ts      # サービス
user.model.ts        # モデル/型定義
user.controller.ts   # コントローラー
user.test.ts         # テスト
user.utils.ts        # ユーティリティ
```

---

## 高度な型機能

### Mapped Types

```typescript
// 全プロパティをオプショナルに
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// 全プロパティをReadonlyに
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// カスタム: 特定のキーのみ必須
type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;
```

### Template Literal Types

```typescript
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type ApiEndpoint = `/api/${string}`;

type ApiRoute = `${HttpMethod} ${ApiEndpoint}`;
// "GET /api/users" | "POST /api/users" | ...
```

### Conditional Types

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// 配列の要素型を取得
type ArrayElement<T> = T extends (infer E)[] ? E : never;
```

### const assertion

```typescript
// Bad: 型が広がる
const config = {
  endpoint: "/api",
  timeout: 5000,
};
// { endpoint: string; timeout: number }

// Good: リテラル型として推論
const config = {
  endpoint: "/api",
  timeout: 5000,
} as const;
// { readonly endpoint: "/api"; readonly timeout: 5000 }
```

### satisfies演算子

型チェックしつつ、推論された型を保持:

```typescript
type Colors = "red" | "green" | "blue";

// as constだけでは型チェックされない
const palette = {
  red: "#ff0000",
  green: "#00ff00",
  blue: "#0000ff",
} satisfies Record<Colors, string>;

// palette.red は "#ff0000" 型（stringではない）
```
