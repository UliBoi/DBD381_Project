//Import Mongoose and the Product model
const mongoose = require("mongoose");
const Product = require("./models/Product");

//Connect to the MongoDB replica set
mongoose.connect("mongodb://localhost:27117,localhost:27118,localhost:27119/ecommerce?replicaSet=rs0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("Connected to MongoDB Replica Set");

  //Create an array to hold 1000 product documents
  const bulkProducts = [];

  //Generate 1000 fake products with randomized data
  for (let i = 0; i < 1000; i++) {
    bulkProducts.push({
      product_id: `P${Date.now()}_${i}`,  // unique ID to avoid duplicates
      product_name: `Test Product ${i}`,
      product_price: Math.floor(Math.random() * 1000),
      product_category: i % 2 === 0 ? "electronics" : "clothing",
      product_stock: Math.floor(Math.random() * 100),
      seller_id: `U${Math.floor(Math.random() * 100)}`,
      product_images: [`image${i}.jpg`]
    });
  }

  try {
     //Time the bulk insert for performance metrics
    console.time("insertMany");
    const result = await Product.insertMany(bulkProducts);
    console.timeEnd("insertMany");

    console.log(`Inserted ${result.length} products`);
  } catch (err) {
    console.error("Error during bulk insert:", err.message);
  } finally {
    //Always close the connection to clean up resources
    mongoose.connection.close();
  }
});
