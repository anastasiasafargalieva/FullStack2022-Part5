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

  return <form className='newBlogForm' onSubmit={addBlog}>
        title: <input id="title" value={newBlog}
      onChange={({ target }) => setNewBlog(target.value)} />
    <br/>
        author: <input id="author" value={newBlogAuthor}
      onChange={({ target }) => setNewBlogAuthor(target.value)}/>
    <br/>
        url: <input id="url" value={newBlogUrl}
      onChange={({ target }) => setNewBlogUrl(target.value)}/>
    <br/>
    <button className='newBlogSaveButton' type="submit">save</button>
  </form>
}



export default BlogForm