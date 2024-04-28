const mongoose = require('mongoose');
const { DB_URL } = require('../config');

module.exports = async() => {

    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Products Db Connected');
        
    } catch (error) {
        console.log('Products services Error ============')
        console.log(error);
        process.exit(1);
    }
 
};

 