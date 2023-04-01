import { resolve } from 'path';

export const entry = './src/game.ts';
export const output = {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
};