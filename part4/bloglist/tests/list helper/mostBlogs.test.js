const mostBlogs = require('../utils/list_helper').mostBlogs
const blogs = require('./testData').blogs

test('Author with most blogs', () => {
  expect(mostBlogs(blogs)).toEqual({
    author: 'Robert C. Martin',
    blogs: 3
  })
})