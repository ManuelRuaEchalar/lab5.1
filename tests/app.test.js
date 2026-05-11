const request = require('supertest');
const app = require('../src/app');

describe('Users API CRUD', () => {
  beforeEach(async () => {
    await request(app).post('/users/reset');
  });

  test('GET /health debe retornar status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('nandnad');
  });

  test('POST /users debe crear un usuario', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Alice', email: 'alice@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Alice');
    expect(res.body.email).toBe('alice@example.com');
  });

  test('GET /users debe retornar lista vacia al inicio', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  test('GET /users/:id debe retornar el usuario si existe', async () => {
    const createRes = await request(app).post('/users').send({ name: 'Bob', email: 'bob@example.com' });
    const id = createRes.body.id;

    const res = await request(app).get(`/users/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Bob');
  });

  test('PUT /users/:id debe actualizar el usuario', async () => {
    const createRes = await request(app).post('/users').send({ name: 'Charlie', email: 'charlie@example.com' });
    const id = createRes.body.id;

    const res = await request(app)
      .put(`/users/${id}`)
      .send({ name: 'Charles' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Charles');
  });

  test('DELETE /users/:id debe eliminar el usuario', async () => {
    const createRes = await request(app).post('/users').send({ name: 'David', email: 'david@example.com' });
    const id = createRes.body.id;

    const delRes = await request(app).delete(`/users/${id}`);
    expect(delRes.statusCode).toBe(204);

    const getRes = await request(app).get(`/users/${id}`);
    expect(getRes.statusCode).toBe(404);
  });
});
