const request = require('supertest');
const app = require('../app');
const pool = require('../config/database');

// Simulation du pool de base de données pour les tests de routage de base
jest.mock('../config/database', () => ({
  query: jest.fn(),
  getConnection: jest.fn(),
}));

describe('Routes API de l\'application', () => {
  describe('Routes non gérées', () => {
    it('devrait retourner 404 pour une route inconnue', async () => {
      const res = await request(app).get('/api/v1/inconnu');
      expect(res.statusCode).toEqual(404);
      expect(res.body.status).toEqual('échec');
      expect(res.body.message).toContain('Impossible de trouver');
    });
  });

  describe('Exemple de test de validation', () => {
    it('devrait retourner 400 lors d\'une connexion sans identifiants', async () => {
      const res = await request(app).post('/api/v1/auth/login').send({});
      expect(res.statusCode).toEqual(400);
      expect(res.body.status).toEqual('échec');
      expect(res.body.errors).toHaveProperty('email');
      expect(res.body.errors).toHaveProperty('password');
    });
  });
});
