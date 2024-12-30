// https://www.youtube.com/watch?v=DHvZLI7Db8E

const userLeft = false
const userWatchingCatMeme = true

function watchTutorialCallback(callback, errorCallback) {
  if (userLeft) {
    errorCallback({
      name: 'User Left',
      message: ':('
    })
  } else if (userWatchingCatMeme) {
    errorCallback({
      name: 'User Watching Cat Meme',
      message: 'WebDevSimplified < Cat'
    })
  } else {
    callback('Thumbs up and Subsribe')
  }
}

watchTutorialCallback(
  (message) => {
    console.log('Success: ' + message);
  },
  (error) => {
    console.log(error.name + ' ' + error.message);
  }
)



// ### Convert the above code with promise #######################

function watchTutorialPromise() {
  return new Promise((resolve, reject) => {
    if (userLeft) {
      reject({
        name: 'User Left',
        message: ':('
      })
    } else if (userWatchingCatMeme) {
      reject({
        name: 'User Watching Cat Meme',
        message: 'WebDevSimplified < Cat'
      })
    } else {
      resolve('Thumbs up and Subsribe')
    }
  })
}

watchTutorialPromise()
  .then(message => {
    console.log('Success: ' + message);
  })
  .catch(error => {
    console.log(error.name + ' ' + error.message);
  })



// ### Promise.all() ###################

const recordVideoOne = new Promise((resolve, reject) => {
  // resolve('Video 1 Recorded')
  setTimeout(() => {
    resolve('Video 1 Recorded')
  }, 5000);
})

const recordVideoTwo = new Promise((resolve, reject) => {
  resolve('Video 2 Recorded')
})

const recordVideoThree = new Promise((resolve, reject) => {
  resolve('Video 3 Recorded')
})

Promise.race([
  recordVideoOne,
  recordVideoTwo,
  recordVideoThree
]).then(messages => {
  console.log(messages);
})