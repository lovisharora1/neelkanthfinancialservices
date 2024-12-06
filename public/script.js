function toggleMenu() {
  const popupMenu = document.getElementById("popupMenu");
  popupMenu.classList.toggle("show");
}

// detail sec
const customSection = document.getElementById('custom-section');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      customSection.classList.add('visible');
    }
  });
});


observer.observe(customSection);

// back to top

window.addEventListener("scroll", function () {
  const backToTop = document.getElementById("backToTop");
  if (window.scrollY > 200) { 
    backToTop.classList.add("show");
    backToTop.classList.remove("hide");
  } else {
    backToTop.classList.add("hide");
    backToTop.classList.remove("show");
  }
});


function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

