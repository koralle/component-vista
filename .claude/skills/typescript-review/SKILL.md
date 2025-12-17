---
name: typescript-review
description: TypeScriptコードのレビューと品質改善。TypeScriptのコードレビュー、型安全性の確認、パフォーマンス最適化、ベストプラクティスのチェックが必要な場合に使用する。トリガー: (1) TypeScriptコードのレビュー依頼 (2) 型の改善提案 (3) パフォーマンス最適化の確認 (4) コーディング規約のチェック (5) .ts/.tsxファイルの品質評価
---

# TypeScript Review

TypeScriptコードをレビューし、型安全性・パフォーマンス・保守性の観点から改善点を指摘する。

## Review Workflow

```
1. Critical Issues (型安全性)
   ├── any型の使用
   ├── 型アサーション(as)の乱用
   ├── strictモードの無効化
   └── null/undefinedの未処理

2. Performance Issues
   ├── intersection型 vs interface
   ├── 過剰なUnion型
   └── 不要な型計算

3. Code Quality
   ├── 命名規則
   ├── モジュール設計
   └── 非同期処理パターン
```

## Review Checklist

### Critical (Must Fix)

| Issue | Bad | Good |
|-------|-----|------|
| any型 | `data: any` | `data: unknown` or 具体的な型 |
| 型アサーション | `value as string` | Type Guard使用 |
| null未処理 | `obj.prop` | `obj?.prop` or null check |

### Performance

| Issue | Bad | Good |
|-------|-----|------|
| 型の結合 | `type A = B & C & D` | `interface A extends B, C, D {}` |
| Union型肥大 | `type Status = "a" \| "b" \| ... \| "z"` | 基底型 + extends |

### Code Quality

| Issue | Bad | Good |
|-------|-----|------|
| 型のみのimport | `import { Type }` | `import type { Type }` |
| 不明確な戻り値 | 推論任せ | 明示的な戻り値型 |

## References

詳細なガイドラインは以下を参照:

- **型安全性**: [references/type-safety.md](references/type-safety.md) - any回避、strict mode、Type Guard
- **パフォーマンス**: [references/performance.md](references/performance.md) - 型定義の最適化、tsconfig設定
- **コードパターン**: [references/code-patterns.md](references/code-patterns.md) - 非同期処理、モジュール設計
