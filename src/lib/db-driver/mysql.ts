import mysql from 'mysql2/promise'

export const mysqlDriver = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  port: 9301,
  database: 'cosmo',
  // Keep alive packets should be sent
  enableKeepAlive: true,
  // We should start sending them early
  keepAliveInitialDelay: 3 * 1000, // 3 seconds
  // We don't want idle connections, but it's not mandatory for the fix to work, it seems
  maxIdle: 0,
  // Idle timeout much larger than keep alive delay and much smaller than MySQL's timeout setting
  idleTimeout: 5 * 60 , // 5 minutes
})
