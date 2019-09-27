/**********  Helper Functions ************/
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

let formatEmployeeData = data => {
  //function recieves data from fetch request as parameter
  //formats data and put them in an array
  let arrayOfEmployeeData = [];
  for (item of data) {
    let firstName = capitalize(item.name.first);
    let lastName = capitalize(item.name.last);
    let fullName = `${firstName} ${lastName}`;
    let city = capitalize(item.location.city);
    let emailAddress = item.email;
    let imgSource = item.picture.medium;

    //more data for modal window
    let phoneNumber = item.phone;
    let address = `
                      ${capitalize(item.location.street)}
                      ${city},
                      ${capitalize(item.location.state)}
                      ${item.location.postcode}`;
    let dob = formatDOB(item.dob);
    let birthday = `Birthday:${dob}`;
    let rawID = `${emailAddress}`;
    let employeeIDForEventListener = rawID.trim();
    arrayOfEmployeeData.push({
      employeeIDForEventListener,
      fullName,
      city,
      emailAddress,
      imgSource,
      birthday,
      address,
      phoneNumber
    });
  }
  return arrayOfEmployeeData;
};

//Display employee card in  employee directory
let displayEmployeeCard = data => {
  //receives an array of data and use it to display employee card
  let employeeCardsParentWrapper = document.querySelector(
    "section.js-employee-directory-wrapper"
  ); //get parent wrapper
  data.forEach(employeeCard => {
    let {
      employeeIDForEventListener,
      fullName,
      city,
      emailAddress,
      imgSource
    } = employeeCard;
    employeeCardsParentWrapper.innerHTML += `<article id=${employeeIDForEventListener} class="js-employee__card employee__card">
           <img src=${imgSource} alt="employee's profile picture" class="img--avatar">
              <div class="employee__card__details">
                <p class="employee__card__details__name">${fullName}</p>
                <p class="employee__card__details__email">${emailAddress}</p>
                <p class="employee__card__details__city">${city}</p>
              </div>
      </article>`;
  });
};

let removeAndAddContentToModalWindow = (listOfEmployeeCards, data) => {
  //Takes list of elements and data to display as paras
  //opens modal window
  //removes previous children of modal element
  //adds new children using data
  //children added depends on the article that was clicked

  const modalContentContainer = document.querySelector(
    ".modal-content-container"
  );

  let intialContent = modalContentContainer.innerHTML;
  modalContentContainer.innerHTML = intialContent;

  const modal = document.getElementById("myModal");
  // When the user clicks on any card, a modal with that employee card info opens
  listOfEmployeeCards.forEach(employeeCard => {
    employeeCard.addEventListener("click", e => {
      modal.style.display = "block";
      let listenerTarget = e.currentTarget;
      let employeeCardElementId = listenerTarget.id;
      //remove old elements
      document.querySelectorAll(".addedElement").forEach(e => {
        e.parentNode.removeChild(e);
      });

      data.forEach(employeeCard => {
        let {
          employeeIDForEventListener,
          imgSource,
          fullName,
          emailAddress,
          phoneNumber,
          address,
          birthday
        } = employeeCard;

        if (employeeIDForEventListener === employeeCardElementId) {
          modalContentContainer.innerHTML += `<article  class="addedElement">
           <img src=${imgSource} alt="employee's profile picture" class="img--avatar">
           <div class="employee__card__details">
                <p class="employee__card__details__name">${fullName}</p>
                <p class="employee__card__details__email">${emailAddress}</p>
                <hr class="horizontal-line"/>
                <p class="employee__card__details__phoneNumber">${phoneNumber}</p>
                <p class="employee__card__details__address">${address}</p>
                <p class="employee__card__details__birthday">${birthday}</p>
           </div> 
      </article>`;
        }
      });
    });
  }); //foreach ends
};

let displayModalWindow = data => {
  // Get a list of employeecard elements
  let employeesCards = document.querySelectorAll(".js-employee__card");

  removeAndAddContentToModalWindow(employeesCards, data);

  /********** CLOSE MODAL WINDOW ***************/
  const modal = document.getElementById("myModal");
  modal.addEventListener("click", e => {
    // When the user clicks anywhere on modal, it closes modal window
    modal.style.display = "none";
  });

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
};

let fetchData = url => {
  //fetch data and call other funtctions to display data
  fetch(url)
    .then(res => res.json())
    .then(res => res.results)
    .then(res => formatEmployeeData(res))
    .then(res => {
      displayEmployeeCard(res);
      displayModalWindow(res);
    });
};

fetchData("https://randomuser.me/api/?results=20");
