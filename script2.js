'use strict'

// Fetch API, Async/Await in a few bites

// Medium.com Link: https://readmedium.com/en/https:/medium.com/nerd-for-tech/fetch-api-async-await-in-a-few-bites-6b4f19f7db9e
// https://www.freecodecamp.org/news/javascript-fetch-api-for-beginners/



// ### Fetch ###

// GET request
fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));

// POST request
fetch('https://jsonplaceholder.typicode.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'suhail',
    email: 'suhail@mail.com'
  }),
}).then(response => response.json())
  .then(data => console.log(data))






// ### ASYNC AWAIT ###

const myAsyncFn = async () => {
  try {
    let response = await fetch('https://jsonplaceholder.typicode.com/users/2') // with "await" keywork we can store an async fn in to variable
    let data = await response.json()
    console.log(data);
    // return data; // by writing "return data" we can call this function with '.then' method to get this returned data.
  } catch (e) {
    console.log(e);
  }
}

myAsyncFn()