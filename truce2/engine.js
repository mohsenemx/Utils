// Ensure that key is always a string
function ensureString(key) {
    return typeof key === "string" ? key : String.fromCharCode(...key);
  }
  
  // Substitution Box (S-Box) - Simple character substitution example
  const SBox = [
    35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47
  ];
  
  // Substitute function: Map the character to its new value from the S-Box
  function substituteCharacter(char) {
    const charCode = char.charCodeAt(0);
    return String.fromCharCode(SBox[charCode - 32]);
  }
  
  // Reverse substitution using the inverse S-Box
  function reverseSubstituteCharacter(char) {
    const charCode = char.charCodeAt(0);
    const originalCharCode = SBox.indexOf(charCode);
    return String.fromCharCode(originalCharCode + 32);
  }
  
  // Shift character with key-based rotation and wrapping
  function shiftCharacter(char, key, round) {
    if (typeof key !== "string") {
      console.error("Invalid key:", key);
      return char;
    }
  
    const keyChar = key.charAt(round % key.length);
    const shiftAmount = (keyChar.charCodeAt(0) + round) % 95;
    let shiftedCharCode = char.charCodeAt(0) + shiftAmount;
  
    // Apply wrapping for ASCII printable characters (32-126)
    if (shiftedCharCode > 126) shiftedCharCode = 32 + (shiftedCharCode - 126 - 1);
    else if (shiftedCharCode < 32) shiftedCharCode = 126 - (32 - shiftedCharCode - 1);
  
    return String.fromCharCode(shiftedCharCode);
  }
  
  // Reverse shift to decrypt
  function reverseShiftCharacter(char, key, round) {
    if (typeof key !== "string") {
      console.error("Invalid key:", key);
      return char;
    }
  
    const keyChar = key.charAt(round % key.length);
    const shiftAmount = (keyChar.charCodeAt(0) + round) % 95;
    let shiftedCharCode = char.charCodeAt(0) - shiftAmount;
  
    // Reverse shift with wrapping
    if (shiftedCharCode < 32) shiftedCharCode = 126 - (32 - shiftedCharCode - 1);
    else if (shiftedCharCode > 126) shiftedCharCode = 32 + (shiftedCharCode - 126 - 1);
  
    return String.fromCharCode(shiftedCharCode);
  }
  
  // Permutation function (placeholder, reverse as needed)
  function permute(text) {
    return text.split("").reverse().join(""); // Reverse string as a dummy permutation
  }
  
  function reversePermute(text) {
    return text.split("").reverse().join(""); // Reverse string as a dummy reverse permutation
  }
  
  // Encryption function
  function encrypt(text, key) {
    let encryptedText = "";
    for (let i = 0; i < text.length; i++) {
      const substitutedChar = substituteCharacter(text.charAt(i));
      const shiftedChar = shiftCharacter(substitutedChar, key, i);
      encryptedText += shiftedChar;
    }
    return permute(encryptedText); // Apply permutation to encrypted text
  }
  
  // Decryption function
  function decrypt(encryptedText, key) {
    let decryptedText = reversePermute(encryptedText);
    let originalText = "";
  
    for (let i = 0; i < decryptedText.length; i++) {
      const reversedShiftedChar = reverseShiftCharacter(decryptedText.charAt(i), key, i);
      const reversedSubstitutedChar = reverseSubstituteCharacter(reversedShiftedChar);
      originalText += reversedSubstitutedChar;
    }
  
    return originalText;
  }
  
  // Key sanitization
  function sanitizeKey(key) {
    return key.split('').filter(char => char.charCodeAt(0) >= 32 && char.charCodeAt(0) <= 126).join('');
  }
  
  // Text sanitization
  function sanitizeText(inputText) {
    return inputText.split('').filter(char => char.charCodeAt(0) >= 32 && char.charCodeAt(0) <= 126).join('');
  }
  
  // Encryption button handler
  function startEncryption() {
    let text = document.getElementById("inputencrypt").value.trim();
    const userKey = document.getElementById("userKeyInput").value.trim();
  
    if (!text) {
      alert("Please enter text to encrypt.");
      return;
    }
  
    try {
      // Sanitize both the text and the key
      text = sanitizeText(text);
      const sanitizedKey = sanitizeKey(userKey);
  
      const encryptedText = encrypt(text, sanitizedKey); // Encrypt the text
      console.log("Encrypted:", encryptedText);
    } catch (error) {
      alert(error.message);
    }
  }
  
  // Decryption button handler
  function startDecryption() {
    const encryptedText = document.getElementById("inputdecrypt").value.trim();
    const key = document.getElementById("decryptkey").value.trim();
  
    try {
      const decryptedText = decrypt(encryptedText, key); // Decrypt the text
      document.getElementById("decryptOut").value = decryptedText;
    } catch (error) {
      alert("Decryption failed: " + error.message);
    }
  }
  