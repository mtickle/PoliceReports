

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
            var created_date = json_obj.features[i].attributes.created_date;
            var reported_date = json_obj.features[i].attributes.reported_date;
            var reported_block_address = json_obj.features[i].attributes.reported_block_address;
            var district = json_obj.features[i].attributes.district;
            var GlobalID = json_obj.features[i].attributes.GlobalID;

            var clean_reported_date = moment(reported_date).format('dddd, MMMM Do, YYYY h:mm:ss A')
            var clean_created_date = moment(created_date).format('dddd, MMMM Do, YYYY h:mm:ss A')
            //var clean_reported_date = moment(reported_date).format('dddd');

            output+="<dt>" + crime_description + "</dt>";
            output+="<dd>Reported: " + clean_reported_date + "</dd>";
            output+="<dd>Created: " + clean_created_date + "</dd>";
            output+="<dd>Address: " + reported_block_address + "</dd>";
            output+="<dd>" + GlobalID + "</dd>";

          }
        })

          output+="</dl>";

        $('#lblOutput').html(output);

      });
    });
