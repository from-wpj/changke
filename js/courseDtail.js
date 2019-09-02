$(document).ready(function() {
	var http_head = "http://47.94.173.253:8008/";

	var headPic = '../img/head.png';
	setTimeout(function() {
		$.post('' + http_head + 'Lectures/Get_Lecture_ByCreater.ashx', {
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


		})
	}, 200);

	setTimeout(function() {
		$.post('' + http_head + 'Makerspacey/Get_MakerMenuCount.ashx', {
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
				$('.cpcount').eq(3).text(cpcount);

			}

		});
	}, 220);

	// 点击收藏
	setTimeout(function() {
		$.post('' + http_head + 'Lectures/Get_Lecture_ByCreater.ashx', {
			"userGuid": userGuid
		}, function(data) {
			var data = JSON.parse(data)
			console.log("信息", data)
			companyId = data.items.companyId;

			$('.last_li').click(function() {
				var collecInfo = {
					userGuid: userGuid,
					userCompanyId: companyId,
					objectId: 0,
					objectType: 0,
					objectGuid: 0,
					objectCompanyId: 0

				}
				$.post('' + http_head + 'Makerspacey/MakerCollection/Add_MakerCollection.ashx', collecInfo, function(result) {
					result = JSON.parse(result);
					// console.log(result);
					if (result.status == 202) {
						layer.msg("已收藏", {
							time: 1200
						})
						$('.last_li').find('p').text('已收藏');
					}

				});
			})

		})
	}, 240);

	// 加载尾部
	setTimeout(function() {
		$('#footer').load("../html/footer.html");
	}, 330);

	var logDtailUrl = window.location.href;

	var userGuid = logDtailUrl.split("&")[1].split("=")[1];
	if (userGuid) {

	} else {
		layer.msg("请先登录", {
			time: 1200
		})
	}

	var courseId = logDtailUrl.split("&")[0].split("?")[1].split("=")[1];

	setTimeout(function() {
		$.post('' + http_head + 'Lectures/course/Get_LectureCourse_ById.ashx', {
			"courseId": courseId
		}, function(data) {
			var data = JSON.parse(data);
			// console.log("课程信息", data);
			var courseArr = data.items.courseType.split(",");
			var courseStr = [];
			var course;
			for (var i = 0; i < courseArr.length; i++) {
				var str = "《" + courseArr[i] + "》";
				courseStr.push(str);
			}
			for (var i = 0; i < courseStr.length; i++) {
				course = courseStr.join(",");
			}
			var courseImg = data.items.courseImage;
			for (var i = 0; i < courseImg.length; i++) {
				$(".left-img-ul").append('<li><img src="' + courseImg[i] + '"  /></li>')
			}
			$(".left-lesson li").eq(0).children("p").append(course);
			$(".left-lesson li").eq(1).children("p").append(data.items.courseTarget);
			$(".left-lesson li").eq(2).children("p").append(data.items.lectureName);
			$(".left-lesson li").eq(3).children("p").append(data.items.courseBackground);
			$(".price").text(data.items.coursePrice);
			$(".timeL").text(data.items.courseTimes);
			$(".left-input-content").html(data.items.courseOutlint);

		})
	}, 400);


	// 推荐课程

	setTimeout(function() {
		$.post('' + http_head + 'Lectures/course/Get_LectureCourse_ById.ashx', {
			"courseId": courseId
		}, function(data) {
			var data = JSON.parse(data);
			var courseArr = data.items.courseType.split(",");
			setTimeout(function() {
				$.post('' + http_head + 'Lectures/course/Get_LectureCourse_ByType.ashx', {
					"page": 0,
					"type": courseArr[0]
				}, function(result) {
					result = JSON.parse(result);
					// console.log("推荐课程", result);			
					for (var i = 0; i < result.items.rows.length; i++) {
						$(".courseList").append('<li><p class="p1">' + result.items.rows[i].courseTheme +
							'</p>   <p class="p2"><span>课程时长：</span><span>' + result.items.rows[i].courseTimes +
							'</span>小时  </p></li>')
					}
					$(".courseList li").on("click", function() {
						var index = $(this).index();
						window.open("courseDtail.html?courseId=" + result.items.rows[index].Id + "&userGuid=" + result.items.rows[
							index].creater)
					});

				});
			}, 500);

		})
	}, 530);


	// 最新课程
	setTimeout(function() {
		$.post('' + http_head + 'Lectures/course/Get_LectureCourse_ByTime.ashx', {
			"page": 0,
		}, function(result) {
			result = JSON.parse(result);
			console.log("最新课程", result);
			for (var i = 0; i < result.items.rows.length; i++) {
				$(".newCourse").append('<li><p class="p1">' + result.items.rows[i].courseTheme +
					'</p>   <p class="p2"><span>课程时长：</span><span>' + result.items.rows[i].courseTimes + '</span>小时  </p></li>'
				)
			};
			$(".newCourse li").on("click", function() {
				var index = $(this).index();
				window.open("courseDtail.html?courseId=" + result.items.rows[index].Id + "&userGuid=" + result.items.rows[
					index].creater)
			});


		});
	}, 550);
	// 相关讲师
	setTimeout(function() {
		$.post('' + http_head + 'Lectures/Get_Lecture_ByCreater.ashx', {
			"userGuid": userGuid
		}, function(data) {
			var data = JSON.parse(data);
			type = data.items.ResearchField;

			$.post('' + http_head + 'Training/TrainingMatch/Get_teachersFromType.ashx', {
				"page": 0,
				"type": type
			}, function(result) {
				result = JSON.parse(result);
				console.log("xg", result)
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
							html = '<li><div style="border-bottom: 1px solid #ccc;height: 70px;"><img src="' + headpic +
								'" alt="" />' +
								'<div class="teacher-right"><p class="p1">' + realName + '</p><p class="p2">' + courses +
								'</p></div></div></li>';
						}
						$('.right-same ul').append(html);
					};

				}
				$(".sameTeach li").on("click", function() {
					var index = $(this).index();
					window.open("index_start.html?userGuid=" + result.items[index].userGuid)
				});

			});
		})
	}, 570);



	$('.left-left-two .ul-click li').click(function() {
		var index = $(this).index();
		$(this).addClass("licss").siblings().removeClass("licss");
		$(".tabBox div").eq(index).addClass("selectedShow").siblings().removeClass("selectedShow");
	})
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
	var url = window.location.href;
	var guidStr = url.split("?")[1];
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
			$(".loginBtn").children().text("登陆");
			$(".regBtn").children().text("注册");
			window.location = url
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
	$(".nav_show li").on("click",function(){
		var index = $(this).index();
		if(url.indexOf("&")==-1){
			if(index ==0){
				window.open("log.html?"+guidStr);
			}else if(index==1){
				window.open("visitor.html?"+guidStr);
			}else if(index==2){
				window.open("leavingMessage.html?"+guidStr);
			}else if(index==3){
				window.open("course.html?"+guidStr);
			}
		}else{
			var this_urlTail = url.split("&")[1];
			if(index ==0){
				window.open("log.html?"+this_urlTail);
			}else if(index==1){
				window.open("visitor.html?"+this_urlTail);
			}else if(index==2){
				window.open("leavingMessage.html?"+this_urlTail);
			}else if(index==3){
				window.open("course.html?"+this_urlTail);
			}
		}
	})


})
