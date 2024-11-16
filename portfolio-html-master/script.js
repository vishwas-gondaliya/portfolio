const menuIcon = document.getElementById("menu-icon");
const body = document.body;

function createSidebar() {
  const existingSidebar = document.getElementById("sidebar");
  if (!existingSidebar) {
    const sidebar = document.createElement("div");
    sidebar.className = "sidebar";
    sidebar.id = "sidebar";
    sidebar.innerHTML = `
      <span class="close-icon" id="close-icon">&times;</span>
      <a href="#about">About</a>
      <a href="#experience">Experience</a>
      <a href="#skills">Skills</a>
      <a href="#certifications">Certifications</a>
      <a href="#projects">Projects</a>
      <a href="#education">Education</a>
    `;
    document.body.appendChild(sidebar);

    const closeIcon = document.getElementById("close-icon");
    closeIcon.addEventListener("click", closeSidebar);
    sidebar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeSidebar);
    });
  }
}

function removeSidebar() {
  const existingSidebar = document.getElementById("sidebar");
  if (existingSidebar) {
    existingSidebar.remove();
    body.style.overflow = "";
  }
}

function openSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.add("active");
  body.style.overflow = "hidden";
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.classList.remove("active");
    body.style.overflow = "";
  }
}

function checkViewport() {
  if (window.innerWidth <= 768) {
    createSidebar();
    menuIcon.addEventListener("click", openSidebar);
  } else {
    removeSidebar();
    highlightCurrentSection();
  }
}

function highlightCurrentSection() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sidebarLinks = document.querySelectorAll(".sidebar a");

  let index = sections.length;

  while (--index && window.scrollY + 100 < sections[index].offsetTop) {}

  navLinks.forEach((link) => link.classList.remove("active"));
  sidebarLinks.forEach((link) => link.classList.remove("active"));

  if (index >= 0) {
    navLinks[index]?.classList.add("active");
    sidebarLinks[index]?.classList.add("active");
  }
}

function downloadResume() {
  const link = document.createElement("a");
  link.href = "resume.pdf";
  link.download = "Vishwas-Gondaliya.pdf";
  link.click();
}

checkViewport();

window.addEventListener("resize", checkViewport);

window.addEventListener("scroll", highlightCurrentSection);
