'use strict';

const db = require('../server/db');
const {User} = require('../server/db/models');
const User = require('../server/db/models/user')
const Product = require('../server/db/models/product')

const products = [
  {
    name: "The Stefanie's",
    description: 'Floral high heels',
    price: 25.5,
    image:
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
  },
  {
    name: "The Camryn's",
    description: 'Black high heels',
    price: 29.5,
    image:
      'https://images.unsplash.com/photo-1551489186-ccb95a1ea6a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
  },
  {
    name: "The Malka's",
    description: 'White high heels',
    price: 32.5,
    image:
      'https://images.unsplash.com/photo-1552419272-b0d8e736ea2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
  },
  {
    name: "The Andy's",
    description: 'Brown leather lace-up boots',
    price: 39.5,
    image:
      'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
  }
]

const users = [
  {email: 'stefanie@email.com', password: '123'},
  {email: 'camryn@email.com', password: '123'},
  {email: 'malka@email.com', password: '123'},
  {email: 'andy@email.com', password: '123'}
]
async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ]);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  await Promise.all(
    products.map(product => {
      return Product.create(product)
    })
  )

  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )

  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${users.length} users`)

  console.log(`seeded successfully`)
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
