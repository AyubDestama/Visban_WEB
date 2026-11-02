import { readFileSync } from 'node:fs'
import makeRouter from './makeRouter.js'

const data = JSON.parse(readFileSync(new URL('../data/gunung.json', import.meta.url), 'utf8'))
export default makeRouter(data, 'Gunung')
