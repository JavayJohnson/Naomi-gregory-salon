import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const names = [
  'black-long-straight-layered-hair',
  'copper-auburn-short-layered-voluminous-bob',
  'golden-blonde-layered-bob',
  'long-black-flat-ironed-hair',
  'salt-and-pepper-rounded-bob',
  'cranberry-red-shoulder-length-hair',
  'silver-gray-curled-bob-ringlets',
  'silver-gray-sleek-rounded-bob',
  'warm-brown-layered-bob-soft-curls',
  'white-short-soft-curls',
]

const tileWidth = 240
const tileHeight = 300
const gap = 12
const columns = 5
const rows = 2
const width = columns * tileWidth + (columns + 1) * gap
const height = rows * tileHeight + (rows + 1) * gap

for (const group of ['edited', 'generated']) {
  const composite = []
  for (let index = 0; index < names.length; index += 1) {
    const buffer = await sharp(path.join(root, 'image-approval', group, `${names[index]}.webp`))
      .resize(tileWidth, tileHeight, { fit: 'cover' })
      .toBuffer()
    composite.push({
      input: buffer,
      left: gap + (index % columns) * (tileWidth + gap),
      top: gap + Math.floor(index / columns) * (tileHeight + gap),
    })
  }

  await sharp({ create: { width, height, channels: 3, background: '#f4eef9' } })
    .composite(composite)
    .webp({ quality: 90 })
    .toFile(path.join(root, 'image-approval', `${group}-contact-sheet.webp`))
}

console.log('Created edited and generated contact sheets for private review.')
