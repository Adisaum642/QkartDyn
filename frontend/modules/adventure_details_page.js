import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let id = new URLSearchParams(search);
  let query = id.get("adventure");
  
  return query;
  


  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let AdventureDetailsPromise = await fetch(`${config.backendEndpoint}` + `/adventures/detail?adventure=${adventureId}`);
    let idData = await AdventureDetailsPromise.json();
    return idData;
    }catch(err){
      return null;
    }
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let elm = document.createElement("div");
  elm.ClassName = "adventure-detail-card mb-3";
  elm.innerHTML = ``
  document.getElementById("adventure-name").innerHTML = `${adventure.name}`;
  document.getElementById("adventure-subtitle").innerHTML = `${adventure.subtitle}`;

  for (let img of adventure.images) {
    let div = document.createElement("div");
    div.className = "activity-card-image";
    let imgElm = document.createElement("img");
    imgElm.src =img;
    div.appendChild(imgElm);
    document.getElementById('photo-gallery').append(div);
  }
  let content = document.createElement("div");
  content.innerHTML = `${adventure.content}`;
  document.getElementById("adventure-content").append(content);

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner" id="carousel-inner">
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
</div>`;
images.map((image, idx) => {
  let ele = document.createElement("div");
  ele.className = `carousel-item ${idx === 0 ? "active" : ""}`;
  ele.innerHTML = `
  <img
      src=${image}
      alt=""
      srcset=""
      class="activity-card-image pb-3 pb-md-0"
    />
        `;
        document.getElementById("carousel-inner").appendChild(ele);
});

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure.reserved)
  if(adventure.available==true && adventure.reserved == false) {
    document.getElementById("reservation-panel-available").style.display ="block"
    document.getElementById("reservation-panel-sold-out").style.display ="none"
    document.getElementById("reservation-person-cost").innerHTML =adventure.costPerHead

  }
  else if( adventure.available== true && adventure.reserved == true) {
    document.getElementById("reservation-panel-available").style.display ="none"
    document.getElementById("reservation-panel-sold-out").style.display="block"
  } 
  else if (adventure.available== false && adventure.reserved == false){
    document.getElementById("reservation-panel-available").style.display ="none"
    document.getElementById("reservation-panel-sold-out").style.display="block"
  }
  else if (adventure.available== false && adventure.reserved == true){
    document.getElementById("reservation-panel-available").style.display ="none"
    document.getElementById("reservation-panel-sold-out").style.display="block"
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
 
  let totalCost =adventure.costPerHead*persons
  document.getElementById("reservation-cost").innerHTML=totalCost
}

//Implementation of reservation form submission using JQuery
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  /* 2. If the reservation is successful, show an alert with "Success!"
   and refresh the page. If the reservation fails, just show an alert with "Failed!".*/
   let formElement = document.getElementById("myForm");
   formElement.addEventListener("submit", async (event) => {
     event.preventDefault();
     let name = formElement.elements["name"].value;
     let date = formElement.elements["date"].value;
     let person = formElement.elements["person"].value;
     let data = {
       name,
       date,
       person,
       adventure: adventure.id,
     };
     try {
       let postPromise = await fetch(
         `${config.backendEndpoint}/reservations/new`,
         {
           method: "POST",
           body: JSON.stringify(data),
           headers: {
             "Content-type": "application/json; charset=UTF-8",
           },
         }
       );
       let response = await postPromise.json();
       if (postPromise.status >= 200 && postPromise.status <= 299) {
         console.log(response);
         alert("Reservation booked!");
         window.location.reload();
         
       } else {
         
         console.log(postPromise.status, postPromise.statusText, response.message);
         alert(`Failed, ${response.message}`);
      
       }
     } catch (error) {
      
       console.log(error);
       alert("Failed! We are facing some issue. Try again sometime later.");
      
     }
   });
 }
 //Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log(adventure.reserved)
  if (adventure.reserved == true){
   document.getElementById("reserved-banner").style.display = "block"
  }else{
    document.getElementById("reserved-banner").style.display ="none"
  }
}



export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
