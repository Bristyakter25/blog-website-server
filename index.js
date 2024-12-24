const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(cors());
app.use(express.json());

// user: blog_website
// password: Vw2COFS3jZu8D3fE




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lwvml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // blogs related apis

    const blogsCollection = client.db('blogWebsite').collection('blogs');
    const addBlogsCollection = client.db('blogWebsite').collection('addBlogs');

    app.get('/blogs',async(req,res) =>{
      const cursor = blogsCollection.find().limit(6);
      const result = await cursor.toArray() ;
      res.send(result);

    })


    app.get('/recentBlogs', async (req, res) => {
      try {
        // Fetch the most recent blogs, sorted by insertion time
        const cursor = addBlogsCollection.find().sort({ _id: -1 }).limit(6); // Sort by _id in descending order
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch recent blogs" });
      }
    });

    app.get('/addBlogs',async(req,res)=>{
      const cursor = addBlogsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/addBlogs',async(req,res)=>{
      const newBlog = req.body;
      console.log(newBlog);
      const result = await addBlogsCollection.insertOne(newBlog);
      res.send(result);
    })





  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('blog is ready to appear')
})

app.listen(port,()=>{
    console.log(`blog is waiting at: ${port}`)
})
