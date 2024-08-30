import { execaSync } from 'execa';

console.log(`Generating icons...`);

const sizes = [512, 192, 144, 96, 72, 48];

for (const size of sizes) {
	console.log(`Generating icon_${size}.png...`);
	execaSync`inkscape --export-filename=${(`./public/icon_${size}.png`)} --export-area-page --export-width=${size} --export-height=${size} ./public/icon.svg`;
}

console.log(`Icons generated!`);