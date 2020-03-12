const positionView = require('../views/position.art')
const positionListView = require('../views/position-list.art')
const indexHeardView = require('../views/indexHeard.art')
const positionMoreList = require('../models/morepos')
const positionModel = require('../models/postion')

//const BScroll = require('better-scroll')

class Position {
  constructor() {
    // this.render()
    this.key = 1
    this.j = 0
  }


  renderer(list) {
    $('#posHot').addClass("active");
        $('#posComing').removeClass("active")
   

    $('#posHot').on('tap',function(){
      location.hash = 'position'
    })
    $('#posComing').on('tap',function(){
      location.hash = 'positionComing'
    })

    let positionListHtml = positionListView({
      list
    })

    $('main .list-wrapper1 ul').html(positionListHtml)
    $('main .list-wrapper1 ul li').on('tap',function(){
      let id=$(this).attr('data-id')
      //console.log(id);
      
      location.hash =  `details/${id}`
    })


    $('.city-name').on('tap',function(){
      location.hash = `cityChoose`
    })
  }

  async render() {
    let indexHeardHtml = indexHeardView({})
    let $header = $('header')
    $header.html(indexHeardHtml)
    
    let cityname = localStorage.getItem('dd') || '北京';
    $('.city-name').text(cityname)

    let that = this
    let result = await positionModel.get()
    
    
    let arr = result.movieIds
    let a = []
    let b = []

    for (let i = 0; i < arr.length; i += 12) {
      a.push(arr.slice(i, i + 12))
    }


    for (let i = 0; i < a.length; i++) {
      b.push(a[i].join('%2C'))
    }


    //把positionView先装到main里
    let positionHtml = positionView({})
    
    let $main = $('main')
    $main.html(positionHtml)

    //把list装到ul里
    let list = this.list = result.movieList
    this.renderer(list)

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

        let result = await positionModel.get()

        console.log("bsscroll");
        
        let list = result.movieList;
        that.renderer(list)
        bScroll.scrollBy(0, -40)

        //下拉后返回向下箭头
        $imgHead.attr('src', '/assets/images/arrow.png')
        $imgHead.removeClass('up')
      }
      //上拉加载
      if (this.maxScrollY >= this.y) {

        that.j++;
        $imgFoot.attr('src', '/assets/images/ajax-loader.gif')

        let result = await positionMoreList.get({
          key: b[that.j]
        })


        let list = result.coming;

        that.list = [...that.list, ...list]

        that.renderer(that.list)
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



  }
}

export default new Position()