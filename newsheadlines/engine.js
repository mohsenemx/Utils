const out = document.getElementById("outTxt");
const btn = document.getElementById("generatorBtn");
const templates = [
  "[name] found dead in [location], the police reports the murderer used a [item]",
  "[nation] declared war on [nation] because [name] used a [item]",
  "[item] has killed [bignumber] people in [location]",
  "[nation] conquered [nation] because their [item] wasn't enough",
  "Every year, [smallnumber] people die to [item] in [location]",
  "[name] earned a total of [hugenumber] dollars in [location] with a [item]",
  "[group] has cuased a lot of chaos in [location] they are known to use [item] , [item] and [item]",
  "Riots in [location] caused by [group] activites, cuased the city to collapse into chaos with people running around with a [item]",
];
const names = [
  "John McKarti",
  "Cave Johnson",
  "Aria Mason",
  "Juan Dickson",
  "Barrack Obama",
  "Dr. Breen",
  "Ali Khamenei",
  "William Shakersphere"
];
const locations = ["Sari", "Shittown", "Tehran", "TownCity", "CityCity", "Trashtown", "Neka", "Shanghai", "St. Petersburg"];
const nations = [
  "Islamic Republic of Afghanistan",
  "France",
  "Russia",
  "UAE",
  "China",
  "Saudi Arabia",
  "Iraq",
  "Iran",
  "United States of America",
  "Karaj Republic",
  "Arak Kingdom",
];
const items = [
  "Kitchen Knife",
  "Tin Foil",
  "Water Bottle",
  "Electrical Tape",
  "Shaving Cream",
  "Screen Protective Glass",
  "Candy",
  "Vaseline"
];
const groups = ["Black Street Gangsters", "American Gays", "Black Mesa Scintists", "The Combine Elite"];
function randomTemplate() {
  return templates[getRandomNumber(0, templates.length - 1)];
}
function randomName() {
  return names[getRandomNumber(0, names.length - 1)];
}
function randomLocation() {
  return locations[getRandomNumber(0, locations.length - 1)];
}
function randomNation() {
  return nations[getRandomNumber(0, nations.length - 1)];
}
function randomItem() {
  return items[getRandomNumber(0, items.length - 1)];
}
function randomGroup() {
  return groups[getRandomNumber(0, groups.length - 1)];
}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
btn.addEventListener("click", () => {
  generateRandomHeadline();
});
function generateRandomHeadline() {
  let template = randomTemplate();
  let tokens = template.split(' ');
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] == '[name]') {
      tokens[i] = randomName();
    } else if (tokens[i] == '[location]') {
      tokens[i] = randomLocation();
    } else if (tokens[i] == '[item]') {
      tokens[i] = randomItem();
    } else if (tokens[i] == '[nation]') {
      tokens[i] = randomNation();
    } else if (tokens[i] == '[group]') {
      tokens[i] = randomGroup();
    } else if (tokens[i] == '[bignumber]') {
      tokens[i] = formatNumber(getRandomNumber(1000, 1000000));
    } else if (tokens[i] == '[smallnumber]') {
      tokens[i] = getRandomNumber(10, 999);
    }else if (tokens[i] == '[hugenumber]') {
      tokens[i] = formatNumber(getRandomNumber(1000000, 2000000000));
    }
  }
  template = tokens.join(' ');
  template = template + ".";
  out.innerHTML = template;
}
document.body.onload = () => {
  generateRandomHeadline();
}
function formatNumber(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
