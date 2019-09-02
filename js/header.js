var http_head = "http://47.94.173.253:8008/";
var url = window.location.href;
var guidStr = url.split("?")[1];
var userGuid = guidStr.split("=")[1];
var this_url=window.location.href.split("=")[0]+"=";
// var companyId;
var headPic = '../img/head.png';

var userJson = localStorage.getItem("GHY_login");
var userData = JSON.parse(userJson);

setTimeout(function() {
	$.post('' + http_head + 'Lectures/Get_Lecture_ByCreater.ashx?rand='+Math.random(), {
		"userGuid": userGuid
	}, function(data) {
		var data = JSON.parse(data);
		var username = data.items.realname;
		var headImg = data.items.headimage;
		var field = data.items.ResearchField;
		$(".userName").text(username);
		$(".headImg").attr("src", headImg);
		$(".describe").text(field);
		// companyId = data.items.companyId;
		var priceCourse = data.items.CooperativePrice;
		var fieldArr = data.items.ResearchField;
		var phone = data.items.phone;
		$(".span1").text(priceCourse);

		if (fieldArr.indexOf("，") == -1) {
			var str = '<li>' + fieldArr + ' </li>'
			$(".fieldList").append(str);

		} else {
			// 注意split分隔符中英文
			var fieldList = fieldArr.split("，");
			for (var i = 0; i < fieldList.length; i++) {
				var str = '<li>' + fieldList[i] + '</li>';
				$(".fieldList").append(str)
			}
		}

		$(".phoneBox").text(phone);
		$(".viewPhone").on("click", function() {
			layer.open({
				type: 1,
				area: ['300px', '200px'],
				title: ['电话', 'font-size:18px;text-align: center;'],
				content: $('.phoneBox'),
				btn: '确定',
				skin: 'layui-layer-molv'
				// shade: false
			});
		})
		// 个人信息
	})
}, 200);

setTimeout(function() {
	$.post('' + http_head + 'Makerspacey/Get_MakerMenuCount.ashx?rand='+Math.random(), {
		"userGuid": userGuid
	}, function(result) {
		// console.log(result);
		result = JSON.parse(result);
		if (result.items) {
			var cpcount = result.items.cpcount;
			var fkcount = result.items.fkcount;
			var lycount = result.items.lycount;
			var rzcount = result.items.rzcount;
			$('.wzcount').text(rzcount);
			$('.fkcount').text(fkcount);
			$('.lycount').text(lycount);
			$('.cpcount').text(cpcount);

		}

	});
}, 230);

// 点击收藏

setTimeout(function() {
	$.post('' + http_head + 'Lectures/Get_Lecture_ByCreater.ashx?rand='+Math.random(), {
		"userGuid": userGuid
	}, function(data) {
		var data = JSON.parse(data)
		console.log("信息", data)
		companyId = data.items.companyId;
		$('.last_li').click(function() {
			if (userData == null) {
				layer.msg("请先登录", {
					time: 1200
				})
			} else {
				var this_guid = userData.Guid;
				var this_companyId = userData.companyId;
				$.post('' + http_head + 'Makerspacey/MakerCollection/Add_MakerCollection.ashx?rand='+Math.random(), {
					"userGuid": this_guid,
					"userCompanyId": companyId,
					"objectId": 0,
					"objectType": 0,
					"objectGuid": 0,
					"objectCompanyId": 0
				}, function(result) {
					result = JSON.parse(result);
					console.log(result);
					if (result.status == 202) {
						layer.msg("已收藏", {
							time: 1200
						})
						$('.last_li').find('p').text('已收藏');
					}else if(result.status==200){
						layer.msg("收藏成功",{
							time:1200
						})
					}
					
				});
			}

		})
	})
}, 260);



// 推荐讲师
setTimeout(function() {
	$.post('' + http_head + 'Lectures/recommend/Get_LectureRecommend.ashx?rand='+Math.random(), {
		"type": 0
	}, function(result) {
		result = JSON.parse(result);
		// console.log("推荐",result)
		if (result.items != []) {

			var html = '';
			for (var i = 0; i < result.items.length; i++) {
				var lectureName = result.items[i].lectureName;
				var lectureImage = result.items[i].lectureImage;
				var lectureType = result.items[i].lectureType;
				if (lectureImage != undefined) {
					html = '<li><div style="border-bottom: 1px solid #ccc;height: 70px;"><img src="' + lectureImage +
						'" alt="" />' +
						'<div class="teacher-right"><p class="p1">' + lectureName + '</p><p class="p2">' + lectureType +
						'</p></div></div></li>';
				} else {
					html = '<li><div style="border-bottom: 1px solid #ccc;height: 70px;"><img src="' + headPic +
						'" alt="" />' +
						'<div class="teacher-right"><p class="p1">' + lectureName + '</p><p class="p2">' + lectureType +
						'</p></div></div></li>';
				}
				$('.right-recommend ul').append(html);

			}

		}
		$(".tjteach li").on("click", function() {
			var index = $(this).index();
			
			window.open(this_url + result.items[index].lectureGuid)
		});

	});
}, 290);


