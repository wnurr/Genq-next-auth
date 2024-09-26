import { pgTable, varchar, timestamp, text, integer, uniqueIndex, boolean, foreignKey, primaryKey, pgEnum } from "drizzle-orm/pg-core"

export const userRole = pgEnum("UserRole", ['ADMIN', 'USER'])

export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar("id", { length: 36 }).primaryKey().notNull(),
	checksum: varchar("checksum", { length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text("logs"),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const verificationToken = pgTable("VerificationToken", {
	id: text("id").primaryKey().notNull(),
	email: text("email").notNull(),
	token: text("token").notNull(),
	expires: timestamp("expires", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		emailTokenKey: uniqueIndex("VerificationToken_email_token_key").using("btree", table.email.asc().nullsLast(), table.token.asc().nullsLast()),
		tokenKey: uniqueIndex("VerificationToken_token_key").using("btree", table.token.asc().nullsLast()),
	}
});

export const passwordResetToken = pgTable("PasswordResetToken", {
	id: text("id").primaryKey().notNull(),
	email: text("email").notNull(),
	token: text("token").notNull(),
	expires: timestamp("expires", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		emailTokenKey: uniqueIndex("PasswordResetToken_email_token_key").using("btree", table.email.asc().nullsLast(), table.token.asc().nullsLast()),
		tokenKey: uniqueIndex("PasswordResetToken_token_key").using("btree", table.token.asc().nullsLast()),
	}
});

export const twoFactorToken = pgTable("TwoFactorToken", {
	id: text("id").primaryKey().notNull(),
	email: text("email").notNull(),
	token: text("token").notNull(),
	expires: timestamp("expires", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		emailTokenKey: uniqueIndex("TwoFactorToken_email_token_key").using("btree", table.email.asc().nullsLast(), table.token.asc().nullsLast()),
		tokenKey: uniqueIndex("TwoFactorToken_token_key").using("btree", table.token.asc().nullsLast()),
	}
});

export const user = pgTable("User", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { precision: 3, mode: 'string' }),
	image: text("image"),
	password: text("password"),
	role: userRole("role").default('USER').notNull(),
	isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false).notNull(),
},
(table) => {
	return {
		emailKey: uniqueIndex("User_email_key").using("btree", table.email.asc().nullsLast()),
	}
});

export const twoFactorConfirmation = pgTable("TwoFactorConfirmation", {
	id: text("id").primaryKey().notNull(),
	userId: text("userId").notNull(),
},
(table) => {
	return {
		userIdKey: uniqueIndex("TwoFactorConfirmation_userId_key").using("btree", table.userId.asc().nullsLast()),
		twoFactorConfirmationUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "TwoFactorConfirmation_userId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const account = pgTable("Account", {
	userId: text("userId").notNull(),
	type: text("type").notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("providerAccountId").notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text("scope"),
	idToken: text("id_token"),
	sessionState: text("session_state"),
},
(table) => {
	return {
		accountUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "Account_userId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
		accountPkey: primaryKey({ columns: [table.provider, table.providerAccountId], name: "Account_pkey"}),
	}
});