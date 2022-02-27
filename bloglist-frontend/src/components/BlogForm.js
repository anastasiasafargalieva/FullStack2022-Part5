import React, { useState } from 'react'

const BlogForm = ( { addNewBlog } ) => {
  const [newBlog, setNewBlog] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blogRequest = {
      'title': newBlog,
      'author': newBlogAuthor,
      'url': newBlogUrl
    }
    addNewBlog(blogRequest)
    setNewBlog('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return <form onSubmit={addBlog}>
        title: <input value={newBlog}
      onChange={({ target }) => setNewBlog(target.value)} />
    <br/>
        author: <input value={newBlogAuthor}
      onChange={({ target }) => setNewBlogAuthor(target.value)}/>
    <br/>
        url: <input value={newBlogUrl}
      onChange={({ target }) => setNewBlogUrl(target.value)}/>
    <br/>
    <button type="submit">save</button>
  </form>
}



export default BlogForm