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

for (const group of ['edited', 'generated']) {
  for (const name of names) {
    const input = path.join(root, 'image-approval', group, `${name}.png`)
    const output = path.join(root, 'image-approval', group, `${name}.webp`)
    await sharp(input)
      .rotate()
      .resize(1200, 1500, { fit: 'cover', position: 'attention' })
      .webp({ quality: 88, effort: 5 })
      .toFile(output)
  }
}

await sharp(path.join(root, 'image-approval', 'portrait', 'dominique-professional-headshot-candidate.png'))
  .rotate()
  .resize(1200, 1500, { fit: 'cover', position: 'attention' })
  .webp({ quality: 90, effort: 5 })
  .toFile(path.join(root, 'image-approval', 'portrait', 'dominique-professional-headshot-candidate.webp'))

await sharp(path.join(root, 'public', 'og.png'))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .webp({ quality: 88, effort: 5 })
  .toFile(path.join(root, 'public', 'og.webp'))

console.log('Standardized 20 hairstyle candidates, the portrait candidate, and the social preview.')
