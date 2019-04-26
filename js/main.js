const addData = (data) => {
    let firstName = data.results[0].name.first; 
    let lastName = data.results[0].name.last;
    let city = data.results[1].location.city;
    let emailAddress = data.results[2].email;
    console.log(`${firstName} ${lastName} ${emailAddress} ${city}`)
    }

const fetchData = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            addData(data)
        });
}

fetchData('https://randomuser.me/api/?results=12');
   