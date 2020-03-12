module.exports = {
    get({ci}) {
     return $.ajax({
       url: `api/ajax/filterCinemas?ci=${ci}`,
     })
   }
 }