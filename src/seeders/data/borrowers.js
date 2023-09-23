const faker = require('faker');

module.exports = (seed) => {
	if (!seed) {
		seed = 1;
	}
	const borrowersData = [];

	for (let i = 0; i < seed; i++) {
		borrowersData.push({
			uuid: faker.datatype.uuid(),
			name: faker.name.findName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			registeredDate: faker.date.past(),
			updatedAt: new Date(),
		});
	}
	return borrowersData;
};
