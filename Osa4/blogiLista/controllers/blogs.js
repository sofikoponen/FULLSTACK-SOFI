const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
  })

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
      if (blog) {
        response.json(blog.toJSON())
      } else {
        console.log('blog could not be found')
        response.status(404).end()
      }
    })

  
  blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({error: 'token invalid'})
    }
    const user = await User.findById(decodedToken.id)
    if (!user) {
      return response.status(404).json({error: 'user not found'})
    }

    if (((body.title === null) || (body.title === undefined)) || (((body.url === null) || (body.url === undefined)))) {
      response.status(400).end()

    }else{
      if ((body.likes === null) || (body.likes === undefined)) {
        body.likes = 0
      }
      const blog = new Blog({
        title: body.title,
        author: body.author,
        user: user.id,
        url: body.url,
        likes: body.likes
      })

      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
    }
  })

  blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({error: 'token invalid'})
    } else {
      const blog = await Blog.findById(request.params.id)
      if (blog.user.toString() === decodedToken.id) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(400).end()
      } else { 
        response.status(400).end()
      }
    }
  })

  blogsRouter.put('/:id', async (request, response) => {
    const {title, author, url, likes} = request.body
    const blog = {title, author, url, likes}

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog)
    })

  

  module.exports = blogsRouter