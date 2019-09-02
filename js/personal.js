$(document).ready(function() {
	// 加载尾部
	setTimeout(function() {
		$('#footer').load("../html/footer.html");
	}, 330);
	// 个人档头部
	$(".peosonList li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".peosonInfo div").eq(index).addClass("div_show").siblings().removeClass("div_show");
		$.post(''+http_head + 'Lectures/Get_Lecture_ByCreater.ashx',{
			"userGuid":userGuid
		},function(data){
			var data = JSON.parse(data);
			var this_authen = data.items.status;			
			if(index==4){
				if(this_authen==1){
					layer.msg("已认证",{
						time:1200
					})
				}else if(this_authen==0){
					layer.msg("未认证",{
						time:1200
					})
				}
			}
		})	
	})
	// 讲师信息
	setTimeout(function() {
		$.post('' + http_head + 'Lectures/Get_Lecture_ByCreater.ashx', {
			"userGuid": userGuid
		}, function(data) {
			var data = JSON.parse(data);
			console.log(data)
			var phone = data.items.phone;
			var assphone = data.items.AssistantPhone;
			var assname = data.items.Assistant;
			var email = data.items.email;
			var QQ = data.items.QQ;
			var wechat = data.items.wechat;
			$(".phone").text(phone);
			$(".assPhone").text(assphone);
			$(".assName").text(assname);
			$(".email").text(email);
			$(".QQ").text(QQ);
			$(".wechat").text(wechat);

			$(".address").text(data.items.address);
			$(".field").text(data.items.ResearchField);
			$(".price").text(data.items.CooperativePrice);
			$(".course").text(data.items.courses);
			$(".courseStyle").text(data.items.TeachStyle);
			var introduce = data.items.LecturerBackground;
			$('.intro').html(introduce);
			$(".introduce").html($('.intro').text());
			$(".custBox").html(data.items.CustCase);
			var service = data.items.ServiceCom;
			$(".service").html(service);
			$(".serviceBox").html($('.service').text());

			$("#info label").on("click", function(event) {
				return false
			});
			$(".viewCont").on("click", function() {
				layer.open({
					type: 1,
					area: ['600px', '400px'],
					title: ['联系方式', 'font-size:18px;text-align: center;'],
					btn: '确定',
					skin: 'layui-layer-molv',
					content: $('.contact2'),
				})
			})

		})
	}, 400);
	// 个人优势

	$.post('' + http_head + 'Makerspacey/Get_MakerAdvantage.ashx', {
		"userGuid": userGuid
	}, function(data) {
		var data = JSON.parse(data);
		$(".advantage").val(data.items.advantage)
	})


	// 个人相册
	var nextPage2 = 0
	$.post('' + http_head + 'Lectures/Get_LecturePhoto_Menu.ashx', {
		"lectureGuid": userGuid,
		"page": 0
	}, function(data) {
		var data = JSON.parse(data);
		// console.log("相册", data);
		$(".typeArea").css({
			"display": "none"
		});
		$(".typeArea2").css({
			"display": "block"
		});
		nextPage2 = data.items.page;
		for (i = 0; i < data.items.rows.length; i++) {
			var cover = data.items.rows[i].imageUrl;
			var phoTitle = data.items.rows[i].title;
			var kongPho = "img/album.png";
			if (cover) {
				$(".album").append('<li class="clip"><img src="' + cover + '"  alt="' + phoTitle + '"  title="点击进入相册"/> <p>' +
					phoTitle + ' </p>  </li>');
			} else {
				$(".album").append('<li class="clip"><img src="' + kongPho + '"  alt="' + phoTitle + '"  title="点击进入相册"/> <p>' +
					phoTitle +
					' </p>  </li>');
			}
		};
		phoDetail(data)
	});
	// 下一页
	$('.nextpageBtn2').click(function() {
		setTimeout(function() {
			$.post('' + http_head + 'Lectures/Get_LecturePhoto_Menu.ashx', {
				"lectureGuid": userGuid,
				"page": nextPage2
			}, function(data) {
				var data = JSON.parse(data);
				// console.log("相册", data);
				$(".typeArea").css({
					"display": "none"
				});
				$(".typeArea2").css({
					"display": "block"
				});
				nextPage2 = data.items.page;
				if (data.items.rows.length == 0) {
					layer.msg("没有更多了", {
						time: 1200
					})
				} else {
					layer.msg("加载成功", {
						time: 1200
					})
				}
				for (i = 0; i < data.items.rows.length; i++) {
					var cover = data.items.rows[i].imageUrl;
					var phoTitle = data.items.rows[i].title;
					var kongPho = "img/album.png";
					if (cover) {
						$(".album").append('<li class="clip"><img src="' + cover + '"  alt="' + phoTitle + '" title="点击进入相册"/> <p>' + phoTitle +
							' </p>  </li>');
					} else {
						$(".album").append('<li class="clip"><img src="' + kongPho + '"  alt="' + phoTitle + '" title="点击进入相册"/> <p>' + phoTitle +
							' </p>  </li>');
					}
				};
				phoDetail(data)
			});
		}, 230)

	});
	// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 相册图片
	
	// 返回相册
	$(".back").mouseenter(function() {
		$(".back").css({
			"color": "#05509a"
		})
		$(".back img").attr("src", "img/goback-b.png")
	});
	$(".back").mouseleave(function() {
		$(".back").css({
			"color": "#a8a8a8"
		})
		$(".back img").attr("src", "img/goback.png")
	})
	$(".back").on("click", function() {
		var nextPage2 = 0
		$.post('' + http_head + 'Lectures/Get_LecturePhoto_Menu.ashx', {
			"lectureGuid": userGuid,
			"page": 0
		}, function(data) {
			var data = JSON.parse(data);
			// console.log("相册", data);
			$(".typeArea").css({
				"display": "none"
			});
			$(".typeArea2").css({
				"display": "block"
			});
			nextPage2 = data.items.page;
			if ($(".album li").hasClass("piece")) {
				$(".album").replaceWith('<ul class="album"></ul>');
			}
			for (i = 0; i < data.items.rows.length; i++) {
				var cover = data.items.rows[i].imageUrl;
				var phoTitle = data.items.rows[i].title;
				var kongPho = "img/album.png";
				if (cover) {
					$(".album").append('<li class="clip"><img src="' + cover + '"  alt="' + phoTitle + '"  title="' + phoTitle +
						'"/> <p>' +
						phoTitle + ' </p>  </li>');
				} else {
					$(".album").append('<li class="clip"><img src="' + kongPho + '"  alt="' + phoTitle + '"  title="' + phoTitle +
						'"/> <p>' +
						phoTitle +
						' </p>  </li>');
				}
			};
			phoDetail(data)
		});
		// 下一页
		$('.nextpageBtn2').click(function() {
			setTimeout(function() {
				$.post('' + http_head + 'Lectures/Get_LecturePhoto_Menu.ashx', {
					"lectureGuid": userGuid,
					"page": nextPage2
				}, function(data) {
					var data = JSON.parse(data);
					// console.log("相册", data);
					$(".typeArea").css({
						"display": "none"
					});
					$(".typeArea2").css({
						"display": "block"
					});
					nextPage2 = data.items.page;
					if (data.items.rows.length == 0) {
						layer.msg("没有更多了", {
							time: 1200
						})
					} else {
						layer.msg("加载成功", {
							time: 1200
						})
					}
					if ($(".album li").hasClass("piece")) {
						$(".album").replaceWith('<ul class="album"></ul>');
					}
					for (i = 0; i < data.items.rows.length; i++) {
						var cover = data.items.rows[i].imageUrl;
						var phoTitle = data.items.rows[i].title;
						var kongPho = "img/album.png";
						if (cover) {
							$(".album").append('<li class="clip"><img src="' + cover + '"  alt="' + phoTitle + '"/> <p>' +
								phoTitle + ' </p>  </li>');
						} else {
							$(".album").append('<li class="clip"><img src="' + kongPho + '"  alt="' + phoTitle + '"/> <p>' +
								phoTitle +
								' </p>  </li>');
						}
					};
					phoDetail(data)
				});
			}, 230)

		});
	});
	// /////////////////////////////////////////////////////////////////////////////////////////////////////
	// 照片
	function phoDetail(data) {
		$(".album li").on("click", function() {
			var index = $(this).index();
			albumId = data.items.rows[index].Id;
			var guid = data.items.rows[0].creater;
			// window.open("album.html?albumId="+albumId+"&userGuid="+guid);
			$.post('' + http_head + 'Lectures/Get_LectureMenu_Photo.ashx', {
				"menuId": albumId,
				"page": 0
			}, function(data) {
				var data = JSON.parse(data);
				console.log("相册图片", data);
				nextPage = data.items.page;
				if ($(".album li").hasClass("clip")) {
					$(".album").replaceWith('<ul class="album"></ul>');
				}
				for (let i = 0; i < data.items.rows.length; i++) {
					$(".album").append('<li class="piece" style="width:260px;">  <img style="width:150px;height:100px" src="' + data.items.rows[i].imageUrl +
						'" alt="' + data.items.rows[i].imageName + '" title="点击查看大图"/> <p>' +
						data.items.rows[i].imageName + '</p> </li>')
				};
				// 预览图片
				layer.photos({
					photos: '.album',
					anim: 5
				})
			});
			// 下一页
			$(".typeArea2").css({
				"display": "none"
			});
			$(".typeArea").css({
				"display": "block"
			});
			$('.nextpageBtn').click(function() {
				$.post('' + http_head + 'Lectures/Get_LectureMenu_Photo.ashx', {
					"menuId": albumId,
					"page": nextPage
				}, function(data) {
					var data = JSON.parse(data);
					console.log("相册图片", data);
					nextPage = data.items.page;
					if (data.items.rows.length == 0) {
						layer.msg("没有更多了", {
							time: 1200
						})
					} else {
						layer.msg("加载成功", {
							time: 1200
						})
					}
					if ($(".album li").hasClass("clip")) {
						$(".album").replaceWith('<ul class="album"></ul>');
					}
					for (let i = 0; i < data.items.rows.length; i++) {
						$(".album").append('<li class="piece" style="width:260px;">  <img style="width:150px;height:100px" src="' + data.items.rows[i].imageUrl +
							'" alt="' + data.items.rows[i].imageName + '" title="点击查看大图"/><p>' +
							data.items.rows[i].imageName + '</p> </li>')
					}				
				});
			});
		})
	}
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 个人行业
	setTimeout(function() {
		$.post('' + http_head + 'Makerspacey/MakerIndustry/Get_MakerIndustry.ashx', {
			"userGuid": userGuid
		}, function(data) {
			var data = JSON.parse(data);
			// console.log("行业",data);
			// 所在行业
			var indust;
			var industArr = [];
			for (var i = 0; i < data.items.Industry.length; i++) {
				indust = "《" + data.items.Industry[i].Industry + "》";
				industArr.push(indust)
			}
			$(".hy").text(industArr);
			// 所属岗位
			var post;
			var postArr = [];
			for (var i = 0; i < data.items.Post.length; i++) {
				post = "《" + data.items.Post[i].post + "》"
				postArr.push(post);
			}
			$(".gw").text(postArr);
			// 服务行业
			var fhy;
			var fhyArr = [];
			for (var i = 0; i < data.items.ServiceIndustry.length; i++) {
				fhy = "《" + data.items.ServiceIndustry[i].Industry + "》";
				fhyArr.push(fhy);
			}
			$(".fhy").text(fhyArr);
			// 服务岗位
			var fgw;
			var fgwArr = [];
			for (i = 0; i < data.items.ServicePost.length; i++) {
				fgw = "《" + data.items.ServicePost[i].post + "》";
				fgwArr.push(fgw);
			}
			$(".fgw").text(fgwArr);
			// 服务时间
			var timeStr;
			for (i = 0; i < data.items.ServiceTime.length; i++) {
				var type = data.items.ServiceTime[i].type;
				var time1 = data.items.ServiceTime[i].startTime;
				var time2 = data.items.ServiceTime[i].endTime;
			}
			if (type == 0) {
				timeStr = "白天" + "（" + time1 + "~" + time2 + "）";
			} else if (type == 1) {
				timeStr = "晚上" + "（" + time1 + "~" + time2 + "）";
			}
			$(".fsj").text(timeStr);
			// 服务类型
			// var 
			for (var i = 0; i < data.items.ServiceMode.length; i++) {
				var typeMode = data.items.ServiceMode[i].type;
				var dayPrice = data.items.ServiceMode[i].OneDayPrice;
				var hourPrice = data.items.ServiceMode[i].OneHourPrice;
				var mode;
				if (typeMode == 0) {
					mode = "线下服务";
				} else if (typeMode == 1) {
					mode = "电话服务";
				} else if (typeMode == 2) {
					mode = "线上服务";
				}
				var flx = '<span class="s"> <span class="s1">' + mode + '</span> <span class="s1"><span>每小时工资：</span><span>' +
					hourPrice + '</span></span> <span class="s1"><span>每天工资：</span><span>' + dayPrice +
					'</span></span>         </span>'
				$(".flx").append(flx);
			}
		})
	}, 500)






})
