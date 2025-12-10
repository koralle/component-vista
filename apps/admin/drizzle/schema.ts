import { sql } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

// =============================================================================
// マスタテーブル
// =============================================================================

/**
 * companies - 企業・組織
 * デザインシステムを公開している企業・組織の情報
 */
export const companies = sqliteTable(
  "companies",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    websiteUrl: text("website_url"),
    logoUrl: text("logo_url"),
    industry: text("industry"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
    deletedAt: integer("deleted_at", { mode: "timestamp" }),
  },
  (table) => [uniqueIndex("companies_slug_idx").on(table.slug)],
);

/**
 * design_systems - デザインシステム
 */
export const designSystems = sqliteTable(
  "design_systems",
  {
    id: text("id").primaryKey(),
    companyId: text("company_id").references(() => companies.id, {
      onDelete: "set null",
    }),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    description: text("description"),
    websiteUrl: text("website_url"),
    logoUrl: text("logo_url"),
    isPublished: integer("is_published", { mode: "boolean" }).notNull().default(false),
    publishedAt: integer("published_at", { mode: "timestamp" }),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
    deletedAt: integer("deleted_at", { mode: "timestamp" }),
  },
  (table) => [
    uniqueIndex("design_systems_slug_idx").on(table.slug),
    index("design_systems_company_id_idx").on(table.companyId),
    index("design_systems_is_published_idx").on(table.isPublished),
  ],
);

/**
 * components - コンポーネント（共通定義）
 * UIコンポーネントの共通定義（Button, Accordion等）
 */
export const components = sqliteTable(
  "components",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    description: text("description"),
    isPublished: integer("is_published", { mode: "boolean" }).notNull().default(false),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
    deletedAt: integer("deleted_at", { mode: "timestamp" }),
  },
  (table) => [
    uniqueIndex("components_slug_idx").on(table.slug),
    index("components_is_published_idx").on(table.isPublished),
  ],
);

/**
 * component_aliases - コンポーネント別名
 * 同じUIパターンの別名（Accordion = Collapse, Collapsible等）
 */
export const componentAliases = sqliteTable(
  "component_aliases",
  {
    id: text("id").primaryKey(),
    componentId: text("component_id")
      .notNull()
      .references(() => components.id, { onDelete: "cascade" }),
    aliasName: text("alias_name").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  },
  (table) => [index("component_aliases_component_id_idx").on(table.componentId)],
);

/**
 * component_examples - 実装例
 * 各デザインシステムにおけるコンポーネントの実装例
 */
export const componentExamples = sqliteTable(
  "component_examples",
  {
    id: text("id").primaryKey(),
    designSystemId: text("design_system_id")
      .notNull()
      .references(() => designSystems.id, { onDelete: "cascade" }),
    componentId: text("component_id")
      .notNull()
      .references(() => components.id, { onDelete: "cascade" }),
    name: text("name"),
    url: text("url"),
    screenshotUrl: text("screenshot_url"),
    description: text("description"),
    isPublished: integer("is_published", { mode: "boolean" }).notNull().default(false),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
    deletedAt: integer("deleted_at", { mode: "timestamp" }),
  },
  (table) => [
    index("component_examples_design_system_id_idx").on(table.designSystemId),
    index("component_examples_component_id_idx").on(table.componentId),
    uniqueIndex("component_examples_design_system_component_idx").on(
      table.designSystemId,
      table.componentId,
    ),
  ],
);

/**
 * technologies - 技術スタック
 */
export const technologies = sqliteTable(
  "technologies",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  },
  (table) => [uniqueIndex("technologies_slug_idx").on(table.slug)],
);

/**
 * features - 機能・特徴
 */
export const features = sqliteTable(
  "features",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  },
  (table) => [uniqueIndex("features_slug_idx").on(table.slug)],
);

/**
 * platforms - プラットフォーム
 */
export const platforms = sqliteTable(
  "platforms",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    iconUrl: text("icon_url"),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  },
  (table) => [uniqueIndex("platforms_slug_idx").on(table.slug)],
);

// =============================================================================
// 関連テーブル（多対多）
// =============================================================================

/**
 * design_system_technologies - デザインシステムと技術スタックの関連
 */
export const designSystemTechnologies = sqliteTable(
  "design_system_technologies",
  {
    designSystemId: text("design_system_id")
      .notNull()
      .references(() => designSystems.id, { onDelete: "cascade" }),
    technologyId: text("technology_id")
      .notNull()
      .references(() => technologies.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.designSystemId, table.technologyId] })],
);

/**
 * design_system_features - デザインシステムと機能の関連
 */
export const designSystemFeatures = sqliteTable(
  "design_system_features",
  {
    designSystemId: text("design_system_id")
      .notNull()
      .references(() => designSystems.id, { onDelete: "cascade" }),
    featureId: text("feature_id")
      .notNull()
      .references(() => features.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.designSystemId, table.featureId] })],
);

/**
 * design_system_platforms - デザインシステムとプラットフォームの関連
 */
export const designSystemPlatforms = sqliteTable(
  "design_system_platforms",
  {
    designSystemId: text("design_system_id")
      .notNull()
      .references(() => designSystems.id, { onDelete: "cascade" }),
    platformId: text("platform_id")
      .notNull()
      .references(() => platforms.id, { onDelete: "cascade" }),
    url: text("url"),
  },
  (table) => [primaryKey({ columns: [table.designSystemId, table.platformId] })],
);

/**
 * component_example_features - 実装例と機能の関連
 */
export const componentExampleFeatures = sqliteTable(
  "component_example_features",
  {
    componentExampleId: text("component_example_id")
      .notNull()
      .references(() => componentExamples.id, { onDelete: "cascade" }),
    featureId: text("feature_id")
      .notNull()
      .references(() => features.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.componentExampleId, table.featureId] })],
);

// =============================================================================
// 型エクスポート
// =============================================================================

export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;

export type DesignSystem = typeof designSystems.$inferSelect;
export type NewDesignSystem = typeof designSystems.$inferInsert;

export type Component = typeof components.$inferSelect;
export type NewComponent = typeof components.$inferInsert;

export type ComponentAlias = typeof componentAliases.$inferSelect;
export type NewComponentAlias = typeof componentAliases.$inferInsert;

export type ComponentExample = typeof componentExamples.$inferSelect;
export type NewComponentExample = typeof componentExamples.$inferInsert;

export type Technology = typeof technologies.$inferSelect;
export type NewTechnology = typeof technologies.$inferInsert;

export type Feature = typeof features.$inferSelect;
export type NewFeature = typeof features.$inferInsert;

export type Platform = typeof platforms.$inferSelect;
export type NewPlatform = typeof platforms.$inferInsert;
