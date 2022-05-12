import html from "./index.html";
import {Seule} from 'seule'

const app = new Seule({
    el: '#app',
    style: 'app',
    data: {
        msg : "Hello Seule"
    }
})
