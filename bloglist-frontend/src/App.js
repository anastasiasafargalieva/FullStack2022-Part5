import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON !== null) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken( user.token )
    }
    blogService.getAll().then(blogs => setBlogs( blogs ))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password, })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const handleLogout = async (event) =>  {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    blogService.setToken('')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>username
        <input type="text" value={username} name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>password
        <input type="password" value={password} name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleNewBlogAddition = async (newBlog) => {
    try{
      const blog = await blogService.addBlog(newBlog)
      blogService.getAll().then(blogs => setBlogs( blogs ))
      setInfoMessage(`a new blog ${blog.title} by ${blog.author}`)
      setTimeout(() => { setInfoMessage(null) }, 5000)
    } catch (exception) {
      setErrorMessage(`Failed to add blog. ${exception.message}`)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }
  const handleBlogLike = async (blogId) => {
    const blog = blogs.filter( b => b.id === blogId )[0]
    try{
      await blogService.like(blog)
      setBlogs( await blogService.getAll() )
      setInfoMessage(`liked ${blog.title} by ${blog.author}`)
      setTimeout(() => { setInfoMessage(null) }, 5000)
    } catch (exception) {
      setErrorMessage(`Failed to like blog ${blog.title}. ${exception.message}`)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const handleBlogDelete = async (blogId) => {
    const blog = blogs.filter( b => b.id === blogId )[0]
    try{
      if ( ! window.confirm(`Remove ${blog.title} by ${blog.author}?`) ) return
      await blogService.deleteBlog(blogId)
      setBlogs( await blogService.getAll() )
      setInfoMessage(`deleted ${blog.title} by ${blog.author}`)
      setTimeout(() => { setInfoMessage(null) }, 5000)
    } catch (exception) {
      setErrorMessage(`Failed to like blog ${blog.title}. ${exception.message}`)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const blogsSection = () => (
    <div>
      <h2>blogs</h2>
      <b>{user.username} logged in</b>
      <button onClick={handleLogout}>logout</button> <br/>

      <hr/>

      <Togglable buttonLabel='create new blog'>
        <h2>create new</h2>
        <BlogForm addNewBlog={handleNewBlogAddition} />
      </Togglable>

      <hr/>

      {
        blogs.sort((a,b) => b.likes - a.likes )
          .map(
            blog => {
              const allowDelete = blog.user  && (blog.user.username === user.username)
              return <Blog
                key={blog.id} blog={blog} like={handleBlogLike}
                deleteBlog={allowDelete ? handleBlogDelete : null}
              />
            })
      }


    </div>
  )

  return (
    <div>
      {errorMessage !== null && <Notification message={errorMessage} isError={true} />}
      {infoMessage !== null && <Notification message={infoMessage} isError={false} />}
      {user === null && loginForm()}
      {user !== null && blogsSection()}
    </div>
  )
}

export default App