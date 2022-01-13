const favoriteBlog = require('../../utils/list_helper').favoriteBlog
const blogs = require('./testData').blogs

test('Blog with most likes', () => {
  expect(favoriteBlog(blogs)).toEqual(blogs[2])
})