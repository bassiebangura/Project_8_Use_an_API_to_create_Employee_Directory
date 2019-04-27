let mainContainer = document.getElementById("employee-list-container")

/**** creates a capitalize method ****/
String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

const addData = (data) => {


   /* let liElement = document.createElement("li");
    liElement.setAttribute("class", "employee__card");

    let imgElement = document.createElement("img");
    imgElement.setAttribute("src", "https://randomuser.me/api/portraits/med/men/14.jpg")
    imgElement.setAttribute("alt", "employee's profile picture")
    imgElement.setAttribute("class", "img--avatar")

    liElement.appendChild(imgElement);

    let divElement = document.createElement("div");
    divElement.setAttribute("class", "employee__card__details")

    //create the children for the divElement
    let employeeName = document.createElement("p");
    employeeName.textContent = 'Bassie Bangura'
    employeeName.setAttribute("class", "employee__card__details__name");

    let employeeEmail = document.createElement("p");
    employeeEmail.textContent = "gg@gmail.com"
    employeeEmail.setAttribute("class", "employee__card__details__email");

    let employeeCity = document.createElement("p");
    employeeCity.textContent = "Chicago"
    employeeCity.setAttribute("class", "employee__card__details__city")

    //Add the created children to the divElement
    divElement.appendChild(employeeName);
    divElement.appendChild(employeeEmail);
    divElement.appendChild(employeeCity);

    //Appends the divElement to the li element after the imgElement
    liElement.appendChild(divElement);

    mainContainer.appendChild(liElement); */

    for (const item of data) {
        let firstName = item.name.first.capitalize(); 
        let lastName = item.name.last.capitalize();
        let fullName = `${firstName} ${lastName}`;
        let city = item.location.city.capitalize();
        let emailAddress = item.email.capitalize(); 
        let imgSource = item.picture.medium;

        let liElement = document.createElement("li");
        liElement.setAttribute("class", "employee__card");
    
        let imgElement = document.createElement("img");
        imgElement.setAttribute("src", imgSource)
        imgElement.setAttribute("alt", "employee's profile picture")
        imgElement.setAttribute("class", "img--avatar")
    
        liElement.appendChild(imgElement);
    
        let divElement = document.createElement("div");
        divElement.setAttribute("class", "employee__card__details")
    
        //create the children for the divElement
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

const fetchData = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(dataRcvd => {
            let dataNeeded = dataRcvd.results;
            addData(dataNeeded)
        });
}

fetchData('https://randomuser.me/api/?results=12');
   