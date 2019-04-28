/**** creates a capitalize method on javascript prototype ****/
String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

//reverse string helper function
const reverseString = str => str.split("").reverse().join("");


let mainContainer = document.getElementById("employee-list-container")



const addData = (data) => {
    for (const item of data) {

        //This first part collects and store data from api in variables
        let firstName = item.name.first.capitalize(); 
        let lastName = item.name.last.capitalize();
        let fullName = `${firstName} ${lastName}`;
        let city = item.location.city.capitalize();
        let emailAddress = item.email; 
        let imgSource = item.picture.medium;

        //more data for modal window
        let phoneNumber = item.phone;
        let address = `${item.location.street.capitalize()} ${city}, ${item.location.state.capitalize()} ${item.location.postcode}`;
        let dob = reverseString( `${item.dob.date.slice(0, 10).slice(-8).replace(/-/g, "/")}`);
        let birthday = `Birthday:${dob}`
        console.log(address)


        //create elements to be added to page
        let liElement = document.createElement("li");
        liElement.setAttribute("class", "employee__card");
    
        let imgElement = document.createElement("img");//element holds employee picture
        imgElement.setAttribute("src", imgSource)
        imgElement.setAttribute("alt", "employee's profile picture")
        imgElement.setAttribute("class", "img--avatar")
    
        liElement.appendChild(imgElement);
    
        let divElement = document.createElement("div");
        divElement.setAttribute("class", "employee__card__details")
    
        //create the children for the divElement which is going to contain employee details
        let employeeName = document.createElement("p");
        employeeName.textContent = fullName;
        employeeName.setAttribute("class", "employee__card__details__name");
    
        let employeeEmail = document.createElement("p");
        employeeEmail.textContent = emailAddress;
        employeeEmail.setAttribute("class", "employee__card__details__email");
    
        let employeeCity = document.createElement("p");
        employeeCity.textContent = city;
        employeeCity.setAttribute("class", "employee__card__details__city")
    
        //Add the created children to the divElement
        divElement.appendChild(employeeName);
        divElement.appendChild(employeeEmail);
        divElement.appendChild(employeeCity);
    
        //Appends the divElement to the li element after the imgElement
        liElement.appendChild(divElement);

        mainContainer.appendChild(liElement);
    }
}


//create a function to call the fetch api
const fetchData = (url) => {
    //use fetch api and promises to get and format data
    //pass data to addData() fxn that extracts and store needed data in variables
    //and use format.
    fetch(url)
        .then(response => response.json())
        .then(dataRcvd => {
            let dataNeeded = dataRcvd.results;
            addData(dataNeeded)
            return dataNeeded
        })
        .then(res => {
            console.log(res)
            modalWindowDisplay();
        });
}

fetchData('https://randomuser.me/api/?results=12');//invoke fetchData function passing 'url';


let modalWindowDisplay = () => {
    //******** THE MODAL WINDOW ***********//
    // Get the modal
    const modal = document.getElementById('myModal');
    const modalContentContainer = document.querySelector('.modal-content');

    // Get the element that opens the modal
    let employeesCards = document.querySelectorAll(".employee__card");
    console.log(employeesCards)

    // Get the <span> element that closes the modal
    let modalCloser = document.querySelector(".close");
    console.log(modalCloser)

    // When the user clicks on any card, a modal with that card opens
    employeesCards.forEach((employeeCard) => { 
            console.log(employeeCard);
            employeeCard.addEventListener('click', () => {
                modal.style.display = "block";
               
            })
        }
    )
    
    // When the user clicks on <span> (x), close the modal
    modalCloser.addEventListener('click', () => {
    modal.style.display = "none";
    })

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        }
    }
}
