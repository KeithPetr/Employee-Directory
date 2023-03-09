import { employees } from "./employees.js";

const employeeCardsEl = document.getElementById("employee-cards");
const inputTextEl = document.getElementById("text-input");
const selectEl = document.getElementById("team-selections");

// set variables to be used for paginate function
let resultNum = 6
let isLoading = false

employeeCardsEl.innerHTML = filterResults();

// this function looks at the values from either the dropdown menu
// or the input value and use that information to filter the employees
// by name. It also checks if the employee has twitter and/or linkedin.
// Then it returns a template string that is used to display the results.
function filterResults() {
  const team = selectEl.value;
  const inputVal = inputTextEl.value.toLowerCase();
  let filteredEmployees = filterDropdownList(team);
  if (inputVal) {
    filteredEmployees = filteredEmployees.filter((employee) => {
      return employee.name.toLowerCase().includes(inputVal);
    });
  }
  const html = filteredEmployees.slice(0, resultNum)
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
              <h2 class="employee-name">${employee.name}</h2>
              <h3 class="employee-title">${employee.title}</h3>
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

// paginate function to load more data when scrolled to bottom of page
window.addEventListener('scroll', () => {
    // Check if we're at the bottom of the page
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight
    
    if (isAtBottom && !isLoading) {
      // Set isLoading to true so that we don't render multiple pages at once
      isLoading = true;
      resultNum += 6
      employeeCardsEl.innerHTML = filterResults();
      isLoading = false
    }
})