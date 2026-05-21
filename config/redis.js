import { createClient } from "redis";

const redis = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redis.on('error', err=> {
    console.log('redis error:', err)
});

export default redis;