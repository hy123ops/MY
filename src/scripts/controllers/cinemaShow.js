const cinemaDetaView = require('../views/cinemaShow.art')
const cinemaDetaHeaderView = require('../views/cinemaShowHeader.art')
const cinemaDetaSessionView = require('../views/cinemaShowse.art')
const cinemaDetaMovdeView = require('../views/cinemaShowmovde.art')
const cinemaDetaModels = require('../models/cinemaShow')

class CinemaDetail {
  constructor() {

   }

  async render() {

    let hash = location.hash.substr(1)
    //console.log(hash);
    
    // let reg = new RegExp('^(\\w+)(\\/)(\\w+)', 'g')
    // let path = reg.exec(hash)
    // let id = path[3];
      let id=hash.split("/")[1];
      console.log(decodeURIComponent(id));
      
    let cinemaDetModels = await cinemaDetaModels.get({
      key: id
    })

    let list = cinemaDetModels
    //console.log(cinemaDetModels);
    
    let cinemaDetaViewHtml = cinemaDetaView({
      list
    })
    $('main').html(cinemaDetaViewHtml)
    
    let cinemaDetaHeaderView1 = cinemaDetaHeaderView({
      list
    })
    $('header').html(cinemaDetaHeaderView1)
    

    let deal = list.dealList.dealList
    let arr = cinemaDetModels.showData.movies
    let movelist = arr[0]
    let date = movelist.shows
    //console.log(date);
    
    let cinemaDetaHeaderMViews = cinemaDetaMovdeView({
      movelist,list,deal,date
    })
    $("main .movdes").html(cinemaDetaHeaderMViews)


    let show = movelist? movelist.shows[0].plist:null
    //console.log(show);
    
    let cinemaDetaSessionView1 = cinemaDetaSessionView({
      show
    })
    $("main .ListUl").html(cinemaDetaSessionView1)
    

    $('main .today').eq(0).addClass('chosen');
    $('main .today').on('tap', function () {
      $(this).addClass('chosen').siblings().removeClass('chosen');
    })

    $('main .today').on('tap', function () {

      let This = $(this).index();
      $('.today').removeClass("chosen");
      $(this).addClass('chosen');

      let show = movelist.shows[This].plist
      //console.log(show);
      
      let cinemaDetaSessionView1 = cinemaDetaSessionView({
        show
      })
      $("main .ListUl").html(cinemaDetaSessionView1)

    })


    let swiper = new Swiper('.swiper-container', {
      slidesPerView: 5,
      spaceBetween: 30,
      centeredSlides: true,
      preventClicks: false,
      slideToClickedSlide: true,
      on: {
        slideChangeTransitionEnd: function () {

          // 获取当前索引
          let movelist = arr[this.activeIndex]
          let backimg = 'url(' + list.showData.movies[this.activeIndex].img.replace(/w\.h/, '128.180') + ')';
          $('main .box').css('background', backimg)

          let cinemaDetaHeaderMViews = cinemaDetaMovdeView({
            movelist,deal,date
          })
          $("main .movdes").html(cinemaDetaHeaderMViews)
          $('main .today').eq(0).addClass('chosen');


          let show = movelist.shows[0].plist
          let cinemaDetaSessionView1 = cinemaDetaSessionView({
            show
          })
          $("main .ListUl").html(cinemaDetaSessionView1)

          let swiper1 = new Swiper('.swiper-container1', {
            slidesPerView: 3,
          })
          

          $('main .today').on('tap', function () {

            let This = $(this).index();
            $('.today').removeClass("chosen");
            $(this).addClass('chosen');

            let show = movelist.shows[This].plist
            let cinemaDetaSessionView1 = cinemaDetaSessionView({
              show
            })

            $("main .ListUl").html(cinemaDetaSessionView1)

          })

        },
      },
    });

    $('#back').on('tap', function () {
      location.hash = `search`
    })
    $('footer').hide()
  }
}
export default new CinemaDetail()