import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async newBlog => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const like = async blog => {
  const config = { headers: { Authorization: token } }
  if (blog.user.id){ blog.user = blog.user.id }
  blog.likes = blog.likes + 1
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const deleteBlog = async blogId => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

const blogService = { setToken, getAll, addBlog, like, deleteBlog }
export default blogService