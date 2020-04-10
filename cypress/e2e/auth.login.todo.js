// Normally you shouldn't need to break your tests up this much.
// Normally I'd just have a file called `auth` and have all my tests
// in that file. But I've split them up like this to make the workshop
// flow nicer with the demo and exercises.
// eslint-disable-next-line
import { generate } from '../utils'

describe('authentication', () => {
  let user
  beforeEach(() => {
    cy.logout()
      .createNewUser()
      .then(u => (user = u))
      .visit('/')
  })

  it('should allow existing users to login', () => {
    // you'll want to first create a new user.
    // This custom cypress command is similar to a promise, so you can do:
    // cy.createNewUser().then(user => {
    //   more cy commands here
    // })
    cy
      .getByText('login')
      .click()
      .getByLabelText('Username')
      .type(user.username)
      .getByLabelText('Password')
      .type(user.password)
      .getByText('Submit')
      .click()
      .assertRoute('/')
    cy.getByTestId('username-display').should('contain', user.username)
    // With the user created, go ahead and use the cy commands to:
    // 1. visit the app: visitApp
    // 2. Click the login link
    // 3. type the user's username in the username field
    // 4. type the user's password in the password field
    // 5. submit the form by clicking the submit button
    //
    // Finally assert the route changed to '/'
    // and verify that the display name contains user.username
  })

  //////// Elaboration & Feedback /////////
  // When you've finished with the exercises:
  // 1. Copy the URL below into your browser and fill out the form
  // 2. remove the `.skip` from the test below
  // 3. Change submitted from `false` to `true`
  // 4. And you're all done!
  /*
  http://ws.kcd.im/?ws=Testing&e=e2e%20register&em=kshitijk83@gmail.com
  */
  it.skip('I submitted my elaboration and feedback', () => {
    const submitted = false // change this when you've submitted!
    expect(submitted).toBe(true)
  })
  ////////////////////////////////
})
