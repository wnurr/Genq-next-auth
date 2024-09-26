import { relations } from "drizzle-orm/relations";
import { user, twoFactorConfirmation, account } from "./schema";

export const twoFactorConfirmationRelations = relations(twoFactorConfirmation, ({one}) => ({
	user: one(user, {
		fields: [twoFactorConfirmation.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	twoFactorConfirmations: many(twoFactorConfirmation),
	accounts: many(account),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));