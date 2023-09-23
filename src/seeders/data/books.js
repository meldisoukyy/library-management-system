const faker = require('faker');

module.exports = (seed) => {
	if (!seed) {
		seed = 1;
	}
	const booksData = [];
	for (let i = 0; i < seed; i++) {
		booksData.push({
			uuid: faker.datatype.uuid(),
			title: faker.lorem.words(),
			author: faker.name.findName(),
			isbn: faker.datatype.uuid(),
			quantity: faker.datatype.number({ min: 1, max: 100 }),
			shelfLocation: faker.random.word(),
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}
	return booksData;
};
