import fs from 'fs/promises'

export async function readInput(fileLocation: string) {
  return await fs.readFile(`${fileLocation}`, 'utf-8')
}