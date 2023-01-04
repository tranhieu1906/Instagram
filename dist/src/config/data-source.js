"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "290429",
    database: "caseMD5",
    synchronize: false,
    logging: false,
    entities: ["dist/src/model/*.js"],
    migrations: ["dist/src/migrations/*.js"],
});
//# sourceMappingURL=data-source.js.map