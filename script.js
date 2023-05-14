function $(_) {document.body.getElementById(_)};

folioSlides = document.getElementsByTagName('figcaption');

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

function hideDeets() {
  let the_h4 = this.getElementsByTagName('h4')[0];
  if (the_h4.style.opacity == "1") {
    the_h4.style.opacity = "0"
  }
}

function showDeets() {
  let the_h4 = this.getElementsByTagName('h4')[0];
  if (the_h4.style.opacity == "1") {
    the_h4.style.opacity = "0"
  } else {
    the_h4.style.opacity = "1"
  }
}

for (i=0;i<folioSlides.length;i++) {
  folioSlides[i].addEventListener("mouseover", showDeets);
  folioSlides[i].addEventListener("mouseout", hideDeets);
}