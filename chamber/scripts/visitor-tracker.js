document.addEventListener("DOMContentLoaded", () => {
    const visitMessage = document.getElementById("visitMessage");
    
    // Get the last visit timestamp from localStorage
    const lastVisit = localStorage.getItem("lastVisit");

    // Get the current time in milliseconds
    const now = Date.now();
    
    if (!lastVisit) {
        // First visit
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        // Calculate the difference in days
        const daysBetween = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

        if (daysBetween < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysBetween} day${daysBetween === 1 ? "" : "s"} ago.`;
        }
    }

    // Store the current timestamp for future visits
    localStorage.setItem("lastVisit", now);
});
