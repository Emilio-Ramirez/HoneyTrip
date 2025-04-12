export interface Ingredient {
  value: string;
  label: string;
}

export const ingredientList: Ingredient[] = [
  // Basic Cooking Ingredients
  {
    value: "salt",
    label: "Salt",
  },
  {
    value: "pepper",
    label: "Black Pepper",
  },
  {
    value: "olive_oil",
    label: "Olive Oil",
  },
  {
    value: "vegetable_oil",
    label: "Vegetable Oil",
  },
  {
    value: "butter",
    label: "Butter",
  },
  {
    value: "garlic",
    label: "Garlic",
  },
  {
    value: "onion",
    label: "Onion",
  },
  {
    value: "chicken_broth",
    label: "Chicken Broth",
  },
  {
    value: "vegetable_broth",
    label: "Vegetable Broth",
  },
  {
    value: "flour",
    label: "All-Purpose Flour",
  },
  {
    value: "sugar",
    label: "Sugar",
  },
  {
    value: "brown_sugar",
    label: "Brown Sugar",
  },
  {
    value: "baking_powder",
    label: "Baking Powder",
  },
  {
    value: "baking_soda",
    label: "Baking Soda",
  },
  {
    value: "vanilla_extract",
    label: "Vanilla Extract",
  },

  // Grains & Starches
  {
    value: "rice",
    label: "White Rice",
  },
  {
    value: "brown_rice",
    label: "Brown Rice",
  },
  {
    value: "quinoa",
    label: "Quinoa",
  },
  {
    value: "pasta",
    label: "Pasta",
  },
  {
    value: "egg_noodles",
    label: "Egg Noodles",
  },
  {
    value: "couscous",
    label: "Couscous",
  },
  {
    value: "instant_potatoes",
    label: "Instant Mashed Potatoes",
  },
  {
    value: "oats",
    label: "Rolled Oats",
  },
  {
    value: "instant_oatmeal",
    label: "Instant Oatmeal",
  },

  // Proteins & Meats
  {
    value: "chicken_breast",
    label: "Chicken Breast",
  },
  {
    value: "ground_beef",
    label: "Ground Beef",
  },
  {
    value: "bacon",
    label: "Bacon",
  },
  {
    value: "sausage",
    label: "Sausage",
  },
  {
    value: "canned_tuna",
    label: "Canned Tuna",
  },
  {
    value: "canned_salmon",
    label: "Canned Salmon",
  },
  {
    value: "jerky",
    label: "Beef Jerky",
  },
  {
    value: "tofu",
    label: "Tofu",
  },
  {
    value: "tempeh",
    label: "Tempeh",
  },
  {
    value: "eggs",
    label: "Eggs",
  },
  {
    value: "powdered_eggs",
    label: "Powdered Eggs",
  },

  // Legumes
  {
    value: "black_beans",
    label: "Black Beans",
  },
  {
    value: "pinto_beans",
    label: "Pinto Beans",
  },
  {
    value: "kidney_beans",
    label: "Kidney Beans",
  },
  {
    value: "chickpeas",
    label: "Chickpeas",
  },
  {
    value: "lentils",
    label: "Lentils",
  },
  {
    value: "peanut_butter",
    label: "Peanut Butter",
  },
  {
    value: "almond_butter",
    label: "Almond Butter",
  },

  // Vegetables
  {
    value: "bell_pepper",
    label: "Bell Pepper",
  },
  {
    value: "carrot",
    label: "Carrot",
  },
  {
    value: "celery",
    label: "Celery",
  },
  {
    value: "potato",
    label: "Potato",
  },
  {
    value: "sweet_potato",
    label: "Sweet Potato",
  },
  {
    value: "tomato",
    label: "Tomato",
  },
  {
    value: "avocado",
    label: "Avocado",
  },
  {
    value: "zucchini",
    label: "Zucchini",
  },
  {
    value: "mushroom",
    label: "Mushroom",
  },
  {
    value: "spinach",
    label: "Spinach",
  },
  {
    value: "kale",
    label: "Kale",
  },
  {
    value: "mixed_greens",
    label: "Mixed Greens",
  },
  {
    value: "broccoli",
    label: "Broccoli",
  },
  {
    value: "cauliflower",
    label: "Cauliflower",
  },
  {
    value: "cabbage",
    label: "Cabbage",
  },
  {
    value: "corn",
    label: "Corn",
  },
  {
    value: "frozen_vegetables",
    label: "Frozen Vegetables",
  },
  {
    value: "dried_vegetables",
    label: "Dried Vegetables",
  },
  {
    value: "canned_corn",
    label: "Canned Corn",
  },
  {
    value: "canned_green_beans",
    label: "Canned Green Beans",
  },
  {
    value: "canned_tomatoes",
    label: "Canned Tomatoes",
  },

  // Fruits
  {
    value: "apple",
    label: "Apple",
  },
  {
    value: "banana",
    label: "Banana",
  },
  {
    value: "orange",
    label: "Orange",
  },
  {
    value: "lemon",
    label: "Lemon",
  },
  {
    value: "lime",
    label: "Lime",
  },
  {
    value: "berries",
    label: "Mixed Berries",
  },
  {
    value: "grapes",
    label: "Grapes",
  },
  {
    value: "dried_fruit",
    label: "Dried Fruit Mix",
  },
  {
    value: "raisins",
    label: "Raisins",
  },
  {
    value: "dried_apricots",
    label: "Dried Apricots",
  },
  {
    value: "dried_cranberries",
    label: "Dried Cranberries",
  },
  {
    value: "canned_peaches",
    label: "Canned Peaches",
  },
  {
    value: "canned_pineapple",
    label: "Canned Pineapple",
  },

  // Dairy & Alternatives
  {
    value: "milk",
    label: "Milk",
  },
  {
    value: "almond_milk",
    label: "Almond Milk",
  },
  {
    value: "oat_milk",
    label: "Oat Milk",
  },
  {
    value: "powdered_milk",
    label: "Powdered Milk",
  },
  {
    value: "cheese",
    label: "Cheese",
  },
  {
    value: "cheddar_cheese",
    label: "Cheddar Cheese",
  },
  {
    value: "parmesan_cheese",
    label: "Parmesan Cheese",
  },
  {
    value: "yogurt",
    label: "Yogurt",
  },
  {
    value: "sour_cream",
    label: "Sour Cream",
  },
  {
    value: "cream_cheese",
    label: "Cream Cheese",
  },

  // Nuts & Seeds
  {
    value: "almonds",
    label: "Almonds",
  },
  {
    value: "walnuts",
    label: "Walnuts",
  },
  {
    value: "cashews",
    label: "Cashews",
  },
  {
    value: "peanuts",
    label: "Peanuts",
  },
  {
    value: "mixed_nuts",
    label: "Mixed Nuts",
  },
  {
    value: "sunflower_seeds",
    label: "Sunflower Seeds",
  },
  {
    value: "chia_seeds",
    label: "Chia Seeds",
  },
  {
    value: "flax_seeds",
    label: "Flax Seeds",
  },

  // Condiments & Sauces
  {
    value: "ketchup",
    label: "Ketchup",
  },
  {
    value: "mustard",
    label: "Mustard",
  },
  {
    value: "mayonnaise",
    label: "Mayonnaise",
  },
  {
    value: "soy_sauce",
    label: "Soy Sauce",
  },
  {
    value: "hot_sauce",
    label: "Hot Sauce",
  },
  {
    value: "bbq_sauce",
    label: "BBQ Sauce",
  },
  {
    value: "salsa",
    label: "Salsa",
  },
  {
    value: "honey",
    label: "Honey",
  },
];
