import Redis from "ioredis";
import ICacheService from "../../interface/cache/ICacheService";

export default class RedisService
    implements ICacheService {

    constructor(
        private redis: Redis
    ) {}

    async get(key: string) {
        return await this.redis.get(key);
    }

    async set(
        key: string,
        value: string,
        ttl: number
    ) {
        await this.redis.set(
            key,
            value,
            "EX",
            ttl
        );
    }

    async delete(key: string) {
        await this.redis.del(key);
    }
}