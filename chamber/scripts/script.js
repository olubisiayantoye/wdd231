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




const apiKey = '60203ebaa92c1129b975eb61cf7bbdfc';
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Timbuktu,ML&units=imperial&appid=${apiKey}`;

fetch(weatherUrl)
  .then(response => response.json())
  .then(data => {
    const weatherSection = document.querySelector('.weather');
    const forecast = data.list.slice(0, 3).map(day => `
      <p>${new Date(day.dt_txt).toLocaleDateString()}: ${Math.round(day.main.temp)}°F, ${day.weather[0].description}</p>
    `).join('');
    
    weatherSection.innerHTML = `
      <div class="card-header">Current Weather</div>
      <div class="card-body">
      <p>Temperature : ${Math.round(data.list[0].main.temp)}°F</p>
      <p>${data.list[0].weather[0].description}</p>
      <h3>3-Day Forecast</h3>
      ${forecast}
      </div>
    `;
  })
  .catch(error => console.error('Error fetching weather data:', error));

