const totalLikes = require('../../utils/list_helper').totalLikes
const blogs = require('./testData').blogs

describe('total Likes', () => {
  test('of all blogs', () => {
    let total = totalLikes(blogs)
    expect(total).toBe(36)
  })
  test('of one blog', () => {
    let total = totalLikes([blogs[0]])
    expect(total).toBe(7)
  })
})
