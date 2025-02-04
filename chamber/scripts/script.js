// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mainMenu = document.getElementById('main-menu');

  // Toggle the "show" class on the menu when the button is clicked
  menuToggle.addEventListener('click', () => {
    mainMenu.classList.toggle('show'); // Add or remove the "show" class
  });
});


const buttons = document.querySelectorAll("[data-view]");
const display = document.querySelector("#members-container");

// Set default view
display.classList.add("grid");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.getAttribute("data-view");
    display.className = view; // Removes existing class and adds the new one
  });
});



document.addEventListener("DOMContentLoaded", function () {
  fetch('data/members.json')
      .then(response => response.json())
      .then(data => {
          const container = document.getElementById('members-container');

          data.forEach(member => {
              const section = document.createElement('section');

              section.innerHTML = `
                  <img src="${member.image_icon}" alt="${member.name}" />
                  <h2>${member.name}</h2>
                  <p>${member.address}</p>
                  <p><strong>Phone:</strong> ${member.phone_number}</p>
                  <a href="${member.website_url}" target="_blank">Visit Website</a>
                  <p><strong>Membership Level:</strong> ${member.membership_level}</p>
              `;

              container.appendChild(section);
          });
      })
      .catch(error => console.error('Error loading member.json:', error));
});