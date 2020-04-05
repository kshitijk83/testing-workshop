import React from 'react'
import reactDOM from 'react-dom'
import * as utilsMock from '../../utils/api'
import Editor from '../editor.todo'

jest.mock('../../utils/api', () => {
  return {
    posts: {
      create: jest.fn(() => Promise.resolve())
    }
  }
})

const flushPromises = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 0);
  })
}

test('calls onSubmit with the username and password when submitted', async () => {
  // Arrange
  // create a fake user, post, history, and api
  const container = document.createElement('div')
  const fakeUser = { id: 'asd' }
  const fakeHistory = {
    push: jest.fn()
  }
  reactDOM.render(<Editor history={fakeHistory} user={fakeUser} />, container)
  const form = container.querySelector('form');
  const { title, content, tags } = form.elements;
  title.value = 'hehe'
  content.value = 'blah'
  tags.value = 'one,   two, three'
  const submit = new window.Event('submit');
  form.dispatchEvent(submit);
  await flushPromises();
  expect(fakeHistory.push).toHaveBeenCalledTimes(1);
  expect(fakeHistory.push).toHaveBeenCalledWith('/');
  expect(utilsMock.posts.create).toHaveBeenCalledTimes(1);
  expect(utilsMock.posts.create).toHaveBeenCalledWith({
    authorId: fakeUser.id,
    content: 'blah',
    tags: ['one', 'two', 'three'],
    date: expect.any(String),
    title: 'hehe'
  });
  // use ReactDOM.render() to render the editor to a div
  //
  // fill out form elements with your fake post
  //
  // Act
  // submit form
  //
  // wait for promise to settle
  //
  // Assert
  // ensure the create function was called with the right data
})

// TODO later...
test('snapshot', () => { })
