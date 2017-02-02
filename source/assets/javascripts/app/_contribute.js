$(function () {
  if (document.location.href.indexOf("?map") < 0) {
    return;
  }

  var dots = [
   {city: "Łódź, Poland", latitude: "51.75", longitude: "19.46667"},
   {city: "Berlin, Germany", latitude: "52.52437", longitude: "13.41053"},
   {city: "London, UK", latitude: "51.50853", longitude: "-0.12574"},
   {city: "Northcliff, South Africa", latitude: "-26.146111", longitude: "27.97"},
   {city: "Sydney, Australia", latitude: "-33.86785", longitude: "151.20732"},
   {city: "Chennai, India", latitude: "13.08784", longitude: "80.27847"},
   {city: "Bengaluru, India", latitude: "12.97194", longitude: "77.59369"},
   {city: "Pune, India", latitude: "18.51957", longitude: "73.85535"},
   {city: "Brisbane, Australia", latitude: "-27.46794", longitude: "153.02809"},
   {city: "Perth, Australia", latitude: "-31.95224", longitude: "115.8614"},
   {city: "Adelaide, Australia", latitude: "-34.92866", longitude: "138.59863"},
   {city: "Liege, Belgium", latitude: "50.63373", longitude: "5.56749"},
   {city: "Santiago, Brazil", latitude: "-29.19167", longitude: "-54.86722"},
   {city: "Porto Alegre, Brazil", latitude: "-30.03306", longitude: "-51.23"},
   {city: "Sao Paulo, Brazil", latitude: "-23.5475", longitude: "-46.63611"},
   {city: "Sofia, Bulgaria", latitude: "42.69751", longitude: "23.32415"},
   {city: "Xi'an, China", latitude: "34.25833", longitude: "108.92861"},
   {city: "Beijing, China", latitude: "39.9075", longitude: "116.39723"},
   {city: "Breclav, Czech Republic", latitude: "48.75897", longitude: "16.88203"},
   {city: "Lyon, France", latitude: "45.74846", longitude: "4.84671"},
   {city: "Paris, France", latitude: "48.85341", longitude: "2.3488"},
   {city: "Noyal-Muzillac, France", latitude: "47.592145", longitude: "-2.457159"},
   {city: "Munich, Germany", latitude: "48.13743", longitude: "11.57549"},
   {city: "Hamburg, Germany", latitude: "53.57532", longitude: "10.01534"},
   {city: "Budapest, Hungary", latitude: "47.49801", longitude: "19.03991"},
   {city: "New Delhi, India", latitude: "28.63576", longitude: "77.22445"},
   {city: "Indore, India", latitude: "22.71792", longitude: "75.8333"},
   {city: "Faridabad, India", latitude: "28.41124", longitude: "77.31316"},
   {city: "Hyderabad, India", latitude: "17.38405", longitude: "78.45636"},
   {city: "Kolhapur, India", latitude: "16.69563", longitude: "74.23167"},
   {city: "Jakarta, Indonesia", latitude: "-6.21462", longitude: "106.84513"},
   {city: "Tehran, Iran", latitude: "35.69439", longitude: "51.42151"},
   {city: "Kajang, Malaysia", latitude: "2.990617", longitude: "101.786342"},
   {city: "Sibiu, Romania", latitude: "45.8", longitude: "24.15"},
   {city: "Singapore", latitude: "1.28967", longitude: "103.85007"},
   {city: "Ubeda, Spain", latitude: "38.01328", longitude: "-3.3705"},
   {city: "Sigtuna, Sweden", latitude: "59.6191463", longitude: "17.7234191"},
   {city: "Partille and Goeteberg, Sweden", latitude: "57.7395", longitude: "12.10642"},
   {city: "Dindang, Bangkok", latitude: "13.7620637", longitude: "100.5577407"},
   {city: "Irpin, Ukraine", latitude: "50.52175", longitude: "30.25055"},
   {city: "Kent, UK", latitude: "51.230902", longitude: "0.646039"},
   {city: "Liverpool, Manchester and Warrington, UK", latitude: "53.39254", longitude: "-2.58024"},
   {city: "LA & Pasadena & Westlake Village & Winnetka, CA USA", latitude: "34.134924", longitude: "-118.831152"},
   {city: "Houston, TX USA", latitude: "29.76328", longitude: "-95.36327"},
   {city: "Portland, OR USA", latitude: "45.522149", longitude: "-122.678462"},
   {city: "Bay Area (SF, San Bruno, Foster City, ...), CA USA", latitude: "37.55855", longitude: "-122.27108"},
   {city: "Needham & Bourne, MA USA", latitude: "42.28343", longitude: "-71.23283"},
   {city: "New York City, USA", latitude: "40.71427", longitude: "-74.00597"},
   {city: "Waterford, WI USA", latitude: "42.69303", longitude: "-83.41181"},
   {city: "Nashville, TN USA", latitude: "36.16589", longitude: "-86.78444"},
   {city: "Havre de grace, MD USA", latitude: "39.549326", longitude: "-76.092463"},
   {city: "Austin, TX USA", latitude: "30.26715", longitude: "-97.74306"},
   {city: "San Antonio, TX USA", latitude: "29.42412", longitude: "-98.49363"},
   {city: "Fenton, MO USA", latitude: "38.512344", longitude: "-90.444413"},
   {city: "Minneapolis & Farmington, MN USA", latitude: "44.640395", longitude: "-93.143343"},
   {city: "Seoul, South Korea", latitude: "37.566", longitude: "126.9784"},
   {city: "Torino (Turin), Italy", latitude: "45.07049", longitude: "7.68682"},
  ];

  var plots = function(theDots) {
    var result = {};
    $(dots).each(function(idx, dot) {
      result["city-" + idx] = {
        latitude: dot.latitude,
        longitude: dot.longitude,
        href: "#",
        tooltip: {
          content: "<span style=\"font-weight:bold;\">" + dot.city + "</span>"
        },
        attrs: dot.attrs || {}
      };
    });
    return result;
  };

  $(".mapcontainer").mapael({
    map: {
      name: "world_countries_miller",
      zoom : {
        enabled : true,
        maxLevel : 15
      },
      defaultPlot: {
        attrs: { r: "3.75" }
      },
      defaultArea: {
        attrsHover: {
          fill: "#343434",
          stroke: "#000",
          "stroke-width": 1,
          "stroke-linejoin": "round"
        }
      }
    },
    plots: plots(dots)
  });
});
