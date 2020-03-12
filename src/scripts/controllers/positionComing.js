const positionComingView = require('../views/positionComing.art')
const positionView = require('../views/position.art')
const indexHeardView = require('../views/indexHeard.art')
const ComingSwiperView = require('../views/ComingSwiper.art')
const positionComingMoudle = require('../models/positionComing')
const comingMoreMoudle = require('../models/comingmore')
const ComingSwiperMoudle = require('../models/ComingSwiper')

class PositionComing {
    constructor() {
        // this.render()
        this.key = 1
        this.j = 0
    }

    renderer(timeArr) {
        $('#posHot').removeClass("active");
        $('#posComing').addClass("active")
       

        $('#posHot').on('tap', function () {
            location.hash = 'position'
        })
        $('#posComing').on('tap', function () {
            location.hash = 'positionComing'
        })


        let positionCominghtml = positionComingView({ timeArr })
        $('main ul').html(positionCominghtml)


        $('main .list-wrapper1 ul li').on('tap', function () {
            let id = $(this).attr('data-id')
            location.hash = `ComingDetail/${id}`
        })


        $('.city-name').on('tap',function(){
            location.hash = `cityChoose`
          })
    }

    async render() {

        let indexHeardHtml = indexHeardView({})
        let $header = $('header')
        $header.html(indexHeardHtml)

        let that = this
        let result = await positionComingMoudle.get()
        //把list装到ul里

        let arr = result.movieIds
        let a = []
        let b = []

        for (let i = 0; i < arr.length; i += 10) {
            a.push(arr.slice(i, i + 10))
        }


        for (let i = 0; i < a.length; i++) {
            b.push(a[i].join('%2C'))
        }

        let positionHtml = positionView()
        $('main').html(positionHtml)

        let list = this.list = result.coming
        
        //console.log(list[1].comingTitle);
        let datatime = {}
        for(let i=0;i<list.length;i++){
            if(!datatime[list[i].comingTitle]){
                datatime[list[i].comingTitle]=[]
            }
            datatime[list[i].comingTitle].push(list[i])
        }
        let timeArr = Object.entries(datatime)
        this.renderer(timeArr)

        let res = await ComingSwiperMoudle.get()
        let sw = res.coming
        let ComingSwiperhtml = ComingSwiperView({sw})
        $('main .Coming-swiper').html(ComingSwiperhtml)

        let cityname = localStorage.getItem('dd') || '北京';
        $('.city-name').text(cityname)

        let swiper4 = new Swiper('.swiper-container4', {
            direction: 'horizontal',  
            spaceBetween:30    ,
            slidesPerView:"auto"
          })

        //定义图片对象
        let $imgHead = $('.head img')
        let $imgFoot = $('.foot img')


        let bScroll = new BScroll($('.list-wrapper1').get(0), {
            probeType: 2
        })

        //开始要隐藏下拉刷新的div
        bScroll.scrollBy(0, -40)


        bScroll.on('scrollEnd', async function () {

            //下拉刷新
            if (this.y >= 0) {
                $imgHead.attr('src', '/assets/images/ajax-loader.gif')

                let result = await positionComingMoudle.get()

                //console.log("bsscroll");

                let list = result.coming;
                let datatime = {}
                for(let i=0;i<list.length;i++){
                    if(!datatime[list[i].comingTitle]){
                        datatime[list[i].comingTitle]=[]
                    }
                    datatime[list[i].comingTitle].push(list[i])
                }
                let timeArr = Object.entries(datatime)
                that.renderer(timeArr)
                bScroll.scrollBy(0, -40)

                //下拉后返回向下箭头
                $imgHead.attr('src', '/assets/images/arrow.png')
                $imgHead.removeClass('up')
            }
            //上拉加载
            if (this.maxScrollY >= this.y) {

                that.j++;
                $imgFoot.attr('src', '/assets/images/ajax-loader.gif')

                let result = await comingMoreMoudle.get({
                    key: b[that.j]
                })


                let list = result.coming;
                that.list = [...that.list, ...list]
                console.log(that.list);
                
                let datatime = {}
                for(let i=0;i<that.list.length;i++){
                    if(!datatime[that.list[i].comingTitle]){
                        datatime[that.list[i].comingTitle]=[]
                    }
                    datatime[that.list[i].comingTitle].push(that.list[i])
                }
                let timeArr = Object.entries(datatime)

                that.renderer(timeArr)

                bScroll.scrollBy(0, 40)

                //下拉后返回向下箭头
                $imgHead.attr('src', '/assets/images/arrow.png')
                $imgHead.removeClass('down')
            }
        })


        bScroll.on('scroll', function () {
            if (this.y > 0) {
                $imgHead.addClass('up')
            }
            if (this.maxScrollY > this.y) {
                $imgFoot.addClass('down')
            }
        })

        $('main .list-wrapper1 .Coming-swiper .swiper-slide').on('tap', function () {
            let id = $(this).attr('data-id')
            location.hash = `ComingDetail/${id}`
        })
    }
}

export default new PositionComing()