const fetch = require('node-fetch');
const db = require('./database/setup');

it('API scraping - All fruits', async () => {
	const fruits = await db.find();
	const res = await fetch('https://www.fruityvice.com/api/fruit/all');
	const data = await res.json();

	expect(fruits.length).toBe(data.length);
});

it('API scraping - Single fruit', async () => {
	const fruit = await db.findOne({ name: 'Papaya' });
	const res = await fetch('https://www.fruityvice.com/api/fruit/papaya');
	const data = await res.json();

	expect(fruit).not.toBe(null);
	expect(fruit.name).toBe(data.name);
	expect(fruit.family).toBe(data.family);
	expect(fruit.carbohydrates).toBe(data.nutritions.carbohydrates);
	expect(fruit.protein).toBe(data.nutritions.protein);
	expect(fruit.fat).toBe(data.nutritions.fat);
	expect(fruit.calories).toBe(data.nutritions.calories);
	expect(fruit.sugar).toBe(data.nutritions.sugar);
});
