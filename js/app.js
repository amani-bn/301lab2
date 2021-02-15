/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-env es6 */
/* eslint-disable */ 
//Function expression to select elements

'use strict';

let keywordarr = [];
$.ajax('data/page-1.json').then(data => {
   
    data.forEach((element) => {
    
      let displayImg = new ImgInfo(element);
      displayImg.render();
    })
    ImgFilter();
  })


  function ImgInfo(value) {
    this.image_url = value.image_url;
    this.title = value.title;
    this.description = value.description;
    this.keyword = value.keyword;
    this.horns = value.horns;
  }

  ImgInfo.prototype.render = function()
  {
    let ImgRandom = $('.photo-template').first().clone();
    ImgRandom.attr('class' , this.keyword);
    ImgRandom.find('h2').text(this.title);
    ImgRandom.find('img').attr('src' ,this.image_url);
    ImgRandom.find('p').text(this.description);

    $('main').append(ImgRandom);
    
    if(!(keywordarr.includes(this.keyword)))
    {
        keywordarr.push(this.keyword);
    }
  };

  function ImgFilter()
  {
      for (let i = 0; i < keywordarr.length; i++) {
          let KeyWordList = keywordarr[i];
          $('select').append(`<option > ${KeyWordList} </option>`)
      }
  
  }

  $('select').on('change' , function(event)
  {
    let KeyWordList = event.target.value;

    $('div').hide();
    $(`div[class = "${KeyWordList}" ]`).show()
  })