//活跃讲师
setTimeout(function() {
	$.post('' + http_head + 'Makerspacey/MakerArticle/Get_ActiveMaker.ashx?rand='+Math.random(), {
		"page": 0
	}, function(result) {

		result = JSON.parse(result);
		// console.log("活跃", result)
		if (result.items != []) {

			var html = '';
			for (var i = 0; i < result.items.length; i++) {
				var realName = result.items[i].realname;
				var headImage = result.items[i].headimage;
				var courses = result.items[i].courses;
				if (headImage != undefined) {
					html = '<li><div style="border-bottom: 1px solid #ccc;height: 70px;"><img src="' + headImage + '" alt="" />' +
						'<div class="teacher-right"><p class="p1">' + realName + '</p><p class="p2">' + courses +
						'</p></div></div></li>';
				} else {
					html = '<li><div style="border-bottom: 1px solid #ccc;height: 70px;"><img src="' + headPic + '" alt="" />' +
						'<div class="teacher-right"><p class="p1">' + realName + '</p><p class="p2">' + courses +
						'</p></div></div></li>';
				}

				$('.right-activited ul').append(html);
			}
		}
		$(".activeTeach li").on("click", function() {
			var index = $(this).index();
			window.open(this_url + result.items[index].userGuid)
		});
	});
}, 320)


// 最新文章
setTimeout(function() {
	$.post('' + http_head + 'Articles/LectureArticle/Get_ArticlesByTime.ashx?rand='+Math.random(), {
		page: 0
	}, function(result) {

		result = JSON.parse(result);
		console.log("文章",result)
		if (result.items != []) {
			var html = '';
			for (var i = 0; i < result.items.length; i++) {
				var title = result.items[i].title;

				html =
					'<li style="list-style-type:square"><p class="p1"><span class="fangkuai"></span><span class="fangkuai_article">' +
					title +
					'</span></p></li>';

				$('.new-article ul').append(html);

			}
			$(".newArt li").on("click",function(){
				var index=$(this).index();
				window.open("http://www.eqidd.com/yqy/articleDetail.html?articleId=" + result.items[index].Id + "&userGuid="+"")
			})

		} else {

		}

	});
}, 350);

//同领域讲师
setTimeout(function() {
	$.post('' + http_head + 'Lectures/Get_Lecture_ByCreater.ashx?rand='+Math.random(), {
		"userGuid": userGuid
	}, function(data) {
		var data = JSON.parse(data);
		type = data.items.ResearchField;

		$.post('' + http_head + 'Training/TrainingMatch/Get_teachersFromType.ashx?rand='+Math.random(), {
			"page": 0,
			"type": type
		}, function(result) {

			result = JSON.parse(result);
			// console.log("通灵玉", result)

			if (result.items != []) {

				var html = '';
				for (var i = 0; i < result.items.length; i++) {
					var realName = result.items[i].realname;
					var headImage = result.items[i].headimage;
					var courses = result.items[i].ResearchField;
					if (headImage != undefined) {
						html = '<li><div style="border-bottom: 1px solid #ccc;height: 70px;"><img src="' + headImage +
							'" alt="" />' +
							'<div class="teacher-right"><p class="p1">' + realName + '</p><p class="p2">' + courses +
							'</p></div></div></li>';
					} else {
						html = '<li><div style="border-bottom: 1px solid #ccc;height: 70px;"><img src="' + headpic + '" alt="" />' +
							'<div class="teacher-right"><p class="p1">' + realName + '</p><p class="p2">' + courses +
							'</p></div></div></li>';
					}


					$('.right-same ul').append(html);
				}
			}
			$(".sameFieldTeach li").on("click", function() {
				var index = $(this).index();
				window.open(this_url + result.items[index].userGuid)
			});
		});
	})
}, 380);


