$(document).ready(function() {
	// 加载尾部
	setTimeout(function() {
		$('#footer').load("../html/footer.html");
	}, 320);
	if (userGuid) {
		courseData(0);
	} else {
		layer.msg("请先登录", {
			time: 1200
		})
	}
	var pageNext = 0;
	// 表格
	function loadCourseTable(data) {
		$("#course").bootstrapTable({
			classes: " table-no-bordered",
			columns: [{
				formatter: courseList,
				events:viewCourse
			}],
			data: data
		});

		function courseList(e, value, row, index) {			
			var courseArr = value.courseType.split(",");
			var courseStr =[];
			var course;
			for(var i=0;i<courseArr.length;i++){
				var str = "["+courseArr[i]+"]";
				courseStr.push(str);	
			}
			for(var i=0;i<courseStr.length;i++){
				course = courseStr.join(",");
			}
			
			return '<div class="courseBox"> <p class="courseT">《' + value.courseTheme +
				'》</p> <div class="courseM"> <div> <p><span> 讲师：</span>' + value.lectureName +
				' </p><p> <span>课程时长：</span><span class="time">' + value.courseTimes +
				'</span>小时</p> </div>   <div class="courseType"><p><span>课程类别：</span>' +course+
				'  </p>   <p><span>受训对象：</span>' + value.objecter +
				'  </p></div>      </div>  </div>'
		}
	};
	window.viewCourse = {
		'click .courseBox': function(e, value, row, index) {
			window.open('courseDtail.html?courseId='+row.Id+"&userGuid="+row.creater);
		}
	}
	// 第一页
	function courseData(page) {
		setTimeout(function() {
			$.post('' + http_head + 'Lectures/course/Get_MyCourse.ashx', {
				"page": page,
				"userGuid": userGuid
			}, function(data) {
				var data = JSON.parse(data);
				console.log("课程", data);
				loadCourseTable(data.items.rows);
				$("#course").bootstrapTable("load", data.items.rows);
				pageNext = data.items.page;
				if (data.items.rows.length >= 10) {
					$('.nextpageBtn').show()
				} else {
					$('.nextpageBtn').hide()
				}
			})

		}, 350);
	};
	// 下一页
	function courseNext(page) {
		setTimeout(function() {
			$.post('' + http_head + 'Lectures/course/Get_MyCourse.ashx', {
				"page": page,
				"userGuid": userGuid
			}, function(data) {
				var data = JSON.parse(data);
				console.log("下一页", data)
				if (data.items.rows.length > 0) {
					layer.msg("加载成功", {
						time: 1200
					})
				} else {
					layer.msg("没有更多了", {
						time: 1200
					})
				}
				loadCourseTable(data.items.rows);
				$("#course").bootstrapTable("append", data.items.rows);
				pageNext = data.items.page;
				if (data.items.rows.length >= 10) {
					$('.nextpageBtn').show()
				} else {

					$('.nextpageBtn').hide()
				}
			})

		}, 450);
	};
	$('.nextpageBtn').click(function() {
		courseNext(pageNext);
	});
	

})
