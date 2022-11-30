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
    $('.wrapper-masthead').children(":first").toggle();
    $('.wrapper-masthead').children(":last").toggle();
  });
	//저장
	let normal = localStorage.getItem('normal');
	let normal_update = localStorage.getItem('normal_update');

	let advanced = localStorage.getItem('advanced');
	let advanced_update = localStorage.getItem('advanced_update');

  const update = 20221112;

	normal = JSON.parse(normal);
  advanced = JSON.parse(advanced);

  if(typeof normal === 'undefined' || normal === null || normal_update != update){
    $.getJSON("https://purple2m.github.io/item/search/normal.json?version=20220809", function(data) {
      localStorage.setItem('noraml', JSON.stringify(data));
      localStorage.setItem('noraml_version', 20221112);
      console.log("일반 연금 선택");
      auto_come(data, 1);
    });
  }else{
    auto_come(normal, 1);
  }

  $('input:radio[name=type]').change(function(){
    let type = $("input:radio[name='type']:checked").val();
    if(type == 1){
      if(typeof normal === 'undefined' || normal === null || normal_update != update){
        $.getJSON("https://purple2m.github.io/item/search/normal.json?version=20220809", function(data) {
    			localStorage.setItem('noraml', JSON.stringify(data));
          localStorage.setItem('noraml_version', 20221112);
          console.log("일반 연금 선택");
          auto_come(data, type);
    		});
    	}else{
        auto_come(normal, type);
    	}
    } else if(type == 2){
        if(typeof advanced === 'undefined' || advanced === null || advanced_update != update){
          $.getJSON("https://purple2m.github.io/item/search/top.json?version=20220809", function(data) {
      			localStorage.setItem('advanced', JSON.stringify(data));
            localStorage.setItem('advanced_update', 20221112);
            console.log("상급 연금 선택");
            auto_come(data, type);
      		});
        }else{
          auto_come(advanced, type);
        }
    }
  });

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

              if(arg.ko.replace(/ /g, '').indexOf(txt) > -1 || arg.jp.replace(/ /g, '').indexOf(txt) > -1){
                if(arg.ko.replace(/ /g, '').indexOf(txt) > -1){
                  var item_name = arg.ko;
                  var lang = "ko";
                } else if(arg.jp.replace(/ /g, '').indexOf(txt) > -1){
                  var item_name = arg.jp;
                  var lang = "jp";
                }
                  $('#autoMaker').append(
                      $('<div>').html("<a href='https://purple2m.github.io/"+lang+"/alchemist/?item="+arg.id+"&type="+type+"'>"+item_name+"</a>").attr({'recipe':arg.recipe})
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

                if(arg.ko.replace(/ /g, '').indexOf(txt) > -1 || arg.jp.replace(/ /g, '').indexOf(txt) > -1){
                  if(arg.ko.replace(/ /g, '').indexOf(txt) > -1){
                    var item_name = arg.ko;
                    var lang = "ko";
                  } else if(arg.jp.replace(/ /g, '').indexOf(txt) > -1){
                    var item_name = arg.jp;
                    var lang = "jp";
                  }
                    $('#autoMaker').append(
                      $('<div>').html("<a href='https://purple2m.github.io/"+lang+"/alchemist/?item="+arg.id+"&type="+type+"'>"+item_name+"</a>").attr({'recipe':arg.recipe})
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