$(document).ready(function() {
	// 右侧边栏
	$(".downLoad").hover(function() {
		layer.tips("点我进入APP下载页", ".downLoad", {
			tips: [4, "black"]
		})
	}, function() {
		layer.closeAll("tips")
	});

	$(".callBack").hover(function() {
		layer.tips("点我进行反馈", ".callBack", {
			tips: [4, "black"]
		})
	}, function() {
		layer.closeAll("tips")
	});
	$(".publicNum").hover(function() {
		layer.tips('<img src="images/downQRcode.jpg" alt="" id="weChatImg"><p id="fouceWechat">关注公众号</p>', ".publicNum", {
			tips: [4, "black"],
			area: ["108px", "110px"]
		})
	}, function() {
		layer.closeAll("tips")
	});
	$(".leaveMsg").hover(function() {
		layer.tips("QQ727024586", ".leaveMsg", {
			tips: [4, "black"]
		})
	}, function() {
		layer.closeAll("tips")
	});
	$(".contact").hover(function() {
		layer.tips("手机13849110116", ".contact", {
			tips: [4, "black"]
		})
	}, function() {
		layer.closeAll("tips")
	});

	$('.goTop').hover(function() {
		layer.tips('回到顶部', '.goTop', {
			tips: [4, 'black']
		});
	}, function() {
		layer.closeAll('tips')
	});

	$(window).scroll(function() {
		if ($(window).scrollTop() > 0) {
			$('.goTop').show()
		} else {
			$('.goTop').hide()
		}
	})
	$(".goTop").on("click", function() {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
	});

	// 用户信息
	var userStr = localStorage.getItem("GHY_login");
	var userData = JSON.parse(userStr);
	if (userData == null) {
		layer.msg("请登录", {
			time: 1200
		})
		// 跳转
		$(".loginBtn").on("click", function() {
			console.log(url)
			window.location.href = ("innerLogin.html?" + url);
		}).children().append("登陆");

		$(".regBtn").on("click", function() {
			window.location.href = ("http://www.eqidd.com/html/reg.html?" + url)
		}).children().append("注册");
	} else {
		$(".loginBtn").children().text(userData.username);
		$(".regBtn").on("click", function() {
			localStorage.clear("GHY_login");
			// localStorage.clear("logpage")
			$(".loginBtn").children().text("登陆");
			$(".regBtn").children().text("注册");
			window.location = url;
		}).children().text("退出");
	}
	// barner
	$("#navClickID li").on("click", function() {
		var index = $(this).index();
		if (url.indexOf("&") == -1) {
			if (index == 0) {
				window.open("index_start.html?" + guidStr);
			} else if (index == 1) {
				window.open("log.html?" + guidStr);
			} else if (index == 2) {
				window.open("personal.html?" + guidStr);
			} else if (index == 3) {
				window.open("course.html?" + guidStr);
			} else if (index == 4) {
				window.open("leavingMessage.html?" + guidStr);
			} else if (index == 5) {
				window.open("visitor.html?" + guidStr);
			}
		} else {
			var this_urlTail = url.split("&")[1];
			if (index == 0) {
				window.open("index_start.html?" + this_urlTail);
			} else if (index == 1) {
				window.open("log.html?" + this_urlTail);
			} else if (index == 2) {
				window.open("personal.html?" + this_urlTail);
			} else if (index == 3) {
				window.open("course.html?" + this_urlTail);
			} else if (index == 4) {
				window.open("leavingMessage.html?" + this_urlTail);
			} else if (index == 5) {
				window.open("visitor.html?" + this_urlTail);
			}
		}

	})

	// 点击数量
	$(".nav_show li").on("click", function() {
		var index = $(this).index();
		if (url.indexOf("&") == -1) {
			if (index == 0) {
				window.open("log.html?" + guidStr);
			} else if (index == 1) {
				window.open("visitor.html?" + guidStr);
			} else if (index == 2) {
				window.open("leavingMessage.html?" + guidStr);
			} else if (index == 3) {
				window.open("course.html?" + guidStr);
			}
		} else {
			var this_urlTail = url.split("&")[1];
			if (index == 0) {
				window.open("log.html?" + this_urlTail);
			} else if (index == 1) {
				window.open("visitor.html?" + this_urlTail);
			} else if (index == 2) {
				window.open("leavingMessage.html?" + this_urlTail);
			} else if (index == 3) {
				window.open("course.html?" + this_urlTail);
			}
		}
	})
     // 
	
	 


})
