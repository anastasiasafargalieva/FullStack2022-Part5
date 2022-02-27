import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import BlogForm from './BlogForm'


describe('<Blog />', () => {
  let blogDetailComponent
  const likeMockHandler = jest.fn()
  const deleteBlogMockHandler = jest.fn()
  const blogRequest = {
    'title': 'New Blog',
    'author': 'Anastasia Safargalieva',
    'url': 'mynewblog.com',
    'likes': '10'
  }

  beforeEach(() => {
    blogDetailComponent = render(<Blog blog={blogRequest} like={likeMockHandler} deleteBlog={deleteBlogMockHandler}/>)
  })

  test('contains title and author initially', () => {
    const blogDetailDiv = blogDetailComponent.container.querySelector('.blogDetail')
    expect( blogDetailDiv ).toHaveTextContent( 'New Blog Anastasia' )
  })

  test('does not contain url and likes initially', () => {
    const togglableContentDiv = blogDetailComponent.container.querySelector('.togglableContent')
    expect(togglableContentDiv).toHaveStyle('display: none')
    expect(togglableContentDiv).toHaveTextContent('mynewblog.com')
    expect(togglableContentDiv).toHaveTextContent('10')
  })

  test('blog\'s url and number of likes are shown when the button controlling the shown details has been clicked', () => {
    const viewButton = blogDetailComponent.container.querySelector('button')
    fireEvent.click(viewButton)
    const togglableContentDiv = blogDetailComponent.container.querySelector('.togglableContent')
    expect(togglableContentDiv).not.toHaveStyle('display: none')
    expect(togglableContentDiv).toHaveTextContent('mynewblog.com')
    expect(togglableContentDiv).toHaveTextContent('10')
  })

  test('clicking the button twice causing the event handler receive the component as props twice', () => {
    const likeButton = blogDetailComponent.container.querySelector('.likeButton')
    expect(likeMockHandler.mock.calls).toHaveLength(0)
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(likeMockHandler.mock.calls).toHaveLength(2)
  })

  describe('<BlogForm />', () => {
    const addNewBlogMockHandler = jest.fn()
    let newBlogFormComponent
  
    beforeEach( () => {
      newBlogFormComponent = render(<BlogForm addNewBlog={addNewBlogMockHandler}/>)
    })
  
    test('form calls the event handler it received as props with the right details when a new blog is created', () => {
      const newBlogForm = newBlogFormComponent.container.querySelector('.newBlogForm')
      const author = newBlogFormComponent.container.querySelector('#author')
      const title = newBlogFormComponent.container.querySelector('#title')
      const url = newBlogFormComponent.container.querySelector('#url')
      const testNewBlog = {
        'title': 'Fairytales',
        'author': 'Pushkin',
        'url': 'pushkin.com'
      }
      fireEvent.change(author, { target: { value: 'Fairytales' } })
      fireEvent.change(title, { target: { value: 'Pushkin' } })
      fireEvent.change(url, { target: { value: 'https://pushkin.com' } })
      fireEvent.submit(newBlogForm)
      expect(addNewBlogMockHandler.mock.calls).toHaveLength(1)
      expect(addNewBlogMockHandler.mock.calls[0][0]).toEqual(testNewBlog)
    })

} ) }