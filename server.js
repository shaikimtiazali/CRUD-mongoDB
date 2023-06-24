const express = require('express');
const mongoose = require('mongoose');
const BrandName = require('./model');

const app = express();
app.use(express.json());

mongoose.connect(
  "mongodb+srv://imtiazali:imtiazali@cluster0.gqgbw9c.mongodb.net/?retryWrites=true&w=majority"
).then(()=>{
    console.log("Database connected");
}).catch(err => console.log(err));

app.post('/addbrands', async (request, response) => {
    const { brandname } = request.body;
    try {
        const newData = new BrandName({brandname});
        await newData.save();
        return response.json(await BrandName.find());
    } catch (e) {
        console.log(e.message);
        process.exit(1);        
    }
});

app.get('/getallbrands', async(request, response) => {
    try {
        const allData = await BrandName.find();
        return response.json(allData);
    } catch (error) {
        console.log(error.message);
        process.exit(1);        
    }
});

app.get('/getallbrands/:id', async (request,response) => {
    const {id} = request.params;
    try {
        const Data = await BrandName.findById(id);
        return response.json(Data);
    } catch (error) {
        console.log(error.message);
    }
});

app.delete('/deletebrand/:id', async (request, response) => {
    const {id} = request.params;
    try {
        await BrandName.findByIdAndDelete(id);
        return response.json(await BrandName.find());        
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
});

app.listen(4000, () => {
    console.log("Server is running at 4000");
});