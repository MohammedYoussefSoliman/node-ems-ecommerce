import supertest from 'supertest'
import app from '../main'

const mockRequest = supertest(app)

describe('/', () => {
  it('should get / correctly', async () => {
    const response = await mockRequest.get('/')
    expect(response.status).toEqual(200)
  })
})
