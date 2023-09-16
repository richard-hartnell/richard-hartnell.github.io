import Home from './Home.js'

// define houseValue slider and output
const houseValueSlider = document.getElementById("houseValueSlider");
let houseValueOutput = document.getElementById("houseValueOutput");
houseValueOutput.innerHTML = `$` + houseValueSlider.value; // Display the default slider value
// define housemate slider and output
const housemateSlider = document.getElementById("housemateSlider");
let housemateOutput = document.getElementById("housemateOutput");
housemateOutput.innerHTML = housemateSlider.value; // Display the default slider value

let captions = [];
let housemateCaption = "<br>If you're lucky, you're considering buying a large plot of land with a lot of friends and/or family.<br><br>If you're less lucky, you're simulating a place like Santa Cruz County, where more than a quarter of people live 2+ per room."
let houseValueCaption = "This model isn't built for luxury housing yet. <br> But it ought to be able to simulate larger purchases for larger families and/or communities."

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

// //house values
// let mortgageLength = 20; // mortgage length in years
// let houseValue = 400000 // replace this with houseValueOutput
// let housemates = 5; // replace this with housemateOutput
// let priceAfterInterest = houseValue * 1.7;
// let COLFactor = 2;
// let firstMonthRent = Math.floor(priceAfterInterest * COLFactor / (mortgageLength * 12) / housemates); // 1.7 is a rough factor from mortage rates. the *2 represents the rest of COL
// let marketRentDoubleRate = 10; //from market data
// let inflation = 1.03; //Federal Reserve goal rate for inflation is 2%. Let's add +1% to be generous.
// let inflationDELT = 1.05; //Independent var; adjust a little higher if debt becomes infinity
// let inflationMR = 1.072; //housing inflation rate when rent doubles every 10 years
// let debt = 0;
// const tenants = [];
// const rentIndexDELT = {0: (firstMonthRent * 12),};
// const rentIndexMR = {};

//independent vars
let finalYear = 200;
let dissolveLength = 50;

for (let i = 1; i <= finalYear; i++) {
  if (i <= mortgageLength) {
    rentIndexDELT[i] = Math.floor(rentIndexDELT[i-1] * inflationDELT);
  } else if ((i > mortgageLength) || (i <= mortgageLength + dissolveLength))  {
    let inflationDiff = inflation - inflationDELT;
    let dI = inflationDiff / dissolveLength;
    let inflationDELTadjusted = inflationDELT - (dI * (i - mortgageLength))
    rentIndexDELT[i] = Math.floor(rentIndexDELT[i-1] * inflationDELTadjusted);
  } else {
    rentIndexDELT[i] = Math.floor(rentIndexDELT[i-1] * inflation);
  }
  rentIndexMR[i] = Math.floor(firstMonthRent * (inflationMR**i));
}

class Tenant {
  constructor(moveInYear, moveOutYear) {
    this.totalRent = 0;
    this.totalRentMR = 0;
    this.earned = 0;
    this.owed = 0;
    this.mortgagePaid = 0;
    this.moveInYear = moveInYear;
    this.moveOutYear = moveOutYear;
    // this.paid = totalRent;
    // this.earned = earned;
    // this.saved = totalRentMR - totalRent;
  
    this.lengthOfStay = moveOutYear - moveInYear;
    this.paidBackYear = null;

    for (let thisYear = moveInYear; thisYear <= finalYear; thisYear++) {
      this.totalRent += rentIndexDELT[moveInYear] / housemates;
      this.totalRentMR += rentIndexMR[moveInYear] / housemates;
      this.owed *= inflation;
      if (thisYear <= mortgageLength) {
        this.owed += rentIndexDELT[thisYear] / 2; // mortgage as 1/2 of 'market rate'
        this.mortgagePaid += rentIndexDELT[thisYear] / 2;
      };

      //TODO: here is the problem: we can't pay everyone back completely.
      //but we can make up for that with a differential between MR and DELT rent.
      if (thisYear > mortgageLength) {
        if (this.owed > 0) {
          this.owed -= (rentIndexDELT[thisYear] * 6 / housemates);
          if (this.owed <= 0) {
            this.paidBackYear = thisYear;
          }
        }
      }
    }



  }

  getOutcome() {
    console.log(`This tenant moved in during year ${this.moveInYear} and out in year ${this.moveOutYear}.
                  They paid off $${this.mortgagePaid} of the mortgage and received $${this.earned} paid back by year ${this.paidBackYear}.
                  
                  `);
  }

}

// archetypes then.
const tenant0 = new Tenant(1, (mortgageLength / 2));
const tenant1 = new Tenant(1, mortgageLength);
const tenant2 = new Tenant(1, mortgageLength + 10);
const tenant3 = new Tenant(1, mortgageLength * 2);
const tenant4 = new Tenant(mortgageLength / 2, mortgageLength * 0.75);
const tenant5 = new Tenant(mortgageLength / 2, mortgageLength);
const tenant6 = new Tenant(mortgageLength / 2, mortgageLength + 10);
const tenant7 = new Tenant(mortgageLength / 2, mortgageLength * 2);
const tenant8 = new Tenant(mortgageLength, mortgageLength + 10);
const tenant9 = new Tenant(mortgageLength, mortgageLength * 2);
const tenantA = new Tenant(mortgageLength * 2, mortgageLength * 3);
const tenantB = new Tenant(mortgageLength * 3, mortgageLength * 4);

function simulate(tenants) {
  arbitraryDissolveFactor = 0.02;
  for (let i = 1; i < finalYear; i++) {
    console.log(`Year ${i}`)
    console.log(`DELT Rent: ${rentIndexDELT[i]}`)
    console.log(`Market-rate rent: ${rentIndexMR[i]}`)
    debt *= inflation;
    if (i <= mortgageLength) {
      debt += rentIndexDELT[i] / 2;
    }

    j = arbitraryDissolveFactor;
    if (i > mortgageLength) {
      // TODO: is this right?
      debt += (rentIndexDELT[i] / 2) - [1 * j];
      if (j > 1) {
        j = 1;
      }
      if (j < 1) {
        j += arbitraryDissolveFactor;
      }
    }
  }
}
    
    // tenant for-loop is removed here to decouple 'debt' from 'owed'

      
    

  
  console.log("Remaining money owed on mortgage: ");
  console.log("Remaining money owed past tenants: ");
  console.log("Rent at end of timeline: ");
  console.log("Market-rate rent at end of timeline: ");