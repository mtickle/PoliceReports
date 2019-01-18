


var base_url = 'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/Daily_Police_Incidents/FeatureServer/0/query?where=1%3D1&outFields=*&f=json';

$('#btnGenerate').click(function () {
    $.getJSON(base_url, function (data) {

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

        console.log(json_obj.features.length);





            // var output="<ul>";



            // for (var i in json_obj) 
            // {

            //     console.log(i.)
            //     console.log(json_obj[i][2]);
            //     //output+="<li>" + json_obj[i].attributes.crime_category + "</li>";
            // }
            // output+="</ul>";

            //  $('#lblOutput').html(output);

      //console.log(obj);

    //   var items = data.items.map(function (item) {
    //     return item.key + ': ' + item.value;
    //   });


    });
  });



// $("#btnGenerate").click(function () {

//     example();
  
//   });

// /********************************** example **************************************/



// function example()
// {
//     var response = "";
//     var form_data = {
//         district: district,
//         city: city,
//         is_ajax: 1
//     };
//     $.ajax({
//         type: "GET", 
//         url: base_url,
//         data: form_data,
//         success: function(response)
//         {
//             /*response = '[{"Language":"jQuery","ID":"1"},{"Language":"C#","ID":"2"},
//                            {"Language":"PHP","ID":"3"},{"Language":"Java","ID":"4"},
//                            {"Language":"Python","ID":"5"},{"Language":"Perl","ID":"6"},
//                            {"Language":"C++","ID":"7"},{"Language":"ASP","ID":"8"},
//                            {"Language":"Ruby","ID":"9"}]'*/
//             console.log(response);
            
// 	    var json_obj = $.parseJSON(response);//parse JSON
            
//             // var output="<ul>";
//             // for (var i in json_obj) 
//             // {
//             //     output+="<li>" + json_obj[i].Language + ",  " + json_obj[i].ID + "</li>";
//             // }
//             // output+="</ul>";
            
//             // $('span').html(output);
//         },
//         dataType: "json"//set to JSON    
//     })    
// }