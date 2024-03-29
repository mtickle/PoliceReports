

//--- Reference to the data source.
var base_url = 'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/Daily_Police_Incidents/FeatureServer/0/query?where=1%3D1&outFields=*&f=json';


//--- Fire off the button click on page load.
$(document).ready(function(){ 
  $("#btnGenerate").click(); 
})

$('#btnGenerate').click(function () {
    $.getJSON(base_url, function (data) {


      //--- The JSON from the source comes with a lot of junk in it, so we want 
      //--- to clean it up real good and check the formatting before we call 
      //--- JSON.parse.
      var output = "";  
      var tmpString = JSON.stringify(data);
        var reportStartIndex = tmpString.indexOf("features");
        tmpString = tmpString.slice(reportStartIndex)
        tmpString = "{\"" + tmpString;
        
        var json_obj = JSON.parse(tmpString);

        // text.sort(function(a, b) {
        //   var nameA = a.clean_reported_date; // ignore upper and lowercase
        //   var nameB = b.clean_reported_date; // ignore upper and lowercase
        //   if (nameA < nameB) {
        //     return -1;
        //   }
        //   if (nameA > nameB) {
        //     return 1;
        //   }
        
        //   // names must be equal
        //   return 0;
        // });
       

      //--- Start looping through the FEATURES elements of the JSON.
        $.each(json_obj.features, function(i, item) {

          //--- Only do this if we're not in an event categorized as MISCELLANEOUS.
          if(json_obj.features[i].attributes.crime_category != "MISCELLANEOUS") {

            //--- Here is where we will get all the values from the JSON
            var crime_description = json_obj.features[i].attributes.crime_description;
            var created_date = json_obj.features[i].attributes.created_date;
            var reported_date = json_obj.features[i].attributes.reported_date;
            var reported_block_address = json_obj.features[i].attributes.reported_block_address;
            var latitude = json_obj.features[i].attributes.latitude;
            var longitude = json_obj.features[i].attributes.longitude;
            var district = json_obj.features[i].attributes.district;

            //--- Build up the URL for the maps image.
            var map_url ="https://maps.googleapis.com/maps/api/staticmap?"
            map_url+="&size=666x333";
            map_url+="&scale=1";
            map_url+="&maptype=roadmap";
            map_url+="&zoom=14";
            map_url+="&center=" + latitude + "," + longitude;
            map_url+="&markers=size:small|color:red|" + latitude + "," + longitude;
            map_url+="&key=AIzaSyCAZiKpruXYY5acqXt9IMFZkVqPoic7RWI";

            //--- Clean up and convert those pesky epoch dates.
            var clean_reported_date = moment(reported_date).format('dddd, MMMM Do, YYYY h:mm:ss A')
            var clean_created_date = moment(created_date).format('dddd, MMMM Do, YYYY h:mm:ss A')

            //--- Put together the HTML in the form of a Bootstrap Card.
            output+="<div class=\"card\" style=\"width: 100%;\">";
            output+=" <img class=\"card-img-top\" src=\"" + map_url + "\" alt=\"Card image cap\">";
            output+="   <div class=\"card-body\">";
            output+="     <h5 class=\"card-title\">" + crime_description + "</h5>";
            output+="     <p class=\"card-text\">";
            output+="       District: " + district + "<br>";
            output+="       Reported: " + clean_reported_date + "<br>";
            //output+="       Created: " + clean_created_date + "<br>";
            output+="       Address: " + reported_block_address + "<br>";
            output+="     </p>"
            output+="   </div>";
            output+="</div>";
            output+="<br>";
          }
        })
       
        //--- Put the HTML output on the page.
        $('#lblOutput').html(output);

      });
    });
