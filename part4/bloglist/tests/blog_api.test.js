const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

beforeEach(async() => {
  const newUser = {
    username: 'robert',
    name: 'robert',
    password: 'password'
  }
  await api.post('/api/users').send(newUser)
})

test('all blogs are returned as json', async () => {
  const response = await api.get('/api/blogs').expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('verifying the unique identifier property', async() => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => expect(blog.id).toBeDefined())
})

test('a valid blog can be added', async () => {

  const user = {
    username: 'robert',
    password: 'password'
  }

  const userLogin = await api.post('/api/login').send(user)
    .expect(200)

  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .set('Authorization', `bearer ${userLogin.body.token}`)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).toContain(
    'Canonical string reduction'
  )
})

test('if likes property is missing, default it to 0', async() => {
  const user = {
    username: 'robert',
    password: 'password'
  }

  const userLogin = await api.post('/api/login').send(user)
    .expect(200)

  const newBlog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .set('Authorization', `Bearer ${userLogin.body.token}`)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBeDefined()
  expect(response.body.likes).toBe(0)
})

test('Bad request if title and url are missing', async() => {
  const user = {
    username: 'robert',
    password: 'password'
  }

  const userLogin = await api.post('/api/login').send(user)
    .expect(200)

  const newBlog = {
    author: 'Edsger W. Dijkstra'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .set('Authorization', `Bearer ${userLogin.body.token}`)

  expect(response.body.error).toContain('Blog validation failed')
})

afterAll(() => {
  mongoose.connection.close()
})