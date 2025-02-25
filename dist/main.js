let currentMenuIndex;
currentMenuIndex = 0;

const nextBtn = document.querySelector(".next_btn");
const goBack = document.querySelector(".goBack");
const menuNumbers = document.querySelectorAll(".menu_number");
const detailContainer = document.querySelector(".main_info-detail");
const toggleSection = document.querySelector(".main_info-toggle");
const toggleBar = document.querySelector(".toggle_bar");
const toggleEl = document.querySelector(".toggle_element");
const mainInfo = document.querySelector(".main_info");
const headingContainer = document.querySelector(".main_info-heading");

let headingMarkup;
let selectedPlanEl;
let selectedServicesArr = [];

let bills;
let duration;

//first menu variable/markup
const plans = ["arcade", "advanced", "pro"];
const generateMarkup1 = function (plan, bill, duration) {
  const menuMarkup = `<div class="plan main_info-${plan}">
      <img src="./images/icon-${plan}.svg" alt="${plan}-img" />
      <div class="plan-type type1">
      <h4>${plan.slice(0, 1).toUpperCase() + plan.slice(1)}</h4>
      <p>$${bill}/${duration}</p>
      <p>2 months free</p>
      </div>
      </div>`;
  return menuMarkup;
};
const renderMarkup1 = function (plans, bills, duration) {
  for (let i = 0; i < plans.length; i++) {
    detailContainer.insertAdjacentHTML(
      "beforeend",
      generateMarkup1(plans[i], bills[i], duration)
    );
  }
};

//second menu variable/markup
const services = ["services", "storage", "profile"];
const servicesMarkup = [
  `
                <h4>Online service</h4>
                <p>Access to multiplier games</p>
              `,
  `
                <h4>Larger storage</h4>
                <p>Extra 1TB of cloud save</p>
              `,
  `
                <h4>Customizable Profile</h4>
                <p>Custom theme on your profile</p>
              `,
];
const generateMarkup2 = function (servicesMarkup, service, bill, duration) {
  const menuMarkup = `<div class="service main_info-${service}">
                <div class="service-check">
                  <input type="checkbox" name="${service}" id="${service}" />
                  <div>
                    ${servicesMarkup}
                  </div>
                </div>
                <p>+$${bill}/${duration}</p>
              </div>`;
  return menuMarkup;
};
const renderMarkup2 = function (servicesMarkup, services, bills, duration) {
  for (let i = 0; i < servicesMarkup.length; i++) {
    detailContainer.insertAdjacentHTML(
      "beforeend",
      generateMarkup2(servicesMarkup[i], services[i], bills[i], duration)
    );
  }
};

//third menu variale/markup

const generateMarkup3 = function () {
  const checkoutMarkup = ` <div class="check-out plan-choice">
              <div>
                <h4>Arcade(Monthly)</h4>
                <p>change</p>
              </div>
              <p>$9/mo</p>
            </div>
            <div class="check-out addOn-choice">
              <div class="choice choice1">
                <p>Online service</p>
                <p>+$1/mo</p>
              </div>
              <div class="choice choice2">
                <p>Online service</p>
                <p>+$1/mo</p>
              </div>
            </div>
            <div class="check-out total-bill">
              <p>Total(per month)</p>
              <p>+$12/mo</p>
            </div>`;
  return checkoutMarkup;
};

