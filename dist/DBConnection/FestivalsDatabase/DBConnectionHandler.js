"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConnectionHandler = void 0;
const pg_1 = require("pg");
const DBConnection_interface_1 = require("./DBConnection-interface");
require("dotenv/config");
class DBConnectionHandler {
    constructor() {
        this.poolConnections = [];
        const adminPoolConnection = this.getPoolConnection({
            host: process.env.PGHOST,
            port: process.env.PGPORT,
            database: process.env.PGDATABASE,
            user: process.env.PG_USER_ADMIN,
            password: process.env.PG_PASSWORD_ADMIN,
            connectionTimeoutMillis: process.env.PG_CONNECTION_TO_ADMIN,
            idleTimeoutMillis: process.env.PG_IDLE_TO_ADMIN,
            max: process.env.PG_MAX_ADMIN,
            allowExitOnIdle: process.env.PG_EXIT_ON_IDLE_ADMIN
        });
        const basicPoolConnection = this.getPoolConnection({
            host: process.env.PGHOST,
            port: process.env.PGPORT,
            database: process.env.PGDATABASE,
            user: process.env.PG_USER_BASIC,
            password: process.env.PG_PASSWORD_BASIC,
            connectionTimeoutMillis: process.env.PG_CONNECTION_TO_BASIC,
            idleTimeoutMillis: process.env.PG_IDLE_TO_BASIC,
            max: process.env.PG_MAX_BASIC,
            allowExitOnIdle: process.env.PG_EXIT_ON_IDLE_BASIC
        });
        const noAuthPoolConnection = this.getPoolConnection({
            host: process.env.PGHOST,
            port: process.env.PGPORT,
            database: process.env.PGDATABASE,
            user: process.env.PG_USER_NO_AUTH,
            password: process.env.PG_PASSWORD_NO_AUTH,
            connectionTimeoutMillis: process.env.PG_CONNECTION_TO_NO_AUTH,
            idleTimeoutMillis: process.env.PG_IDLE_TO_NO_AUTH,
            max: process.env.PG_MAX_NO_AUTH,
            allowExitOnIdle: process.env.PG_EXIT_ON_IDLE_NO_AUTH
        });
        this.poolConnections.push({ PG_USER: DBConnection_interface_1.POSTGRES_USERS.ADMIN, POOL: adminPoolConnection });
        this.poolConnections.push({ PG_USER: DBConnection_interface_1.POSTGRES_USERS.BASIC, POOL: basicPoolConnection });
        this.poolConnections.push({ PG_USER: DBConnection_interface_1.POSTGRES_USERS.NO_AUTH, POOL: noAuthPoolConnection });
    }
    get getAdminPoolConnection() {
        const connPoolAdmin = this.poolConnections.find(connPool => connPool.PG_USER === DBConnection_interface_1.POSTGRES_USERS.ADMIN);
        if (connPoolAdmin) {
            return connPoolAdmin.POOL;
        }
        throw Error('Unable to connect to the server !');
    }
    get getBasicPoolConnection() {
        const connPoolBasic = this.poolConnections.find(connPool => connPool.PG_USER === DBConnection_interface_1.POSTGRES_USERS.BASIC);
        if (connPoolBasic) {
            return connPoolBasic.POOL;
        }
        throw Error('Unable to connect to the server !');
    }
    get getNoAuthPoolConnection() {
        const connPoolNoAuth = this.poolConnections.find(connPool => connPool.PG_USER === DBConnection_interface_1.POSTGRES_USERS.NO_AUTH);
        if (connPoolNoAuth) {
            return connPoolNoAuth.POOL;
        }
        throw Error('Unable to connect to the server !');
    }
    static getInstance() {
        if (!DBConnectionHandler.instance) {
            DBConnectionHandler.instance = new DBConnectionHandler();
        }
        return DBConnectionHandler.instance;
    }
    getPoolConnection(connCred) {
        return new pg_1.Pool({
            host: connCred.host,
            port: connCred.port,
            database: connCred.database,
            user: connCred.user,
            password: connCred.password,
            connectionTimeoutMillis: connCred.connectionTimeoutMillis,
            idleTimeoutMillis: connCred.idleTimeoutMillis,
            max: connCred.max,
            allowExitOnIdle: connCred.allowExitOnIdle
        });
    }
}
exports.DBConnectionHandler = DBConnectionHandler;
