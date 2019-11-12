'use strict';

const db = require('../server/db');
const User = require('../server/db/models/user');
const Product = require('../server/db/models/product');

const products = [
  {
    name: "The Stefanie's",
    description: 'Floral high heels',
    price: 2550,
    image: '/stephanies-cropped.png'
  },
  {
    name: "The Camryn's",
    description: 'Black high heels',
    price: 2950,
    image: '/camryns.jpeg'
  },
  {
    name: "The Malka's",
    description: 'White high heels',
    price: 3250,
    image: '/malkas-cropped.png'
  },
  {
    name: "The Andy's",
    description: 'Brown leather lace-up boots',
    price: 3950,
    image: '/andys.jpeg'
  }
];

const users = [
  {email: 'stefanie@email.com', password: '123', isAdmin: true},
  {email: 'camryn@email.com', password: '123', isAdmin: true},
  {email: 'malka@email.com', password: '123', isAdmin: true},
  {email: 'andy@email.com', password: '123', isAdmin: true},
  {email: 'cody@email.com', password: '123'}
];

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  await Promise.all(
    products.map(product => {
      return Product.create(product);
    })
  );

  await Promise.all(
    users.map(user => {
      return User.create(user);
    })
  );

  console.log(`seeded ${products.length} products`);
  console.log(`seeded ${users.length} users`);

  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// // Execute the `seed` function, IF we ran this module directly (`node seed`).
// // `Async` functions always return a promise, so we can use `catch` to handle
// // any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
