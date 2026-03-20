const pool = require('../config/database');

class Contact {
  static async create(contactData) {
    const { name, email, subject, message } = contactData;
    const [result] = await pool.query(
      'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM contacts WHERE id = ?', [id]);
    return rows[0];
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM contacts WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Contact;
