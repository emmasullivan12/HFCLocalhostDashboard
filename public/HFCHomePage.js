/* Dex last merged this code on 29th June 2020 */
/*
// Map clean URL to file name
function cleanPathToFile(path) {
  if (path === "/") return "home.html";
  return path.replace(/^\/+/, "") + ".html"; // e.g. /about → about.html
}

// Load page content into #content div
function loadPage(path) {
  const filePath = cleanPathToFile(path);
  console.log(filePath)

  fetch("/C:/Users/cuten/Dropbox/PC%20(2)/Documents/code/TSECoursePlatform/public/"+filePath)
    .then(res => {
      if (!res.ok) throw new Error("Not found");
      console.log(res)
      return res.text();
    })
    .then(html => {
      document.getElementById("content").innerHTML = html;
    })
    .catch((error) => {
      console.error("Error loading content:", error);
      document.getElementById("content").innerHTML = "<h2>404</h2><p>Page not found.</p>";
    });
}

// Highlight the correct menu button
function updateActiveButton(path) {
  const buttons = document.querySelectorAll(".menu-btn");

  buttons.forEach(btn => {
    const isActive = btn.getAttribute("data-route") === path;

    btn.setAttribute("data-state", isActive ? "on" : "off");
    btn.setAttribute("aria-checked", isActive ? "true" : "false");

    // Toggle highlight classes
    btn.classList.toggle("bg-accent", isActive);
    btn.classList.toggle("text-accent-foreground", isActive);
  });
}

// Handle button-based navigation
function handleNavigation(event) {
  event.preventDefault();
  const path = event.currentTarget.getAttribute("data-route");

  // Update URL
  history.pushState({}, "", path);

  // Load new page content and update UI
  loadPage(path);
  updateActiveButton(path);
}

// Attach event listeners to menu buttons
document.querySelectorAll(".menu-btn").forEach(btn => {
  btn.addEventListener("click", handleNavigation);
});

// Handle browser back/forward
window.addEventListener("popstate", () => {
  const path = window.location.pathname;
  loadPage(path);
  updateActiveButton(path);
});

// Initial load
console.log(window.location.pathname)
const initialPath = window.location.pathname;
loadPage(initialPath);
updateActiveButton(initialPath);
*/
// Menu items
var mdMenuIcon = document.getElementById("md-Menu");
var mdMenuNav = document.getElementById("md-menuNav");
var hamburgerMenu = document.getElementById("hamburgerMenu");
var xMenu = document.getElementById("xMenu");

// Toggle the hamburger nav menu
if(mdMenuIcon != null) {
  mdMenuIcon.addEventListener('click', function(event) {
    if(xMenu.classList.contains("hidden")) {
      hamburgerMenu.classList.add("hidden");
      xMenu.classList.remove("hidden");
      mdMenuNav.classList.remove("hidden");
    } else if (hamburgerMenu.classList.contains("hidden")) {
      hamburgerMenu.classList.remove("hidden");
      xMenu.classList.add("hidden");
      mdMenuNav.classList.add("hidden");
    }
  });
}

// check if they are in the UK then show them £, otherwise show them in $ on front end
//The values returned from Intl.DateTimeFormat().resolvedOptions().timeZone are IANA tz database identifiers.
function getUserCurrency() {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const GBNames = ['Europe/Belfast', 'Europe/London', 'GB', 'GB-Eire', 'Europe/Guernsey', 'Europe/Jersey', 'Europe/Isle_of_Man'];
  return return GBNames.includes(timezone) ? 'GBP' : 'USD';
}

if (getUserCurrency() === 'GBP') {
  document.querySelectorAll('.priceCVGuide').forEach(el => {
    el.textContent = '£39';
  });
  document.querySelectorAll('.priceCall').forEach(el => {
    el.textContent = '£49';
  });
  document.querySelectorAll('.priceLitePackage').forEach(el => {
    el.textContent = '£159';
  });
  document.querySelectorAll('.priceEssentialsPackage').forEach(el => {
    el.textContent = '£219';
  });
  document.querySelectorAll('.priceProPackage').forEach(el => {
    el.textContent = '£329';
  });
} else {
  document.querySelectorAll('.priceCVGuide').forEach(el => {
    el.textContent = '$54';
  });
  document.querySelectorAll('.priceCall').forEach(el => {
    el.textContent = '$65';
  });
  document.querySelectorAll('.priceLitePackage').forEach(el => {
    el.textContent = '$209';
  });
  document.querySelectorAll('.priceEssentialsPackage').forEach(el => {
    el.textContent = '$289';
  });
  document.querySelectorAll('.priceProPackage').forEach(el => {
    el.textContent = '$429';
  });
}
