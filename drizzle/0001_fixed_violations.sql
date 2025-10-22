CREATE TABLE `adresses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`town` integer NOT NULL,
	`street` text NOT NULL,
	`number` text NOT NULL,
	`floor` text NOT NULL,
	`door` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `persons` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`surname` text NOT NULL,
	`gender` text NOT NULL,
	`cpr` text NOT NULL,
	`phone` text NOT NULL,
	`birthdate` integer NOT NULL
);
