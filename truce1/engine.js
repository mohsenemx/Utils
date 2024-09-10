const encryptBtn = document.getElementById("encryptButton");
encryptBtn.addEventListener("click", () => {
  let input = document.getElementById("inputencrypt").value;
  encrypt(input);
});
function encrypt(text) {
    let key = generateKey();
    console.log(key);
}
function generateKey() {
  let key = "";
  key += random(1,9);
  key += getRandomCapitalLetter();
  key += getRandomSmallLetter();
  key += random(100,999);
  key += (!random(0,1)) ? 'Z' : 'X';
  return textToHex(key);
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomSmallLetter() {
    return String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1) + 97));
}
function getRandomCapitalLetter() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function textToHex(text) {
    return text.split('').map(char => char.charCodeAt(0).toString(16)).join('');
}