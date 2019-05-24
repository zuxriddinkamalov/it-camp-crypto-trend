import { pathOr } from 'ramda'
import lang from '../constants/lang'

const t = message => pathOr(message, ['ru', message], lang)

export default t
