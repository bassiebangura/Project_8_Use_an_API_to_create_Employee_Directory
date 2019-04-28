/**** creates a capitalize method on javascript prototype ****/
String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

//reverse string helper function
const reverseString = str => str.split("").reverse().join("");


let mainContainer = document.getElementById("employee-list-container")



const addData = (data) => {
    const employeeData = {};
    
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
        let employeeIDForData = `${firstName}${phoneNumber}${lastName}`
        //** */console.log(employeeIDForData)

        //create object containing data needed to create cards and modal window
        employeeData[employeeIDForData] = {fullName, emailAddress, city, phoneNumber, address, birthday, imgSource};
        //** */console.log(employeeData)

        //create elements to be added to page
        let liElement = document.createElement("li");
        liElement.setAttribute("class", "employee__card");

        //setting unique ID for Modal display use
        liElement.setAttribute("id", employeeIDForData)
    
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
    return employeeData
}


//create a function to call the fetch api
const fetchData = (url) => {
    //use fetch api and promises to get and format data
    //pass data to addData() fxn that extracts and store needed data in variables
    //and use format.
    fetch(url)
        .then(response => response.json())
        .then(dataRcvd => {
            let employeeDataReturned = addData(dataRcvd.results);
            createAndDisplayModal(employeeDataReturned);
        });
            
}

fetchData('https://randomuser.me/api/?results=12');//invoke fetchData function passing 'url';


let createAndDisplayModal = (data) => {
    //******** THE MODAL WINDOW ***********//
    // Get the modal
    console.log(data)
    const modal = document.getElementById('myModal');

    // Get the element that opens the modal
    let employeesCards = document.querySelectorAll(".employee__card");
    //** */console.log(employeesCards)

    // Get the <span> element that closes the modal
    let closeSpan = document.createElement("span") 
    closeSpan.setAttribute("class" , "close")
    closeSpan.textContent = "&times;"
    let modalCloser = document.querySelector(".close");
    //** */console.log(modalCloser)

    // When the user clicks on any card, a modal with that card opens
    employeesCards.forEach((employeeCard) => { 
            //** */console.log(employeeCard);
            employeeCard.addEventListener('click', () => {
                modal.style.display = "block";
                for (let item in data) {
                    if ( item === employeeCard.getAttribute("id")) { //check which card was clicked
                        let individualEmployeeData = data[item]
                        console.log(individualEmployeeData.fullName);

                        //create contents to be added to modalContentContainer
                        let modalContent = document.createElement("div");
                        modalContent.setAttribute("class", "centered modal-content")

                        if(modal.childElementCount) { //check and remove any previous modal content
                            modal.removechild
                        } else {
                            modal.appendChild(modalContent)
                        }
                    }
                }
               
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
