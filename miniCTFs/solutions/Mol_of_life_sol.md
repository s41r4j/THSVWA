# Guide to Solving the "M0L1CUL3 0F L1F3" CTF Challenge

This CTF challenge involves steganography, password extraction from clues, and decoding a DNA sequence to reveal the flag. Below is a step-by-step guide to solving it. I'll assume you have basic tools like a web browser and steghide (a steganography tool; download it from official sources if needed, available for most OS).

## Step 1: Download the Image
- The challenge provides a download link: https://ibb.co/MxtkcvXM.
- Visit the link and download the image file, named "Mol-of-life.jpg".
- This is a JPEG image depicting a DNA helix (similar to artistic representations), but it contains hidden data.

## Step 2: Analyze the Poem for the Password
- The poem is:
  ```
  within the sPirAl'S gentle turn,
  whisperS hInt of Secrets learneD,
  seek the pulse where life takes flight,
  a hiddeN flAg comes into sight.
  ```
- Notice the unusual capital letters scattered throughout (ignoring standard sentence starts, as the poem is mostly lowercase).
- Extract the capital letters in order: P A S S I S D N A.
- These form "PASSISDNA" the password!
> This fits the DNA theme and the letters perfectly.

## Step 3: Extract the Hidden File Using Steghide
- Open a terminal or command prompt.
- Use steghide to extract the hidden file from the image:
  ```
  steghide extract -sf Mol-of-life.jpg -p "PASSISDNA"
  ```
- This will prompt if the password is correct and extract a file named "444e41.txt".
- Note: "444e41" is hexadecimal for "DNA" (44=D, 4E=N, 41=A), reinforcing the theme.
- Open "444e41.txt" in a text editor. It contains a sequence of DNA bases (e.g., a long string of A, T, G, C).

## Step 4: Decode the DNA Sequence Using DNA Writer
- The hint "~ DNA Writer" points to a tool for converting between text and DNA sequences.
- Visit the DNA Writer website: https://earthsciweb.org/js/bio/dna-writer/.
- This tool uses a lookup table to map letters to 3-base DNA codes (e.g., A=AAA, B=AAC, etc.) and vice versa.
- Scroll to the "Translate base sequence to text" section.
- Paste the entire DNA sequence from "444e41.txt" into the "Enter Sequence:" field.
- Optionally, check "Show Color Sequence:" for a visual representation.
- The "Output:" field will display the decoded text, which is the flag.

By following these steps, you'll uncover the hidden flag. Good luck!
