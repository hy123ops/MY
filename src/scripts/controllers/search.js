const cinemaHeaderView = require('../views/cinemaHeader.art')
const cinemaPositionView = require('../views/cinemaPosition.art')
const cinemaListView = require('../views/cinemaList.art')
const allCityView = require('../views/allCity.art')
const allcitylistView = require('../views/allcitylist.art')
const subView = require('../views/sub.art')
const comprehensiveView = require('../views/comprehensive.art')
const characteristicView = require('../views/characteristic.art')
const cinemaModel = require('../models/cinema')
const allcityModel = require('../models/allcity')
const BScroll = require('better-scroll')

class Cinema {
  constructor() {
    // this.render()
  }

  renderer(list) {
    let cinemaListHtml = cinemaListView({
      list
    })
    $('main .list-wrapper2 ul').html(cinemaListHtml)

    let $mianHeight = $('main').height()
    if ($('main .list-wrapper2 ul').height() < $('main').height()) {
        $('main .list-wrapper2 ul').height($mianHeight)

    } else {
        $('main .list-wrapper2 ul').height(100 + '%')

    }

    $('.city-name').on('tap', function () {
      location.hash = `cityChoose`
    })

    $('main .list-wrapper2 ul .cinemaShowId').on('tap', function () {
      let id = $(this).attr('data-id')
      location.hash = `cinemaShow/${id}`
    })


    $('.all').on('tap', function () {
      if ($(this).attr('ref') == 'true') {
        $(this).attr('ref', 'false').siblings().attr('ref', 'true')
        $(this).addClass('choose').siblings().removeClass('choose');
        $('.zhezhao').css('display', 'block')
      } else {
        $(this).attr('ref', 'true')
        $(this).removeClass('choose');
        $('.zhezhao').css('display', 'none')
      }
    })

    $('.allpage .item').on('tap', function () {
      $(this).addClass('chosen').siblings().removeClass('chosen');
    })


    $('#dis').on('tap', function () {
      $('.region-list').css('display', 'flex')
      $('.region-list2').css('display', 'none')
    })
    $('#sub').on('tap', function () {
      $('.region-list2').css('display', 'flex')
      $('.region-list').css('display', 'none')
    })


    $('.allCity').on('tap', function () {
      $('.close1').css('display', 'block')
      $('.close2').css('display', 'none')
      $('.close3').css('display', 'none')
    })

    $('.comprehensive').on('tap', function () {
      $('.close1').css('display', 'none')
      $('.close2').css('display', 'block')
      $('.close3').css('display', 'none')
    })

    $('.characteristic').on('tap', function () {
      $('.close1').css('display', 'none')
      $('.close2').css('display', 'none')
      $('.close3').css('display', 'block')
    })

    // $('.zhezhao').on('tap',function(ev){
    //   if( ev.target.className = 'zhezhao'){
    //     $('.zhezhao').hide()
    //     $('.all').removeClass('choose')
    //   }
    // })

  }

