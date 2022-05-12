//importation of any page or a module from seule
import html from './index.html'
import {View} from "Seule/view";

//create the view that contains the logic
export const homePage = () => new View ({
    el: 'home_page',
    html,
    data: {
        message: "hello from here"
    }
    /*,
    handlers(app){
            console.log("hi there")
    }*/
})
