import { neon } from '@neondatabase/serverless';

// Mengambil URL dari .env
const sql = neon(process.env.DATABASE_URL);

export default sql;