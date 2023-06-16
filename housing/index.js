const slider = document.getElementById("myRange");
let output = document.getElementById("sliderOutput");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
};

let mortgageLength = 15;
let houseValue = slider.value;
let initialRent = houseValue * 1.7 / 12 / mortgageLength;
let housemates;
let marketRentDoubleRate = 10;

class Tenant {
  constructor(moveInYear, moveOutYear) {
    this.moveInYear = moveInYear;
    this.moveOutYear = moveOutYear;
    this.burden = (moveOutYear - moveInYear) * monthlyRent;
    this.returns = (moveOutYear - mortgageLength) * (monthlyRent / 2);
    
  }
}

// narrative:
// this tenant moves in on year {year} of the mortage.
// over {num} years of their tenancy, they pay {subT} in rent.
// {sub-subT} of that goes into paying off the house. the rest is operating costs.
// over {num} years after they leave, the LT owes them {sub-subT}.
// they get paid {sub-subT / years * factor} per year.