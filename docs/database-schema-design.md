# Database Schema Design

Component Vistaで管理するデザインシステム・コンポーネント情報のDBスキーマ設計書。

## 参考資料

- [The Component Gallery](https://component.gallery) - 海外のデザインシステムを俯瞰できるサイト

## 設計時の考慮事項

### 主要なクエリパターン

1. **コンポーネント一覧** - 実装例の数でソート可能
2. **デザインシステム一覧** - 技術スタック・フィーチャーでフィルタ
3. **特定コンポーネントの全実装例** - 各デザインシステムでの実装を横断表示
4. **特定デザインシステムの全コンポーネント** - 1つのデザインシステムの詳細表示

### 設計原則

| 原則 | 適用内容 |
|:-----|:---------|
| 正規化 | 第3正規形を基本とし、企業情報を別テーブルに分離 |
| ソフトデリート | `deleted_at` による論理削除でデータ復旧可能に |
| 公開状態管理 | `is_published` フラグで下書き/公開を制御 |
| 監査証跡 | `created_at`, `updated_at` を全テーブルに付与 |

---

## エンティティ定義

### `companies` - 企業・組織

デザインシステムを公開している企業・組織の情報。

| カラム | 型 | NULL | 説明 |
|:-------|:---|:-----|:-----|
| id | UUID | NO | 主キー |
| slug | VARCHAR(100) | NO | URL用スラッグ（UNIQUE） |
| name | VARCHAR(255) | NO | 企業名 |
| website_url | VARCHAR(500) | YES | 企業サイトURL |
| logo_url | VARCHAR(500) | YES | ロゴ画像URL |
| industry | VARCHAR(100) | YES | 業種（金融、EC、メディア等） |
| created_at | TIMESTAMP | NO | 作成日時 |
| updated_at | TIMESTAMP | NO | 更新日時 |
| deleted_at | TIMESTAMP | YES | 削除日時（ソフトデリート） |

**インデックス**: `slug` (UNIQUE)

---

### `design_systems` - デザインシステム

| カラム | 型 | NULL | 説明 |
|:-------|:---|:-----|:-----|
| id | UUID | NO | 主キー |
| company_id | UUID (FK) | YES | 企業への参照（個人開発の場合NULL） |
| slug | VARCHAR(100) | NO | URL用スラッグ（UNIQUE） |
| name | VARCHAR(255) | NO | デザインシステム名 |
| description | TEXT | YES | 説明文 |
| website_url | VARCHAR(500) | YES | 公式サイトURL |
| logo_url | VARCHAR(500) | YES | ロゴ画像URL |
| is_published | BOOLEAN | NO | 公開状態（DEFAULT: false） |
| published_at | TIMESTAMP | YES | 公開日時 |
| sort_order | INTEGER | NO | 表示順（DEFAULT: 0） |
| created_at | TIMESTAMP | NO | 作成日時 |
| updated_at | TIMESTAMP | NO | 更新日時 |
| deleted_at | TIMESTAMP | YES | 削除日時（ソフトデリート） |

**インデックス**: `slug` (UNIQUE), `company_id`, `is_published`

---

### `components` - コンポーネント（共通定義）

UIコンポーネントの共通定義（Button, Accordion等）。

| カラム | 型 | NULL | 説明 |
|:-------|:---|:-----|:-----|
| id | UUID | NO | 主キー |
| slug | VARCHAR(100) | NO | URL用スラッグ（UNIQUE） |
| name | VARCHAR(255) | NO | コンポーネント名 |
| description | TEXT | YES | コンポーネントの説明 |
| is_published | BOOLEAN | NO | 公開状態（DEFAULT: false） |
| sort_order | INTEGER | NO | 表示順（DEFAULT: 0） |
| created_at | TIMESTAMP | NO | 作成日時 |
| updated_at | TIMESTAMP | NO | 更新日時 |
| deleted_at | TIMESTAMP | YES | 削除日時（ソフトデリート） |

**インデックス**: `slug` (UNIQUE), `is_published`

---

### `component_aliases` - コンポーネント別名

同じUIパターンの別名（Accordion = Collapse, Collapsible等）。

| カラム | 型 | NULL | 説明 |
|:-------|:---|:-----|:-----|
| id | UUID | NO | 主キー |
| component_id | UUID (FK) | NO | componentsへの参照 |
| alias_name | VARCHAR(255) | NO | 別名 |
| created_at | TIMESTAMP | NO | 作成日時 |

**インデックス**: `component_id`

---

### `component_examples` - 実装例

各デザインシステムにおけるコンポーネントの実装例。

| カラム | 型 | NULL | 説明 |
|:-------|:---|:-----|:-----|
| id | UUID | NO | 主キー |
| design_system_id | UUID (FK) | NO | design_systemsへの参照 |
| component_id | UUID (FK) | NO | componentsへの参照 |
| name | VARCHAR(255) | YES | デザインシステム側での名称 |
| url | VARCHAR(500) | YES | ドキュメントURL |
| screenshot_url | VARCHAR(500) | YES | スクリーンショットURL |
| description | TEXT | YES | 説明・備考 |
| is_published | BOOLEAN | NO | 公開状態（DEFAULT: false） |
| created_at | TIMESTAMP | NO | 作成日時 |
| updated_at | TIMESTAMP | NO | 更新日時 |
| deleted_at | TIMESTAMP | YES | 削除日時（ソフトデリート） |

**インデックス**: `design_system_id`, `component_id`, `(design_system_id, component_id)` (UNIQUE)

---

### `technologies` - 技術スタック

| カラム | 型 | NULL | 説明 |
|:-------|:---|:-----|:-----|
| id | UUID | NO | 主キー |
| slug | VARCHAR(100) | NO | スラッグ（UNIQUE） |
| name | VARCHAR(255) | NO | 技術名（React, Vue, Sass等） |
| sort_order | INTEGER | NO | 表示順（DEFAULT: 0） |
| created_at | TIMESTAMP | NO | 作成日時 |
| updated_at | TIMESTAMP | NO | 更新日時 |

**インデックス**: `slug` (UNIQUE)

---

### `features` - 機能・特徴

| カラム | 型 | NULL | 説明 |
|:-------|:---|:-----|:-----|
| id | UUID | NO | 主キー |
| slug | VARCHAR(100) | NO | スラッグ（UNIQUE） |
| name | VARCHAR(255) | NO | 特徴名（Code examples, Open source等） |
| sort_order | INTEGER | NO | 表示順（DEFAULT: 0） |
| created_at | TIMESTAMP | NO | 作成日時 |
| updated_at | TIMESTAMP | NO | 更新日時 |

**インデックス**: `slug` (UNIQUE)

---

### `platforms` - プラットフォーム

| カラム | 型 | NULL | 説明 |
|:-------|:---|:-----|:-----|
| id | UUID | NO | 主キー |
| slug | VARCHAR(100) | NO | スラッグ（UNIQUE） |
| name | VARCHAR(255) | NO | プラットフォーム名（GitHub, Figma等） |
| icon_url | VARCHAR(500) | YES | アイコンURL |
| sort_order | INTEGER | NO | 表示順（DEFAULT: 0） |
| created_at | TIMESTAMP | NO | 作成日時 |
| updated_at | TIMESTAMP | NO | 更新日時 |

**インデックス**: `slug` (UNIQUE)

---

## 関連テーブル（多対多）

### `design_system_technologies`

| カラム | 型 | 説明 |
|:-------|:---|:-----|
| design_system_id | UUID (FK) | design_systemsへの参照 |
| technology_id | UUID (FK) | technologiesへの参照 |

**主キー**: `(design_system_id, technology_id)`

---

### `design_system_features`

| カラム | 型 | 説明 |
|:-------|:---|:-----|
| design_system_id | UUID (FK) | design_systemsへの参照 |
| feature_id | UUID (FK) | featuresへの参照 |

**主キー**: `(design_system_id, feature_id)`

---

### `design_system_platforms`

| カラム | 型 | 説明 |
|:-------|:---|:-----|
| design_system_id | UUID (FK) | design_systemsへの参照 |
| platform_id | UUID (FK) | platformsへの参照 |
| url | VARCHAR(500) | 当該プラットフォームへのリンクURL |

**主キー**: `(design_system_id, platform_id)`

---

### `component_example_features`

| カラム | 型 | 説明 |
|:-------|:---|:-----|
| component_example_id | UUID (FK) | component_examplesへの参照 |
| feature_id | UUID (FK) | featuresへの参照 |

**主キー**: `(component_example_id, feature_id)`

---

## ER図

```
┌────────────┐
│ companies  │
└─────┬──────┘
      │ 1:N
      ▼
┌─────────────────┐      ┌──────────────────┐
│  design_systems │──M:N─│   technologies   │
└────────┬────────┘      └──────────────────┘
         │
         │──M:N──────────┬──────────────────┐
         │               │     features     │
         │               └──────────────────┘
         │
         │──M:N──────────┬──────────────────┐
         │               │    platforms     │
         │               └──────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────────┐      ┌─────────────┐
│  component_examples │──M:1─│ components  │
└─────────┬───────────┘      └──────┬──────┘
          │                         │ 1:N
          │──M:N─── features        ▼
                              ┌───────────────────┐
                              │ component_aliases │
                              └───────────────────┘
```

---

## 代表的なクエリ例

### 特定コンポーネントの全実装例を取得

```sql
SELECT
  ce.id,
  ce.name AS example_name,
  ce.url,
  ce.screenshot_url,
  ds.name AS design_system_name,
  ds.logo_url,
  c.name AS company_name
FROM component_examples ce
JOIN design_systems ds ON ce.design_system_id = ds.id
LEFT JOIN companies c ON ds.company_id = c.id
WHERE ce.component_id = :component_id
  AND ce.is_published = true
  AND ce.deleted_at IS NULL
  AND ds.is_published = true
  AND ds.deleted_at IS NULL
ORDER BY ds.name;
```

### デザインシステム一覧（技術スタックでフィルタ）

```sql
SELECT DISTINCT
  ds.id,
  ds.name,
  ds.logo_url,
  c.name AS company_name
FROM design_systems ds
LEFT JOIN companies c ON ds.company_id = c.id
JOIN design_system_technologies dst ON ds.id = dst.design_system_id
JOIN technologies t ON dst.technology_id = t.id
WHERE t.slug IN ('react', 'vue')
  AND ds.is_published = true
  AND ds.deleted_at IS NULL
ORDER BY ds.sort_order, ds.name;
```

---

## 自己レビュー履歴

### 第1回レビュー: 正規化と基本構造

**観点**: 正規形、データの整合性、重複排除

| チェック項目 | 結果 | 対応 |
|:------------|:-----|:-----|
| 第3正規形 | NG | `company_name` を `companies` テーブルに分離 |

### 第2回レビュー: クエリパフォーマンスと運用性

**観点**: インデックス設計、管理画面の実用性

| チェック項目 | 結果 | 対応 |
|:------------|:-----|:-----|
| 管理用フラグ | NG | `is_published`, `deleted_at` を追加 |
| ソート制御 | NG | `sort_order` カラムを追加 |
| FK列インデックス | NG | 明示的にインデックスを定義 |

### 第3回レビュー: 日本向け要件と拡張性

**観点**: 差別化要素、将来の拡張性

| チェック項目 | 結果 | 対応 |
|:------------|:-----|:-----|
| 企業情報の充実 | NG | `companies.industry` カラムを追加 |
| 多言語対応 | 保留 | 当面は1言語で運用、必要時にテーブル分離 |

---

## 設計上のポイント

### 1. `component_examples` を中心とした設計

このテーブルが `design_systems` と `components` の両方への外部キーを持つことで、以下のクエリがシンプルになる:
- 「あるコンポーネントの各デザインシステムでの実装例」→ 1回のJOIN
- 「あるデザインシステムの全コンポーネント」→ 1回のJOIN

### 2. マスタデータの正規化

`technologies`, `features`, `platforms` を独立したマスタテーブルとして持つことで:
- 表記ゆれを防止
- フィルタUIの選択肢を一元管理
- 将来的なアイコン追加等の拡張が容易

### 3. ソフトデリートの採用

管理画面での誤削除対応として `deleted_at` を採用。クエリ時は `WHERE deleted_at IS NULL` で除外。

### 4. `companies` テーブルの分離

同一企業が複数のデザインシステムを公開するケースに対応。また `industry` カラムにより「金融系」「EC系」等のフィルタ機能を実現可能。

---

## 今後の拡張候補

- タグ機能（自由なラベル付け）
- ユーザー認証とブックマーク機能
- コンポーネントのカテゴリ分類（Form Controls, Navigation等）
- 多言語対応（description の国際化）
