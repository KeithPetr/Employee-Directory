import { employees } from "./employees.js";

const employeeCardsEl = document.getElementById("employee-cards");
const inputTextEl = document.getElementById("text-input");
const selectEl = document.getElementById("team-selections");


employeeCardsEl.innerHTML = filterResults();

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
    let socialLinks = '';
    if (employee.social.twitter) {
      socialLinks += `<a href="${employee.social.twitter}"><img src="images/twitter.svg" class="twitter"></a>`;
    }
    if (employee.social.linkedin) {
      socialLinks += `<a href="${employee.social.linkedin}"><img src="images/linkedin.svg" class="linkedIn"></a>`;
    }
    return `
      <div class="card-container">
          <div class="main-card-content">
              <img class="profile-image" src="images/${employee.image}"></img>
              <p class="employee-name">${employee.name}</p>
              <p class="employee-title">${employee.title}</p>
              ${employee.bio}
          </div>
          <div class="social-links"> 
            ${socialLinks}
          </div>
      </div>
      `;
  })
  .join("");
  return employeeCardsEl.innerHTML = html;
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