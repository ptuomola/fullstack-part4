const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response) => {
  if(typeof request.body.likes === 'undefined') 
    request.body = { likes: 0, ... request.body }

  if(typeof request.body.title === 'undefined' &&
     typeof request.body.url === 'undefined')
  {
    response.sendStatus(400)
    return
  }

  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  response
    .status(201)
    .json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})



module.exports = blogsRouter