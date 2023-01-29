const baseurl = "https://purple2m.github.io";
function alc_item(recipe, slot, type){
    $.getJSON(baseurl+"/alchemist/"+type+"/"+recipe+".json?version=20230129", function(data) {
        var items = new Array();
        var items_1 = new Array();
        var items_2 = new Array();
        var items_3 = new Array();
        var items_4 = new Array();
        var items_5 = new Array();
        if(type == "normal"){
            for (var i=0; i < data.length;++i){
                var item_up = new Array();
                var info = {
                    id: data[i].id,
                    ko: data[i].ko,
                    jp: data[i].jp,
                    tw: data[i].tw,
                    ru: data[i].ru,
                    up: item_up
                };
                for (var v=0; v < data[i].normal.length;++v){
                    var item = data[i].normal[v].split(',');
                    var slot = item[2].split('-');
                    info['up'].push(item[0]);
                    if(slot == 1){
                        items_1[data[i].id].push(info);
                    }
                }
            }
        }
        console.log(items);
    });
}
alc_item(1, 3, "normal");