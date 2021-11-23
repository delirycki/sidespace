const weightHTML = document.querySelector(".planets");
const button = document.querySelector(".ripple");
const headerAfter = document.getElementById("headerAfter");
const weight = document.getElementById("weight");
const dateInput = document.getElementById("date");
const buttons = document.querySelectorAll(".ripple");
const wrongInfo = document.getElementById("wrongInfo");

const planets = [
  ["Sun", 27.9, 365 / 12, "TheSun.svg"],

  ["Mercury", 0.377, 88, "mercury.svg"],
  ["Venus", 0.9032, 225, "venus.svg"],
  ["Earth", 1, 365.25, "earth.svg"],
  ["Moon", 0.1655, 365.25, "moon.svg"],
  ["Mars", 0.3895, 687, "mars.svg"],
  ["Jupiter", 2.54, 11.8 * 365, "jupiter.svg"],
  ["Saturn", 1.08, (29, 4 * 365), "saturn.svg"],
  ["Uranus", 0.917, 84 * 365, "uranus.svg"],
  ["Neptune", 1.19, 164 * 365, "neptune.svg"],
  ["Pluto", 0.06, 248 * 365, ".svg"],
];

dateInput.max = new Date().toISOString().split("T")[0];

button.addEventListener("click", () => {
  const massPerson = weight.value;
  const dateBirthday = new Date(dateInput.value);
  const dateNow = new Date();

  if (massPerson > 0 && dateBirthday < dateNow) {
    weight.classList.remove("wrong");
    dateInput.classList.remove("wrong");
    weightHTML.innerHTML = "";
    headerAfter.classList.remove("hidden");
    wrongInfo.classList.add("hidden");

    for (e in planets) {
      const [year, months] = yourAgeInAnotherPlanet(dateBirthday, e);
      const planetdiv = document.createElement("div");
      planetdiv.classList.add("planet");
      if (planets[e][0] == "Sun") {
        planetdiv.style["grid-column"] = "1/ span 2";
        planetdiv.style.width = "92rem";
      }
      planetdiv.innerHTML = `
        <img id="${planets[e][0]}" src="img/${planets[e][3]}" alt="${
        planets[e][0]
      }">
        <strong>${planets[e][0]}</strong>
        <p>Your weight is ${yourWaghtInAnotherPlanet(e, massPerson)} kg.</p>
        <p>Your age is ${year} years and ${months} months old.</p>
        <p>Your next birthday is ${nextBirthday(dateBirthday, e)}.</p>`;
      weightHTML.appendChild(planetdiv);
    }
  } else if (dateBirthday < dateNow && massPerson <= 0) {
    weight.classList.add("wrong");
    wrongInfo.classList.remove("hidden");
  } else if (massPerson > 0 && dateBirthday > dateNow) {
    date.classList.add("wrong");
    wrongInfo.classList.remove("hidden");
  } else {
    weight.classList.add("wrong");
    date.classList.add("wrong");
    wrongInfo.classList.remove("hidden");
  }
});

function yourWaghtInAnotherPlanet(nrOfPlanet, massPerson) {
  return Math.floor(planets[e][1] * massPerson);
}

function yourAgeInAnotherPlanet(dateBirthday, nrOfPlanet) {
  const days = getNumberOfDays(dateBirthday, Date.now());

  const yearsInSpace = days / planets[nrOfPlanet][2];
  return [
    Math.floor(yearsInSpace),
    Math.floor(scale(yearsInSpace % 1, 0, 0.999999, 0, 11)),
  ];
}

function getNumberOfDays(start, end) {
  const date1 = new Date(start);
  const date2 = new Date(end);

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.floor(diffInTime / oneDay);

  return diffInDays;
}

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function nextBirthday(dateBirthday, nrOfPlanet) {
  let date = new Date();

  let daysToBirthday =
    planets[nrOfPlanet][2] -
    (getNumberOfDays(dateBirthday, Date.now()) % planets[nrOfPlanet][2]);
  return addDays(Date.now(), daysToBirthday).toLocaleDateString();
}

function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Animation for button

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const x = e.clientX;
    const y = e.clientY;

    const buttonTop = e.target.offsetTop;
    const buttonLeft = e.target.offsetLeft;

    const xInside = x - buttonLeft;
    const yInside = y - buttonTop;

    const circle = document.createElement("span");
    circle.classList.add("circle");
    circle.style.top = yInside + window.scrollY + "px";
    circle.style.left = xInside + "px";

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 500);
  });
});
