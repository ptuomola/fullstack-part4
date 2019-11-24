const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => blogs.reduce((sum, val) => sum + val.likes, 0)

const favouriteBlog = (blogs) => blogs.reduce((max, val) => (val.likes >= max.likes) ? val : max)

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}