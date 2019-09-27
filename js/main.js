/**********  Helper Function ************/
const capitalize = s => {
  //capitalize a string passed to it
  if (typeof s !== "string") return "";
  return `${s.charAt(0).toUpperCase()}${s.slice(1)}`;
};

let formatDOB = dob => {
  //function returns DOB in format needed for display
  let { date } = dob;
  let dateOfBirth = new Date(date);
  let day = dateOfBirth.getDate();
  let month = dateOfBirth.getMonth() + 1;
  let year = dateOfBirth.getYear();
  return `${month}-${day}-${year}`;
};

let url = "https://randomuser.me/api/?results=25";
// let mainContainer = document.getElementById("employee-cards-parent-wrapper");
//////////////////////////just added
let formatEmployeeData = data => {
  //function recieves data from fetch request as parameter
  //formats data and put them in an array
  let arrayOfEmployeeData = [];
  for (item of data) {
    let firstName = item.name.first;
    let lastName = item.name.last;
    let fullName = `${firstName} ${lastName}`;
    let city = item.location.city;
    let emailAddress = item.email;
    let imgSource = item.picture.medium;

    let dob = formatDOB(item.dob);
    arrayOfEmployeeData.push({ fullName, city, emailAddress, imgSource, dob });
  }
  return arrayOfEmployeeData;
};

let employeeCardsParentWrapper = document.querySelector(
  "section.js-employee-directory-wrapper"
);
employeeCardsParentWrapper.innerHTML = "";
// const addData = data => {
//   const employeeData = {};

//   for (const item of data) {
//     //This first part collects and store data from api in variables
//     let firstName = capitalize(item.name.first);
//     let lastName = capitalize(item.name.last);
//     let fullName = `${firstName} ${lastName}`;
//     let city = capitalize(item.location.city);
//     let emailAddress = item.email;
//     let imgSource = item.picture.medium;

//     //more data for modal window
//     let phoneNumber = item.phone;
//     let address = `
//                       ${capitalize(item.location.street)}
//                       ${city},
//                       ${capitalize(item.location.state)}
//                       ${item.location.postcode}`;
//     let dob = formatDOB(item.dob);
//     let birthday = `Birthday:${dob}`;
//     let employeeIDForData = `${firstName}${phoneNumber}${lastName}`;
//     //** */console.log(employeeIDForData)

//     //create object containing data needed to create cards and modal window
//     employeeData[employeeIDForData] = {
//       fullName,
//       emailAddress,
//       city,
//       phoneNumber,
//       address,
//       birthday,
//       imgSource
//     };
//     //** */console.log(employeeData)

//     //create elements to be added to page
//     let liElement = document.createElement("li");
//     liElement.setAttribute("class", "employee__card");

//     //setting unique ID for Modal display use
//     liElement.setAttribute("id", employeeIDForData);

//     let imgElement = document.createElement("img"); //element holds employee picture
//     imgElement.setAttribute("src", imgSource);
//     imgElement.setAttribute("alt", "employee's profile picture");
//     imgElement.setAttribute("class", "img--avatar");

//     liElement.appendChild(imgElement);

//     let divElement = document.createElement("div");
//     divElement.setAttribute("class", "employee__card__details");

//     //create the children for the divElement which is going to contain employee details
//     let employeeName = document.createElement("p");
//     employeeName.textContent = fullName;
//     employeeName.setAttribute("class", "employee__card__details__name");

//     let employeeEmail = document.createElement("p");
//     employeeEmail.textContent = emailAddress;
//     employeeEmail.setAttribute("class", "employee__card__details__email");

//     let employeeCity = document.createElement("p");
//     employeeCity.textContent = city;
//     employeeCity.setAttribute("class", "employee__card__details__city");

//     //Add the created children to the divElement
//     divElement.appendChild(employeeName);
//     divElement.appendChild(employeeEmail);
//     divElement.appendChild(employeeCity);

//     //Appends the divElement to the li element after the imgElement
//     liElement.appendChild(divElement);

//     mainContainer.appendChild(liElement);
//   }
//   return employeeData;
// };

