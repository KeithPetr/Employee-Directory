import { employees } from "./employees.js";

const employeeCardsEl = document.getElementById("employee-cards");
const inputTextEl = document.getElementById("text-input");
const selectEl = document.getElementById("team-selections");
let startIndex = 0;
let endIndex = 4;
let loading = false;

function getEmployees(startIndex, endIndex) {
  return employees
    .slice(startIndex, endIndex)
    .map((employee) => {
      return `
        <div class="card-container">
            <div class="main-card-content">
                <img class="profile-image" src="images/${employee.image}"></img>
                <p class="employee-name">${employee.name}</p>
                <p class="employee-title">${employee.title}</p>
                ${employee.bio}
            </div> 
            <a href="${employee.social[0]}"><img src="images/linkedin.svg" class="linkedIn"></a>
        </div>
        `;
    })
    .join("");
}

employeeCardsEl.innerHTML = getEmployees(startIndex, endIndex);

function loadMoreEmployees() {
  loading = true;
  startIndex += 4;
  endIndex += 4;
  filterResults(); // filter results based on the current search criteria
  const newEmployees = getEmployees(startIndex, endIndex);
  employeeCardsEl.innerHTML += newEmployees;
  loading = false;
}

function filterResults() {
  const team = selectEl.value;
  const inputVal = inputTextEl.value.toLowerCase();
  let filteredEmployees = filterDropdownList(team);
  if (inputVal) {
    filteredEmployees = filteredEmployees.filter((employee) => {
      return employee.name.toLowerCase().includes(inputVal);
    });
  }
  const html = filteredEmployees
    .map((employee) => {
      return `
        <div class="card-container">
            <div class="main-card-content">
                <img class="profile-image" src="images/${employee.image}"></img>
                <p class="employee-name">${employee.name}</p>
                <p class="employee-title">${employee.title}</p>
                ${employee.bio}
            </div> 
            <a href="${employee.social}"><img src="images/linkedin.svg" class="linkedIn"></a>
        </div>
        `;
    })
    .join("");
  employeeCardsEl.innerHTML = html;
}

// this function searches through the employees data based on the
// option that is selected from the dropdown list
function filterDropdownList(team) {
  let filteredEmployees = employees;
  if (team !== "everyone") {
    filteredEmployees = employees.filter((employee) => {
      return employee.team === team;
    });
  }
  return filteredEmployees;
}

// event listeners that look for the input of a character in the search bar
// or a change in the dropdown menu selection
inputTextEl.addEventListener("input", filterResults);
selectEl.addEventListener("change", filterResults);

window.addEventListener("scroll", function () {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
    loadMoreEmployees();
  }
});

window.addEventListener("load", function () {
  const { clientWidth } = document.documentElement;
  if (clientWidth >= 480) {
    loadMoreEmployees();
  }
});

window.addEventListener("resize", function () {
  const { clientWidth } = document.documentElement;
  if (clientWidth >= 480) {
    loadMoreEmployees();
  }
});
