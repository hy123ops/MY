module.exports = {
    get({key}) {
     return $.ajax({
       url: `api/ajax/cinemaList?day=2019-10-09&offset=20&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=false&reqId=1570580455352&cityId=${key}`,
     })
   }
 }