//create a function to call the fetch api
fetch(url)
  .then(res => res.json())
  .then(res => res.results)
  .then(res => formatEmployeeData(res))
  .then(res => {
    res.forEach(employeeCard => {
      console.log(employeeCard);
      let { fullName, city, emailAddress, imgSource, dob } = employeeCard;
      employeeCardsParentWrapper.innerHTML += `<article class="employee__card">
         <img src=${imgSource} alt="employee's profile picture" class="img--avatar">
            <div class="employee__card__details">
              <p class="employee__card__details__name">${fullName}</p>
              <p class="employee__card__details__email">${emailAddress}</p>
              <p class="employee__card__details__city">${city}</p>
            </div>
    </article>`;
    });
  });

// let createAndDisplayModal = data => {
//   //******** THE MODAL WINDOW ***********//
//   // Get the modal
//   console.log(data);
//   const modal = document.getElementById("myModal");
//   const modalContentContainer = document.querySelector(
//     ".modal-content-container"
//   );

//   // Get the element that opens the modal
//   let employeesCards = document.querySelectorAll(".employee__card");
//   //** */console.log(employeesCards)

//   //Get close span;
//   let closeSpan = document.querySelector(".close");

//   // When the user clicks on any card, a modal with that card opens
//   employeesCards.forEach(employeeCard => {
//     //** */console.log(employeeCard);
//     employeeCard.addEventListener("click", e => {
//       modal.style.display = "block";
//       let listenerTarget = e.currentTarget;
//       let employeeCardElementId = listenerTarget.id;
//       //remove elements
//       document.querySelectorAll(".addedElement").forEach(e => {
//         e.parentNode.removeChild(e);
//       });

//       //console.log(employeeCardElementId);
//       //console.log(e.currentTarget)

//       for (let item in data) {
//         if (item === employeeCardElementId) {
//           //check which card was clicked
//           let individualEmployeeData = data[item];

//           //img element
//           let imgModalElement = document.createElement("img");
//           imgModalElement.setAttribute(
//             "class",
//             "addedElement img--avatar img--avatar__modal"
//           );
//           imgModalElement.setAttribute("src", individualEmployeeData.imgSource);

//           //fullname element
//           let fullNameModalElement = document.createElement("P");
//           fullNameModalElement.setAttribute("class", "addedElement");
//           fullNameModalElement.setAttribute("id", "fullNameForModal");
//           fullNameModalElement.textContent = individualEmployeeData.fullName;

//           //email address
//           let emailAddressModalElement = document.createElement("P");
//           emailAddressModalElement.setAttribute("class", "addedElement");
//           emailAddressModalElement.setAttribute("id", "emailAddressForModal");
//           emailAddressModalElement.textContent =
//             individualEmployeeData.emailAddress;

//           //city
//           let cityModalElement = document.createElement("P");
//           cityModalElement.setAttribute("class", "addedElement");
//           cityModalElement.textContent = individualEmployeeData.city;

//           //hr
//           let hrModalElement = document.createElement("hr");
//           hrModalElement.setAttribute("class", "addedElement");

//           //phone number
//           let phoneNumberModalElement = document.createElement("P");
//           phoneNumberModalElement.setAttribute("class", "addedElement");
//           phoneNumberModalElement.textContent =
//             individualEmployeeData.phoneNumber;

//           //address
//           let addressModalElement = document.createElement("P");
//           addressModalElement.setAttribute("class", "addedElement");
//           addressModalElement.textContent = individualEmployeeData.address;

//           //birthday
//           let birthdayModalElement = document.createElement("P");
//           birthdayModalElement.setAttribute("class", "addedElement");
//           birthdayModalElement.textContent = individualEmployeeData.birthday;

//           modalContentContainer.appendChild(imgModalElement);
//           modalContentContainer.appendChild(fullNameModalElement);
//           modalContentContainer.appendChild(emailAddressModalElement);
//           modalContentContainer.appendChild(cityModalElement);
//           modalContentContainer.appendChild(hrModalElement);
//           modalContentContainer.appendChild(phoneNumberModalElement);
//           modalContentContainer.appendChild(addressModalElement);
//           modalContentContainer.appendChild(birthdayModalElement);
//         }
//       }
//     });
//   });

//   // When the user clicks on <span> (x), close the modal
//   let modalCloser = document.querySelector(".close");
//   modalCloser.addEventListener("click", () => {
//     modal.style.display = "none";
//   });

//   // When the user clicks anywhere outside of the modal, close it
//   window.onclick = function(event) {
//     if (event.target == modal) {
//       modal.style.display = "none";
//     }
//   };
// };
