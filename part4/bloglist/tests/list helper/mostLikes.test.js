const mostLikes = require('../utils/list_helper').mostLikes
const blogs = require('./testData').blogs

test('Author with most likes', () => {
  expect(mostLikes(blogs)).toEqual({
    author: 'Edsger W. Dijkstra',
    likes: 17
  })
})