/* script.js */
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("timestamp").value = new Date().toISOString();

    fetch("data/memberships.json")
        .then(response => response.json())
        .then(data => {
            const membershipSection = document.getElementById("membership-levels");
            const modal = document.getElementById("levelModal");

            data.memberships.forEach(membership => {
                const card = createMembershipCard(membership);
                membershipSection.appendChild(card);

                const modalContent = createModalContent(membership);
                modal.appendChild(modalContent);
            });

            // Event delegation for modal open buttons
            membershipSection.addEventListener("click", function (event) {
                if (event.target.classList.contains("open-modal")) {
                    openModal(event.target.dataset.level);
                }
            });
        })
        .catch(error => console.error("Error loading membership data:", error));

    // Close modal when clicking outside content
    document.getElementById("levelModal").addEventListener("click", function (event) {
        if (event.target === this) {
            closeModal();
        }
    });
});

function createMembershipCard(membership) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <h4>${capitalize(membership.type)} Membership</h4>
        <p>Price: ${membership.price}</p>
        <button class="open-modal" data-level="${membership.type}">View Benefits</button>
    `;
    return card;
}

function createModalContent(membership) {
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalContent.id = `modal-${membership.type}`;
    modalContent.innerHTML = `
        <span class="close" onclick="closeModal()">&times;</span>
        <h3>${capitalize(membership.type)} Membership</h3>
        <ul>${membership.benefits.map(benefit => `<li>${benefit}</li>`).join("")}</ul>
    `;
    return modalContent;
}

function openModal(level) {
    document.querySelectorAll(".modal-content").forEach(modal => {
        modal.style.display = "none";
    });
    document.getElementById(`modal-${level}`).style.display = "block";
    document.getElementById("levelModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("levelModal").style.display = "none";
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
