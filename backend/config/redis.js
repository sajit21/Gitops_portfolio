// import Redis from "ioredis";
// import dotenv from  "dotenv"
// dotenv.config();

// const redis=new Redis({
//     host: process.env.REDIS_HOST || "127.0.0.1",
//     port: process.env.REDIS_PORT || 6379
// })

// redis.on("connect",()=>console.log("Redis connected"))
// redis.on("error",(err)=>console.error("redis error",err))

// export default redis

import { Redis } from '@upstash/redis'
import dotenv from "dotenv"
dotenv.config()

const redis = new Redis({url: process.env.UPSTASH_REDIS_REST_URL, token:process.env.UPSTASH_REDIS_REST_TOKEN});

export default redis
