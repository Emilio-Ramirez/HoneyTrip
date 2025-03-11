import {
  integer,
  sqliteTable,
  text,
  unique,
  real,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

// Users Management
export const users = sqliteTable("users", {
  id: integer().primaryKey({ autoIncrement: true }),
  appwrite_id: text().notNull(),
  email: text().notNull().unique(),
  name: text().notNull().unique(),
  profile_photo_url: text(),
  bio: text(),
  default_language: text(),
  created_at: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updated_at: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  last_sync_at: text().default(sql`CURRENT_TIMESTAMP`),
  preferences: text(), // JSON as text
  metadata: text(), // JSON as text
});

export const usersRelations = relations(users, ({ many }) => ({
  trips: many(trips),
  recipes: many(recipes),
  tripMembers: many(tripMembers),
  favoriteLocations: many(userFavoriteLocations),
  syncQueue: many(syncQueue),
  purchasedItems: many(shoppingItems, { relationName: "purchaser" }),
  createdLocations: many(locations, { relationName: "creator" }),
}));

export const userFavoriteLocations = sqliteTable(
  "user_favorite_locations",
  {
    user_id: integer()
      .notNull()
      .references(() => users.id),
    location_id: integer()
      .notNull()
      .references(() => locations.id),
    notes: text(),
    created_at: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),

    // Use SQLite's UNIQUE constraint to simulate a composite primary key
    // This will create a constraint that functions like a composite primary key
  },
  (table) => ({
    unq: unique().on(table.user_id, table.location_id),
  })
);

export const userFavoriteLocationsRelations = relations(
  userFavoriteLocations,
  ({ one }) => ({
    user: one(users, {
      fields: [userFavoriteLocations.user_id],
      references: [users.id],
    }),
    location: one(locations, {
      fields: [userFavoriteLocations.location_id],
      references: [locations.id],
    }),
  })
);

// Trip Management
export const trips = sqliteTable("trips", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  creator_id: integer()
    .notNull()
    .references(() => users.id),
  start_date: text(), // SQLite date as text
  end_date: text(), // SQLite date as text
  location_name: text(),
  location_lat: real(), // Coordinate as separate lat/lng
  location_lng: real(), // Coordinate as separate lat/lng
  trip_type: text(), // Enum as text
  climber_count: integer(),
  kitchen_type: text(),
  notes: text(),
  expense_config: text(), // JSON as text
  created_at: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updated_at: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  sync_version: integer().default(1),
});

export const tripsRelations = relations(trips, ({ one, many }) => ({
  creator: one(users, {
    fields: [trips.creator_id],
    references: [users.id],
  }),
  members: many(tripMembers),
  shoppingLists: many(shoppingLists),
  location: one(locations, {
    fields: [trips.location_name],
    references: [locations.name],
  }),
}));

export const tripMembers = sqliteTable(
  "trip_members",
  {
    trip_id: integer()
      .notNull()
      .references(() => trips.id),
    user_id: integer()
      .notNull()
      .references(() => users.id),
    role: text(),
    joined_at: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    unq: unique().on(table.trip_id, table.user_id),
  })
);

export const tripMembersRelations = relations(tripMembers, ({ one }) => ({
  trip: one(trips, {
    fields: [tripMembers.trip_id],
    references: [trips.id],
  }),
  user: one(users, {
    fields: [tripMembers.user_id],
    references: [users.id],
  }),
}));

