import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const groups = ['edited', 'generated']
const names = [
  'black-long-straight-layered-hair', 'copper-auburn-short-layered-voluminous-bob',
  'golden-blonde-layered-bob', 'long-black-flat-ironed-hair', 'salt-and-pepper-rounded-bob',
  'cranberry-red-shoulder-length-hair', 'silver-gray-curled-bob-ringlets',
  'silver-gray-sleek-rounded-bob', 'warm-brown-layered-bob-soft-curls', 'white-short-soft-curls',
]

let checked = 0
for (const group of groups) {
  for (const name of names) {
    const file = path.join(root, 'image-approval', group, `${name}.webp`)
    await fs.access(file)
    const metadata = await sharp(file).metadata()
    if (metadata.format !== 'webp' || metadata.width !== 1200 || metadata.height !== 1500) {
      throw new Error(`${file} is not a 1200x1500 WebP.`)
    }
    if (metadata.exif || metadata.iptc || metadata.xmp) {
      throw new Error(`${file} contains removable personal metadata.`)
    }
    checked += 1
  }
}

console.log(`Validated ${checked} standardized hairstyle candidates.`)
