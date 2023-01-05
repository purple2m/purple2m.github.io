const baseurl = "https://purple2m.github.io";

function ncapi(get_url, item_id, enchant_level, target){
	this.token = "eyJraWQiOiI0OGEzNzliNS1mNGIxLTQ2Y2ItYTk4Zi0xOWNmM2VjOTEyYTYiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOiIxRjczMzQyNy05RUQ5LTQ5MjctQTEzRS1DMTJEMDU4ODRDOTAifQ.S8ZmQslV8xMQ_gT2dx7C0OGFV0rWFh-vsk5YHMTx32bVB5uvQSQrdSmbLKIiQycsnyCrw-ASkjeqtjBAzFkpbQBel-g3tQpbg8I8P3psOO_kJizvaJtwOsLQaHiF_zqhgQuDaCRZ40yHI49BWMGUukkx-SQhko0HCYy3uaz2D-ovYrg90E_6g38dz2t7UGdruWpkuTxNCHcjS7OYFEP41C0YjERsFM4o6CTGvKhtNXgs6qf--UbAKsFYHf-UPsQI9FRndhvxvO5pRLbnWDHQLGeWoEDh6Y1j396MGWl3vOCVJhBKaGE4pAUZFoCbV1DfB2Ls3Ns1MPd7u3l9QkMCXg"
	this.xhr = new XMLHttpRequest();
	this.item_id = item_id;
	this.enchant_level = enchant_level;
	this.target = target;
	this.queryParams = '?';

	if (get_url == 'price'){
		this.url = 'https://dev-api.plaync.com/l2m/v1.0/market/items/'+ this.item_id +'/price';
		this.queryParams += encodeURIComponent('enchant_level') + '='+encodeURIComponent(this.enchant_level);

		price();
	}else if (get_url == 'items'){
		this.url = 'https://dev-api.plaync.com/l2m/v1.0/market/items/'+ this.item_id;
		this.queryParams += encodeURIComponent('enchant_level') + '='+encodeURIComponent(this.enchant_level);

		items();
	}


	function price(){
		xhr.open('GET', url + queryParams);
		xhr.setRequestHeader('Authorization', 'Bearer ' + token);
		xhr.onreadystatechange = function () {
		  if (this.readyState == 4) {
			let data = JSON.parse(this.responseText);

			let price_div = document.getElementsByClassName("price_info");
				if(data.now.unit_price){
					price_div[0].innerHTML = '<img src="'+baseurl+'/images/dia.svg"> ' + data.now.unit_price + ' ' + data.now.server_name;
				}else{
					price_div[0].innerHTML = '<img src="'+baseurl+'/images/dia.svg"> ';
				}
		  }
		};
		xhr.send('');
	}

	function items(responseText){
		xhr.open('GET', url + queryParams);
		xhr.setRequestHeader('Authorization', 'Bearer ' + token);
		xhr.onreadystatechange = function () {
		  if (this.readyState == 4) {
			let data = JSON.parse(this.responseText);

			let image = document.getElementsByClassName("thumb2");
				image[0].src = data.image;

			let item_name = document.getElementById("item_name");
				item_name.className = data.grade;

			let trade_category_name = document.getElementsByClassName("trade_category_name");
				trade_category_name[0].innerHTML = data.trade_category_name;

			let collection_count = document.getElementsByClassName("collection_count");
			    collection_count[0].innerHTML = data.attribute.collection_count;

			let options = document.getElementsByClassName("options");
			if (data.options.length == 0){
				var str = data.attribute.description.replace(/\[/g, '<br>[');
				options[0].innerHTML = '<li>' + str + '</li>';
			} else {
				for (var i=0; i < data.options.length;++i){
					options[0].innerHTML += '<li>' + data.options[i].option_name + ' ' + data.options[i].display + '</li>';
				}
			}
				get_item(data.item_id);
				console.log(data);
		  }
		};
		xhr.send('');
	}

	function get_item(item){
		item = String(item);
		let type = getParameterByName('type');

		let step = $(location).attr('pathname').split('/');
		let lng = step[1];

		let item_type;
		let item_type1 = item.substr(0, 2);
		let item_type2 = item.substr(2, 2);
	  
		if(item_type1 == 10){ // 무기
		  item_type = "weapone";
		} else if(item_type1 == 20){ // 방어구
		  item_type = "armor";
		} else if(item_type1 == 30){ // 장신구
		  item_type = "accessary";
		} else if(item_type1 == 31){ // 장신구
		  item_type = "rune";
		} else if(item_type1 == 50){ // 스킬
		  item_type = "skill";
		} else if(item_type1 == 60){ // 기타
		  item_type = "etc";
		} else if(item_type1 == 70){ // 마력석
		  item_type = "stone";
		}
		if(type == 2){
		  type = "top";
		} else {
		  type = "normal";
		}
	  
		$.getJSON(baseurl+"/item/"+type+"/"+item_type+"/"+item_type2+".json", function(data) {
		  const info = data.find(v => v.id == item);

		  let item_name = document.getElementById("item_name");

		  if (lng == "jp"){
			item_name.innerHTML = info.jp;
		  } else {
			item_name.innerHTML = info.ko;
		  }
		});
	}
	
}

function get_items(item){
	item = String(item);
	let type = getParameterByName('type');

	let step = $(location).attr('pathname').split('/');
	let lng = step[1];

	let item_type;
	let item_type1 = item.substr(0, 2);
	let item_type2 = item.substr(2, 2);
  
	if(item_type1 == 10){ // 무기
	  item_type = "weapone";
	} else if(item_type1 == 20){ // 방어구
	  item_type = "armor";
	} else if(item_type1 == 30){ // 장신구
	  item_type = "accessary";
	} else if(item_type1 == 31){ // 장신구
	  item_type = "rune";
	} else if(item_type1 == 50){ // 스킬
	  item_type = "skill";
	} else if(item_type1 == 60){ // 기타
	  item_type = "etc";
	} else if(item_type1 == 70){ // 마력석
	  item_type = "stone";
	}
	if(type == 2){
	  type = "top";
	} else {
	  type = "normal";
	}
  
	$.getJSON(baseurl+"/item/"+type+"/"+item_type+"/"+item_type2+".json", function(data) {
	  const info = data.find(v => v.id == item);

	  let item_name = document.getElementById("item_name");

	  if (lng == "jp"){
		item_name.innerHTML = info.jp;
	  } else {
		item_name.innerHTML = info.ko;
	  }
	});
}

function item_icon(item_id, enchant_level){
	this.token = "eyJraWQiOiI0OGEzNzliNS1mNGIxLTQ2Y2ItYTk4Zi0xOWNmM2VjOTEyYTYiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOiIxRjczMzQyNy05RUQ5LTQ5MjctQTEzRS1DMTJEMDU4ODRDOTAifQ.S8ZmQslV8xMQ_gT2dx7C0OGFV0rWFh-vsk5YHMTx32bVB5uvQSQrdSmbLKIiQycsnyCrw-ASkjeqtjBAzFkpbQBel-g3tQpbg8I8P3psOO_kJizvaJtwOsLQaHiF_zqhgQuDaCRZ40yHI49BWMGUukkx-SQhko0HCYy3uaz2D-ovYrg90E_6g38dz2t7UGdruWpkuTxNCHcjS7OYFEP41C0YjERsFM4o6CTGvKhtNXgs6qf--UbAKsFYHf-UPsQI9FRndhvxvO5pRLbnWDHQLGeWoEDh6Y1j396MGWl3vOCVJhBKaGE4pAUZFoCbV1DfB2Ls3Ns1MPd7u3l9QkMCXg"
	this.xhr = new XMLHttpRequest();
	this.item_id = item_id;
	this.enchant_level = enchant_level;
	this.queryParams = '?';

	this.url = 'https://dev-api.plaync.com/l2m/v1.0/market/items/'+ this.item_id;
	this.queryParams += encodeURIComponent('enchant_level') + '='+encodeURIComponent(this.enchant_level);

	item_icon();


	function item_icon(responseText){
		xhr.open('GET', url + queryParams);
		xhr.setRequestHeader('Authorization', 'Bearer ' + token);
		xhr.onreadystatechange = function () {
		  if (this.readyState == 4) {
			let data = JSON.parse(this.responseText);

			let image = document.getElementsByClassName(item_id);
				image[0].src = data.image;
		  }
		};
		xhr.send('');
	}
}

function get_recipe(item, lng, type){
	let item_type;
	let item_type1 = item.substr(0, 2);
	let item_type2 = item.substr(2, 2);
  
	if(item_type1 == 10){ // 무기
	  item_type = "weapone";
	} else if(item_type1 == 20){ // 방어구
	  item_type = "armor";
	} else if(item_type1 == 30){ // 장신구
	  item_type = "accessary";
	} else if(item_type1 == 31){ // 장신구
	  item_type = "rune";
	} else if(item_type1 == 50){ // 스킬
	  item_type = "skill";
	} else if(item_type1 == 60){ // 기타
	  item_type = "etc";
	} else if(item_type1 == 70){ // 마력석
	  item_type = "stone";
	}
	if(type == 2){
	  type = "top";
	} else {
	  type = "normal";
	}
  
	$.getJSON(baseurl+"/item/"+type+"/"+item_type+"/"+item_type2+".json", function(data) {
	  const info = data.find(v => v.id == item);
  
	  get_recipe2(info, lng, type);
	});
}

function get_recipe2(data, lng, type){
	var step = '';
	var find = '';
	let recipe;
	find += '<h2 class="trade_category_name">';
	if(type == 'normal'){
		if(lng == "jp"){
		  find += "ふつう錬金";
		} else {
		  find += "일반 연금";
		}
		
		find += "</h2><ul class=\"normal_alc\">";
		for (var i=0; i < data.normal.length;++i){
		  step = data.normal[i].split(',');
		  recipe = step[2].split('-');

		  var slot = "<ul class='recipe_slot'>";
		  for (var j=0; j < 5;++j){
			  if(j == recipe[1]){
				  slot += "<li>" + $(".thumb-img").eq(0).html() + "<span class='up'>+"+step[0]+"</span></li>";
			  }else{
				  slot += "<li></li>";
			  }
		  }
		  slot += "</ul>";

		  find += "<li><ul><li><span>"+recipe[0]+"</span><span>"+recipe[1]+"</span><span>("+step[1]+")</span></li>";
		  find += "<li>"+slot+"</li>";
		  find += "<li></li></ul></li>";

		}
	  } else if(type == 'top'){
		if(lng == "jp"){
		  find += "上級錬金";
		} else {
		  find += "상급 연금";
		}
		find += "</h2><ul class=\"normal_alc\">";
		for (var i=0; i < data.top.length;++i){
		  step = data.top[i].split(',');
		  recipe = step[2].split('-');

		  var slot = "<ul class='recipe_slot'>";
		  for (var j=0; j < 5;++j){
			  if(j == recipe[1]){
				  slot += "<li>" + $(".thumb-img").eq(0).html() + "<span class='up'>+"+step[0]+"</span></li>";
			  }else{
				  slot += "<li></li>";
			  }
		  }
		  slot += "</ul>";

		  find += "<li><ul><li><span>"+recipe[0]+"</span><span>"+recipe[1]+"</span><span>("+step[1]+")</span></li>";
		  find += "<li>"+slot+"</li>";
		  find += "<li></li></ul></li>";
		}
	  }
	find += "</ul>";
  
	var my_list2= document.getElementsByClassName("info");
	
	my_list2[0].innerHTML = find;
}
function recipe_info(alc_type){
	$.getJSON(baseurl+"/alchemist/"+alc_type+".json?version=20220801", function(data) {
		var lng = $(location).attr('pathname');
        lng = lng.split('/');
        lng = lng[1];

		let recipe_list = $(".normal_alc").eq(0).children().length;
		var icon_1 = '<img class="thumb3" src="https://assets.playnccdn.com/gamedata/powerbook/l2m/icon/Icon_128/Item/Icon_Item_Usable_Rune_STR_02.png">';
		var icon_2 = '<img class="thumb3" src="https://assets.playnccdn.com/gamedata/powerbook/l2m/icon/Icon_128/Item/Icon_Item_misc_craft_prob_add_epic_01.png">';
		var icon_3 = '<img class="thumb3" src="https://assets.playnccdn.com/gamedata/powerbook/l2m/icon/Icon_128/Item/Icon_Item_misc_craft_prob_add_legendary_01.png.png">';
		
		for (var i=0; i < recipe_list;++i){
			var recipe_no = $(".normal_alc").eq(0).children().eq(i).children().eq(0).text();
			var slot = $(".normal_alc").eq(0).children().eq(i).children().eq(1).text();
			
			for (var ii=0; ii < data.length;++ii){
				if(data[ii]['no'] == recipe_no){
					var recipe_material = "<ul class='recipe_list'>";
					for (var j=0; j < data[ii]['recipe'].length;++j){
						if (lng == "jp"){
							var find_recipe = data[ii]['jp'][j].split(',');
						} else {
							var find_recipe = data[ii]['recipe'][j].split(',');
						}
						var slot_recipe = data[ii]['slot'][0].split(',');

						recipe_material += "<li>";
						for (var jj=0; jj < 5;++jj){
							if(find_recipe[jj] === undefined){
								find_recipe[jj] = '';
							} else {
								recipe_material += "<span>"+find_recipe[jj]+"</span>";
							}
						}
						if(find_recipe[0] === undefined){
							recipe_material += "</li>";
						}
						var slot_material = "<ul class='recipe_slot'>";
						for (var jj=0; jj < 5;++jj){
							if(slot_recipe[jj] == 1){
								slot_material += "<li>"+icon_1+"</li>";
							} else if(slot_recipe[jj] == 2){
								slot_material += "<li>"+icon_2+"</li>";
							} else if(slot_recipe[jj] == 3){
								slot_material += "<li>"+icon_3+"</li>";
							} else {
								slot_material += "<li></li>";
							}
						}
					}
					recipe_material += "</ul>";
					$(".normal_alc").eq(0).children().eq(i).append(slot_material);
					$(".normal_alc").eq(0).children().eq(i).append(recipe_material);
					break;
				}
			}
		}
	});
}
function find_material(searching_recipe, type, lng, event){
	var y1 = event.clientY;
	$("#recipe_material").css("top",y1 + "px");
	var recipe_material = "<ul class='recipe_list'>";
	  $.getJSON(baseurl+"/alchemist/"+type+".json?version=20220801", function(data) {
		for (var i=0; i < data.length;++i){
		  if(data[i]['no'] == searching_recipe){
			for (var j=0; j < data[i]['recipe'].length;++j){
			  if (lng == "jp"){
				find_recipe = data[i]['jp'][j].split(',');
			  } else {
				find_recipe = data[i]['recipe'][j].split(',');
			  }
  
			  if(find_recipe[0] === undefined){
				find_recipe[0] = '';
			  } else {
				recipe_material += "<li>";
				recipe_material += "<span>"+find_recipe[0]+"</span>";
			  }
  
			  if(find_recipe[1] === undefined){
				find_recipe[1] = '';
			  } else {
				recipe_material += "<span>"+find_recipe[1]+"</span>";
			  }
  
			  if(find_recipe[2] === undefined){
				find_recipe[2] = '';
			  } else {
				recipe_material += "<span>"+find_recipe[2]+"</span>";
			  }
  
			  if(find_recipe[3] === undefined){
				find_recipe[3] = '';
			  } else {
				recipe_material += "<span>"+find_recipe[3]+"</span>";
			  }
  
			  if(find_recipe[4] === undefined){
				find_recipe[4] = '';
			  } else {
				recipe_material += "<span>"+find_recipe[4]+"</span>";
			  }
			  if(find_recipe[0] === undefined){
				recipe_material += "</li>";
			  }
			}
  
			break;
		  }
		}
		if (recipe_material != "<ul class='recipe_list'>"){
		  recipe_material += "</ul>";
		  $("#recipe_material").eq(0).html(recipe_material);
  
		  $('#recipe_material').show();
		}
  
	  });
  }