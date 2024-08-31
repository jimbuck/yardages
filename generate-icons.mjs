import { execaSync } from 'execa';

console.log(`Generating icons...`);

const sizes = [1024, 512, 192, 180, 144, 120, 96, 80, 72, 48];

for (const size of sizes) {
	console.log(`Generating icon_${size}.png...`);
	execaSync`inkscape --export-filename=${(`./public/icon_${size}.png`)} --export-area-page --export-width=${size} --export-height=${size} ./public/icon.svg`;
}

console.log(`Icons generated!`);