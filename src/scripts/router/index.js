import indexController from '../controllers/'

import positionController from '../controllers/positions'
import searchController from '../controllers/search'
import profileController from '../controllers/profile'
import detailsController from '../controllers/details'
import cinemaSearchController from '../controllers/cinemaSearch'
import positionComingController from '../controllers/positionComing'
import cinemaShowController from '../controllers/cinemaShow'
import cityChooseController from '../controllers/cityChoose'
import ComingDetailController from '../controllers/ComingDetail'

class Router {
    constructor() {
        this.render();
    }

    render() {
        window.addEventListener('load', this.handlePageload.bind(this))
        window.addEventListener('hashchange', this.handleHashchange.bind(this))
    }

    setActiveClass(hash) {
        $(`footer li[data-to=${hash}]`).addClass('active').siblings().removeClass('active')
    }

    renderDOM(hash) {
        let pageControllers = {
            positionController,
            positionComingController,
            searchController,
            profileController,
            detailsController,
            cinemaSearchController,
            cinemaShowController,
            cityChooseController,
            ComingDetailController
        }
        if(!pageControllers[hash + 'Controller'])
        {
            hash="position"
            location.hash=hash;
        }
        indexController.render();
          pageControllers[hash + 'Controller'].render();
        this.setActiveClass(hash);
    

        
    }

    handlePageload() {
        let hash = location.hash.substr(1) || 'position';
        let re = /\w+/;
        let hash2 = hash.match(re)[0];
         this.renderDOM(hash2);
        

    }

     handleHashchange(e) {
       
        let hash = location.hash.substr(1);
        let re = /\w+/;
        
        let hash2 = hash.match(re)[0];
        // console.log(hash2);
        this.renderDOM(hash2);
       
    }

}

new Router()
