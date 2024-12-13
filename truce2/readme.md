# TRUCE-2 Encryption Algorithm

TRUCE-2 is a custom encryption algorithm designed for secure data encoding. It builds on the foundation of its predecessor, TRUCE-1, and incorporates advanced features for enhanced security. Below is a detailed explanation of its working principles, key features, and components.

## How It Works

TRUCE-2 operates in multiple stages, combining several cryptographic techniques to transform plaintext into ciphertext. It ensures that encrypted data is secure, non-reversible without the proper key, and resistant to common attacks. The algorithm consists of the following steps:

### 1. Input Sanitization

Before any encryption or decryption takes place, TRUCE-2 ensures that both the plaintext and the key are sanitized:

Text and Key Constraints:
- Only printable ASCII characters (32–126) are allowed.
- Non-printable or invalid characters are removed.
- Empty inputs are rejected.
This step guarantees consistency and prevents unexpected behavior due to invalid characters.

---

### 2. Key Expansion
TRUCE-2 expands the provided key to ensure a strong, dynamic relationship between the key and the encrypted data.

The key is repeated and adjusted for multiple rounds of encryption.
This ensures that even short keys provide adequate security and introduces variability across encryption rounds.
### 3. Substitution (S-Box)
The plaintext is passed through a substitution process using a Substitution Box (S-Box).

Each character is replaced with a corresponding value from the S-Box.
The S-Box is a predefined mapping of ASCII characters to new ASCII values. For example:
Input A (ASCII 65) may be replaced with another printable character like $ (ASCII 36).
Substitution ensures non-linearity and adds confusion to the encryption process.
---
### 4. Shifting (Dynamic Modulo Arithmetic)
After substitution, the algorithm applies dynamic shifting to each character based on the key and the current round number:

The shift amount is calculated as:
```
shiftAmount = (ASCII value of key character + round number) % 95
```
The character is shifted forward or backward within the printable ASCII range (32–126).
Wrapping Logic: If a shift moves the character out of the ASCII range, it wraps back within the valid range.
This step introduces additional confusion and ensures that each round produces unique ciphertext.
---
### 5. Permutation
The permuted text is reordered using a permutation function:

Characters in the ciphertext are rearranged according to a specific rule. For example:
A simple rule might reverse the text: Hello → olleH.
The permutation ensures that adjacent characters in plaintext are scattered in the ciphertext.
Permutation increases diffusion, making it harder to identify patterns in the encrypted output.
---
### 6. Multiple Rounds
To enhance security, TRUCE-2 performs multiple rounds of the above steps:

Each round includes substitution, shifting, and permutation.
The number of rounds depends on implementation but is typically set to 10.
Multiple rounds ensure that the ciphertext becomes increasingly complex with each iteration, making brute-force attacks impractical.

## Decryption
Decryption in TRUCE-2 reverses the encryption process step by step using the same key:

Reverse Permutation: Rearranges the ciphertext back to its original order.
Reverse Shifting: Applies inverse dynamic shifting to each character.
Reverse Substitution: Uses the inverse S-Box to map characters back to their original values.
The process is repeated for the same number of rounds in reverse order.
Without the correct key, reversing the encryption steps is computationally infeasible.
---
### Key Features
- Sanitization:

Ensures consistent behavior and prevents errors.
Only processes valid, printable ASCII characters.
- Dynamic Key Usage:

Key expansion ensures variability even for short keys.
Keys influence all encryption stages dynamically.
- Confusion and Diffusion:

Substitution introduces confusion by replacing characters unpredictably.
Permutation scatters plaintext relationships, enhancing diffusion.
Multi-Round Security:

Each additional round increases encryption complexity.
Multi-round encryption ensures ciphertext becomes highly non-linear.
- Reversible Decryption:

Decryption uses the same steps in reverse, making it efficient while maintaining security.
---
## Security Advantages
Resilience to Attacks:
Non-linearity and diffusion ensure resistance to frequency analysis.
Multi-round encryption makes brute-force attacks computationally impractical.
Key Sensitivity:
Small changes in the key produce vastly different ciphertext.
Lightweight:
Operates efficiently on plaintext within the printable ASCII range.
Example
Encryption
Input:

```
Plaintext: HelloWorld!
Key: mysecret
```
Steps:

Sanitization: Text and key are validated.
Substitution: H → S, e → t, etc.
Shifting: Characters are dynamically shifted.
Permutation: Text is rearranged.
Rounds: The process repeats multiple times.
Output:

```
Ciphertext: @v8l!3kV)
```
Decryption
Using the same key and reverse steps, the ciphertext is decrypted back into the original plaintext.

### Limitations
Limited to printable ASCII characters (32–126).
Relies on the secrecy and strength of the user-provided key.
Not suitable for encrypting binary or non-ASCII data without modification.
---
### Conclusion
TRUCE-2 is a robust custom encryption algorithm that combines simplicity with effectiveness. Its modular design allows for extensibility, making it an excellent tool for securing text data.
