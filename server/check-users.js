require('dotenv').config();
const { RegisterUser } = require('./src/models');
const sequelize = require('./src/config/database');

sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    return RegisterUser.findAll({
      attributes: ['id', 'user_id', 'user_name', 'createdAt'],
    });
  })
  .then((users) => {
    if (users.length === 0) {
      console.log('No registered users found.');
    } else {
      console.log(`Found ${users.length} registered user(s):\n`);
      users.forEach((u) => {
        console.log(`  ID: ${u.user_id} | Username: ${u.user_name} | Created: ${u.createdAt}`);
      });
    }
    process.exit();
  })
  .catch((err) => {
    console.error('Error:', err.message);
    process.exit(1);
  });
