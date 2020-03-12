module.exports = {
  get() {
    return $.ajax({
      url: `/api/ajax/movieOnInfoList`
      // url: `/api/position`
    })
  }
}