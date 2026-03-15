import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
import { recipes, nutrition, ingredients, tips, categories } from './schema'
import * as dotenv from 'dotenv'
dotenv.config()

// Use Client (single connection) instead of Pool to avoid SSL cert rotation issues
const connectionString = (process.env.DATABASE_URL || '').replace('sslmode=require', 'sslmode=no-verify')
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } })
const db = drizzle(client)

const recipeData = [
    { title: 'Chicken Karahi', description: 'Classic Pakistani tomato-based chicken curry', instructions: 'Step 1: Heat oil\nStep 2: Add chicken and fry\nStep 3: Add tomatoes and spices\nStep 4: Cook until oil separates', imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600', cookingTime: 35, costLevel: 'Medium', category: 'High Protein', isZeroWaste: false, sustainabilityTip: 'Use leftover bones for broth', ingredients: 'Chicken, Tomato, Ginger, Garlic, Oil, Spices', seoTitle: 'Chicken Karahi Recipe', seoDescription: 'Authentic Pakistani chicken karahi', seoKeywords: 'chicken karahi, pakistani recipe' },
    { title: 'Daal Chawal', description: 'Comforting lentil soup with rice', instructions: 'Step 1: Boil lentils\nStep 2: Prepare tarka with onion and spices\nStep 3: Mix and serve with rice', imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600', cookingTime: 30, costLevel: 'Low', category: 'Budget Friendly', isZeroWaste: true, sustainabilityTip: 'Lentils have a very low carbon footprint', ingredients: 'Lentils, Rice, Onion, Tomato, Cumin, Turmeric', seoTitle: 'Daal Chawal Recipe', seoDescription: 'Simple and nutritious lentil rice', seoKeywords: 'daal chawal, lentil rice' },
    { title: 'Vegetable Stir Fry', description: 'Quick and healthy mixed vegetable stir fry', instructions: 'Step 1: Chop all vegetables\nStep 2: Heat wok on high\nStep 3: Stir fry vegetables 5 mins\nStep 4: Add soy sauce and serve', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600', cookingTime: 15, costLevel: 'Low', category: 'Quick Fix', isZeroWaste: true, sustainabilityTip: 'Use any leftover vegetables from your fridge', ingredients: 'Carrot, Broccoli, Bell Pepper, Soy Sauce, Garlic, Oil', seoTitle: 'Vegetable Stir Fry', seoDescription: 'Quick healthy stir fry recipe', seoKeywords: 'stir fry, vegetables, healthy' },
    { title: 'Egg Fried Rice', description: 'Classic fried rice with eggs and vegetables', instructions: 'Step 1: Cook rice and cool\nStep 2: Scramble eggs\nStep 3: Fry rice with vegetables\nStep 4: Mix eggs and season', imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600', cookingTime: 20, costLevel: 'Low', category: 'Budget Friendly', isZeroWaste: true, sustainabilityTip: 'Perfect for day-old leftover rice', ingredients: 'Rice, Eggs, Carrot, Peas, Soy Sauce, Garlic', seoTitle: 'Egg Fried Rice Recipe', seoDescription: 'Easy egg fried rice with vegetables', seoKeywords: 'fried rice, egg, quick meal' },
    { title: 'Grilled Chicken Salad', description: 'Fresh salad with grilled chicken breast', instructions: 'Step 1: Marinate chicken\nStep 2: Grill 6 mins each side\nStep 3: Slice and place on greens\nStep 4: Drizzle dressing', imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600', cookingTime: 25, costLevel: 'Medium', category: 'High Protein', isZeroWaste: false, sustainabilityTip: 'Use leftover chicken from previous meals', ingredients: 'Chicken Breast, Lettuce, Tomato, Cucumber, Olive Oil, Lemon', seoTitle: 'Grilled Chicken Salad', seoDescription: 'Healthy grilled chicken salad recipe', seoKeywords: 'chicken salad, healthy, protein' },
]

const moreRecipes = [
    { title: 'Banana Oat Pancakes', description: 'Healthy pancakes made with banana and oats', instructions: 'Step 1: Mash banana\nStep 2: Mix with oats and egg\nStep 3: Cook on pan 2 mins each side', imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600', cookingTime: 15, costLevel: 'Low', category: 'Budget Friendly', isZeroWaste: true, sustainabilityTip: 'Use overripe bananas that would otherwise be thrown away', ingredients: 'Banana, Oats, Egg, Honey, Cinnamon', seoTitle: 'Banana Oat Pancakes', seoDescription: 'Healthy banana oat pancakes recipe', seoKeywords: 'pancakes, banana, healthy breakfast' },
    { title: 'Spinach Smoothie', description: 'Green power smoothie with spinach and banana', instructions: 'Step 1: Add all ingredients to blender\nStep 2: Blend until smooth\nStep 3: Serve immediately', imageUrl: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600', cookingTime: 5, costLevel: 'Low', category: 'Quick Fix', isZeroWaste: true, sustainabilityTip: 'Use wilted spinach that is still nutritious', ingredients: 'Spinach, Banana, Milk, Honey, Chia Seeds', seoTitle: 'Spinach Smoothie', seoDescription: 'Nutritious green spinach smoothie', seoKeywords: 'smoothie, spinach, green drink' },
    { title: 'Lentil Soup', description: 'Hearty and warming red lentil soup', instructions: 'Step 1: Saute onion and garlic\nStep 2: Add lentils and broth\nStep 3: Simmer 20 mins\nStep 4: Blend partially', imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600', cookingTime: 30, costLevel: 'Low', category: 'Zero Waste', isZeroWaste: true, sustainabilityTip: 'Lentils require 50x less water than beef', ingredients: 'Red Lentils, Onion, Garlic, Cumin, Turmeric, Lemon', seoTitle: 'Red Lentil Soup', seoDescription: 'Warming red lentil soup recipe', seoKeywords: 'lentil soup, vegan, healthy' },
    { title: 'Avocado Toast', description: 'Simple and nutritious avocado on sourdough', instructions: 'Step 1: Toast bread\nStep 2: Mash avocado with lemon\nStep 3: Spread on toast\nStep 4: Top with egg if desired', imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=600', cookingTime: 10, costLevel: 'Medium', category: 'Quick Fix', isZeroWaste: false, sustainabilityTip: 'Use the avocado pit to grow a new plant', ingredients: 'Avocado, Sourdough Bread, Lemon, Salt, Chili Flakes', seoTitle: 'Avocado Toast Recipe', seoDescription: 'Classic avocado toast with toppings', seoKeywords: 'avocado toast, breakfast, healthy' },
    { title: 'Chickpea Curry', description: 'Creamy vegan chickpea curry with coconut milk', instructions: 'Step 1: Saute onion and spices\nStep 2: Add chickpeas and tomatoes\nStep 3: Pour coconut milk\nStep 4: Simmer 15 mins', imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600', cookingTime: 25, costLevel: 'Low', category: 'Vegan', isZeroWaste: true, sustainabilityTip: 'Chickpeas fix nitrogen in soil — great for the planet', ingredients: 'Chickpeas, Coconut Milk, Tomato, Onion, Garam Masala, Ginger', seoTitle: 'Chickpea Curry', seoDescription: 'Easy vegan chickpea curry recipe', seoKeywords: 'chickpea curry, vegan, plant based' },
    { title: 'Pasta Aglio e Olio', description: 'Simple Italian pasta with garlic and olive oil', instructions: 'Step 1: Cook pasta al dente\nStep 2: Fry garlic in olive oil\nStep 3: Toss pasta with garlic oil\nStep 4: Add parsley and chili', imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600', cookingTime: 20, costLevel: 'Low', category: 'Budget Friendly', isZeroWaste: false, sustainabilityTip: 'Save pasta water to thicken the sauce', ingredients: 'Pasta, Garlic, Olive Oil, Parsley, Chili Flakes, Parmesan', seoTitle: 'Pasta Aglio e Olio', seoDescription: 'Classic Italian garlic pasta recipe', seoKeywords: 'pasta, italian, garlic, quick' },
    { title: 'Overnight Oats', description: 'No-cook oats prepared the night before', instructions: 'Step 1: Mix oats with milk\nStep 2: Add toppings\nStep 3: Refrigerate overnight\nStep 4: Serve cold', imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=600', cookingTime: 5, costLevel: 'Low', category: 'Quick Fix', isZeroWaste: true, sustainabilityTip: 'Oats have one of the lowest carbon footprints of any food', ingredients: 'Oats, Milk, Banana, Berries, Honey, Chia Seeds', seoTitle: 'Overnight Oats Recipe', seoDescription: 'Easy overnight oats for busy mornings', seoKeywords: 'overnight oats, breakfast, meal prep' },
    { title: 'Tuna Salad Wrap', description: 'Protein-packed tuna wrap with fresh vegetables', instructions: 'Step 1: Mix tuna with mayo\nStep 2: Add vegetables\nStep 3: Wrap in tortilla\nStep 4: Slice and serve', imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600', cookingTime: 10, costLevel: 'Medium', category: 'High Protein', isZeroWaste: false, sustainabilityTip: 'Choose sustainably sourced tuna', ingredients: 'Tuna, Tortilla, Lettuce, Tomato, Mayo, Lemon', seoTitle: 'Tuna Salad Wrap', seoDescription: 'Quick and healthy tuna wrap recipe', seoKeywords: 'tuna wrap, protein, lunch' },
    { title: 'Mushroom Risotto', description: 'Creamy Italian risotto with mushrooms', instructions: 'Step 1: Saute mushrooms\nStep 2: Toast arborio rice\nStep 3: Add broth ladle by ladle\nStep 4: Finish with parmesan', imageUrl: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600', cookingTime: 40, costLevel: 'Medium', category: 'Vegan', isZeroWaste: true, sustainabilityTip: 'Use mushroom stems in the broth', ingredients: 'Arborio Rice, Mushrooms, Onion, White Wine, Parmesan, Butter', seoTitle: 'Mushroom Risotto', seoDescription: 'Creamy mushroom risotto recipe', seoKeywords: 'risotto, mushroom, italian' },
    { title: 'Black Bean Tacos', description: 'Crispy tacos filled with spiced black beans', instructions: 'Step 1: Season black beans\nStep 2: Warm tortillas\nStep 3: Fill with beans and toppings\nStep 4: Add salsa', imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600', cookingTime: 20, costLevel: 'Low', category: 'Vegan', isZeroWaste: true, sustainabilityTip: 'Beans produce 50x less CO2 than beef', ingredients: 'Black Beans, Corn Tortillas, Avocado, Salsa, Lime, Cilantro', seoTitle: 'Black Bean Tacos', seoDescription: 'Easy vegan black bean tacos', seoKeywords: 'tacos, vegan, black beans' },
]

const evenMoreRecipes = [
    { title: 'Greek Yogurt Bowl', description: 'Protein-rich yogurt bowl with fruits and granola', instructions: 'Step 1: Add yogurt to bowl\nStep 2: Top with fruits\nStep 3: Add granola and honey', imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600', cookingTime: 5, costLevel: 'Medium', category: 'High Protein', isZeroWaste: false, sustainabilityTip: 'Buy local seasonal fruits', ingredients: 'Greek Yogurt, Granola, Berries, Honey, Banana', seoTitle: 'Greek Yogurt Bowl', seoDescription: 'Healthy yogurt bowl with fruits', seoKeywords: 'yogurt bowl, breakfast, protein' },
    { title: 'Vegetable Soup', description: 'Hearty mixed vegetable soup', instructions: 'Step 1: Chop all vegetables\nStep 2: Saute onion and garlic\nStep 3: Add vegetables and broth\nStep 4: Simmer 25 mins', imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600', cookingTime: 35, costLevel: 'Low', category: 'Zero Waste', isZeroWaste: true, sustainabilityTip: 'Use vegetable scraps to make the broth', ingredients: 'Carrot, Potato, Celery, Onion, Tomato, Broth', seoTitle: 'Vegetable Soup', seoDescription: 'Hearty zero waste vegetable soup', seoKeywords: 'vegetable soup, zero waste, healthy' },
    { title: 'Salmon with Lemon', description: 'Pan-seared salmon with lemon butter sauce', instructions: 'Step 1: Season salmon\nStep 2: Sear 4 mins each side\nStep 3: Make lemon butter sauce\nStep 4: Plate and garnish', imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600', cookingTime: 20, costLevel: 'High', category: 'High Protein', isZeroWaste: false, sustainabilityTip: 'Choose sustainably farmed salmon', ingredients: 'Salmon, Lemon, Butter, Garlic, Dill, Salt', seoTitle: 'Pan Seared Salmon', seoDescription: 'Easy pan seared salmon recipe', seoKeywords: 'salmon, fish, high protein' },
    { title: 'Hummus with Pita', description: 'Homemade creamy hummus with warm pita', instructions: 'Step 1: Blend chickpeas\nStep 2: Add tahini and lemon\nStep 3: Season and drizzle oil\nStep 4: Serve with pita', imageUrl: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=600', cookingTime: 10, costLevel: 'Low', category: 'Vegan', isZeroWaste: true, sustainabilityTip: 'Use aquafaba (chickpea water) in other recipes', ingredients: 'Chickpeas, Tahini, Lemon, Garlic, Olive Oil, Pita', seoTitle: 'Homemade Hummus', seoDescription: 'Easy homemade hummus recipe', seoKeywords: 'hummus, vegan, snack' },
    { title: 'Beef Stir Fry', description: 'Quick beef and vegetable stir fry', instructions: 'Step 1: Slice beef thin\nStep 2: Marinate 10 mins\nStep 3: Stir fry on high heat\nStep 4: Add sauce and serve', imageUrl: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600', cookingTime: 20, costLevel: 'High', category: 'High Protein', isZeroWaste: false, sustainabilityTip: 'Use smaller portions of beef to reduce carbon footprint', ingredients: 'Beef, Broccoli, Bell Pepper, Soy Sauce, Ginger, Garlic', seoTitle: 'Beef Stir Fry', seoDescription: 'Quick beef stir fry recipe', seoKeywords: 'beef stir fry, protein, quick' },
    { title: 'Tomato Basil Pasta', description: 'Fresh tomato pasta with basil', instructions: 'Step 1: Cook pasta\nStep 2: Saute garlic in oil\nStep 3: Add tomatoes and basil\nStep 4: Toss with pasta', imageUrl: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=600', cookingTime: 20, costLevel: 'Low', category: 'Budget Friendly', isZeroWaste: false, sustainabilityTip: 'Grow your own basil on a windowsill', ingredients: 'Pasta, Tomatoes, Basil, Garlic, Olive Oil, Parmesan', seoTitle: 'Tomato Basil Pasta', seoDescription: 'Simple tomato basil pasta recipe', seoKeywords: 'pasta, tomato, basil, italian' },
    { title: 'Carrot Ginger Soup', description: 'Silky smooth carrot and ginger soup', instructions: 'Step 1: Roast carrots\nStep 2: Saute onion and ginger\nStep 3: Blend with broth\nStep 4: Season and serve', imageUrl: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600', cookingTime: 40, costLevel: 'Low', category: 'Zero Waste', isZeroWaste: true, sustainabilityTip: 'Use carrot tops in pesto or salad', ingredients: 'Carrot, Ginger, Onion, Coconut Milk, Broth, Lime', seoTitle: 'Carrot Ginger Soup', seoDescription: 'Creamy carrot ginger soup recipe', seoKeywords: 'carrot soup, ginger, vegan' },
    { title: 'Quinoa Buddha Bowl', description: 'Nutritious quinoa bowl with roasted vegetables', instructions: 'Step 1: Cook quinoa\nStep 2: Roast vegetables\nStep 3: Assemble bowl\nStep 4: Drizzle tahini dressing', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600', cookingTime: 30, costLevel: 'Medium', category: 'Vegan', isZeroWaste: false, sustainabilityTip: 'Quinoa is a complete protein — great meat alternative', ingredients: 'Quinoa, Sweet Potato, Chickpeas, Spinach, Tahini, Lemon', seoTitle: 'Quinoa Buddha Bowl', seoDescription: 'Healthy quinoa buddha bowl recipe', seoKeywords: 'buddha bowl, quinoa, vegan' },
    { title: 'Chicken Soup', description: 'Classic comforting chicken noodle soup', instructions: 'Step 1: Boil chicken\nStep 2: Add vegetables\nStep 3: Add noodles\nStep 4: Season and serve', imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600', cookingTime: 45, costLevel: 'Medium', category: 'High Protein', isZeroWaste: true, sustainabilityTip: 'Use the whole chicken including bones for rich broth', ingredients: 'Chicken, Noodles, Carrot, Celery, Onion, Broth', seoTitle: 'Chicken Noodle Soup', seoDescription: 'Classic chicken noodle soup recipe', seoKeywords: 'chicken soup, comfort food, healthy' },
    { title: 'Mango Lassi', description: 'Refreshing Indian mango yogurt drink', instructions: 'Step 1: Blend mango\nStep 2: Add yogurt and milk\nStep 3: Add sugar and cardamom\nStep 4: Blend and serve cold', imageUrl: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600', cookingTime: 5, costLevel: 'Low', category: 'Quick Fix', isZeroWaste: true, sustainabilityTip: 'Use overripe mangoes that are too soft to eat', ingredients: 'Mango, Yogurt, Milk, Sugar, Cardamom, Ice', seoTitle: 'Mango Lassi', seoDescription: 'Refreshing mango lassi recipe', seoKeywords: 'mango lassi, drink, indian' },
]

const finalRecipes = [
    { title: 'Palak Paneer', description: 'Creamy spinach curry with cottage cheese', instructions: 'Step 1: Blanch spinach and blend\nStep 2: Fry paneer cubes\nStep 3: Cook spinach gravy with spices\nStep 4: Add paneer and cream', imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600', cookingTime: 35, costLevel: 'Medium', category: 'High Protein', isZeroWaste: false, sustainabilityTip: 'Spinach stems are edible — use them in the curry', ingredients: 'Spinach, Paneer, Onion, Tomato, Cream, Spices', seoTitle: 'Palak Paneer Recipe', seoDescription: 'Creamy palak paneer recipe', seoKeywords: 'palak paneer, indian, vegetarian' },
    { title: 'Biryani', description: 'Fragrant layered rice dish with chicken', instructions: 'Step 1: Marinate chicken\nStep 2: Parboil rice\nStep 3: Layer chicken and rice\nStep 4: Dum cook 25 mins', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600', cookingTime: 60, costLevel: 'Medium', category: 'High Protein', isZeroWaste: false, sustainabilityTip: 'Use leftover biryani in wraps next day', ingredients: 'Chicken, Basmati Rice, Yogurt, Onion, Saffron, Spices', seoTitle: 'Chicken Biryani', seoDescription: 'Authentic chicken biryani recipe', seoKeywords: 'biryani, chicken, pakistani' },
    { title: 'Aloo Gobi', description: 'Spiced potato and cauliflower curry', instructions: 'Step 1: Fry onion and spices\nStep 2: Add potato and cauliflower\nStep 3: Cook covered 20 mins\nStep 4: Garnish with coriander', imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600', cookingTime: 30, costLevel: 'Low', category: 'Vegan', isZeroWaste: true, sustainabilityTip: 'Use cauliflower leaves in the curry too', ingredients: 'Potato, Cauliflower, Onion, Tomato, Turmeric, Cumin', seoTitle: 'Aloo Gobi Recipe', seoDescription: 'Classic aloo gobi curry recipe', seoKeywords: 'aloo gobi, vegan, indian' },
    { title: 'Fruit Salad', description: 'Fresh seasonal fruit salad with honey dressing', instructions: 'Step 1: Chop all fruits\nStep 2: Mix honey and lemon\nStep 3: Toss fruits with dressing\nStep 4: Chill and serve', imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600', cookingTime: 10, costLevel: 'Low', category: 'Quick Fix', isZeroWaste: true, sustainabilityTip: 'Use fruit peels for zest or compost', ingredients: 'Apple, Banana, Orange, Grapes, Honey, Lemon', seoTitle: 'Fresh Fruit Salad', seoDescription: 'Easy fresh fruit salad recipe', seoKeywords: 'fruit salad, healthy, dessert' },
    { title: 'Peanut Butter Smoothie', description: 'High protein peanut butter banana smoothie', instructions: 'Step 1: Add all to blender\nStep 2: Blend 30 seconds\nStep 3: Serve immediately', imageUrl: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600', cookingTime: 5, costLevel: 'Low', category: 'High Protein', isZeroWaste: false, sustainabilityTip: 'Peanuts use very little water to grow', ingredients: 'Peanut Butter, Banana, Milk, Oats, Honey', seoTitle: 'Peanut Butter Smoothie', seoDescription: 'High protein peanut butter smoothie', seoKeywords: 'smoothie, peanut butter, protein' },
]

const tipsData = [
    { ingredient: 'lemon', tip: "Don't toss the peels! Use them for zest in baking or soak in vinegar for a natural kitchen cleaner.", icon: '🍋' },
    { ingredient: 'bread', tip: 'Stale bread is perfect for homemade croutons or breadcrumbs. Just bake with a little olive oil.', icon: '🍞' },
    { ingredient: 'tomato', tip: 'Overripe tomatoes are excellent for homemade pasta sauce or salsas where texture matters less.', icon: '🍅' },
    { ingredient: 'potato', tip: 'Potato skins can be seasoned and baked into crispy chips. Never peel and waste again!', icon: '🥔' },
    { ingredient: 'banana', tip: 'Black spots mean more sugar. Perfect for smoothies or banana bread.', icon: '🍌' },
    { ingredient: 'egg', tip: 'Eggshells are rich in calcium — crush and add to soil as fertilizer for your plants.', icon: '🥚' },
    { ingredient: 'onion', tip: 'Onion skins make a rich, golden broth. Simmer with water for 20 mins and strain.', icon: '🧅' },
    { ingredient: 'spinach', tip: 'Wilted spinach is perfect for smoothies, soups, or sautéed as a side — still full of nutrients.', icon: '🥬' },
    { ingredient: 'rice', tip: 'Leftover rice makes the best fried rice. Day-old rice fries crispier than fresh.', icon: '🍚' },
    { ingredient: 'pasta', tip: 'Save pasta water — it\'s starchy gold for thickening sauces and making them cling to pasta.', icon: '🍝' },
    { ingredient: 'chicken', tip: 'Boil chicken bones for 4+ hours to make a rich, collagen-packed bone broth.', icon: '🍗' },
    { ingredient: 'apple', tip: 'Apple cores and peels can be simmered with cinnamon and sugar to make apple jelly.', icon: '🍎' },
    { ingredient: 'carrot', tip: 'Carrot tops are edible! Use them in pesto, chimichurri, or as a garnish.', icon: '🥕' },
    { ingredient: 'ginger', tip: 'Freeze ginger root and grate it directly from frozen — no peeling needed.', icon: '🫚' },
    { ingredient: 'coffee', tip: 'Used coffee grounds are excellent as a natural exfoliant or garden fertilizer.', icon: '☕' },
    { ingredient: 'avocado', tip: 'Rub the avocado pit on the surface of guacamole to prevent browning.', icon: '🥑' },
    { ingredient: 'garlic', tip: 'Garlic skins can be added to stocks for extra flavor. Never throw them away.', icon: '🧄' },
    { ingredient: 'broccoli', tip: 'Broccoli stems are just as nutritious as florets. Peel and slice them for stir fries.', icon: '🥦' },
    { ingredient: 'mushroom', tip: 'Mushroom stems make excellent stock. Dry them out and store for later use.', icon: '🍄' },
    { ingredient: 'cucumber', tip: 'Cucumber peels can be used in water for a refreshing infused drink.', icon: '🥒' },
]

const ingredientsData = [
    'Chicken', 'Rice', 'Lentils', 'Tomato', 'Onion', 'Garlic', 'Ginger', 'Spinach',
    'Carrot', 'Potato', 'Broccoli', 'Bell Pepper', 'Mushroom', 'Avocado', 'Banana',
    'Lemon', 'Olive Oil', 'Butter', 'Eggs', 'Milk', 'Yogurt', 'Cheese', 'Pasta',
    'Oats', 'Quinoa', 'Chickpeas', 'Black Beans', 'Coconut Milk', 'Soy Sauce', 'Honey',
]

const categoriesData = ['Zero Waste', 'High Protein', 'Budget Friendly', 'Quick Fix', 'Vegan']

const nutritionData: Record<string, { calories: number; protein: number; carbs: number; fat: number }> = {
    'Chicken Karahi': { calories: 420, protein: 38, carbs: 12, fat: 24 },
    'Daal Chawal': { calories: 380, protein: 18, carbs: 62, fat: 6 },
    'Vegetable Stir Fry': { calories: 220, protein: 8, carbs: 28, fat: 10 },
    'Egg Fried Rice': { calories: 350, protein: 14, carbs: 52, fat: 10 },
    'Grilled Chicken Salad': { calories: 310, protein: 42, carbs: 8, fat: 12 },
    'Banana Oat Pancakes': { calories: 280, protein: 10, carbs: 48, fat: 6 },
    'Spinach Smoothie': { calories: 180, protein: 6, carbs: 32, fat: 3 },
    'Lentil Soup': { calories: 260, protein: 16, carbs: 38, fat: 4 },
    'Avocado Toast': { calories: 320, protein: 8, carbs: 34, fat: 18 },
    'Chickpea Curry': { calories: 340, protein: 14, carbs: 44, fat: 12 },
    'Pasta Aglio e Olio': { calories: 420, protein: 12, carbs: 62, fat: 16 },
    'Overnight Oats': { calories: 310, protein: 12, carbs: 52, fat: 6 },
    'Tuna Salad Wrap': { calories: 380, protein: 32, carbs: 36, fat: 10 },
    'Mushroom Risotto': { calories: 440, protein: 14, carbs: 68, fat: 14 },
    'Black Bean Tacos': { calories: 290, protein: 12, carbs: 46, fat: 8 },
    'Greek Yogurt Bowl': { calories: 260, protein: 18, carbs: 34, fat: 6 },
    'Vegetable Soup': { calories: 180, protein: 6, carbs: 28, fat: 4 },
    'Salmon with Lemon': { calories: 380, protein: 44, carbs: 2, fat: 22 },
    'Hummus with Pita': { calories: 320, protein: 12, carbs: 42, fat: 14 },
    'Beef Stir Fry': { calories: 460, protein: 38, carbs: 22, fat: 24 },
    'Tomato Basil Pasta': { calories: 390, protein: 14, carbs: 58, fat: 12 },
    'Carrot Ginger Soup': { calories: 200, protein: 4, carbs: 32, fat: 8 },
    'Quinoa Buddha Bowl': { calories: 420, protein: 18, carbs: 56, fat: 14 },
    'Chicken Soup': { calories: 280, protein: 28, carbs: 22, fat: 8 },
    'Mango Lassi': { calories: 220, protein: 8, carbs: 42, fat: 4 },
    'Palak Paneer': { calories: 360, protein: 18, carbs: 14, fat: 26 },
    'Biryani': { calories: 520, protein: 32, carbs: 62, fat: 16 },
    'Aloo Gobi': { calories: 240, protein: 6, carbs: 38, fat: 8 },
    'Fruit Salad': { calories: 140, protein: 2, carbs: 34, fat: 1 },
    'Peanut Butter Smoothie': { calories: 380, protein: 16, carbs: 44, fat: 16 },
}

async function seed() {
    console.log('🌱 Seeding database...')
    await client.connect()

    // Categories
    console.log('Adding categories...')
    for (const name of categoriesData) {
        try { await db.insert(categories).values({ name }).onConflictDoNothing() } catch { }
    }

    // Ingredients
    console.log('Adding ingredients...')
    for (const name of ingredientsData) {
        try { await db.insert(ingredients).values({ name }).onConflictDoNothing() } catch { }
    }

    // Tips
    console.log('Adding tips...')
    for (const tip of tipsData) {
        try { await db.insert(tips).values(tip).onConflictDoNothing() } catch { }
    }

    // Recipes
    console.log('Adding recipes...')
    const allRecipes = [...recipeData, ...moreRecipes, ...evenMoreRecipes, ...finalRecipes]
    for (const r of allRecipes) {
        try {
            const [inserted] = await db.insert(recipes).values({
                title: r.title, description: r.description, instructions: r.instructions,
                imageUrl: r.imageUrl, cookingTime: r.cookingTime, costLevel: r.costLevel,
                category: r.category, isZeroWaste: r.isZeroWaste, sustainabilityTip: r.sustainabilityTip,
                ingredients: r.ingredients, seoTitle: r.seoTitle, seoDescription: r.seoDescription, seoKeywords: r.seoKeywords,
            }).returning({ id: recipes.id })

            const nutr = nutritionData[r.title]
            if (nutr && inserted?.id) {
                await db.insert(nutrition).values({ recipeId: inserted.id, ...nutr })
            }
        } catch (e: any) { console.log(`Skipped ${r.title}: ${e.cause?.message || e.message}`) }
    }

    console.log('✅ Seed complete!')
    await client.end()
}

seed().catch(console.error)
