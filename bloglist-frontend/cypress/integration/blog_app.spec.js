describe('Blog app', () => {

    beforeEach(function (){
        cy.login({ username: 'Anastasia', password: 'password' })
  
    it('login form is shown', () => {
      cy.contains('login')
      cy.contains('username')
      cy.contains('password')
    })
  
    describe('Login',function() {
      it('succeeds with correct credentials', function() {
        cy.get('#username').type('Anastasia')
        cy.get('#password').type('password')
        cy.get('#login-button').click()
        cy.contains('blogs')
        cy.contains('Anastasia logged in')
      })
  
      it('fails with wrong credentials', function() {
        cy.get('#username').type('Anastasia')
        cy.get('#password').type('wrongpassword')
        cy.get('#login-button').click()
        cy.get('.error').contains('Wrong username or password')
      })
    })
  

    describe('When logged in', function() {
        beforeEach(function() {
          cy.request('POST', 'http://localhost:3003/api/login', { username: 'Anastasia', password: 'password' })
            .then(response => {
              localStorage.setItem('loggedUser', JSON.stringify(response.body))
              cy.visit('http://localhost:3000')
            })
        })
    
        it('A blog can be created', function() {
          cy.get('.toggleButton').click()
          cy.get('#title').type('New Blog')
          cy.get('#author').type('Medium')
          cy.get('#url').type('medium.com')
          cy.get('.newBlogSaveButton').click()
          cy.get('.message').contains('Medium blogs')
        })
      })
  
      describe('Blog exists', function (){

        beforeEach(function() {
          cy.createBlog({ title: 'New Blog', author: 'Tatiana Safargalieva', url: 'hotel-admiral.ru', likes: 118 })
        })
  
        it(' can like the blog', function (){
          cy.contains('view').click()
          cy.contains('like').click()
          cy.contains('118')
        })
  
      })
  
      it('Delete blog', function (){
        cy.contains('New Blog')
        cy.contains('view').click()
        cy.contains('delete').click()
        cy.contains('The blog by Anastasia Safargalieva was deleted')
      })

      describe(' has multiple blogs', function () {
        beforeEach(function () {
          cy.createBlog({title: 'New Blog 1', author: 'Anastasia', url: 'https://medium.com/1', likes: 4})
          cy.createBlog({title: 'New Blog 2', author: 'Ivan', url: 'https://medium.com/2', likes: 67})
          cy.createBlog({title: 'New Blog 3', author: 'Mikhail', url: 'https://medium.com/13', likes: 12})
          cy.createBlog({title: 'New Blog 4', author: 'Olga', url: 'https://medium.com/14', likes: 78})
          cy.createBlog({title: 'New Blog 5', author: 'Elena', url: 'https://medium.com/15', likes: 90})
        })
  
        it('they are ordered according to likes ', function () {
          cy.get('.blogDetail>.blogListItem').should((blogg) => {
            expect(blogg[0]).to.contain('New Blog 5')
            expect(blogg[1]).to.contain('New Blog 4')
            expect(blogg[2]).to.contain('New Blog 2')
            expect(blogg[3]).to.contain('New Blog 3')
            expect(blogg[4]).to.contain('New Blog 1')
          })
        })
  
      })
    })
  
  })