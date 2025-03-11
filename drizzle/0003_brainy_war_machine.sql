CREATE UNIQUE INDEX `users_name_unique` ON `users` (`name`);--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `password`;