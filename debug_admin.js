const Admin = require('./server/models/Admin');
const connectDB = require('./server/db');

async function debugAdmins() {
  try {
    await connectDB();
    const admins = await Admin.find({});
    console.log('Admins in database:');
    console.log(JSON.stringify(admins, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

debugAdmins();
