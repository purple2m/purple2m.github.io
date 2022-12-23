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
				if(data.now.unit_price == "undefined"){
					price_div[0].innerHTML = '<img src="'+baseurl+'/images/dia.svg"> ';
				}else{
					price_div[0].innerHTML = '<img src="'+baseurl+'/images/dia.svg"> ' + data.now.unit_price + ' ' + data.now.server_name;
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
			let item_name2 = document.getElementById("item_name2");
				item_name.innerHTML = data.item_name;
				item_name2.innerHTML = data.item_name;
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
				console.log(data);
		  }
		};
		xhr.send('');
	}
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

$(".menu").eq(1)