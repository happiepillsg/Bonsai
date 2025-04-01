const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const sizes = [16, 48, 128];
const svgContent = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Dark Square Background -->
  <rect width="512" height="512" rx="64" fill="#0f172a"/>
  
  <!-- B Letter -->
  <path d="M175 140H285C318.333 140 345 146.667 365 160C385 173.333 395 193.333 395 220C395 238.667 389.667 254.333 379 267C368.333 279.667 354.333 288.333 337 293V295C352.333 299 364.667 307.333 374 320C383.333 332.667 388 348.333 388 367C388 392.333 378.333 412.333 359 427C339.667 441.667 313.333 449 280 449H175V140ZM231 266H275C294.333 266 308.667 262.667 318 256C327.333 249.333 332 239 332 225C332 211 327.333 201 318 195C308.667 189 294.333 186 275 186H231V266ZM231 403H280C299.333 403 314 399.333 324 392C334 384.667 339 373.667 339 359C339 344.333 334 333.333 324 326C314 318.667 299.333 315 280 315H231V403Z" fill="white"/>
</svg>`;

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '..', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir);
}

// Create a canvas and draw the SVG
const canvas = createCanvas(512, 512);
const ctx = canvas.getContext('2d');

// Draw the background
ctx.fillStyle = '#0f172a';
ctx.beginPath();
ctx.roundRect(0, 0, 512, 512, 64);
ctx.fill();

// Draw the B letter
ctx.fillStyle = 'white';
ctx.font = 'bold 300px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('B', 256, 256);

// Generate icons for each size
sizes.forEach(size => {
  const resizedCanvas = createCanvas(size, size);
  const resizedCtx = resizedCanvas.getContext('2d');
  
  // Draw the original canvas scaled to the new size
  resizedCtx.drawImage(canvas, 0, 0, size, size);
  
  // Save the PNG
  const buffer = resizedCanvas.toBuffer('image/png');
  fs.writeFileSync(path.join(iconsDir, `icon-${size}.png`), buffer);
});

console.log('Icons generated successfully!'); 