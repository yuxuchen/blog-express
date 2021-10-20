const redis = require('redis')
const {REDIS_CONF} = require('../config/db')

//create server
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err=>{
    console.error(err)
})
     

module.exports = redisClient