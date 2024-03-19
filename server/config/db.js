const mongoo = require('mongoose');
/**
 * Connects to the database.
 * @returns {Promise<void>} A promise that resolves when the database is connected.
 */
const connectDB = async () => {
  
  try {
    mongoo.set('strictQuery', false);
    const conn = await mongoo.connect(process.env.MONGODB_URI);
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }

}

module.exports = connectDB;