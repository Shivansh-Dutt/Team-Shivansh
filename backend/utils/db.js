import mongoose  from "mongoose";

// Function to connect to the database
const ConnectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/ReachOut'
    );
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the process with failure
  }
};

export default ConnectDB;