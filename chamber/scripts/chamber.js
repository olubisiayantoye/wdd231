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
    fetch('data/companyspotlights.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('members-container');

            // Shuffle the array and pick 3 random members
            const randomMembers = data.sort(() => 0.5 - Math.random()).slice(0, 3);

            randomMembers.forEach(member => {
                const section = document.createElement('section');

                section.innerHTML = `
                    <img width="650px" height="500px" src="${member.image_icon}" alt="${member.name}" />
                    <h2>${member.name}</h2>
                    <p>${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone_number}</p>
                    <a href="${member.website_url}" target="_blank">Visit Website</a>
                    <p><strong>Membership Level:</strong> ${member.membership_level}</p>
                `;

                container.appendChild(section);
            });
        })
        .catch(error => console.error('Error loading companyspotlights.json:', error));
});





const apiKey = '60203ebaa92c1129b975eb61cf7bbdfc';
const weatherSection = document.querySelector('.weather');
const lat = 47.8563;
const lon = -104.0447;

const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

fetch(weatherUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const forecastList = data.list;
        const current = forecastList[0];
        const temp = current.main.temp;
        const description = current.weather[0].description;

        weatherSection.innerHTML = `
            <p>Temperature: ${temp}°C</p>
            <p>Condition: ${description}</p>
            `;

        const days = {};
        forecastList.forEach(item => {
            const date = new Date(item.dt * 1000).toISOString().split('T')[0]; // Get the date (YYYY-MM-DD)
            if (!days[date]) {
                days[date] = { high: item.main.temp_max, low: item.main.temp_min };
            } else {
                days[date].high = Math.max(days[date].high, item.main.temp_max);
                days[date].low = Math.min(days[date].low, item.main.temp_min);
            }
      });


        let forecastHTML = `<h2>3-day Forecast</h2>`;
        const dates = Object.keys(days);
        for (let i =1; i <= 3 && i < dates.length; i++) {
            const date = dates[i];
            const { high, low } = days[date];

            forecastHTML += `
           
                <h3>${date}</h3>
                <p>High: ${high}°C - Low: ${low}°C</p>
           
            `;
        }
     
        weatherSection.innerHTML += forecastHTML;
    })
    .catch(error => {
        console.error('Problem with fetch operation:', error);
        weatherSection.innerHTML = `<p>Weather data cannot be loaded at this time.</p>`;
});


fetch('data/event.json')
            .then(response => response.json())
            .then(data => {
                const eventList = document.getElementById('event-list');
                data.forEach(event => {
                    const eventItem = document.createElement('div');
                    eventItem.classList.add('event');
                    eventItem.innerHTML = `
                       <ul> 
                   <li>${event.title}<p>${event.description}</p></li>
                    </ul>
                    `;
                    eventList.appendChild(eventItem);
                });
            })
            .catch(error => console.error('Error loading events:', error));