import { faker } from "@faker-js/faker"

const newUser = faker.internet.userName();
const newPasswd = faker.internet.password();
const usedUser = 'dtworek';
const usedPasswd = 'dominik1234';
const phone = 'Samsung galaxy s6';

module.exports = { newUser, newPasswd, usedUser, usedPasswd, phone };