module.exports = {
    get({key}) {
      return $.ajax({
        url: `/api/ajax/cinemaDetail?cinemaId=${key}`
      })
    }
/*     get(){
      return $.ajax({
        type:'get',
        dataType:'json',
        url:'/libs/cinemaDetail.json'
      })
    } */
  }