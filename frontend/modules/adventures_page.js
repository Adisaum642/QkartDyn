import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let value = new URLSearchParams(search);
  return value.get("city") 
  ///value.get("city")
  //params.has('?city')
  //params.get('bengaluru')
  //params.append('city')


  //return search;

  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const result = await fetch("https://qtrip-dynamic642.herokuapp.com/adventures?city=" +city);
    const data = await result.json();
    console.log(data)
    if(!result.ok){
      throw new Error('HTTP error: ${result.status}');
       }
    return data;
}
    catch (e){

    console.log('fetchPosts:',e)
      return null;
    }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((adventure) => {
    let elm = document.createElement("div");
    elm.className = "col-6 col-lg-3 flex mb-5";
    elm.innerHTML = `<a id=${adventure.id} href="detail/?adventure=${adventure.id}">
    <div class="activity-card">
    <div class="category-banner"><h6>${adventure.category}</h6></div>
    <img class="activity img" src=${adventure.image}>
    <div class="d-flex justify-content-between px-3 pt-3 w-100">
    <p class="" style='font-weight:bold'>${adventure.name}</p>
    <p class="">₹${adventure.costPerHead}</p>
  </div>
  <div class="d-flex justify-content-between px-3 pt-3 w-100">
  <p class="" style='font-weight:bold'>Duration</p>
  <p class="">${adventure.duration} hours</p>
</div>
   
    </div>
    </a>`;
    document.getElementById("data").appendChild(elm);
  });
}
//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filtered = list.filter((dur)=>{
    return dur.duration > low && dur.duration <= high;
  })
  console.log(filtered)
  return filtered;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  var filteredList = list.filter((cat) => {
    for (let i = 0; i <= categoryList.length; i++) {
      if (cat.category === categoryList[i]) {
        return true;
      }
    }
  });
  return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  var filter_by_duration;
  var filter_by_category;
   if (filters.duration.length > 0 && filters.category.length > 0)  {
    let categoryList = filters.category;
    filter_by_category = filterByCategory(list, categoryList);
    let duration= filters.duration;
    let array = duration.split("-")
    let low = parseInt(array[0]), high = parseInt(array[1]);
    return filterByDuration(filter_by_category, low, high);
  }
  else if (filters.category.length  > 0 ) 
     {
    let category = filters.category;
    filter_by_category = filterByCategory(list, category);
    return filter_by_category;
  }
   else if (filters.duration.length > 0 )
    {        
      let duration = filters.duration;
    let array = duration.split("-")
    let low = parseInt(array[0]), high = parseInt(array[1]);
    filter_by_duration = filterByDuration(list, low, high);
    return filter_by_duration;
    }


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return  JSON.parse(localStorage.getItem("filters"));


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  for (const filter of filters.category) {
    let pills = document.createElement("div");
    pills.className = "category-filter";
    pills.innerHTML = filter;
    document.getElementById("category-list").appendChild(pills);
  }
  

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
