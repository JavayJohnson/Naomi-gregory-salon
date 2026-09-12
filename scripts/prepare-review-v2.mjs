import path from 'node:path'
import { readdir } from 'node:fs/promises'
import sharp from 'sharp'

const reviewName = process.argv[2] ?? 'review-v2'
const reviewDir = path.join(process.cwd(), 'image-approval', reviewName)
const files = (await readdir(reviewDir)).filter((file) => file.endsWith('.png')).sort()

for (const file of files) {
  await sharp(path.join(reviewDir, file))
    .resize(1200, 1500, { fit: 'cover', position: 'attention' })
    .webp({ quality: 90, effort: 5 })
    .toFile(path.join(reviewDir, file.replace(/\.png$/, '.webp')))
}

const tileWidth = 240
const tileHeight = 300
const gap = 16
const columns = 5
const rows = Math.ceil(files.length / columns)
const composites = []

for (let index = 0; index < files.length; index += 1) {
  const left = gap + (index % columns) * (tileWidth + gap)
  const top = gap + Math.floor(index / columns) * (tileHeight + gap)
  const image = await sharp(path.join(reviewDir, files[index]))
    .resize(tileWidth, tileHeight, { fit: 'cover', position: 'attention' })
    .toBuffer()
  const label = Buffer.from(`<svg width="54" height="54"><circle cx="27" cy="27" r="24" fill="#2b0b45" stroke="white" stroke-width="3"/><text x="27" y="36" text-anchor="middle" font-family="Arial" font-size="25" font-weight="700" fill="white">${index + 1}</text></svg>`)
  composites.push({ input: image, left, top }, { input: label, left: left + 8, top: top + 8 })
}

await sharp({
  create: {
    width: columns * tileWidth + (columns + 1) * gap,
    height: rows * tileHeight + (rows + 1) * gap,
    channels: 3,
    background: '#f4eef9',
  },
})
  .composite(composites)
  .webp({ quality: 92 })
  .toFile(path.join(reviewDir, 'numbered-contact-sheet.webp'))

console.log(`Prepared ${files.length} private images in ${reviewName} and a numbered contact sheet.`)
