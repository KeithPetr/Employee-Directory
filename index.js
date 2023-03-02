import { employees } from "./employees.js";

const employeeCardsEl = document.getElementById('employee-cards');
let startIndex = 0;
let endIndex = 3;
let loading = false;

function getEmployees(startIndex, endIndex) {
    return employees.slice(startIndex, endIndex).map(employee => {
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
        `
    }).join('')
}

function loadMoreEmployees() {
    loading = true;
    startIndex += 3;
    endIndex += 3;
    const newEmployees = getEmployees(startIndex, endIndex);
    employeeCardsEl.innerHTML += newEmployees;
    loading = false;
}

employeeCardsEl.innerHTML = getEmployees(startIndex, endIndex);


window.addEventListener('scroll', function() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
    loadMoreEmployees();
  }
});

window.addEventListener('load', function() {
    const { clientWidth } = document.documentElement;
    if (clientWidth >= 480) {
      loadMoreEmployees();
    }
  });

  window.addEventListener('resize', function() {
    const { clientWidth } = document.documentElement;
    if (clientWidth >= 480) {
      loadMoreEmployees();
    }
  });