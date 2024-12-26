const { ObjectId } = require("mongodb");
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
    const addWishlistCollection = client.db('blogWebsite').collection('wishList');
    const addCommentsCollection = client.db('blogWebsite').collection('addComments')

  

    app.get('/blogs',async(req,res) =>{
      const cursor = blogsCollection.find().limit(6);
      const result = await cursor.toArray() ;
      res.send(result);

    })


    app.get('/recentBlogs', async (req, res) => {
      try {
       
        const cursor = addBlogsCollection.find().sort({ _id: -1 }).limit(6); 
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

    app.post('/addBlogs', async (req, res) => {
      try {
          const blog = req.body; // Blog data from frontend
          const user = req.headers['user-email']; 
  
          
  
          
          const blogWithUser = { ...blog, userEmail: user };
  
          // Save the blog in the database
          const result = await addBlogsCollection.insertOne(blogWithUser);
          res.send(result);
      } catch (error) {
          console.error("Error adding blog:", error);
          res.status(500).send({ message: "Failed to add blog" });
      }
  });
  

    app.get('/addComments',async(req,res)=>{
     
      const cursor = addCommentsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/addComments', async (req, res) => {
      try {
          const comment = req.body; // Get the comment data from the request body
          const result = await addCommentsCollection.insertOne(comment); // Insert the comment into the database
          res.send(result); // Send a success response
      } catch (error) {
          console.error("Error adding comment:", error);
          res.status(500).send({ message: "Failed to add comment" });
      }
  });
  

    app.get('/wishList',async(req,res)=>{
      const wishlistItems = await addWishlistCollection.find().toArray();
    const blogIds = wishlistItems.map(item => new ObjectId(item.blogId));

    // Fetch full blog details for the wishlist items
    const blogs = await addBlogsCollection.find({ _id: { $in: blogIds } }).toArray();

    res.send(blogs);

    })

     // Ensure ObjectId is imported

app.get('/recentBlogs/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const details = await addBlogsCollection.findOne({ _id: new ObjectId(id) });
        if (!details) {
            return res.status(404).send({ message: "Blog not found" });
        }
        res.send(details);
    } catch (error) {
        console.error("Error fetching blog details:", error);
        res.status(500).send({ message: "Failed to fetch blog details" });
    }
});

app.get('/addBlogs/:id', async (req, res) => {
  const id = req.params.id;

  try {
      const details = await addBlogsCollection.findOne({ _id: new ObjectId(id) });
      if (!details) {
          return res.status(404).send({ message: "Blog not found" });
      }
      res.send(details);
  } catch (error) {
      console.error("Error fetching blog details:", error);
      res.status(500).send({ message: "Failed to fetch blog details" });
  }
});

app.get('/addBlog/:id',async(req,res)=>{
  const id = req.params.id;
  const query ={_id: new ObjectId(id)}
  const result = await addBlogsCollection.findOne(query);
  res.send(result);
});

app.put('/blogs/:id',async(req,res)=>{
  const{id} = req.params;
  const filter = {_id: new ObjectId(id)}
    const options = { upsert:true};
    const updateBlog = req.body;
    const update = {
      $set:{
        title: updateBlog.title,
        photo:updateBlog.photo,
        longDescription: updateBlog.longDescription,
        publishingYear: updateBlog.publishingYear,
        category: updateBlog.category

      }
    }
    const result = await addBlogsCollection.updateOne(filter,update,options);
    res.send(result);
})






app.post('/wishList', async (req, res) => {
    const { blogId } = req.body; // Only blogId, no user info
  
    try {
      // Check if blogId is already in the wishlist
      const existingEntry = await addWishlistCollection.findOne({ blogId });
      if (existingEntry) {
        return res.status(400).send({ message: 'Blog already in wishlist' });
      }
  
      // Insert the blogId into the wishlist collection
      const result = await addWishlistCollection.insertOne({ blogId });
      res.send(result);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      res.status(500).send({ message: 'Failed to add to wishlist' });
    }
  });



  
  
  
  
  

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
