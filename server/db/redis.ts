import redis from 'redis';
import {REDISDB} from  '../settings/config';

export default function RedisDBInit(){
    return redis.createClient({
        host: REDISDB.HOST,
        port: REDISDB.PORT
    })
}
