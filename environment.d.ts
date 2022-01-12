declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'DEV' | 'PROD';
            PORT: number;
            PGHOST: string | number
            PGDATABASE: string
            PGUSER: string
            PGPASSWORD: string
            PGPORT: number
            ACCESS_TOKEN_SECRET: string
            REFRESH_TOKEN_SECRET: string
        }
    }
}



export {}