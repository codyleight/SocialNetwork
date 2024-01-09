const User = require('../models/User');
const Thought = require('../models/Thought');
const connection = require('../config/connection');


const { v4: uuidv4 } = require('uuid');

connection.once('open', async () => {


  //We delete users and thoughts if we already have them in our db.

  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }


  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  // Empty our arrays as well.
  const users = [];
  const thoughts = [];

  // Generate 10 users
  for (let i = 0; i < 10; i++) {
    const name = `User ${i + 1}`;
    const uniqueId = uuidv4(); // Generate a random unique identifier
    const newUser = {
      username: `${name.split(' ')[0]}_${uniqueId}`, // Append the unique identifier to the username
      email: `${name.replace(' ', '').toLowerCase()}@gmail.com`,
      thoughts: [],
      friends: [],
    };
    users.push(newUser);
  }

  //** Generate 10 thoughts for each user
  users.forEach((user, index) => {
    for (let i = 0; i < 1; i++) {
      const newThought = {
        thoughtText: `Thought ${i + 1} by ${user.username}`,
        username: user.username,
        userId: index + 1,
      };
      thoughts.push(newThought);
      
    }
  });
  //
  // Wait for the users and thoughts to be inserted into the database
  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.timeEnd('Users and thoughts compeleted.');
  process.exit(0);
});