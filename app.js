

//--- Reference to the data source.
var base_url = 'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/Daily_Police_Incidents/FeatureServer/0/query?where=1%3D1&outFields=*&f=json';

$('#btnGenerate').click(function () {
    $.getJSON(base_url, function (data) {

        //--- This is used to clean up the JSON feed and make it easier to read later.
        var tmpString = JSON.stringify(data);
        var reportStartIndex = tmpString.indexOf("features");
        tmpString = tmpString.slice(reportStartIndex)
        tmpString = "{\"" + tmpString;
        var json_obj = JSON.parse(tmpString);
        
          var output="<dl>";

        $.each(json_obj.features, function(i, item) {

          if(json_obj.features[i].attributes.crime_category != "MISCELLANEOUS") {

            var crime_description = json_obj.features[i].attributes.crime_description;
            var reported_date = json_obj.features[i].attributes.reported_date;
            var reported_block_address = json_obj.features[i].attributes.reported_block_address;
            var district = json_obj.features[i].attributes.district;

            var clean_reported_date = moment(reported_date).format('dddd, MMMM Do, YYYY h:mm:ss A')
            //var clean_reported_date = moment(reported_date).format('dddd');

            output+="<dt>" + crime_description + "</dt>";
            output+="<dd>" + clean_reported_date + "</dd>";
            output+="<dd>" + reported_block_address + "</dd>";
            output+="<dd>" + district + "</dd>";

          }
        })

          output+="</dl>";

        $('#lblOutput').html(output);

      });
    });
