

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
            output+="<dt>" + json_obj.features[i].attributes.crime_description + "</dt>";
            output+="<dd>" + json_obj.features[i].attributes.reported_dayofwk + "</dd>";
            output+="<dd>" + json_obj.features[i].attributes.district + "</dd>";
            //console.log(json_obj.features[i].attributes.crime_code)
        })

          output+="</dl>";

        $('#lblOutput').html(output);

        console.log(json_obj);




