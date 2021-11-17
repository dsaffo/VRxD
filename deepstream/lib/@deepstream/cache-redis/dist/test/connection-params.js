"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost',
    ttl: 2,
};
//# sourceMappingURL=connection-params.js.map