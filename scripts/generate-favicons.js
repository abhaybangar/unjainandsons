import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const svgPath = path.join(rootDir, 'src', 'app', 'icon.svg');
const svgBuffer = fs.readFileSync(svgPath);

function createIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let currentOffset = headerSize + count * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // ICO Type
  header.writeUInt16LE(count, 4); // Number of images

  const entries = [];
  for (let i = 0; i < count; i++) {
    const buf = pngBuffers[i];
    const size = sizes[i];
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // Width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buf.length, 8); // Image size in bytes
    entry.writeUInt32LE(currentOffset, 12); // Offset
    entries.push(entry);
    currentOffset += buf.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers]);
}

async function generate() {
  console.log('Generating high-resolution favicon & app icons for Zivara...');

  // 1. Generate PNG sizes
  const s16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const s32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const s48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const s180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  const s192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  const s512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();

  // 2. Build multi-resolution ICO file
  const icoBuffer = createIco([s16, s32, s48], [16, 32, 48]);

  // 3. Write files to public/ and src/app/
  fs.writeFileSync(path.join(rootDir, 'public', 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(rootDir, 'src', 'app', 'favicon.ico'), icoBuffer);

  fs.writeFileSync(path.join(rootDir, 'public', 'favicon-16x16.png'), s16);
  fs.writeFileSync(path.join(rootDir, 'public', 'favicon-32x32.png'), s32);
  fs.writeFileSync(path.join(rootDir, 'public', 'apple-touch-icon.png'), s180);
  fs.writeFileSync(path.join(rootDir, 'public', 'icon-192.png'), s192);
  fs.writeFileSync(path.join(rootDir, 'public', 'icon-512.png'), s512);

  fs.writeFileSync(path.join(rootDir, 'src', 'app', 'apple-icon.png'), s180);
  fs.writeFileSync(path.join(rootDir, 'src', 'app', 'icon.png'), s192);

  // Also create a webmanifest for PWA / Mobile
  const manifest = {
    name: "Zivara Fine Jewellery",
    short_name: "Zivara",
    description: "Exquisite BIS Hallmarked gold and certified diamond luxury jewellery.",
    start_url: "/",
    display: "standalone",
    background_color: "#0C1B33",
    theme_color: "#0C1B33",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
  fs.writeFileSync(path.join(rootDir, 'public', 'site.webmanifest'), JSON.stringify(manifest, null, 2));

  console.log('All favicon & icon assets created successfully!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
