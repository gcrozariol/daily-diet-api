import { app } from '../app'
import request from 'supertest'
import { execSync } from 'node:child_process'
import { describe, it, beforeEach, beforeAll, afterAll } from 'vitest'

describe('Users routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex:rollback -- all')
    execSync('npm run knex:latest')
  })

  it('should be able to create a user', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'Guilherme',
        email: 'guicrozariol@gmail.com',
      })
      .expect(201)
  })

  it('should fail to create a user, name is missing', async () => {
    await request(app.server)
      .post('/users')
      .send({
        email: 'guicrozariol@gmail.com',
      })
      .expect(422)
  })

  it('should fail to create a user, email is missing', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'Guilherme',
      })
      .expect(422)
  })
})
