# Performance Guide

## Table of Contents

1. [型定義の最適化](#型定義の最適化)
2. [tsconfig.json設定](#tsconfigjson設定)
3. [プロジェクト構造](#プロジェクト構造)
4. [診断ツール](#診断ツール)

---

## 型定義の最適化

### Interface vs Intersection Type

`interface`は単一のフラットなオブジェクト型を作成し、プロパティの衝突を検出する。
`intersection type`は性能が低下する。

```typescript
// Bad: Intersection type
type Combined = TypeA & TypeB & TypeC;

// Good: Interface with extends
interface Combined extends TypeA, TypeB, TypeC {}
```

### 戻り値の型注釈

関数の戻り値型を明示的に指定することで、コンパイラの推論処理を削減:

```typescript
// Bad: 推論任せ
function getUser(id: number) {
  return { id, name: "user", createdAt: new Date() };
}

// Good: 明示的な戻り値型
interface User {
  id: number;
  name: string;
  createdAt: Date;
}

function getUser(id: number): User {
  return { id, name: "user", createdAt: new Date() };
}
```

### Union型の最小化

Union型の要素数が増えると比較処理が増加:

```typescript
// Bad: 多数のリテラル型
type Status =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled"
  | "archived";

// Good: 基底型を定義
interface BaseStatus {
  code: string;
  label: string;
}

interface PendingStatus extends BaseStatus {
  code: "pending";
}

interface CompletedStatus extends BaseStatus {
  code: "completed";
  completedAt: Date;
}

type Status = PendingStatus | CompletedStatus;
```

### 複雑な型の命名

条件付き型などの複雑な型は型エイリアスで抽出:

```typescript
// Bad: インラインの複雑な型
function process<T>(
  data: T extends Array<infer U> ? U : T
): T extends Array<infer U> ? U : T {
  // ...
}

// Good: 型エイリアスで抽出
type Unwrap<T> = T extends Array<infer U> ? U : T;

function process<T>(data: Unwrap<T>): Unwrap<T> {
  // ...
}
```

---

## tsconfig.json設定

### ファイル指定の最適化

```json
{
  "compilerOptions": {
    // ...
  },
  "include": ["src"],
  "exclude": ["**/node_modules", "**/dist", "**/.*", "**/*.test.ts"]
}
```

### @typesの制御

不要な型定義の読み込みを防ぐ:

```json
{
  "compilerOptions": {
    "types": ["node", "jest"]
  }
}
```

空配列で自動読み込みを完全に無効化:

```json
{
  "compilerOptions": {
    "types": []
  }
}
```

### インクリメンタルビルド

`.tsbuildinfo`ファイルを生成し、変更ファイルのみ再チェック:

```json
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./dist/.tsbuildinfo"
  }
}
```

### ライブラリチェックのスキップ

`.d.ts`ファイルの検証を省略:

```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

### 推奨設定まとめ

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "incremental": true,
    "skipLibCheck": true,
    "noEmit": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

---

## プロジェクト構造

### プロジェクト参照

大規模コードベースは5〜20個の独立したプロジェクトに分割:

```
project/
├── tsconfig.json          # ルート設定
├── packages/
│   ├── core/
│   │   ├── tsconfig.json  # references設定
│   │   └── src/
│   ├── ui/
│   │   ├── tsconfig.json
│   │   └── src/
│   └── api/
│       ├── tsconfig.json
│       └── src/
```

ルートtsconfig.json:

```json
{
  "files": [],
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/ui" },
    { "path": "./packages/api" }
  ]
}
```

各パッケージのtsconfig.json:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "references": [{ "path": "../core" }]
}
```

ビルドコマンド:

```bash
tsc --build
```

---

## 診断ツール

### パフォーマンス分析

```bash
# 詳細な診断情報
tsc --extendedDiagnostics

# モジュール解決のトレース
tsc --traceResolution

# パフォーマンストレース生成
tsc --generateTrace ./trace
```

### 主要メトリクス

`--extendedDiagnostics`で確認できる項目:

- **Parse time**: ファイル解析時間
- **Bind time**: シンボルバインド時間
- **Check time**: 型チェック時間
- **Emit time**: 出力生成時間
- **Total time**: 合計時間

### Chrome DevToolsでの分析

```bash
tsc --generateTrace ./trace
```

生成された`trace.json`を`chrome://tracing`で開いて詳細分析。
