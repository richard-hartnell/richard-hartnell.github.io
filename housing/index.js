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

//house values
let mortgageLength = 20; // mortgage length in years
let houseValue = 500000 // replace this with houseValueOutput
let housemates = 5; // replace this with housemateOutput
let priceAfterInterest = houseValue * 1.7;
let COLFactor = 2;
let initialRent = priceAfterInterest * COLFactor / mortgageLength / 12 / housemates; // 1.7 is a rough factor from mortage rates. the *2 represents the rest of COL
let marketRentDoubleRate = 10; //from market data
let inflation = 1.03; //Federal Reserve goal rate for inflation is 2%. Let's add +1% to be generous.
let inflationDELT = 1.05; //Independent var; adjust a little higher if debt becomes infinity
let inflationMR = 1.072; //housing inflation rate when rent doubles every 10 years
let debt = 0;
const tenants = [];
const rentIndexDELT = {};
const rentIndexMR = {};

//independent vars
let finalYear = 200;
let dissolveLength = 100;

for (let i = 1; i <= finalYear; i++) {
  if (i <= mortgageLength) {
    rentIndexDELT[i] = initialRent * (inflationDELT**i);
  } else if ((i > mortgageLength) || (i <= mortgageLength + dissolveLength))  {
    let inflationDiff = inflation - inflationDELT;
    let dI = inflationDiff / dissolveLength;
    inflationDELTadjusted = inflationDELT - (dI * (i - mortgageLength))
    rentIndexDELT[i] = rentIndexDELT[i-1] * inflationDELTadjusted;
  } else {
    rentIndexDELT[i] = rentIndexDELT[i-1] * inflation;
  }
  rentIndexMR[i] = initialRent * (inflationMR**i);
}

class Tenant {
  constructor(moveInYear, moveOutYear) {
    this.totalRent = 0;
    this.totalRentMR = 0;
    this.earned = 0;
    let owed = 0;
    this.moveInYear = moveInYear;
    this.moveOutYear = moveOutYear;
    // this.paid = totalRent;
    // this.earned = earned;
    // this.saved = totalRentMR - totalRent;
    this.lengthOfStay = moveOutYear - moveInYear;
    this.paidBackYear = 9999;

    for (let thisYear = moveInYear; thisYear <= finalYear; thisYear++) {
      if (thisYear < moveOutYear) {
        this.totalRent += rentIndexDELT[moveInYear] / housemates;
        this.totalRentMR += rentIndexMR[moveInYear] / housemates;
      }

      //TODO: how to handle fakeMortgage?
      if (thisYear <= mortgageLength) {
        owed += rentIndexDELT[thisYear] / 2; // mortgage as 1/2 of 'market rate'
      };
      owed = owed * inflation;
      if (thisYear > mortgageLength) {
        if (owed > 0) {
          owed -= owed;
          this.earned += (rentIndexDELT[thisYear] * 6 / housemates);
          if (owed <= 0) {
            this.paidBackYear = thisYear;
          }
        }
      }
    }
    
    this.owed = owed;



  }


  
  getOutcome() {
    console.log(`This tenant moved in during year ${this.moveInYear} and out in year ${this.moveOutYear}.
                  They paid off $${this.totalRent} of the mortgage and received $${this.earned} paid back by year ${this.paidBackYear}.
                  
                  `);
  }

}

// archetypes then.
const tenant0 = new Tenant(0, (mortgageLength / 2));
const tenant1 = new Tenant(0, mortgageLength);
const tenant2 = new Tenant(0, mortgageLength + 10);
const tenant3 = new Tenant(0, mortgageLength * 2);
const tenant4 = new Tenant(mortgageLength / 2, mortgageLength * 0.75);
const tenant5 = new Tenant(mortgageLength / 2, mortgageLength);
const tenant6 = new Tenant(mortgageLength / 2, mortgageLength + 10);
const tenant7 = new Tenant(mortgageLength / 2, mortgageLength * 2);
const tenant8 = new Tenant(mortgageLength, mortgageLength + 10);
const tenant9 = new Tenant(mortgageLength, mortgageLength * 2);
const tenantA = new Tenant(mortgageLength * 2, mortgageLength * 3);
const TenantB = new Tenant(mortgageLength * 3, mortgageLength * 4);

function simulate(tenants) {
  for (let i = 1; i < finalYear; i++) {
    console.log(`Year {i}`);
    for (let tenant of tenants) {
      // do stuff here
      
    }
  }
  console.log("Remaining money owed on mortgage: ");
  console.log("Remaining money owed past tenants: ");
  console.log("Rent at end of timeline: ");
  console.log("Market-rate rent at end of timeline: ");

}

// the house starts paying people back to the tune of 1/2 thisYearRent every year.
// and then it pays back
// this has gotten complicated.
// the house can deal with old housemates as a lump.
// and so, totalOwed would be something like (tenant.owed * housemates)
// it would go up by {inflation} per year
// and go down by {thisYearRent / 2} per year.

// What is more to do?

// NARRATIVE FOR USE CASES

// BEFORE MORTGAGE PAID OFF
// for each year, if a tenant in tenants moved in after Year,
// add their "owed" for that year to debt. formula: (initialRent * (inflation**moveInYear) * 12)
// every year, adjust debt for inflation.
// 
// AFTER MORTGAGE PAID OFF
//
// for each year, rent goes *down* a little bit, reaching a minimum of... inflation-adjusted rent?