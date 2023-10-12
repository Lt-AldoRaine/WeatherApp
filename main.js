import "./style.scss";
import { getCurrentTemp } from './modules/weatherApi'
import dom from './modules/dom'

dom()
console.log(getCurrentTemp());
