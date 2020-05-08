// monkey-patching
import thumbWar from '../thumb-war'
// import the utils module (see hint #1 at the bottom of the file)
import * as utils from '../utils'

test('returns winner', () => {
  // keep track of the original `getWinner` utility function (see hint #2)
  const origFn = utils.getWinner
  utils.getWinner = (p1, p2) => p2
  // overwrite the utils.getWinner function with
  // our own that always returns the second player (see hint #3)

  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds')
  // change this assertion to be more for a specific player
  // (like 'Kent C. Dodds', see hint #4):
  expect(['Ken Wheeler', 'Kent C. Dodds'].includes(winner)).toBe(true)

  // restore the originalGetWinner function so other tests don't break
  // (see hint #5)
  utils.getWinner = origFn
})

/*

Hints below:






See answers in the solution file



































Hint #1:

import * as utils from '../utils'





Hint #2:

const originalGetWinner = utils.getWinner






Hint #3:

utils.getWinner = functionThatAlwaysReturnsPlayer2






Hint #4:

expect(winner).toBe('Kent C. Dodds')






Hint #5:

utils.getWinner = originalGetWinner

 */
