fetch('https://randomuser.me/api/?results=1')
    .then(response => response.json())
    .then(data => console.log(data));