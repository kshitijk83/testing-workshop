// Hi! This is for the instructor :)
import React from 'react'
import {Simulate} from 'react-testing-library'
import axiosMock from 'axios'
import {renderWithRouter, generate} from 'til-client-test-utils'
import {init as initAPI} from '../utils/api'
import App from '../app'
// add a beforeEach for cleaning up state and intitializing the API

beforeEach(() => {
  window.localStorage.removeItem('token')
  axiosMock.__mock.reset()
  initAPI()
})

test('register a new user', async () => {
  // render the app with the router provider and custom history
  const {
    container,
    getByTestId,
    getByText,
    finishLoading,
    getByLabelText,
  } = renderWithRouter(<App />)

  // wait for the app to finish loading the mocked requests
  await finishLoading()
  // navigate to register by clicking register-link
  const leftClick = {button: 0}
  Simulate.click(getByText('Register'), leftClick)
  expect(window.location.href).toContain('register')
  // fill out the form
  const fakeUser = generate.loginForm()
  const usernameNode = getByLabelText('username')
  const passwordNode = getByLabelText('password')
  const formWrapper = container.querySelector('form')
  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password
  // submit form
  // first use the axiosMock.__mock.instance
  // to mock out the post implementation
  // it should return the fake user + a token
  // which you can generate with generate.token(fakeUser)
  // Now simulate a submit event on the form
  const {post} = axiosMock.__mock.instance
  const token = generate.token(fakeUser)
  post.mockImplementationOnce(() =>
    Promise.resolve({
      data: {user: {...fakeUser, token}},
    }),
  )
  Simulate.submit(formWrapper)
  await finishLoading()
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledWith(
    '/auth/register',
    fakeUser,
  )
  // wait for the mocked requests to finish
  //
  // assert post was called correctly
  // assert localStorage is correct
  expect(window.localStorage.getItem('token')).toBe(token)
  // assert the user was redirected (window.location.href)
  expect(window.location.href).not.toContain('register')
  // assert the username display is the fake user's username
  expect(getByTestId('username-display').textContent).toBe(fakeUser.username)
  // assert the logout button exists
  expect(getByText('Logout')).toBeTruthy()
})
