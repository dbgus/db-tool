import mysql, { type ConnectionOptions } from 'mysql2/promise'

export const connectMysql = async (config: ConnectionOptions) => mysql.createConnection(config)
