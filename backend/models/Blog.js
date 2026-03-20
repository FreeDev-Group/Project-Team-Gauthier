const pool = require('../config/database');

class Blog {
  static async create(blogData) {
    const { title, content, author_id, image_url } = blogData;
    const [result] = await pool.query(
      'INSERT INTO blogs (title, content, author_id, image_url) VALUES (?, ?, ?, ?)',
      [title, content, author_id, image_url]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await pool.query(`
      SELECT b.*, u.name as author_name 
      FROM blogs b 
      LEFT JOIN users u ON b.author_id = u.id 
      ORDER BY b.created_at DESC
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(`
      SELECT b.*, u.name as author_name 
      FROM blogs b 
      LEFT JOIN users u ON b.author_id = u.id 
      WHERE b.id = ?
    `, [id]);
    return rows[0];
  }

  static async update(id, blogData) {
    const { title, content, image_url } = blogData;
    let query = 'UPDATE blogs SET title = ?, content = ?';
    let params = [title, content];
    
    if (image_url !== undefined) {
      query += ', image_url = ?';
      params.push(image_url);
    }
    
    query += ' WHERE id = ?';
    params.push(id);

    const [result] = await pool.query(query, params);
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM blogs WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Blog;
