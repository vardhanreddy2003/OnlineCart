import { MongoClient } from "mongodb";

// URL-encoded password
const CONNECTION_STRING = "mongodb+srv://vardhan:vardhan%402003@cluster0.eofztra.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DataBaseName = "student";
var database;

const client = new MongoClient(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
var studentCollection;
var vegetableCollection;
var ownerCollection;
var couponCollection;
const connectToDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("MongoDB connected");
    database = client.db(DataBaseName);
    console.log("Database connected");
    
    studentCollection = database.collection("studentcollection");
    vegetableCollection=database.collection("vegetablecollection");
     ownerCollection=database.collection("ownerCollection");
     couponCollection=database.collection("couponCollection");
  } catch (error) {
    console.error("Error occurred", error);
  }
};

export { connectToDatabase, studentCollection,vegetableCollection,ownerCollection,couponCollection };
