const ComingDetailView = require('../views/ComingDetail.art')
const ComingDetailMoudle = require('../models/ComingDetail')
const BSrcoll = require('better-scroll')
class ComingDetail {
  constructor() {

  }

  async render() {
    let hash = location.hash
    let reg = RegExp('(\\d+)$', 'g')
    let id = reg.exec(hash)

    let result = await ComingDetailMoudle.get({
      key: id[1]
    })
    let list = result.detailMovie

    let ComingDetailhtml = ComingDetailView({ list })
    $('#root').html(ComingDetailhtml)

    $('#back').on('tap', function () {
      location.hash = `positionComing`
    })

    let swiper3 = new Swiper('.swiper-container3', {
      loop: true,
      width: 140,
      loopedSlides: 5,
    })

    let scroll = new BScroll('.bscroll-wrapper')

    $('.want-to-watch').on('tap', this.Change)
    $('.looked').on('tap', this.Change)

  }
  Change() {
    let a = $(this).children().eq(0).attr('alt')
    let b = $(this).children().eq(0).attr('ref')
    if ($(this).attr('onoff') == 'true') {
      $(this).attr('onoff', 'flase').children().eq(0).hide();
      $(this).attr('onoff', 'flase').children().eq(1).html(b)
      $(this).attr('onoff', 'flase').css('background', 'hsla(0,0%,100%,.2)')
    }
    else {
      $(this).attr('onoff', 'true').children().eq(0).show();
      $(this).attr('onoff', 'true').children().eq(1).html(a)
      $(this).attr('onoff', 'true').css('background', 'hsla(0,0%,100%,.35)')
    }
  }

}
export default new ComingDetail()