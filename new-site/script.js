const art = document.getElementById('art-wrapper');
const tech = document.getElementById('tech-wrapper');
const strategy = document.getElementById('strategy-wrapper');
   
const menu1 = document.getElementById('menu1');
const menu2 = document.getElementById('menu2');
const menu3 = document.getElementById('menu3');

const burgerMenu = document.getElementById('nav-burger');
const burgerMenuIcon = document.getElementById('burger-icon');

burgerMenu.style.opacity = 0;
burgerMenu.style.display = "";
burgerMenu.style.pointerEvents = 'none';

function toggleBurger() {
  if (burgerMenu.style.opacity == 0) {
  burgerMenu.style.opacity = 1;
  burgerMenu.style.pointerEvents = 'auto';
  } else {
    burgerMenu.style.opacity = 0;
    burgerMenu.style.pointerEvents = 'none';
  }
}

function showMenu(menuId) {
  if (burgerMenuIcon.style.display == 'block' || burgerMenu.style.opacity == 1) {
    toggleBurger();
  } else {
    
  }

  if (menuId === 'art') {
    art.style.display = 'block';
    tech.style.display = 'none';
    strategy.style.display = 'none';
    menu1.style.fontWeight = 'bold';
    menu2.style.fontWeight = 'normal';
    menu3.style.fontWeight = 'normal';
  } else if (menuId === 'tech') {
    art.style.display = 'none';
    tech.style.display = 'block';
    strategy.style.display = 'none';
    menu1.style.fontWeight = 'normal';
    menu2.style.fontWeight = 'bold';
    menu3.style.fontWeight = 'normal';
  } else if (menuId === 'strategy') {
    art.style.display = 'none';
    tech.style.display = 'none';
    strategy.style.display = 'block';
    menu1.style.fontWeight = 'normal';
    menu2.style.fontWeight = 'normal';
    menu3.style.fontWeight = 'bold';
  }
}