const nav = document.querySelector("nav")
const logo = document.querySelector(".logo")
const weightHTML = document.querySelector(".planets");
const button = document.getElementById("btn");
const headerAfter = document.getElementById("headerAfter");
const headerBefore = document.getElementById("headerBefore");
const inputContener = document.getElementById("inputContener");
const buttons = document.querySelectorAll(".ripple");
const wrongInfo = document.getElementById("wrongInfo");
const mediaQuery = window.matchMedia('(max-width: 900px)')

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
  ["Pluto", 0.06, 248 * 365, "pluto.svg"],
];

document.getElementById("date").max = new Date().toISOString().split("T")[0];

button.addEventListener("click", () => {
  const massPerson = document.getElementById("weight").value;
  const dateBirthday = new Date(document.getElementById("date").value);
  const dateNow = new Date();

  if(isDataOk(massPerson,dateBirthday,dateNow))
  {
    if(headerBefore){
    createNavInputs()
    }
    updateDOM(massPerson,dateBirthday)
}
const buttonNav = document.getElementById("btnInput");

buttonNav.addEventListener("click",()=>{
  const massPerson = document.getElementById("weight").value;
  const dateBirthday = new Date(document.getElementById("date").value);
  const dateNow = new Date();
  if(isDataOk(massPerson,dateBirthday,dateNow)){
  updateDOM(massPerson,dateBirthday)}})
})

function createNavInputs(){
  headerBefore.remove();
    inputContener.remove();
const navInputs = document.createElement('div')
window.scrollTo(0 , 0);
navInputs.classList.add('navInputs')
navInputs.innerHTML = ` <input
type="number"
min="0"
id="weight"
class="input"
placeholder="Type your weight"
required
/>

<input
placeholder="Type your birthdate"
class="textbox-n"
type="text"
onfocus="(this.type='date')"
onblur="(this.type='text')"
id="date"
/>

<div class="wrongInfo hidden" id="wrongInfo">
*Your datas are not correct. Try again.
</div>

<button class="ripple" id="btnInput">CHECK</button>`
nav.style.backgroundColor="rgba(255, 255, 255, 0.4) "
nav.style.position= "fixed";
nav.appendChild(navInputs)

hideLogo(mediaQuery)
mediaQuery.addEventListener('change', hideLogo);

}

function updateDOM(massPerson,dateBirthday){
  weightHTML.innerHTML = "";
  headerAfter.classList.remove("hidden");

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
}

function isDataOk(massPerson,dateBirthday,dateNow){
  if(dateBirthday < dateNow && massPerson > 0){
    weight.classList.remove("wrong");
  date.classList.remove("wrong");
  wrongInfo.classList.add("hidden")
    return true
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
}

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
//Hide logo
function hideLogo(e) {
  // Check if the media query is true
  if (e.matches) {
    // Then log the following message to the console
    logo.style.display='none'

  }else{
    logo.style.display='block'
  }
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
