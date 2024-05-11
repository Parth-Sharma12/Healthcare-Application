import CryptoJS from 'crypto-js';

// Function to generate a random encryption key
export const generateEncryptionKey = () => {
    return CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex); // Generate a 256-bit (32-byte) key
};

// Generate master key during initialization
export const masterKey = "c407570e5a339048cd1dd2ecc82134b110e9ae00bd6c0d7def98b85453c52270";

// Function to encrypt a message
export const encryptMessage = (message, key) => {
    return CryptoJS.AES.encrypt(message, key).toString();
};

//Function to decrypt a message
export const decryptMessage = (encryptedMessage, key) => {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
    const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedValue;
};