  async render() {

    // window.districtId = -1;
    // window.areaId = -1;
    // window.brandId = -1;
    // window.hallTypeId = -1;
    // window.serviceId = -1;

      // //获取时间
      // layout.default.render();
      // let date = new Date;
      // let year = date.getFullYear();
      // let month = date.getMonth() + 1;
      // let day = date.getDate();
      // let newDate = `${year}-${month}-${day}`;

    let cinemaHeaderHtml = cinemaHeaderView({})
    let $hearder = $('header')
    $hearder.html(cinemaHeaderHtml)

    let cityid = localStorage.getItem('id') || 1;
    let that = this
    let result = await cinemaModel.get({
      key: cityid,
      // data: newDate,
      // district: window.districtId,
      // area: window.areaId,
      // brandId: window.brandId,
      // hallType: window.hallTypeId,
      // serviceId: window.serviceId
    })

    let all = await allcityModel.get({
      ci: cityid
    })
    let list = this.list = result.cinemas
    let a = []
    for (let i = 0; i < 1000; i += 20) {
      a.push(i)
    }

    let cityname = localStorage.getItem('dd') || '北京';
    $('.city-name').text(cityname)



    let cinemaPositionHtml = cinemaPositionView({})
    let $main = $('main')
    $main.html(cinemaPositionHtml)


    //全城
    let allcity = all.district.subItems
    let sub = all.subway.subItems
    let allCityHtml = allCityView({ allcity, sub })
    $('.close1').html(allCityHtml)

    $('.district-li').eq(0).addClass('chose')
    $('.district-li').on('tap', function () {
      $(this).addClass('chose').siblings().removeClass('chose');
      let allci = all.district.subItems[$(this).index()].subItems
      let allCiHtml = allcitylistView({ allci })
      $('.region-list .region-list-item').html(allCiHtml)

      $('.region-list-item>.item').eq(0).addClass('cc')
      $('.region-list-item>.item').on('tap', function () {
        $(this).addClass('cc').siblings().removeClass('cc');
      })
    })

    $('.region-list2 .district-li').eq(0).addClass('chose')
    $('.district-li').on('tap', function () {
      $(this).addClass('chose').siblings().removeClass('chose');
      let suba = all.subway.subItems[$(this).index()].subItems
      let subaHtml = subView({ suba })
      $('.region-list2 .region-list-item').html(subaHtml)

      $('.region-list2 .region-list-item>.item').eq(0).addClass('cc')
      $('.region-list-item>.item').on('tap', function () {
        $(this).addClass('cc').siblings().removeClass('cc');
      })
    })


    //品牌
    let com = all.brand.subItems
    let comprehensiveHtml = comprehensiveView({ com })
    $('.close2').html(comprehensiveHtml)

    //特色
    let cha = all.hallType.subItems
    let ser = all.service.subItems
    let characteristicHtml = characteristicView({ cha, ser })
    $('.close3').html(characteristicHtml)

    $(".list-container2 ul ").css("height", "700px")
    this.renderer(list)



    //定义图片对象
    let $imgHead = $('.head img')
    let $imgFoot = $('.foot img')
    let bScroll = new BScroll.default($('.list-wrapper2').get(0), {
      probeType: 2
    })
    //开始要隐藏下拉刷新的div
    bScroll.scrollBy(0, -40)
    // let that=this
    bScroll.on('scrollEnd', async function () {
      if (this.y >= 0) {
        $imgHead.attr('src', '/assets/images/ajax-loader.gif')
        let result = await cinemaModel.get({
          key: cityid
        })
        let list = result.cinemas;
        // console.log(list)
        that.renderer(list)
        bScroll.scrollBy(0, -40)
        //下拉后返回向下箭头
        $imgHead.attr('src', '/assets/images/arrow.png')
        $imgHead.removeClass('up')
        bScroll.refresh()
      }

      //上拉加载
      if (this.maxScrollY >= this.y) {
        that.j++;
        $imgFoot.attr('src', '/assets/images/ajax-loader.gif')
        let list = result.cinemas;

        if (list.length >= 6) $(".list-container2 ul ").css("height", "auto")
        
        that.list = [...that.list, ...list]
        that.renderer(that.list)
        bScroll.scrollBy(0, 40)
        //下拉后返回向下箭头
        $imgHead.attr('src', '/assets/images/arrow.png')
        $imgHead.removeClass('down')
        bScroll.refresh()
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


    $('#call').on('tap', function () {
      location.hash = `cinemaSearch`
    })


    $('.compre').eq(0).addClass('ch')
    $('.compre').on('tap', function () {
      $(this).addClass('ch').siblings().removeClass('ch');
    })

    $('.special-content .item').eq(0).addClass('chosen')
    $('.special-content .item').eq(3).addClass('chosen')
    $('.special-content .item').on('tap', function () {
      $(this).addClass('chosen').siblings().removeClass('chosen');
    })

  }
}

export default new Cinema()