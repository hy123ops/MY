module.exports = {
    get({key,cId}) {
      let url=`api/ajax/search?kw=${key}&cityId=${cId}&stype=2`
      //console.log(url);
      
      return $.ajax({
        url
      })
    }
  }