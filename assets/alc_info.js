const baseurl = "https://purple2m.github.io";
function alc_item(recipe, slots, type){
    $.getJSON(baseurl+"/alchemist/"+type+"/"+recipe+".json?version=20230129", function(data) {
        var lng = $(location).attr('pathname');
        lng = lng.split('/');
        lng = lng[1];

        var items = new Array();
        var items_1 = new Array();
        var items_2 = new Array();
        var items_3 = new Array();
        var items_4 = new Array();
        var items_5 = new Array();
        if(type == "advanced"){
            for (var i=0; i < data.length;++i){
                var item_up = new Array();
                for (var v=0; v < data[i].top.length;++v){
                    var item = data[i].top[v].split(',');
                    var slot = item[2].split('-');
                    var info = {
                        id: data[i].id,
                        icon: data[i].icon,
                        rand: item[1],
                        ko: data[i].ko,
                        jp: data[i].jp,
                        tw: data[i].tw,
                        ru: data[i].ru,
                        up: item[0]
                    };
                    if(slot[1] == 1){
                        items_1.push(info);
                    }else if(slot[1] == 2){
                        items_2.push(info);
                    }else if(slot[1] == 3){
                        items_3.push(info);
                    }else if(slot[1] == 4){
                        items_4.push(info);
                    }else if(slot[1] == 5){
                        items_5.push(info);
                    }

                }
            }
        }

        if(type == "normal"){
            for (var i=0; i < data.length;++i){
                var item_up = new Array();
                for (var v=0; v < data[i].normal.length;++v){
                    var item = data[i].normal[v].split(',');
                    var slot = item[2].split('-');
                    var info = {
                        id: data[i].id,
                        icon: data[i].icon,
                        rand: item[1],
                        ko: data[i].ko,
                        jp: data[i].jp,
                        tw: data[i].tw,
                        ru: data[i].ru,
                        up: item[0]
                    };
                    if(slot[1] == 1){
                        items_1.push(info);
                    }else if(slot[1] == 2){
                        items_2.push(info);
                    }else if(slot[1] == 3){
                        items_3.push(info);
                    }else if(slot[1] == 4){
                        items_4.push(info);
                    }else if(slot[1] == 5){
                        items_5.push(info);
                    }

                }
            }
        }

        var find = '';
        if(slots == 1){
            var view = items_1;
        }else if(slots == 2){
            var view = items_2;
        }else if(slots == 3){
            var view = items_3;
        }else if(slots == 4){
            var view = items_4;
        }else if(slots == 5){
            var view = items_5;
        }

        for (var i=0; i < view.length;++i){
          find += "<li>";
          find += "<a href=\"https://purple2m.github.io/"+lng+"/alchemist/?item="+view[i]['id']+"\">";
          find += "<img class=\"thumb\" src=\"https://assets.playnccdn.com/gamedata/powerbook/l2m/icon/Icon_128/Item/Icon_"+view[i]['icon']+"\" onerror=\"this.src='https://wstatic-cdn.plaync.com/plaync/gameinfo/img/thumb-lineage2m.png';\">";
          find += "+"+view[i]['up']+" ";
          if(lng == "jp"){
            find += view[i]['jp'];
          }else if(lng == "tw"){
            find += view[i]['tw'];
          }else if(lng == "ru"){
            find += view[i]['ru'];
          } else {
            find += view[i]['ko'];
          }
          find += " ("+view[i]['rand']+")";
          find += "</a></li>";
        }
        if (find){
            $('.recipe_item_list').html(find);
        }

    });
}
