function getParameterByName( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}
$(document).ready(function() {
  $('#autoMaker').hide();
  $('.pull-left').click(function(){
    $('.wrapper-masthead').children().eq(0).slideToggle(600 );
    $('.wrapper-masthead').children().eq(1).toggle();
    $('.wrapper-masthead').children().eq(2).toggle();
  });
	//저장
	let search = localStorage.getItem('search');
	let search_update = localStorage.getItem('search_update');

  const update = 20230202;

  search = JSON.parse(search);

  if(typeof search === 'undefined' || search === null || search_update != update){
    $.getJSON("https://purple2m.github.io/item/search/search.json?version=20230202", function(data) {
      localStorage.setItem('search', JSON.stringify(data));
      localStorage.setItem('search_update', 20230202);
      auto_come(data, 1);
    });
  }else{
    auto_come(search, 1);
  }

  function auto_come(data, type){
    var ref = data;
    var isComplete = false;  //autoMaker 자식이 선택 되었는지 여부

    if($('#search_area').val()){
      var txt = $('#search_area').val();
      txt = txt.replace(/ /g, '');
      if(txt != ''){  //빈줄이 들어오면
          $('#autoMaker').show();
          $('#autoMaker').children().remove();

          ref.forEach(function(arg){
              if(arg.ko.replace(/ /g, '').indexOf(txt) > -1 || arg.jp.replace(/ /g, '').indexOf(txt) > -1 || arg.tw.replace(/ /g, '').indexOf(txt) > -1 || arg.ru.replace(/ /g, '').indexOf(txt) > -1){
                if(arg.ko.replace(/ /g, '').indexOf(txt) > -1){
                  var item_name = arg.ko;
                  var lang = "ko";
                }
                if(arg.jp.replace(/ /g, '').indexOf(txt) > -1){
                  var item_name = arg.jp;
                  var lang = "jp";
                }
                if(arg.tw.replace(/ /g, '').indexOf(txt) > -1){
                  var item_name = arg.tw;
                  var lang = "tw";
                }
                if(arg.ru.replace(/ /g, '').indexOf(txt) > -1){
                  var item_name = arg.ru;
                  var lang = "ru";
                }
                  $('#autoMaker').append(
                      $('<div>').html("<a href='https://purple2m.github.io/"+lang+"/alchemist/?item="+arg.id+"'>"+item_name+"</a>").attr({'recipe':arg.recipe})
                  );
              }
          });
          $('#autoMaker').children().each(function(){
              $(this).click(function(){
                  $('#search_area').val($(this).text());
                  $('#insert_target').val($(this).text());
                  $('#autoMaker').children().remove();
                  isComplete = true;
              });
          });
      } else {
          $('#autoMaker').children().remove();
          $('#autoMaker').hide();
      }
    }

    $('#search_area').keyup(function(){
        var txt = $(this).val();
        txt = txt.replace(/ /g, '');
        if(txt != ''){  //빈줄이 들어오면
            $('#autoMaker').show();
            $('#autoMaker').children().remove();

            ref.forEach(function(arg){

              if(arg.ko.replace(/ /g, '').indexOf(txt) > -1 || arg.jp.replace(/ /g, '').indexOf(txt) > -1 || arg.tw.replace(/ /g, '').indexOf(txt) > -1 || arg.ru.replace(/ /g, '').indexOf(txt) > -1){
                if(arg.ko.replace(/ /g, '').indexOf(txt) > -1){
                  var item_name = arg.ko;
                  var lang = "ko";
                }
                if(arg.jp.replace(/ /g, '').indexOf(txt) > -1){
                  var item_name = arg.jp;
                  var lang = "jp";
                }
                if(arg.tw.replace(/ /g, '').indexOf(txt) > -1){
                  var item_name = arg.tw;
                  var lang = "tw";
                }
                if(arg.ru.replace(/ /g, '').indexOf(txt) > -1){
                  var item_name = arg.ru;
                  var lang = "ru";
                }
                    $('#autoMaker').append(
                      $('<div>').html("<a href='https://purple2m.github.io/"+lang+"/alchemist/?item="+arg.id+"'>"+item_name+"</a>").attr({'recipe':arg.recipe})
                    );
                }
            });
            $('#autoMaker').children().each(function(){
                $(this).click(function(){
                    $('#search_area').val($(this).text());
                    $('#insert_target').val($(this).text());
                    $('#autoMaker').children().remove();
                    isComplete = true;
                });
            });
        } else {
            $('#autoMaker').children().remove();
            $('#autoMaker').hide();
        }
    });
    $('#search_area').keydown(function(event){
        if(isComplete) {  //autoMaker 자식이 선택 되었으면 초기화
            $('#insert_target').val('')
        }
    });
  }
});
