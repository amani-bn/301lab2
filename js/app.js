/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-env es6 */
/* eslint-disable */ 
//Function expression to select elements 

"use strict";

let keywordarr = [];
let ImagesObjArray = [];

function ImgInfo(value) {
  this.image_url = value.image_url;
  this.title = value.title;
  this.description = value.description;
  this.keyword = value.keyword;
  this.horns = value.horns;
  if (!keywordarr.includes(this.keyword)) {
    keywordarr.push(this.keyword);
  }
  ImagesObjArray.push(this) ;
}

ImgInfo.prototype.render = function () {

  let template = $("#template-dis").html();
  let newObj = Mustache.render(template, this);
  
  $("main").append(newObj);
};


$.ajax('data/page-1.json').then(data => {
   
  data.forEach((element) => {
  
    let displayImg = new ImgInfo(element);
    displayImg.render();
    
  })
  ImgFilter();
})



  function ImgFilter() {
    for (let i = 0; i < keywordarr.length; i++) {
      console.log(keywordarr);
      $("select").append(`<option> ${keywordarr[i]} </option>`);
    }
  }

  $("select").on("change", function (event) {
    $("div").hide();
    let KeyWordList2 = $(this).val();
    
   
    $(`.${KeyWordList2}`).show();
  });



  // sort the images 

  $('#hornsNum').click(function() {

    
    ImagesObjArray.sort((a,b) => 
    {
      return a.horns - b.horns;
    });

    $('main').empty();
    
    ImagesObjArray.forEach((Value) =>
    {
     
      Value.render();
      
    })
   
})

$('#titleSort').click(function()
{
 
  //if()
  ImagesObjArray.sort((a,b) => 
  {
    if(a.title < b.title)
    return -1;

    else if(a.title > b.title)
    return 1;

    else 
    return 0;
  });

  $('main').empty();
  
 
  ImagesObjArray.forEach((Value) =>
  {
   // jQuery.unique(Value);
    Value.render();
  })
})



//////////////////////////////////////////////////////////
$('#page1').click(function()
{

  $('main').empty();
  $("select").empty();
  // $('#titleSort').remove();
  // $('#hornsNum').remove();

  
  $.ajax('data/page-1.json').then(data => {
   
    data.forEach((element) => {
    
      let displayImg = new ImgInfo(element);
      displayImg.render();
      
    })
    ImgFilter();
  })
  

})



$('#page2').click(function()
{

  $('main').empty();
  $("select").empty();
  
  

  $.ajax('data/page-2.json').then(data => {
   
    data.forEach((element) => {
    
      let displayImg = new ImgInfo(element);
      displayImg.render();
      
    })
    ImgFilter();
  })
  

})