import React from 'react'
import Togglable from './Togglable'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, like, deleteBlog }) => {
  return (
    <div style={blogStyle} className="blogDetail">
      <div className='blogListItem'>{blog.title} {blog.author}</div>
      <Togglable buttonLabel="view" hideLabel="hide">
        {blog.url}<br/>
        {blog.likes} <button className='likeButton' onClick = { () => like(blog.id) }>like</button> <br/>        {blog.author}<br/>
        {deleteBlog && <button className='deleteButton' onClick = { () => deleteBlog(blog.id) }>delete</button>}
      </Togglable>
    </div>
  )
}

export default Blog