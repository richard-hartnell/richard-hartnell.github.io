// define houseValue slider and output
const houseValueSlider = document.getElementById("houseValueSlider");
let houseValueOutput = document.getElementById("houseValueOutput");
houseValueOutput.innerHTML = `$` + houseValueSlider.value; // Display the default slider value
// define housemate slider and output
const housemateSlider = document.getElementById("housemateSlider");
let housemateOutput = document.getElementById("housemateOutput");
housemateOutput.innerHTML = housemateSlider.value; // Display the default slider value

let captions = [];
housemateCaption = "Some people, young and old, are now buying collectively on medium- and large- sized plots of land. <br> A large number of roommates would also simulate a place like Santa Cruz County, where more than a quarter of people live 2+ per room."
houseValueCaption = "This model isn't built for luxury housing yet. <br> But it should be able to simulate larger purchases for larger families and/or communities."

//funcs to update caption on input
houseValueSlider.oninput = function() {
  houseValueOutput.innerHTML = `$` + this.value
};
housemateSlider.oninput = function() {
  housemateOutput.innerHTML = this.value;
  if (this.value > 10) {
    captions.push(housemateCaption)
  } else {
    captions.pop(housemateCaption)
  };
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
