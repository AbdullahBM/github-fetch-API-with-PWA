if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function (registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function (err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}


function getData() {
  console.log("testing");
  fetch("https://api.github.com/users/zeeshanhanif/followers").then(
    response => response.json())
    .then(data => {
      console.log("Data from network");
      if (document.getElementById('articles').innerHTML == "") {
        for (dat of data) {
          document.getElementById('articles').innerHTML +=
            `<ul>
              <li>User Name: ${dat.login}</li>
              <li>User Id: ${dat.id}</li>
          </ul>`
        }
      }
    })
    .catch(error => {
      console.log("Not working");
    })

  caches.match("https://api.github.com/users/zeeshanhanif/followers").then(function (response) {
    if (!response) {
      console.log("No data")
    }
    return response.json();
  }).then(function (daata) {
    console.log("data from cache =", daata[0].login)
    if (document.getElementById('articles').innerHTML == "") {
      for (dat of daata) {
        document.getElementById('articles').innerHTML +=
          `<ul>
              <li>User Name: ${dat.login}</li>
              <li>User Id: ${dat.id}</li>
          </ul>`
      }
    }
  }).catch(function () {
    console.log("error");
  })
}