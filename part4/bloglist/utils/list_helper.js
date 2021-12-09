const lodash = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if(blogs.length === 0) {
    return 0
  }
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.reduce((prev, curr) => curr.likes > prev.likes ? curr : prev)
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0) {
    return {}
  }
  const groupBy = lodash.groupBy(blogs, 'author')
  const mapValues = lodash.mapValues(groupBy, (blogs) => blogs.length)
  const toPairs = lodash.toPairs(mapValues)
  const maxBlogs = toPairs.reduce((prev, curr) => curr[1] > prev[1] ? curr : prev)
  return { 'author': maxBlogs[0], 'blogs': maxBlogs[1] }
}

const mostLikes = (blogs) => {
  if(blogs.length === 0) {
    return {}
  }
  const groupBy = lodash.groupBy(blogs, 'author')
  const mapValues = lodash.mapValues(groupBy, totalLikes)
  const toPairs = lodash.toPairs(mapValues)
  const maxLikes = toPairs.reduce((prev, curr) => curr[1] > prev[1] ? curr : prev)
  return { 'author': maxLikes[0], 'likes': maxLikes[1] }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }