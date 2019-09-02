$(document).ready(function() {
	// 加载尾部
	setTimeout(function() {
		$('#footer').load("../html/footer.html");
	}, 500);
	if (userGuid) {
		LogData(0);
	} else {
		layer.msg("请先登录", {
			time: 1200
		})
	}
	var pageNext = 0;

	function loadLogTable(data) {
		$("#log").bootstrapTable({
			classes: " table-no-bordered",
			columns: [{
				formatter: logList,
				events: viewLog
			}],
			data: data
		});

		function logList(e, value, row, index) {

			var time = value.createTime.split("T")[0];
			
			return '<div class="logBox"> <div class="logT"> <p></p><p>' + value.title + '</p><p>' + time +
				' </p></div>    <div class="logContent">' + value.content + '</div></div>'

		};	
	}
	window.viewLog={
		'click .logBox': function(e, value, row, index) {
			
			window.open ( "http://www.eqidd.com/yqy/articleDetail.html?articleId=" + row.Id + "&userGuid="+row.userGuid);
		}
	}
    

	function LogData(page) {
		setTimeout(function() {
			$.post('' + http_head + 'Articles/Get_MyArticle.ashx', {
				"page": page,
				"userGuid": userGuid
			}, function(data) {
				var data = JSON.parse(data);
				// console.log("日志", data);
				loadLogTable(data.items.rows);
				$("#log").bootstrapTable("load", data.items.rows);
				pageNext =  data.items.page;
				if (data.items.rows.length >= 10) {
					$('.nextpageBtn').show()
				} else {
					$('.nextpageBtn').hide()
				}
			})

		}, 350);
	}

	function LogNext(page) {
		setTimeout(function() {
			$.post('' + http_head + 'Articles/Get_MyArticle.ashx', {
				"page": page,
				"userGuid": userGuid
			}, function(data) {
				var data = JSON.parse(data);
				console.log("日志", data);
				if(data.items.rows.length>0){
					layer.msg("加载成功",{
						time:1200
					})
				}else{
					layer.msg("没有更多了",{
						time:1200
					})
				}
				loadLogTable(data.items.rows);
				$("#log").bootstrapTable("append", data.items.rows);
				pageNext =  data.items.page;
				if (data.items.rows.length >= 10) {
					$('.nextpageBtn').show()
				} else {

					$('.nextpageBtn').hide()
				}
			})

		}, 450);
	};
	$('.nextpageBtn').click(function() {
		LogNext(pageNext);
		localStorage.setItem("logpage",pageNext);
	});
	localStorage.setItem("logpage",pageNext);
	// 写日志
	$(".writeLog").on("click",function(){
		window.open("http://www.eqidd.com/chuangkeApace/html/writeCircle.html?source=0")
	})
})
