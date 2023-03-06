import { employees } from "./employees.js";

const employeeCardsEl = document.getElementById("employee-cards");
const inputTextEl = document.getElementById("text-input");
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
  const newEmployees = getEmployees(startIndex, endIndex);
  employeeCardsEl.innerHTML += newEmployees;
  loading = false;
}

// this function shows the results that match the letters that are
// typed into the seach bar
function showFilteredList(filteredEmployees) {
  return filteredEmployees.map(employee => {
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
  }).join('')
}

inputTextEl.addEventListener("input", (e) => {
  const inputVal = e.target.value.toLowerCase();
  const filteredEmployees = employees.filter((employee) => {
    return employee.name.toLocaleLowerCase().includes(inputVal);
  });
  employeeCardsEl.innerHTML = showFilteredList(filteredEmployees);
  console.log(filteredEmployees);
  console.log(inputVal);
});

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
