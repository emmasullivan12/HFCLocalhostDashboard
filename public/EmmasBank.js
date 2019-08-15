/*
// When click on one button set class of THAT button to active and others to inactive
onNavClick = (evt) => {
  var target = evt.target;
  let mainNavLinks = document.querySelectorAll(".section-list li a");
  mainNavLinks.forEach(link => {
    link.classList.remove("active");
    target.classList.add("active");
  });
}
*/
