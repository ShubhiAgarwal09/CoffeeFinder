const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://arva-food:arva@cluster0.dlezxso.mongodb.net/arva-coffee?retryWrites=true&w=majority&appName=Cluster0';

module.exports = async function (callback = () => { }) {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("connected to mongo");

        const db = mongoose.connection.db;
        const foodCollection = await db.collection("food_items");
        const data = await foodCollection.find({}).toArray();

        const categoryCollection = await db.collection("foodCategory");
        const Catdata = await categoryCollection.find({}).toArray();

        callback(null, data, Catdata);
    } catch (err) {
        console.log("---" + err);
        callback(err, null, null);
    }
};

