CREATE TABLE `locations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`location_type` text,
	`latitude` real,
	`longitude` real,
	`address` text,
	`notes` text,
	`created_by` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `purchase_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`shopping_item_id` integer,
	`location_id` integer,
	`item_name` text NOT NULL,
	`price` real,
	`purchased_at` text,
	`found_easily` integer,
	`notes` text,
	FOREIGN KEY (`shopping_item_id`) REFERENCES `shopping_items`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `recipe_tag_links` (
	`recipe_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `recipe_tags`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `recipe_tag_links_recipe_id_tag_id_unique` ON `recipe_tag_links` (`recipe_id`,`tag_id`);--> statement-breakpoint
CREATE TABLE `recipe_tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`type` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `recipe_translations` (
	`recipe_id` integer NOT NULL,
	`language` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `recipe_translations_recipe_id_language_unique` ON `recipe_translations` (`recipe_id`,`language`);--> statement-breakpoint
CREATE TABLE `recipes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`creator_id` integer,
	`description` text,
	`servings` integer,
	`prep_time_minutes` integer,
	`cook_time_minutes` integer,
	`kitchen_requirements` text,
	`equipment_needed` text,
	`is_public` integer,
	`default_language` text,
	`instructions` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`creator_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `shopping_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`list_id` integer,
	`item_name` text NOT NULL,
	`quantity` real,
	`unit` text,
	`purchased` integer,
	`purchased_by` integer,
	`purchased_at` text,
	`estimated_cost` real,
	`actual_cost` real,
	`notes` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`list_id`) REFERENCES `shopping_lists`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`purchased_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `shopping_lists` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`trip_id` integer,
	`name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `store_inventory_history` (
	`location_id` integer NOT NULL,
	`ingredient_name` text NOT NULL,
	`availability_score` real,
	`min_price` real,
	`max_price` real,
	`last_seen_at` text,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `store_inventory_history_location_id_ingredient_name_unique` ON `store_inventory_history` (`location_id`,`ingredient_name`);--> statement-breakpoint
CREATE TABLE `sync_queue` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`entity_type` text NOT NULL,
	`entity_id` integer,
	`action` text NOT NULL,
	`data` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`processed_at` text,
	`status` text,
	`retry_count` integer DEFAULT 0,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `trip_members` (
	`trip_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`role` text,
	`joined_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `trip_members_trip_id_user_id_unique` ON `trip_members` (`trip_id`,`user_id`);--> statement-breakpoint
CREATE TABLE `trips` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`creator_id` integer NOT NULL,
	`start_date` text,
	`end_date` text,
	`location_name` text,
	`location_lat` real,
	`location_lng` real,
	`trip_type` text,
	`climber_count` integer,
	`kitchen_type` text,
	`notes` text,
	`expense_config` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`sync_version` integer DEFAULT 1,
	FOREIGN KEY (`creator_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_favorite_locations` (
	`user_id` integer NOT NULL,
	`location_id` integer NOT NULL,
	`notes` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_favorite_locations_user_id_location_id_unique` ON `user_favorite_locations` (`user_id`,`location_id`);--> statement-breakpoint
DROP TABLE `guestBook`;--> statement-breakpoint
ALTER TABLE `users` ADD `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `profile_photo_url` text;--> statement-breakpoint
ALTER TABLE `users` ADD `bio` text;--> statement-breakpoint
ALTER TABLE `users` ADD `default_language` text;--> statement-breakpoint
ALTER TABLE `users` ADD `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `last_sync_at` text DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `users` ADD `preferences` text;--> statement-breakpoint
ALTER TABLE `users` ADD `metadata` text;