//
//
//
let renderIndex1;
let renderIndex2;
let renderIndex3;
//
//
//
nextBtn.addEventListener("click", function () {
  currentMenuIndex++;

  currentMenuIndex !== 0
    ? (goBack.style.opacity = 1)
    : (goBack.style.opacity = 0);

  const menuNumArr = [...menuNumbers];

  menuNumArr.forEach((menuNum) => {
    menuNum.classList.remove("active-number");
    if (currentMenuIndex === +menuNum.classList[1].slice(-1))
      menuNum.classList.add("active-number");
  });
  // if (currentMenuIndex === 3) this.style.display = "none";

  //clear container function
  const clearContainers = function () {
    detailContainer.innerHTML = "";
    headingContainer.innerHTML = "";
  };
  //
  //
  //

  if (currentMenuIndex === 1) {
    renderIndex1 = function () {
      toggleSection.style.display = "flex";

      clearContainers();
      headingMarkup = `<h3>Select your plan</h3>
                    <p>You have the option of monthly or yearly billing</p>`;

      duration = "mo";
      bills = [9, 12, 15];

      renderMarkup1(plans, bills, duration);
      headingContainer.innerHTML = headingMarkup;
    };
    renderIndex1();
  }
  //
  //
  //

  if (currentMenuIndex === 2) {
    renderIndex2 = function () {
      toggleSection.style.display = "none";

      clearContainers();
      headingMarkup = `<h3>Pick add-ons</h3>
                    <p>Add-ons help enhance your gaming experience</p>`;

      bills = [1, 2, 2];
      const billsYr = bills.map((bill) => bill * 10);
      bills = !mainInfo.classList.contains("yearlyPlan") ? bills : billsYr;
      duration = !mainInfo.classList.contains("yearlyPlan") ? "mo" : "yr";

      renderMarkup2(servicesMarkup, services, bills, duration);
      headingContainer.innerHTML = headingMarkup;

      //
      //
      //
      const checkboxes = [...document.querySelectorAll("input[type=checkbox]")];
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
          const selectedContainer = this.closest(".service");
          if (this.checked) {
            selectedContainer.classList.add("selected");
            selectedServicesArr.push(selectedContainer);
          } else {
            selectedServicesArr = selectedServicesArr.filter((arr) => {
              arr !== selectedContainer;
            });
            selectedContainer.classList.remove("selected");
          }
        });
      });
    };
    renderIndex2();
  }

  if (currentMenuIndex === 3) {
    renderIndex3 = function () {
      console.log(selectedPlanEl, selectedServicesArr);
      clearContainers();

      headingMarkup = `<h3>Finishing-up</h3>
                    <p>Double-check everything looks okay before confirming </p>`;
      headingContainer.innerHTML = headingMarkup;

      const generatePlanMarkup = function (plan, durationState, bill) {
        const planMarkup = `<div class="check-out plan-choice">
              <div>
                <h4>${plan}(${durationState})</h4>
                <p>change</p>
              </div>
              <p>${bill}</p>
            </div>`;
        return planMarkup;
      };
      //
      //
      const renderPlanMarkup = function (plan, durationState, bill) {
        detailContainer.insertAdjacentHTML(
          "beforeend",
          generatePlanMarkup(plan, durationState, bill)
        );
      };

      const bill = selectedPlanEl.querySelectorAll("p")[0].textContent;
      const plan = selectedPlanEl.querySelector("h4").textContent;
      const durationState = !mainInfo.classList.contains("yearlyPlan")
        ? "Monthly"
        : "Yearly";

      renderPlanMarkup(plan, durationState, bill);

      //
      //
      //

      const generateAddOnMarkup = function (addOn, bill) {
        const addOnMarkup = ` <div class="check-out addOn-choice">
                <div class="choice choice1">
                <p>${addOn}</p>
                <p>${bill}</p>
                </div>
                </div>`;
        return addOnMarkup;
      };

      const addOnBills = [];
      selectedServicesArr.forEach((addOn) => {
        const bill = addOn.querySelectorAll("p")[1].textContent;
        addOnBills.push(bill);
        const addOnText = addOn.querySelector("h4").textContent;

        detailContainer.insertAdjacentHTML(
          "beforeend",
          generateAddOnMarkup(addOnText, bill)
        );
      });
      //
      //
      //
      const sumBillArr = [];
      [bill, ...addOnBills].forEach((bill, i) => {
        const sliceBill = (cutIndex) =>
          sumBillArr.push(+bill.slice(cutIndex, -3));
        if (i === 0) sliceBill(1);
        else sliceBill(2);
      });
      let totalBill = 0;
      sumBillArr.forEach((bill) => (totalBill += bill));

      const generateTotalMarkup = function (durationFull, total, duration) {
        const totalMarkup = `<div class="check-out total-bill">
              <p>Total (per ${durationFull})</p>
              <p>+$${total}/${duration}</p>
            </div>`;
        return totalMarkup;
      };

      const renderTotalMarkup = function (durationFull, total, duration) {
        detailContainer.insertAdjacentHTML(
          "beforeend",
          generateTotalMarkup(durationFull, total, duration)
        );
      };

      duration = !mainInfo.classList.contains("yearlyPlan") ? "mo" : "yr";
      const durationFull = !mainInfo.classList.contains("yearlyPlan")
        ? "Month"
        : "Year";
      renderTotalMarkup(durationFull, totalBill, duration);
    };
    renderIndex3();
  }
});
//
//
//
toggleBar.addEventListener("click", function () {
  mainInfo.classList.toggle("yearlyPlan");
  const billsYr = bills.map((bill) => bill * 10);
  bills = !mainInfo.classList.contains("yearlyPlan") ? bills : billsYr;
  duration = !mainInfo.classList.contains("yearlyPlan") ? "mo" : "yr";
  detailContainer.innerHTML = "";
  renderMarkup1(plans, bills, duration);
});
//
//
//
detailContainer.addEventListener("click", function (e) {
  if (currentMenuIndex === 1) {
    if (e.target === e.currentTarget) return;
    const selected = e.target.closest(".plan");
    selected.classList.toggle("active-plan");

    const planElArray = [...document.querySelectorAll(".plan")];
    planElArray.forEach((el) => {
      if (el !== selected) el.classList.remove("active-plan");
      else if (el === selected && el.classList.contains("active-plan"))
        selectedPlanEl = el;
      else if (el === selected && !el.classList.contains("active-class"))
        selectedPlanEl = "";
    });
  }
});
//
//
//

[...menuNumbers].forEach((menuNum) => {
  menuNum.addEventListener("click", function (e) {
    const menuNumContainer = e.target.closest(".menu_number");
    if (+menuNumContainer.textContent === 2) renderIndex1();
    else if (+menuNumContainer.textContent === 3) renderIndex2();
    else if (+menuNumContainer.textContent === 4) renderIndex3();
  });
});
