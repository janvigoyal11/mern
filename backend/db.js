// database connectivity using mongodb!

const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://janvigo396:janvimongodbmern@cluster0.qbem0uv.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0'

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected successfully...!');

        const fetch_data = mongoose.connection.db.collection("food_items");
        const data = await fetch_data.find({}).toArray();

        const foodCategory = mongoose.connection.db.collection("foodCategory");
        const catdata = await foodCategory.find({}).toArray();
        // console.log(data);
        // console.log(catdata);
        global.food_items = data;
        global.foodCategory = catdata;
    }
    catch (error) {
        console.log(error);
    }
};

module.exports = mongoDB;

