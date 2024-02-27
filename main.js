const vehicleInput = document.getElementById("Vehicle");
const vehNumInput = document.getElementById("vehNum");
const submitBtn = document.getElementById("btn");
const resultContainer = document.querySelector(".results");
const form = document.getElementById("submitting");
const searchInput = document.getElementById("search");
const searchForm = document.getElementById("searching");

// Array to store vehicle entries
const vehicleEntries = [];

// Event listeners
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchSubmission();
});

vehNumInput.addEventListener("input", () => {
  vehNumInput.value = vehNumInput.value.toUpperCase();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitForm();
});

// Functions
function showAlert(message) {
  alert(message);
}

function isDuplicateEntry(type, number) {
  return vehicleEntries.some(
    (entry) => entry.type === type && entry.number === number
  );
}

function submitForm() {
  const type = vehicleInput.value;
  const number = vehNumInput.value;

  if (type === "" || number === "") {
    showAlert("Enter Vehicle type and Vehicle Number!");
    return;
  }

  if (isDuplicateEntry(type, number)) {
    showAlert("Duplicate entry! This vehicle already exists in the array.");
    return;
  }

  if (vehicleEntries.length <= 100) {
    vehicleEntries.push({ type, number });
  } else {
    showAlert("You have reached the maximum limit of adding vehicles");
  }

  vehNumInput.value = "";
  displayResults();
}

function deleteEntry(index) {
  vehicleEntries.splice(index, 1); //remove one element at the specified index from the vehicleEntries array
  displayResults();
}

function displayResults() {
  // Clear previous results
  resultContainer.innerHTML = "";
  const time = new Date();
  const dateTime = `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;

  vehicleEntries.forEach((entry, index) => {
    const div = document.createElement("div");
    div.className = "result";

    let numDate = document.createElement("div");
    numDate.className = "num-date";

    const h4 = document.createElement("h4");
    const dateShow = document.createElement("span");
    dateShow.innerHTML = ` <strong>Time: </strong>  ${dateTime} `;
    dateShow.className = "show-date";
    h4.classList = "index-number";
    h4.textContent = `${index + 1}`;

    numDate.appendChild(h4);
    numDate.appendChild(dateShow);
    const para = document.createElement("p");
    // para.textContent = `Type: ${entry.type}, Number: ${entry.number}`;
    if (entry.type === "car") {
      let carimg = document.createElement("img");
      carimg.classList = "carimg";
      carimg.src = "./images/car.png";
      carimg.alt = "car img";
      // para.textContent = `Type: ${carimg} Number: ${entry.number}`;
      para.appendChild(document.createTextNode(`  Number: ${entry.number}`));
      para.appendChild(carimg);
    } else {
      // para.textContent = `Type: ${entry.type}, Number: ${entry.number}`;
      let carimg = document.createElement("img");
      carimg.classList = "carimg";
      carimg.src = "./images/bike.png";
      carimg.alt = "car img";
      // para.textContent = `Type: ${carimg} Number: ${entry.number}`;
      para.appendChild(document.createTextNode(` Number: ${entry.number}`));
      para.appendChild(carimg);
    }

    div.appendChild(numDate);
    div.appendChild(para);

    const button = document.createElement("button");
    button.addEventListener("click", () => deleteEntry(index));
    const img = document.createElement("img");
    img.src = "./images/delete.png";
    img.alt = "Button Icon";
    button.appendChild(img);
    div.appendChild(button);
    resultContainer.appendChild(div);
    anime({
      targets: ".result",
      translateX: 0, // -> '250px'
      rotate: 360, // -> '540deg'
    });
  });
}

// function searchSubmission() {
//   const searchTerm = searchInput.value.toLowerCase();
  
//   const results = vehicleEntries.filter(
//     (entry) =>
//       entry.type.toLowerCase().includes(searchTerm) ||
//       entry.number.toLowerCase().includes(searchTerm)
//   );

//   // Display search input
//   const searchValue = document.createElement("p");
//   searchValue.classList='search-output'
//   searchValue.textContent = `Search Input: "${searchTerm}"`;
//   resultContainer.appendChild(searchValue);

//   // Display search results
//   if (results.length > 0) {
//     const output = document.createElement("ul");
//     output.classList='output';
//     results.forEach((entry) => {
//       const listItem = document.createElement("li");
//       listItem.textContent = `Vehicle Type: ${entry.type}, Vehicle Number: ${entry.number}`;
//       output.appendChild(listItem);
//     });
//     resultContainer.appendChild(output);
//   } 
//   else if(searchTerm ===''){
//     alert("Enter Valid  Search Term")
//   }
//   else {
//     const noResultsMessage = document.createElement("p");
//     noResultsMessage.classList='no-result'
//     noResultsMessage.textContent = "No matching results found.";
//     resultContainer.appendChild(noResultsMessage);
//   }
// }

function searchSubmission() {
  const searchTerm = searchInput.value.toLowerCase();

  if (searchTerm === '') {
    alert("Enter a valid search term");
    return; // Exit the function if the search term is empty
  }

  const results = vehicleEntries.filter(
    (entry) =>
      entry.type.toLowerCase().includes(searchTerm) ||
      entry.number.toLowerCase().includes(searchTerm)
  );

  // Display search input
  const searchValue = document.createElement("p");
  searchValue.classList = 'search-output';
  searchValue.textContent = `Search Input: "${searchTerm}"`;
  resultContainer.appendChild(searchValue);

  // Display search results
  if (results.length > 0) {
    const output = document.createElement("ul");
    output.classList = 'output';
    results.forEach((entry) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Vehicle Type: ${entry.type}, Vehicle Number: ${entry.number}`;
      output.appendChild(listItem);
    });
    resultContainer.appendChild(output);
  } else {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.classList = 'no-result';
    noResultsMessage.textContent = "No matching results found.";
    resultContainer.appendChild(noResultsMessage);
  }
}

