import fs from 'fs/promises'

export async function readInput(fileLocation) {
  return await fs.readFile(`${fileLocation}`, 'utf-8')
}