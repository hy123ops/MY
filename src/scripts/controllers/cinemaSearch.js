const cinemaSearchView = require('../views/cinemaSearch.art')
const suggestView = require('../views/suggest.art')
// const playseachtView = require('../views/playseach.art')
const cinemaSearchModel = require('../models/cinemaSearch')

class CinemaSearch {
    constructor() {

    }

    change() {
        let id = $(this).data('id')
        location.hash = `cinemaShow/${id}`
    }

    async render() {
        let that =this;
        let cinemaSearchHtml = cinemaSearchView()
        $('#root').html(cinemaSearchHtml)

        $('#cancel').on('tap', function () {
            location.hash = `search`
        })

        $('.search-input').on('change', async function () {

            let cId = localStorage.getItem('id') || 1;
            //console.log(cId);

            let a = $(this).val();
            let result = await cinemaSearchModel.get({
                key: a,
                cId: cId
            })
            //console.log(result);
            if (JSON.stringify(result) == '{}') {
                $('.searchResult').html('哦噢，没有找到！')
            } else {
                let arr = result.cinemas.list
                $('.searchResult').html(suggestView({ arr }))
                $('.C-list').on('tap',that.change )
            }
        })

        $('.search-input').on('input', function () {
            if ($('.search-input').val()) {
                $('.del-input').show()
            } else {
                $('.del-input').hide()
                $('.searchResult').html('')
            }
        })

        $('.del-input').on('click', function () {
            $('.search-input').val('')
            $('.del-input').hide()
            $('.searchResult').html('')
        })

    }

}
export default new CinemaSearch()