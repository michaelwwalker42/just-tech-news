async function upvoteClickHandler(event) {
  event.preventDefault();

  // You can take a URL string like http://localhost:3001/post/1, 
  // split it into an array based on the / character
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // Like the login.js logic you wrote previously, 
  // you can use this id variable in a fetch() request 
  // and then check the status of the request afterwards.
  const response = await fetch('/api/posts/upvote', {
    method: 'PUT',
    body: JSON.stringify({
      post_id: id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);