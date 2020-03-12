module.exports = {
    get() {
     return $.ajax({
       url: `api/ajax/comingList?ci=1&token=MyCx3GexSgdlgmtDZj4KycIGjtEAAAAAPAkAAHmniCjA91xZAWRgjb-vEg0qkjOf-qpeifIioPgxcpWPn_Or9byGV2_Fw1xdxmbwPg&limit=10`,
     })
   }
 }