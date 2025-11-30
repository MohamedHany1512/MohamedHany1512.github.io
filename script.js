// Fade-in effect on scroll
const sections = document.querySelectorAll('.section');
window.addEventListener('scroll', () => {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100){
      section.style.opacity = 1;
      section.style.transform = "translateY(0)";
      section.style.transition = "all 1s ease";
    } else {
      section.style.opacity = 0;
      section.style.transform = "translateY(50px)";
    }
  });
});

// Modal functionality for images + videos
let modal = document.getElementById("modal");
let modalImg = document.getElementById("modal-image");
let modalVideo = document.getElementById("modal-video");
let currentProjectItems = []; // contains both images & videos
let currentIndex = 0;

// Build project items (images + videos)
function getProjectItems(project) {
  const imgs = Array.from(document.querySelectorAll(`.thumbnails img[data-project="${project}"]`)).map(i => ({type:'image', src:i.src}));
  const videos = Array.from(document.querySelectorAll(`.project-card video[src*="${project}"]`)).map(v => ({type:'video', src:v.src}));
  return [...imgs, ...videos]; // images first, then video(s)
}

// Open modal
document.querySelectorAll('.thumbnails img').forEach(img => {
  img.addEventListener('click', (e) => {
    const project = img.dataset.project;
    currentProjectItems = getProjectItems(project);
    currentIndex = parseInt(img.dataset.index);
    showModalItem();
  });
});

// Show modal item
function showModalItem() {
  modal.style.display = "block";
  const item = currentProjectItems[currentIndex];
  if(item.type === 'image'){
    modalImg.src = item.src;
    modalImg.style.display = "block";
    modalVideo.style.display = "none";
  } else {
    modalVideo.src = item.src;
    modalVideo.style.display = "block";
    modalImg.style.display = "none";
  }
}

// Close modal
document.querySelector(".close").onclick = function() {
  modal.style.display = "none";
  modalVideo.pause();
};

// Next / Prev
document.querySelector(".next").onclick = function() {
  currentIndex = (currentIndex + 1) % currentProjectItems.length;
  showModalItem();
};
document.querySelector(".prev").onclick = function() {
  currentIndex = (currentIndex - 1 + currentProjectItems.length) % currentProjectItems.length;
  showModalItem();
};

// Click outside modal-content to close
window.onclick = function(event) {
  if(event.target == modal) {
    modal.style.display = "none";
    modalVideo.pause();
  }
}

console.log("Portfolio Modal Carousel Loaded!");
