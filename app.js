var express = require('express')
var cors =  require('cors')

var app = express()
var bodyParser = require('body-parser');


app.listen(3000,function(){
  console.log("start!!")
})

//bodyParser
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())


//더미 JSON Data
var rawData = [
  {movie_name:"가감보이", movie_code:"20038060", c_year:"2003", c_country:"필리핀", kind:"코미디" },
  {movie_name:"가간투아", movie_code:"19988595", c_year:"1998", c_country:"미국", kind:"코미디" },
  {movie_name:"경마장 가는길", movie_code:"19910059", c_year:"1991", c_country:"한국", kind:"드라마" },
  {movie_name:"눈이 먼 낙타", movie_code:"20038723", c_year:"2003", c_country:"인도", kind:"가족1" },
  {movie_name:"도시의 낙원", movie_code:"20018946", c_year:"2001", c_country:"중국", kind:"드라마" },
  {movie_name:"버려진낙원", movie_code:"20028906", c_year:"2002", c_country:"인도", kind:"드라마" },
  {movie_name:"왕자호동과 낙랑공주", movie_code:"15650045", c_year:"1956", c_country:"한국", kind:"멜로" },
  {movie_name:"지상낙원", movie_code:"20011512", c_year:"2001", c_country:"인도", kind:"다큐멘터리" },
  {movie_name:"고흐의 방", movie_code:"20168795", c_year:"2014", c_country:"한국", kind:"드라마" },
  {movie_name:"신밧드", movie_code:"20134282", c_year:"1971", c_country:"헝가리", kind:"드라마" },
  {movie_name:"다크 하우스", movie_code:"20175982", c_year:"2016", c_country:"미국", kind:"공포" },
  {movie_name:"백만장자 빌리", movie_code:"19958116", c_year:"1995", c_country:"프랑스", kind:"코미디" },
  {movie_name:"사슬", movie_code:"20181652", c_year:"2016", c_country:"한국", kind:"기타" },
  {movie_name:"야외극장", movie_code:"20159263", c_year:"2014", c_country:"러시아", kind:"애니메이션" },
  {movie_name:"자전거 도둑", movie_code:"20141744", c_year:"2014", c_country:"한국", kind:"드라마" },
  {movie_name:"파란만장", movie_code:"20119502", c_year:"2010", c_country:"한국", kind:"드라마" },



]

function search(value){

  for(var i=0;i<rawData.length;i++){
    if(rawData[i].movie_name==value){
      return rawData[i];
    }
  }

  return "undefined";
}

// //bodyParser를 이용해 POST요청을 처리한다.
app.post('/ajax_send_search', function(req, res){

  var error = {"type":"search", "status":"error"}
  var success = {"type":"search", "status":"success"}
  var responseData="";

  var inputData=req.body.movie_name;
  var resultData=search(inputData);

  console.log(resultData)
  if(resultData=="undefined") responseData=error;
  else responseData=Object.assign({},success,resultData);
  console.log(responseData)

  res.json(responseData);
});
