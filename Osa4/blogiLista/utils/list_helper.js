const dummy = (blogs) => 1
  
module.exports = {
    dummy
}
  
const totalLikes = (blogs) => {
   return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(n => n.likes)
    const index = likes.indexOf(Math.max(...likes))
    return blogs[index]
}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}