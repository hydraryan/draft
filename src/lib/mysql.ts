import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

if (!process.env.MYSQL_DATABASE) {
  throw new Error('MYSQL_DATABASE is not defined in .env.local');
}

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Generic query function with types
export const query = async <T = any>(sql: string, params?: any[]): Promise<T> => {
  const [results] = await pool.execute<T & RowDataPacket[] | ResultSetHeader>(sql, params);
  return results as T;
};

export default pool;
