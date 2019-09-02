$(document).ready(function() {
	// 加载尾部
	setTimeout(function() {
		$('#footer').load("../html/footer.html");
	}, 500);
	var logDtailUrl = window.location.href;

	userGuid = logDtailUrl.split("&")[1].split("=")[1];

	var articleId = logDtailUrl.split("&")[0].split("?")[1].split("=")[1];


	setTimeout(function() {
		$.post('' + http_head + 'Articles/Get_Article_ById.ashx', {
			"userGuid": userGuid,
			"articleId": articleId
		}, function(data) {
			var data = JSON.parse(data);
			// console.log("日志详情", data);
			$(".logTitle").text(data.items.title);
			var time = data.items.createTime.split("T")[0] + " " + data.items.createTime.split("T")[1].split(".")[0];
			$(".logTime").text(time);
			$(".logContent").html(data.items.content);
		})
	}, 370);



	// 分享代码
	var shareid = "fenxiang";

	(function() {
		var a = {
			url: function() {
				return encodeURIComponent(window.location.href)
			},
			title: function() {
				return encodeURIComponent(window.document.title)
			},
			content: function(b) {
				if (b) {
					return encodeURIComponent($("#" + b).html())
				} else {
					return ""
				}
			},
			setid: function() {
				if (typeof(shareid) == "undefined") {
					return null
				} else {
					return shareid
				}
			},
			kaixin: function() {
				window.open("http://www.kaixin001.com/repaste/share.php?rtitle=" + this.title() + "&rurl=" + this.url() +
					"&rcontent=" + this.content(this.setid()))
			},
			renren: function() {
				window.open("http://share.renren.com/share/buttonshare.do?link=" + this.url() + "&title=" + this.title())
			},
			sinaminiblog: function() {
				window.open("http://v.t.sina.com.cn/share/share.php?url=" + this.url() + "&title=" + this.title() +
					"&content=utf-8&source=&sourceUrl=&pic=")
			},
			baidusoucang: function() {
				window.open("http://cang.baidu.com/do/add?it=" + this.title() + "&iu=" + this.url() + "&dc=" + this.content(
					this.setid()) + "&fr=ien#nw=1")
			},
			taojianghu: function() {
				window.open("http://share.jianghu.taobao.com/share/addShare.htm?title=" + this.title() + "&url=" + this.url() +
					"&content=" + this.content(this.setid()))
			},
			wangyi: function() {
				window.open(
					"http://t.163.com/article/user/checkLogin.do?source=%E7%BD%91%E6%98%93%E6%96%B0%E9%97%BB%20%20%20&link=" +
					this.url() + "&info=" + this.content(this.setid()))
			},
			qqzone: function() {
				window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(location.href) +
					'&title=' + encodeURIComponent(document.title))
			},
			pengyou: function() {
				window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url=' + encodeURIComponent(
					location.href) + '&title=' + encodeURIComponent(document.title))
			},
			douban: function() {
				window.open("http://www.douban.com/recommend/?url=" + this.url() + "&title=" + this.title() + "&v=1")
			}
		};
		window.share = a
	})();

	//分享到腾讯微博
	function postToWb() {
		var _t = encodeURI(document.title);
		var _url = encodeURI(document.location);
		var _appkey = encodeURI("appkey");
		var _u = 'http://v.t.qq.com/share/share.php?title=' + _t + '&url=' + _url + '&appkey=' + _appkey;
		window.open(_u);
	}

	$(".share li").on("click", function() {
		var index = $(this).index();
		if (index == 1) {
			share.qqzone();
		} else if (index == 2) {
			share.sinaminiblog();
		} else if (index == 3) {
			postToWb();
		} else if (index == 4) {
			share.renren();
		} else if (index == 5) {
			share.douban();
		}
	});
	// 上一篇、下一篇
	var page = localStorage.getItem("logpage")
	setTimeout(function() {
		$.post('' + http_head + 'Articles/Get_MyArticle.ashx', {
			"page": page,
			"userGuid": userGuid
		}, function(data) {
			var data = JSON.parse(data);
			// console.log("日志", data);
			var idArr = [];
			for (var i = 0; i < data.items.rows.length; i++) {
				idArr.push(data.items.rows[i].Id);
			}
			var index = idArr.indexOf(articleId * 1);
			// 上一篇
			if (index - 1 >= 0) {
				var preArticleId = data.items.rows[index - 1].Id;
				setTimeout(function() {
					$.post('' + http_head + 'Articles/Get_Article_ById.ashx', {
						"userGuid": userGuid,
						"articleId": preArticleId
					}, function(data) {
						var data = JSON.parse(data);
						// console.log("上一篇日志详情", data);
						$(".prelog").text(data.items.title);
					})
				}, 350);
				$(".prelog").on("click", function() {
					window.open("logDetail.html?id=" + preArticleId + "&userGuid=" + userGuid);
				});
			} else {
				$(".prelog").text("当前已是第一篇").css({
					"color": "red"
				});
			}
			// 下一篇
			if (index + 1 < data.items.rows.length) {
				var nextArticleId = data.items.rows[index + 1].Id;
				setTimeout(function() {
					$.post('' + http_head + 'Articles/Get_Article_ById.ashx', {
						"userGuid": userGuid,
						"articleId": nextArticleId
					}, function(data) {
						var data = JSON.parse(data);
						// console.log("下一篇日志详情", data);
						$(".nextlog").text(data.items.title);
					})
				}, 420);
				$(".nextlog").on("click", function() {
					window.open("logDetail.html?id=" + nextArticleId + "&userGuid=" + userGuid);
				})
			} else {
				$(".nextlog").text("当前已是最后一篇").css({
					"color": "red"
				});
			}
		})
	}, 360);
})
