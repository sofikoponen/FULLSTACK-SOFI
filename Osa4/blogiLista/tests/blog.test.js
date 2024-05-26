const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

test('right amount of blogs returns', async () => {
  const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
  assert.strictEqual(response.body.length, 3)
})

test('ID is id', async () => {
   const response = await api.get('/api/blogs')
   const id = response.body[0].id
   assert.strictEqual(id !== undefined, true)
})

test('HTTP POST works correctly', async () => {
    const newBlog = {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      }  

    await api
    .post('/api/blogs')
    .send(newBlog)

    const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length - initialBlogs.length, 1)
})

test('If likes are not defined they become 0', async () => {
    const newBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
      }  

      await api
      .post('/api/blogs')
      .send(newBlog)
  
      const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
      assert.strictEqual(response.body[3].likes, 0)
})

test('If url is not defined error(400)', async () => {
    const newBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        likes: 4
      }  

      const response = await api.post('/api/blogs').send(newBlog)
      assert.strictEqual(response.status, 400)
})

test('If title is not defined error(400)', async () => {
    const newBlog = {
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 4
      }  

      const response = await api.post('/api/blogs').send(newBlog)
      assert.strictEqual(response.status, 400)
})
test.only('Delete person works as it should', async () => {
    await api.delete('/api/blogs/5a422a851b54a676234d17f7')
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body[0].title, "Go To Statement Considered Harmful")
})

test.only('Update likes works as it should', async () => {
    const updatedBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 8
    }
    await api.put('/api/blogs/5a422b3a1b54a676234d17f9').send(updatedBlog)
    const response = await api.get('/api/blogs/5a422b3a1b54a676234d17f9')
    assert.strictEqual(response.body.likes, 8)
})

after(async () => {
  await mongoose.connection.close()
})

