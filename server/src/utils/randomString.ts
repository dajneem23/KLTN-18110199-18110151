import { customAlphabet } from 'nanoid/async';

const numbers = '0123456789';
export const numbersSize4 = customAlphabet(numbers, 4);
export const numbersSize6 = customAlphabet(numbers, 6);
export const numbersSize12 = customAlphabet(numbers, 12);

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
export const alphabetSize6 = customAlphabet(alphabet, 6);
export const alphabetSize12 = customAlphabet(alphabet, 12);
export const alphabetSize24 = customAlphabet(alphabet, 24);
