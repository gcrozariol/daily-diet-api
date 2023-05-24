import { app } from '../app'
import request from 'supertest'
import { execSync } from 'node:child_process'
import { describe, it, beforeEach, beforeAll, afterAll } from 'vitest'

describe('Meals routes', () => {
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

  it('should be able to create a meal', async () => {
    const user = await request(app.server)
      .post('/users')
      .send({
        name: 'Guilherme',
        email: 'guicrozariol@gmail.com',
      })
      .expect(201)

    const cookies = user.get('set-cookie')

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Cheeseburger',
        description: 'Cheeseburger with lettuce and tomato.',
        is_diet: false,
        date: new Date(),
      })
      .expect(201)
  })

  it("should be able to retrieve all users' meals", async () => {
    const user = await request(app.server)
      .post('/users')
      .send({
        name: 'Guilherme',
        email: 'guicrozariol@gmail.com',
      })
      .expect(201)

    const cookies = user.get('set-cookie')

    for (let i = 0; i >= 5; i++) {
      await request(app.server)
        .post('/meals')
        .set('Cookie', cookies)
        .send({
          name: `Cheeseburger 0${i}`,
          description: `Cheeseburger description 0${i}`,
          is_diet: Math.random() < 0.5,
          date: new Date(),
        })
    }

    await request(app.server).get(`/meals`).set('Cookie', cookies).expect(200)
  })

  it('should be able to retrieve a meal by its id', async () => {
    const user = await request(app.server)
      .post('/users')
      .send({
        name: 'Guilherme',
        email: 'guicrozariol@gmail.com',
      })
      .expect(201)

    const cookies = user.get('set-cookie')

    const meal = await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Cheeseburger',
        description: 'Cheeseburger description',
        is_diet: false,
        date: new Date(),
      })

    await request(app.server)
      .get(`/meals/${meal.body.id}`)
      .set('Cookie', cookies)
      .send({
        name: 'Cheeseburger',
        description: 'Cheeseburger description',
        is_diet: false,
        date: new Date(),
      })
      .expect(200)
  })

  it('should be able to update a meal by its id', async () => {
    const user = await request(app.server)
      .post('/users')
      .send({
        name: 'Guilherme',
        email: 'guicrozariol@gmail.com',
      })
      .expect(201)

    const cookies = user.get('set-cookie')

    const meal = await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Cheeseburger',
        description: 'Cheeseburger description',
        is_diet: false,
        date: new Date(),
      })

    await request(app.server)
      .put(`/meals/${meal.body.id}`)
      .set('Cookie', cookies)
      .send({
        name: 'Cheeseburger',
        description: 'Cheeseburger description',
        is_diet: false,
        date: new Date(),
      })
      .expect(200)
  })

  it('should be able to delete a meal by its id', async () => {
    const user = await request(app.server)
      .post('/users')
      .send({
        name: 'Guilherme',
        email: 'guicrozariol@gmail.com',
      })
      .expect(201)

    const cookies = user.get('set-cookie')

    const meal = await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Cheeseburger',
        description: 'Cheeseburger description',
        is_diet: false,
        date: new Date(),
      })

    await request(app.server)
      .delete(`/meals/${meal.body.id}`)
      .set('Cookie', cookies)
      .expect(204)
  })
})
