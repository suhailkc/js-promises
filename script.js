'use strict'

// XMLHttpRequest, callbacks and promises
// Medium.com Link: https://alicemoretti.medium.com/xmlhttprequest-callbacks-and-promises-257a4e63fe9a

// Function for XMLHttpRequest as per the provided resource link.
const getData = (resource, callback) => {  
  let request = new XMLHttpRequest();
  // console.log(request);
  request.addEventListener('readystatechange', () => {
    // console.log(request.readyState);
    if (request.readyState === 4 && request.status === 200) {
      // console.log(request.responseText);
      let data = JSON.parse(request.responseText)
      callback(undefined, data)
    } else if (request.readyState === 4) {
      // console.log('Could not fetch data');
      callback('Could not fetch data', undefined);
    }
  })
  request.open('GET', resource)
  request.send()
}


getData('https://jsonplaceholder.typicode.com/todos/1', (err, data) => {
  console.log(data)
})
getData('https://jsonplaceholder.typicode.com/todos/2', (err, data) => {
  console.log(data)
})
getData('https://jsonplaceholder.typicode.com/todos/3', (err, data) => {
  console.log(data)
})

// This getData function behaves asynchronously. means we don't get api data by same order of api call. 
// Means we may get todos by the order todo2, todo1, todo3 OR todo3, todo1, todo2
// To get by same order of api call (ie: todo1, todo2, todo3), we have use the below code:

getData('https://jsonplaceholder.typicode.com/todos/1', (err, data) => {
  console.log(data)
  // calling for todo2 inside todo1
  getData('https://jsonplaceholder.typicode.com/todos/2', (err, data) => {
    console.log(data)
    // calling for todo3 inside todo2
    getData('https://jsonplaceholder.typicode.com/todos/3', (err, data) => {
      console.log(data)
    })
  })
})

// This is an example of "callback hell". 
// Nesting callbacks inside other callbacks which eventually becomes very difficult to maintain.
// A way to avoid this messy code is to use what are called "promises".




// PROMISES
// Think promise as an Empty Container that will be filled with data in the future.

const getDataa = (resource) => {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.addEventListener('readystatechange', () => {
      if (request.readyState === 4 && request.status === 200) {
        let data = JSON.parse(request.responseText)
        resolve(data)
      } else if (request.readyState === 4) {
        reject('Could not fetch data')
      }
    })
    request.open('GET', resource)
    request.send()
  })
}

getDataa('https://jsonplaceholder.typicode.com/todos/1')
  .then(data => console.log('promise resolved', data))
  .catch(err => console.log('promise rejected', err))




// CHAINING PROMISES (to retrive the data sequentially)

getDataa('https://jsonplaceholder.typicode.com/todos/1')
  .then(data => {
    console.log('promise 1 resolved', data);
    return getDataa('https://jsonplaceholder.typicode.com/todos/2')
  })
  .then(data => {
    console.log('promise 2 resolved', data);
    return getDataa('https://jsonplaceholder.typicode.com/todos/3')
  })
  .then(data => {
    console.log('promise 3 resolved', data);
  })
  .catch(err => {
    console.log('promise rejected', err);
  })