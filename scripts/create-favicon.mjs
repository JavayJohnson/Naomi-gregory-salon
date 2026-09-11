import sharp from 'sharp'

const source = Buffer.from(`
  <svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="28" fill="#21083f"/>
    <text x="64" y="86" text-anchor="middle" font-family="Georgia, serif" font-size="68" fill="#ffffff">N</text>
  </svg>
`)

await sharp(source).png().toFile('public/favicon.png')
console.log('Created public/favicon.png.')
