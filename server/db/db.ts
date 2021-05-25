import mongoose from 'mongoose';
import {MONGODB, REDISDB} from  '../settings/config';

//because there is no types module for it
const cache = require('mongoose-redis');

export default function MongoDBInit(){
    mongoose.connect(`mongodb+srv://${MONGODB.USER}:${MONGODB.PASS}@${MONGODB.HOST}/${MONGODB.DATABASE}`, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
        console.log(`Logged into database ${MONGODB.HOST}`);
    }); 

    cache(mongoose, `redis://${REDISDB.USER}:${REDISDB.PASS}@${REDISDB.HOST}:${REDISDB.PORT}`)
}
  