// Recipe Management
export const recipes = sqliteTable("recipes", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  creator_id: integer().references(() => users.id),
  description: text(),
  servings: integer(),
  prep_time_minutes: integer(),
  cook_time_minutes: integer(),
  kitchen_requirements: text(), // Array as JSON text
  equipment_needed: text(), // Array as JSON text
  is_public: integer(), // Boolean as integer
  default_language: text(),
  instructions: text(), // JSON array as text
  created_at: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updated_at: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const recipesRelations = relations(recipes, ({ one, many }) => ({
  creator: one(users, {
    fields: [recipes.creator_id],
    references: [users.id],
  }),
  translations: many(recipeTranslations),
  tagLinks: many(recipeTagLinks),
}));

export const recipeTranslations = sqliteTable(
  "recipe_translations",
  {
    recipe_id: integer()
      .notNull()
      .references(() => recipes.id),
    language: text().notNull(),
    name: text().notNull(),
    description: text(),
  },
  (table) => ({
    unq: unique().on(table.recipe_id, table.language),
  })
);

export const recipeTranslationsRelations = relations(
  recipeTranslations,
  ({ one }) => ({
    recipe: one(recipes, {
      fields: [recipeTranslations.recipe_id],
      references: [recipes.id],
    }),
  })
);

export const recipeTags = sqliteTable("recipe_tags", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  type: text(),
  created_at: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const recipeTagsRelations = relations(recipeTags, ({ many }) => ({
  tagLinks: many(recipeTagLinks),
}));

export const recipeTagLinks = sqliteTable(
  "recipe_tag_links",
  {
    recipe_id: integer()
      .notNull()
      .references(() => recipes.id),
    tag_id: integer()
      .notNull()
      .references(() => recipeTags.id),
  },
  (table) => ({
    unq: unique().on(table.recipe_id, table.tag_id),
  })
);

export const recipeTagLinksRelations = relations(recipeTagLinks, ({ one }) => ({
  recipe: one(recipes, {
    fields: [recipeTagLinks.recipe_id],
    references: [recipes.id],
  }),
  tag: one(recipeTags, {
    fields: [recipeTagLinks.tag_id],
    references: [recipeTags.id],
  }),
}));

// Shopping Management
export const shoppingLists = sqliteTable("shopping_lists", {
  id: integer().primaryKey({ autoIncrement: true }),
  trip_id: integer().references(() => trips.id),
  name: text().notNull(),
  created_at: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updated_at: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const shoppingListsRelations = relations(
  shoppingLists,
  ({ one, many }) => ({
    trip: one(trips, {
      fields: [shoppingLists.trip_id],
      references: [trips.id],
    }),
    items: many(shoppingItems),
  })
);

export const shoppingItems = sqliteTable("shopping_items", {
  id: integer().primaryKey({ autoIncrement: true }),
  list_id: integer().references(() => shoppingLists.id),
  item_name: text().notNull(),
  quantity: real(),
  unit: text(),
  purchased: integer(), // Boolean as integer
  purchased_by: integer().references(() => users.id),
  purchased_at: text(),
  estimated_cost: real(),
  actual_cost: real(),
  notes: text(),
  created_at: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updated_at: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const shoppingItemsRelations = relations(
  shoppingItems,
  ({ one, many }) => ({
    list: one(shoppingLists, {
      fields: [shoppingItems.list_id],
      references: [shoppingLists.id],
    }),
    purchaser: one(users, {
      fields: [shoppingItems.purchased_by],
      references: [users.id],
      relationName: "purchaser",
    }),
    purchaseHistory: many(purchaseHistory),
  })
);

// Location Management
export const locations = sqliteTable("locations", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  location_type: text(),
  latitude: real(), // Coordinate as separate lat/lng
  longitude: real(), // Coordinate as separate lat/lng
  address: text(),
  notes: text(),
  created_by: integer().references(() => users.id),
  created_at: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updated_at: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const locationsRelations = relations(locations, ({ one, many }) => ({
  creator: one(users, {
    fields: [locations.created_by],
    references: [users.id],
    relationName: "creator",
  }),
  inventoryHistory: many(storeInventoryHistory),
  purchaseHistory: many(purchaseHistory),
  userFavorites: many(userFavoriteLocations),
}));

export const storeInventoryHistory = sqliteTable(
  "store_inventory_history",
  {
    location_id: integer()
      .notNull()
      .references(() => locations.id),
    ingredient_name: text().notNull(),
    availability_score: real(),
    min_price: real(), // Part of price range
    max_price: real(), // Part of price range
    last_seen_at: text(),
    updated_at: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    unq: unique().on(table.location_id, table.ingredient_name),
  })
);

export const storeInventoryHistoryRelations = relations(
  storeInventoryHistory,
  ({ one }) => ({
    location: one(locations, {
      fields: [storeInventoryHistory.location_id],
      references: [locations.id],
    }),
  })
);

export const purchaseHistory = sqliteTable("purchase_history", {
  id: integer().primaryKey({ autoIncrement: true }),
  shopping_item_id: integer().references(() => shoppingItems.id),
  location_id: integer().references(() => locations.id),
  item_name: text().notNull(),
  price: real(),
  purchased_at: text(),
  found_easily: integer(), // Boolean as integer
  notes: text(),
});

export const purchaseHistoryRelations = relations(
  purchaseHistory,
  ({ one }) => ({
    item: one(shoppingItems, {
      fields: [purchaseHistory.shopping_item_id],
      references: [shoppingItems.id],
    }),
    location: one(locations, {
      fields: [purchaseHistory.location_id],
      references: [locations.id],
    }),
  })
);

// Sync Management
export const syncQueue = sqliteTable("sync_queue", {
  id: integer().primaryKey({ autoIncrement: true }),
  user_id: integer().references(() => users.id),
  entity_type: text().notNull(),
  entity_id: integer(),
  action: text().notNull(),
  data: text(), // JSON as text
  created_at: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  processed_at: text(),
  status: text(),
  retry_count: integer().default(0),
});

export const syncQueueRelations = relations(syncQueue, ({ one }) => ({
  user: one(users, {
    fields: [syncQueue.user_id],
    references: [users.id],
  }),
}));
