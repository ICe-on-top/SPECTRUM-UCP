function showSection(sectionId, linkElement) {
    // Hide all sections
    document.querySelectorAll('.section').forEach((section) => {
        section.classList.add('hidden');
    });
    // Show the selected section
    document.getElementById(sectionId).classList.remove('hidden');

    // Update active class on navigation
    document.querySelectorAll('nav a').forEach((link) => {
        link.classList.remove('active');
    });
    linkElement.classList.add('active');
}

// Default to showing the dashboard section
document.addEventListener("DOMContentLoaded", function () {
    const initialSection = document.querySelector('nav a');
    if (initialSection) {
        showSection('dashboard', initialSection);
    }
});