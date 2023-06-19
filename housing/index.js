// define houseValue slider and output
const houseValueSlider = document.getElementById("houseValueSlider");
let houseValueOutput = document.getElementById("houseValueOutput");
houseValueOutput.innerHTML = `$` + houseValueSlider.value; // Display the default slider value
// define housemate slider and output
const housemateSlider = document.getElementById("housemateSlider");
let housemateOutput = document.getElementById("housemateOutput");
housemateOutput.innerHTML = housemateSlider.value; // Display the default slider value

let captions = [];
housemateCaption = "<br>If you're lucky, you're considering buying a large plot of land with a lot of friends and/or family.<br><br>If you're less lucky, you're simulating a place like Santa Cruz County, where more than a quarter of people live 2+ per room."
houseValueCaption = "This model isn't built for luxury housing yet. <br> But it ought to be able to simulate larger purchases for larger families and/or communities."

//funcs to update caption on input
houseValueSlider.oninput = function() {
  houseValueOutput.innerHTML = `$` + this.value;
};
housemateSlider.oninput = function() {
  housemateOutput.innerHTML = this.value + "<br>" + captions;
  if (this.value > 10) {
    if (!captions.includes(housemateCaption)) {
    captions.push(housemateCaption)};
  } else {
    captions.pop(housemateCaption)
  };
};



let mortgageLength = 15; // mortgage length in years
let houseValue = 500000 // replace this with houseValueOutput
let initialRent = houseValue * 1.7 / 12 / mortgageLength * 2; // 1.7 is a rough factor from mortage rates. the *2 represents the rest of COL
let housemates = 5; // replace this with housemateOutput
let marketRentDoubleRate = 10; //from market data
let inflation = 1.03; //Federal Reserve goal rate for inflation is 2%. Let's add +1% to be generous.
let inflationMR = 1.072; //housing inflation rate when rent doubles every 10 years

class Tenant {
  constructor(moveInYear, moveOutYear) {
    let totalRent = 0;
    let totalRentMR = 0;
    let earned = 0;
    for (let x = moveInYear; x <= moveOutYear; x++) {
      thisYearRent = initialRent * (inflation**moveInYear) * 12;
      totalRent += thisYearRent;
      if (x <= mortgageLength) {
        earned += thisYearRent / 2;
      earned = earned * inflation;
      }
    };
    totalRentMR = totalRent;
    
    
    this.moveInYear = moveInYear;
    this.moveOutYear = moveOutYear;
    this.paid = totalRent;
    this.earned = earned;
    this.saved = totalRentMR - totalRent;

    //next, and maybe this will work:
    //for (i = moveInYear; i <= mortgageLength; i++) {compound the 'earned' variable}

  }
}



// What is more to do?

// NARRATIVE FOR USE CASES


// someone moves in a year before the mortgage is paid off.
// someone moves the day the mortgage is paid off.
// someone moves in after the mortage is paid off
// someone moves in after P generation is paid off
// someone moves in after F0 generation is paid off
// someone moves in after F(n) generation is paid off