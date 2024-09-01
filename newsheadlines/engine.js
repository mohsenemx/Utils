const out = document.getElementById("outTxt");
const btn = document.getElementById("generatorBtn");
const templates = [
  "[name] found dead in [location], police reports the murderer used a [item]",
  "[nation] declared war on [nation] because [name] used a [item]",
];
const names = [
  "John McKart",
  "Kelly Johnson",
  "Cave Johnson",
  "Aria Mason",
  "Juan Dickson",
  "Sniffby Pukeshine",
  "Jameenie Snotworthy",
  "Delilah Noodlepop",
];
const locations = ["Sari", "Shittown"];
const nations = [];
const items = [
  "Kitchen Knife",
  "Tin Foil",
  "Water Bottle",
  "Electrical Tape",
  "Shaving Cream",
  "",
];
const groups = [];
function randomTemplate() {
  return templates[getRandomNumber(0, templates.length)];
}
function randomName() {
  return names[getRandomNumber(0, names.length)];
}
function randomLocation() {
  return locations[getRandomNumber(0, locations.length)];
}
function randomNation() {
  return nations[getRandomNumber(0, nations.length)];
}
function randomItem() {
  return items[getRandomNumber(0, items.length)];
}
function randomGroupName() {
  return groups[getRandomNumber(0, groups.length)];
}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
btn.addEventListener("click", () => {
  generateRandomHeadline();
});
function generateRandomHeadline() {
  let template = randomTemplate();
  out.innerHTML = template;
}
