CREATE TABLE `companies` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`website_url` text,
	`logo_url` text,
	`industry` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`deleted_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `companies_slug_unique` ON `companies` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `companies_slug_idx` ON `companies` (`slug`);--> statement-breakpoint
CREATE TABLE `component_aliases` (
	`id` text PRIMARY KEY NOT NULL,
	`component_id` text NOT NULL,
	`alias_name` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`component_id`) REFERENCES `components`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `component_aliases_component_id_idx` ON `component_aliases` (`component_id`);--> statement-breakpoint
CREATE TABLE `component_example_features` (
	`component_example_id` text NOT NULL,
	`feature_id` text NOT NULL,
	PRIMARY KEY(`component_example_id`, `feature_id`),
	FOREIGN KEY (`component_example_id`) REFERENCES `component_examples`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`feature_id`) REFERENCES `features`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `component_examples` (
	`id` text PRIMARY KEY NOT NULL,
	`design_system_id` text NOT NULL,
	`component_id` text NOT NULL,
	`name` text,
	`url` text,
	`screenshot_url` text,
	`description` text,
	`is_published` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`deleted_at` integer,
	FOREIGN KEY (`design_system_id`) REFERENCES `design_systems`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`component_id`) REFERENCES `components`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `component_examples_design_system_id_idx` ON `component_examples` (`design_system_id`);--> statement-breakpoint
CREATE INDEX `component_examples_component_id_idx` ON `component_examples` (`component_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `component_examples_design_system_component_idx` ON `component_examples` (`design_system_id`,`component_id`);--> statement-breakpoint
CREATE TABLE `components` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`is_published` integer DEFAULT false NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`deleted_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `components_slug_unique` ON `components` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `components_slug_idx` ON `components` (`slug`);--> statement-breakpoint
CREATE INDEX `components_is_published_idx` ON `components` (`is_published`);--> statement-breakpoint
CREATE TABLE `design_system_features` (
	`design_system_id` text NOT NULL,
	`feature_id` text NOT NULL,
	PRIMARY KEY(`design_system_id`, `feature_id`),
	FOREIGN KEY (`design_system_id`) REFERENCES `design_systems`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`feature_id`) REFERENCES `features`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `design_system_platforms` (
	`design_system_id` text NOT NULL,
	`platform_id` text NOT NULL,
	`url` text,
	PRIMARY KEY(`design_system_id`, `platform_id`),
	FOREIGN KEY (`design_system_id`) REFERENCES `design_systems`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`platform_id`) REFERENCES `platforms`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `design_system_technologies` (
	`design_system_id` text NOT NULL,
	`technology_id` text NOT NULL,
	PRIMARY KEY(`design_system_id`, `technology_id`),
	FOREIGN KEY (`design_system_id`) REFERENCES `design_systems`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`technology_id`) REFERENCES `technologies`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `design_systems` (
	`id` text PRIMARY KEY NOT NULL,
	`company_id` text,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`website_url` text,
	`logo_url` text,
	`is_published` integer DEFAULT false NOT NULL,
	`published_at` integer,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`deleted_at` integer,
	FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `design_systems_slug_unique` ON `design_systems` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `design_systems_slug_idx` ON `design_systems` (`slug`);--> statement-breakpoint
CREATE INDEX `design_systems_company_id_idx` ON `design_systems` (`company_id`);--> statement-breakpoint
CREATE INDEX `design_systems_is_published_idx` ON `design_systems` (`is_published`);--> statement-breakpoint
CREATE TABLE `features` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `features_slug_unique` ON `features` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `features_slug_idx` ON `features` (`slug`);--> statement-breakpoint
CREATE TABLE `platforms` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`icon_url` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `platforms_slug_unique` ON `platforms` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `platforms_slug_idx` ON `platforms` (`slug`);--> statement-breakpoint
CREATE TABLE `technologies` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `technologies_slug_unique` ON `technologies` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `technologies_slug_idx` ON `technologies` (`slug`);