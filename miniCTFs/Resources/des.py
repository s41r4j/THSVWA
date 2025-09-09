#!/usr/bin/env python3
import argparse
import itertools
from Crypto.Cipher import DES
import sys
import base64

def normalize_key(key_str):
    """Normalize key to 8 bytes by truncating or padding with zero bytes."""
    key_bytes = key_str.encode()
    if len(key_bytes) > 8:
        return key_bytes[:8]
    elif len(key_bytes) < 8:
        return key_bytes + b'\x00' * (8 - len(key_bytes))
    else:
        return key_bytes

# Pad plaintext to multiple of 8 bytes (DES block size)
def pad(text):
    while len(text) % 8 != 0:
        text += ' '
    return text.encode()

def encrypt(plaintext, key_str):
    key = normalize_key(key_str)
    cipher = DES.new(key, DES.MODE_ECB)
    padded = pad(plaintext)
    ciphertext = cipher.encrypt(padded)
    print(f"[+] Ciphertext (base64): {base64.b64encode(ciphertext).decode()}")

def decrypt(ciphertext_b64, key_str):
    key = normalize_key(key_str)
    ciphertext = base64.b64decode(ciphertext_b64)
    cipher = DES.new(key, DES.MODE_ECB)
    decrypted = cipher.decrypt(ciphertext)
    print(f"[+] Decrypted text: {decrypted.decode(errors='ignore').rstrip()}")

def partial_key_attack(ciphertext_b64, partial_key_str):
    ciphertext = base64.b64decode(ciphertext_b64)
    
    # Normalize partial key length, pad or truncate to 8 chars, but keep '?' as is
    # To keep '?' positions correctly, we only pad with '?' or '\x00'?
    # Safer to require partial key is exactly 8 chars
    if len(partial_key_str) != 8:
        print("[-] Partial key must be exactly 8 characters (use '?' for unknown bytes).")
        sys.exit(1)
    
    unknown_positions = [i for i, c in enumerate(partial_key_str) if c == '?']
    known_key_bytes = bytearray(partial_key_str.encode())

    print(f"[i] Starting brute-force for {len(unknown_positions)} unknown bytes...")

    for values in itertools.product(range(256), repeat=len(unknown_positions)):
        for idx, val in zip(unknown_positions, values):
            known_key_bytes[idx] = val

        try:
            cipher = DES.new(bytes(known_key_bytes), DES.MODE_ECB)
            decrypted = cipher.decrypt(ciphertext)
            if all(32 <= b <= 126 for b in decrypted):
                print(f"[+] Key found: {known_key_bytes.decode(errors='ignore')}")
                print(f"[+] Decrypted text: {decrypted.decode().rstrip()}")
                return
        except:
            continue

    print("[-] Key not found.")

def main():
    parser = argparse.ArgumentParser(description="DES Encrypt / Decrypt / Partial Key Attack Tool")
    parser.add_argument("-e", "--encrypt", nargs=2, metavar=('PLAINTEXT', 'KEY'), help="Encrypt plaintext with key (any length)")
    parser.add_argument("-d", "--decrypt", nargs=2, metavar=('CIPHERTEXT', 'KEY'), help="Decrypt base64 ciphertext with key (any length)")
    parser.add_argument("-a", "--attack", nargs=2, metavar=('CIPHERTEXT', 'PARTIAL_KEY'), help="Partial key attack (base64 ciphertext and 8-char partial key with '?')")
    args = parser.parse_args()

    if args.encrypt:
        plaintext, key = args.encrypt
        encrypt(plaintext, key)

    elif args.decrypt:
        ciphertext_b64, key = args.decrypt
        decrypt(ciphertext_b64, key)

    elif args.attack:
        ciphertext_b64, partial_key_str = args.attack
        partial_key_attack(ciphertext_b64, partial_key_str)

    else:
        parser.print_help()

if __name__ == "__main__":
    main()

