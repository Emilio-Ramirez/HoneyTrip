PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`profile_photo_url` text,
	`bio` text,
	`default_language` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`last_sync_at` text DEFAULT CURRENT_TIMESTAMP,
	`preferences` text,
	`metadata` text
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "email", "name", "profile_photo_url", "bio", "default_language", "created_at", "updated_at", "last_sync_at", "preferences", "metadata") SELECT "id", "email", "name", "profile_photo_url", "bio", "default_language", "created_at", "updated_at", "last_sync_at", "preferences", "metadata" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_name_unique` ON `users` (`name`);