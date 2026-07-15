import sql from './db.js';

export default async function handler(req, res) {
  // Hanya izinkan metode GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Jalankan query ke database Neon
    const users = await sql`SELECT id, name, email, initials, role, join_date FROM users`;
    
    // Kembalikan response
    return res.status(200).json(users);
  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}