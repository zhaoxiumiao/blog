const redis = require('redis')
const {REDIS_CONF} = require('../conf/db') 

//创建客户端
const redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host)

redisClient.on('error', (err) => {
    console.log(err);
})

function set(key,val){
    if(typeof val === 'object'){
        val = JSON.stringify(val)
    }
    redisClient.set(key,val,redis.print)
}

function get(key){
    const promise = new Promise((reslove,reject) => {
        redisClient.get(key, (err,val) => {
            if(err){
                reslove(err);
                return
            }
            if(val === null){
                reslove(null)
                return
            }
            try{
                reslove(
                    JSON.parse(val)
                )
            }catch (ex){
                reslove(val)
            }
        })
    })
    return promise
}


module.exports = {
    set,
    get
}
