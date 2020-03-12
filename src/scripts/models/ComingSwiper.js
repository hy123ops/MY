module.exports = {
    get() {
     return $.ajax({
       url: `api/ajax/mostExpected?ci=1&limit=10&offset=0&token=MyCx3GexSgdlgmtDZj4KycIGjtEAAAAAPAkAAHmniCjA91xZAWRgjb-vEg0qkjOf-qpeifIioPgxcpWPn_Or9byGV2_Fw1xdxmbwPg`,
     })
   }
 }