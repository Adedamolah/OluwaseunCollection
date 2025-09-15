/* Ensure this file is loaded at bottom of page (index.html includes it) */

const slides = [
  { title: "Welcome to Oluwaseun Collections", sub: "Where style meets elegance — Bags, shoes, home décor & more.", img: "images/bag.jpg" },
  { title: "Trendy Bags & Shoes", sub: "Step out in style with our curated selection.", img: "images/shoes.jpg" },
  { title: "Room Décor & Comfort", sub: "Transform your living space with tasteful pieces.", img: "images/decor.jpg" },
  { title: "Perfumes & Scents", sub: "Smell irresistible — unique and long-lasting.", img: "images/perfume.jpg" },
  { title: "Accessories", sub: "The perfect finishing touch to any outfit", img: "images/accessories.jpg" }
];

let idx = 0;
const textWrap = document.querySelector('.text-wrap');
const imgWrap  = document.querySelector('.img-wrap');
const textEl   = document.getElementById('changing-text');
const subEl    = document.getElementById('changing-subtext');
const imgEl    = document.getElementById('changing-image');

/* defensive checks */
if (!textWrap || !imgWrap || !textEl || !subEl || !imgEl) {
  console.warn('Hero elements missing — check your HTML IDs/classes.');
}

/* preload images to avoid blank flashes */
slides.forEach(s => {
  const im = new Image();
  im.src = s.img;
});

function swapTo(nextIndex) {
  // start exit animations
  textWrap.classList.remove('is-enter');
  textWrap.classList.add('is-exit');
  imgWrap.classList.remove('is-enter');
  imgWrap.classList.add('is-exit');

  // after exit animation completes, change content and play enter animations
  setTimeout(() => {
    textEl.textContent = slides[nextIndex].title;
    subEl.textContent  = slides[nextIndex].sub;
    imgEl.setAttribute('src', slides[nextIndex].img);

    // remove exit then add enter
    textWrap.classList.remove('is-exit');
    imgWrap.classList.remove('is-exit');

    // trigger reflow so animation restarts reliably
    void textWrap.offsetWidth;

    textWrap.classList.add('is-enter');
    imgWrap.classList.add('is-enter');
  }, 520); // matches CSS exit length (about .55s)
}

function nextSlide() {
  idx = (idx + 1) % slides.length;
  swapTo(idx);
}

/* start automatic loop */
let intervalId = setInterval(nextSlide, 4800);

/* ensure first-frame is 'enter' (already added in HTML), but safe guard */
window.addEventListener('load', () => {
  // make sure initial image/text match first slide
  textEl.textContent = slides[0].title;
  subEl.textContent  = slides[0].sub;
  imgEl.src = slides[0].img;
});

/* small nav toggle for mobile */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // animate hamburger
    navToggle.classList.toggle('open');
  });
}

 // Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD39HLOm27VdzQwXjKl-cd96WC5VTJTnsQ",
  authDomain: "oluwaseun-collection.firebaseapp.com",
  projectId: "oluwaseun-collection",
  storageBucket: "oluwaseun-collection.appspot.com",
  messagingSenderId: "759387634255",
  appId: "1:759387634255:web:565d9c6ac340ebd361883a",
  measurementId: "G-YEQZMCBFK9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
 

// Container where products will be displayed
const db = firebase.firestore();
const productsContainer = document.getElementById("products");

db.collection("products").orderBy("createdAt", "desc").get().then(snapshot => {
  snapshot.forEach(doc => {
    const data = doc.data();

    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
      <img src="${data.image}" alt="${data.name}" />
      <h3>${data.name}</h3>
      <p>₦${data.price}</p>
    `;

    productsContainer.appendChild(productDiv);
  });
});


