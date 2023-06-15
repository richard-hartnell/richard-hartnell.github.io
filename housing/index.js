const slider = document.getElementById("myRange");
let output = document.getElementById("sliderOutput");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
};

let burden;
let returns;
let moveInYear;
let moveOutYear;
let mortgageLength;
let monthlyRent;
let houseValue;
let housemates;
let rentDoubleRate = 10;



