const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

//example bloglists
const manyBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
    }
]

const oneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]


test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

const totalLikes = listHelper.totalLikes

describe('totalLikes', () => {
  test('of one value is the value itself', () => {

    assert.strictEqual(totalLikes(oneBlog), 5)
  })

  test('of many is calculated right', () => {
    assert.strictEqual(totalLikes(manyBlogs), 17)
  })

  test('of empty array is zero', () => {
    assert.strictEqual(totalLikes([]), 0)
  })
})

const favoriteBlog = listHelper.favoriteBlog

describe('favoriteBlog', () => {
    test('of one value is the value itself', () => {
      assert.strictEqual(favoriteBlog(oneBlog), oneBlog[0])
    })
  
    test('of many is calculated right', () => {
      assert.strictEqual(favoriteBlog(manyBlogs), manyBlogs[1])
    })
  
    test('of empty array is zero', () => {
      assert.strictEqual(favoriteBlog([]), undefined)
    })
  })

