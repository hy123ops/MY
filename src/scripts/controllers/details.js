const detailView = require('../views/details.art')
const detailModel = require('../models/details')
const BSrcoll = require('better-scroll')

class Detail {
    constructor() {
        
    }


    async render() {
        
        let hash = location.hash
        let reg = RegExp('(\\d+)$', 'g')
        let id = reg.exec(hash)
        // console.log(id[1])

        let result = await detailModel.get({
            key: id[1]
        })

        let list = result.detailMovie
        // this.rederer(list)
        
        let detailhtml = detailView({list})
        $('#root').html(detailhtml)

        let bScrollShow = new BScroll($('.showDays').get(0), {
            scrollX:true,
            scrollY:false,
            probeType: 2,
            bounce:false,
          })


          $('#root .today').on('tap', function () {
            console.log(this);
            
            $(this).addClass('chosen').siblings().removeClass('chosen');
          })

          $('#back').on('tap',function(){
            location.hash =  `position`
          })

          $('.details-box').on('tap',function(){
            let id=$(this).attr('data-id')
            location.hash =  `ComingDetail/${id}`
          })
          
    }
}
export default new Detail()