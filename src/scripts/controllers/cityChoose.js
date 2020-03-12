const cityChooseView = require('../views/cityChoose.art')
const cityChooseMoudle = require('../models/cityChoose')
const BScroll = require('better-scroll')
class CityChoose {
    constructor() {

    }

    async render() {

        let that = this
        //let hash = location.hash

        let result = await cityChooseMoudle.get()

        let list = result.cts
        //console.log(list);

        
        let arrFont = [];
        list.forEach(list => {
            let num = list.py.substr(0, 1).charCodeAt() - 97;
            //console.log(arrFont[num]);
            if (!arrFont[num]) {
                arrFont[num] = {};
                arrFont[num].city = [];
                arrFont[num].code = String.fromCharCode(list.py.substr(0, 1).charCodeAt() - 32);
            };
            arrFont[num].city.push(list);
        })
        //console.log(arrFont);
        //let id = localStorage.getItem('dd')
        let cityChooseHtml = cityChooseView({ arrFont, list})
        $('#root').html(cityChooseHtml)
        this.floor()

        $('.city-item2').on('tap',function(){
            let cityname=$(this).html()
            let cityid=$(this).attr('data-id')
            location.hash = `search`
            localStorage.setItem('id',cityid)
            localStorage.setItem('dd',cityname)
        })

        $('.city-item').on('tap',function(){
            let cityname=$(this).html()
            let cityid=$(this).attr('data-id')
            location.hash = `search`
            localStorage.setItem('id',cityid)
            localStorage.setItem('dd',cityname)
        })

    }
    floor(){
        let lis = $('.nav-item')
        let divs = $('.cityPos')
        for(var i=0;i<lis.length;i++){
            lis[i].index = i;
            lis[i].onclick = function(){
                for(var i=0;i<lis.length;i++){
                    lis[i].className = '';
                }
                this.className = 'active';
                setScroll( this.index );
            };
        }
    
        $('.citiesChoose').on('scroll', function(){
            //console.log($('.citiesChoose'));
    
            var scroll = $('.citiesChoose').scrollTop();
    
            for(var i=0;i<divs.length;i++){
    
                if( i === divs.length - 1){
                    if( divs[i].offsetTop < scroll + 100 ){
                        for(var j=0;j<lis.length;j++){
                            lis[j].className = '';
                        }
                        lis[i].className = 'active';
                    }
                    break;
                }
    
    
                if( divs[i].offsetTop < scroll + 100 && divs[i+1].offsetTop > scroll + 100 ){
                    
                    for(var j=0;j<lis.length;j++){
                        lis[j].className = '';
                    }
                    lis[i].className = 'active';
                }
            }
    
        })
    
        function setScroll( index ){
            $('.citiesChoose').scrollTop (divs[index].offsetTop) ;
            console.log($('.citiesChoose').scrollTop());
            
        }
    }
}
export default new CityChoose()