$(document).ready(function() {
	// 加载尾部
	setTimeout(function() {
		$('#footer').load("../html/footer.html");
	}, 320);
	if (userGuid) {
		msgData(0);
	} else {
		layer.msg("请先登录", {
			time: 1200
		})
	}
	var pageNext = 0;
	// 表格
	function loadMsgTable(data) {
		$("#visitor").bootstrapTable({
			classes: " table-no-bordered",
			columns: [{
				formatter: msgList,
				events:viewVisitor
			}],
			data: data
		});

		function msgList(e, value, row, index) {

			var time = value.createTime.split("T")[0];
			var srcHead = "http://47.94.173.253:8008";
            var headImg = srcHead+value.iphoto;
			var headKongImg = "img/head2.png";
			if(value.iphoto){
				return '<div class="msgBox"> <div class="msgImg"> <img src="'+headImg+'"/></div>    <div class="msgContent"> <div>' +
					value.upname + ' </div>  <div> <p>' + time + '</p><p>' + value.useroption +
					'</p></div>  </div>  </div>'
			}else{
				return '<div class="msgBox"> <div class="msgImg"> <img src="'+headKongImg+'"/></div>    <div class="msgContent"> <div>' +
					value.upname + ' </div>  <div> <p>' + time + '</p><p>' + value.useroption +
					'</p></div>  </div>  </div>'
			}
			

		};
	};
	window.viewVisitor={
		'click .msgBox': function(e, value, row, index) {
			window.open("index_start.html?userGuid=" + row.makerGuid )
		}
	}
    // 第一页
	function msgData(page) {
		setTimeout(function() {
			$.post('' + http_head + 'Makerspacey/MakerVisitor/Get_MakerVisitor.ashx', {
				"page": page,
				"makerGuid": userGuid
			}, function(data) {
				var data = JSON.parse(data);
				console.log("访客", data);
				loadMsgTable(data.items);
				$("#visitor").bootstrapTable("load", data.items);
				pageNext = data.page;
				if (data.items.length >= 10) {
					$('.nextpageBtn').show()
				} else {
					$('.nextpageBtn').hide()
				}
			})

		}, 350);
	};
	// 下一页
	function msgNext(page) {
		setTimeout(function() {
			$.post('' + http_head + 'Makerspacey/MakerVisitor/Get_MakerVisitor.ashx', {
				"page": page,
				"makerGuid": userGuid
			}, function(data) {
				var data = JSON.parse(data);
                console.log("下一页",data)
				if (data.items.length > 0) {
					layer.msg("加载成功", {
						time: 1200
					})
				} else {
					layer.msg("没有更多了", {
						time: 1200
					})
				}
				loadMsgTable(data.items);
				$("#visitor").bootstrapTable("append", data.items);
				pageNext = data.page;
				if (data.items.length >= 10) {
					$('.nextpageBtn').show()
				} else {

					$('.nextpageBtn').hide()
				}
			})

		}, 450);
	};
	$('.nextpageBtn').click(function() {
		msgNext(pageNext);
	});

})
