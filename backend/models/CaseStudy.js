const pool = require('../config/database');

class CaseStudy {
  static async create(data) {
    const { title, client_name, industry, challenge, solution, results, image_url } = data;
    const [result] = await pool.query(
      'INSERT INTO case_studies (title, client_name, industry, challenge, solution, results, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, client_name, industry, challenge, solution, results, image_url]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM case_studies ORDER BY created_at DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM case_studies WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, data) {
    const { title, client_name, industry, challenge, solution, results, image_url } = data;
    
    let query = 'UPDATE case_studies SET title=?, client_name=?, industry=?, challenge=?, solution=?, results=?';
    let params = [title, client_name, industry, challenge, solution, results];
    
    if (image_url !== undefined) {
      query += ', image_url=?';
      params.push(image_url);
    }
    
    query += ' WHERE id=?';
    params.push(id);

    const [result] = await pool.query(query, params);
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM case_studies WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = CaseStudy;
