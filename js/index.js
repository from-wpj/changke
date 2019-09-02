$(document).ready(function() {
	
	// 加载尾部
	setTimeout(function() {
		$('#footer').load("../html/footer.html");
	}, 500);
	// 日志
	setTimeout(function() {
		$.post('' + http_head + 'Articles/Get_MyArticle.ashx', {
			"userGuid": userGuid,
			"page": 0
		}, function(data) {
			var data = JSON.parse(data);
			// console.log("rizhi",data);
			$("#log").bootstrapTable({
				classes: " table-no-bordered",
				columns: [{

					formatter: logList
				}]
			});
			$("#log").bootstrapTable("load", data.items.rows);

			function logList(e, value, row, index) {

				var time = value.createTime.split("T")[0];
				return '<div class="logBox"> <div class="logT"> <p></p><p>' + value.title + '</p><p>' + time +
					' </p></div>    <div class="logContent">' + value.content + '</div></div>'
			}
		})
	}, 300);
	// 课程
	setTimeout(function() {
		$.post('' + http_head + 'Lectures/course/Get_MyCourse.ashx', {
			"userGuid": userGuid,
			"page": 0
		}, function(data) {
			var data = JSON.parse(data);
			console.log("kecheng1", data);
			$("#course").bootstrapTable({
				classes: " table-no-bordered",
				columns: [{
					formatter: courseList
				}]
			});
			$("#course").bootstrapTable("load", data.items.rows);

			function courseList(e, value, row, index) {
				var courseArr = value.courseType.split(",");
				var courseStr = [];
				var course;
				for (var i = 0; i < courseArr.length; i++) {
					var str = "[" + courseArr[i] + "]";
					courseStr.push(str);
				}
				for (var i = 0; i < courseStr.length; i++) {
					course = courseStr.join(",");
				}
				return '<div class="courseBox"> <p class="courseT">《' + value.courseTheme +
					'》</p> <div class="courseM"> <div> <p><span> 讲师：</span>' + value.lectureName +
					' </p><p> <span>课程时长：</span><span class="time">' + value.courseTimes +
					'</span>小时</p> </div>   <div class="courseType"><p><span>课程类别：</span>' + course +
					'  </p>   <p><span>受训对象：</span>' + value.objecter +
					'  </p></div>      </div>  </div>'
			}
		})
	}, 300);
	// 留言
	$(".submit").on("click", function() {
		if (userGuid == false) {
			layer.msg("请先登录", {
				time: 1500
			});
			window.location = "../comSpace/login/html/innerLogin.html?href =" + href + ""; //兼容
		} else {
			var message = $(".textarea").val();
			if (message == "") {
				layer.msg("留言不能为空", {
					time: 1500
				})
			} else {
				setTimeout(function() {
					$.post('' + http_head + 'Makerspacey/MakerLeaveMsg/Add_MakerLeaveMsg.ashx', {
						// 数据参数
						userGuid: userGuid,
						userCompanyId: companyId,
						parentUserGuid: "",
						message: message,
						parentId: 0,
						makerGuid: " ",
						// companyId: 0,
						firstCommentId: 0
					}, function(data) {
						console.log(data)
						layer.msg("留言成功", {
							time: 1500
						});
						message = $(".textarea").val('');
					})
				}, 200)
			}
		}
	})
	// 更多
	$(".msgMore").on("click",function(){
		window.open("leavingMessage.html?"+guidStr);
	})
	$(".courseMore").on("click",function(){
		window.open("course.html?"+guidStr);
	})
	$(".logMore").on("click",function(){
		window.open("log.html?"+guidStr);
	})
    




})
