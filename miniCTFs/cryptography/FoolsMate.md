# Fool's Mate

<img width="765" height="765" alt="image" src="https://github.com/user-attachments/assets/68f5d974-21ab-4ed4-8fbf-c57ae289dacf" />

<br> <br>

The challenge conceals a key within the moves of chess's quickest checkmate!  
Check the board at this link and note the five litteras in the game's notation!  
These litteras begin an 8-byte DES key required to unlock this ciphertext: 
```
Bsea9tjCBENE4wasUQud0TL3Eqb6PZcpid+feaK8VynxT35qs9JJjOY7mqBbUeWB
```
Discover the complete key to reveal your flag!  

<br> <br>

Resource link: https://ibb.co/xKg78KhC 


<!--
Solution
To solve the "Fool's Mate" cryptographic challenge, follow these steps:

Extract Fool's Mate Notation:

Fool's Mate is the fastest checkmate in chess, completed with:
White: 1. f3 e5
Black: 2. g4 Qh4#


The algebraic notation is: f3, e5, g4, Qh4.
Collect the unique letters: f, e, g, Q, h, forming the partial key fegQh.


Understand DES Key Requirements:

DES requires an 8-byte key. The partial key "fegQh" provides 5 bytes, leaving 3 bytes to find.


Brute-Force the Missing Bytes:

The ciphertext is: PsEJyd+0IA/mMVCAAYgYI6P2i4TuVwGh81ay7uBNOIOIXSPHFNGMyLFojTpb3niY.
The partial key "fegQh" needs 3 additional bytes, each ranging from 0 to 255 (yielding 256³ = 16,777,216 combinations).
Use a brute-force approach to test all possible 3-byte extensions, checking if the decrypted plaintext consists entirely of printable ASCII characters (bytes 32-126).
If coded correctly it would take around 15 secs to break the key and get the text!


Decrypt the Ciphertext:

Use a DES decryption library, such as Python's pycryptodome.
Decode the base64 ciphertext and attempt decryption with keys like "feghQ\x01\x02\x03" for all combinations.
Example Python code:
```
from Crypto.Cipher import DES
import base64
import itertools

ciphertext = base64.b64decode("Bsea9tjCBENE4wasUQud0TL3Eqb6PZcpid+feaK8VynxT35qs9JJjOY7mqBbUeWB")
partial_key = b"feghQ"

for c1, c2, c3 in itertools.product(range(256), repeat=3):
    key = partial_key + bytes([c1, c2, c3])
    try:
        cipher = DES.new(key, DES.MODE_ECB)
        plaintext = cipher.decrypt(ciphertext)
        if all(32 <= b <= 126 for b in plaintext):
            print(f"Key: {key}, Plaintext: {plaintext.decode(errors='ignore').rstrip()}")
            exit()
    except:
        continue
```

The correct key (e.g., b"fegQh\x12\x34\x56") will decrypt to a readable flag.
-->
