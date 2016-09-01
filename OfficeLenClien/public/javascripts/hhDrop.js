/**
 * 
 * jquery.hhDrop 点击显示下拉框，点击其他地方隐藏！ Powered By huanhuan QQ 651471385 E-mail
 * 651471385@qq.com Data 2013-07-04 Dependence jquery-1.7.2.min.js
 * 
 */
var building = '';
var unit = '';
var bulid = '';
var imgurl = '';
var buildingid = '';

$(function () {

	$.fn.hhDrop = function (options) {
		var options = jQuery.extend({
			preLoadSrc: "images/loading.gif"
		}, options || {});

		var defaults = {};

		return this.each(function () {

			// 默认
			var options = $.extend(defaults, options);
			var $this = $(this);

			var $citySearch = $this.find('#citys');
			var $buildSearch = $this.find('#building');
			var $spSearch = $this.find('#sps');
			var $lineSearchbg = $this.nextAll().find('.lineSearchbg');

			// 出发城市 到达城市
			$citySearch.click(function () {
				var _this = $(this);
				// 点击本身显示隐藏
				if (_this.hasClass('boxSearchHover')) {
					$('#cl').remove();
					_this.removeClass('boxSearchHover');
					_this.children('.btn_search').removeClass(
						'btn_search_current');
					_this.parent().find('.search_form_suggest').hide();

				} else {
					_this.addClass('boxSearchHover');
					_this.children('.btn_search')
						.addClass('btn_search_current');
					_this.parent().find('.search_form_suggest').show();
					showcity();
				}

				_this.next().find('.clr_after a').click(function () {

					_this.find('span.key_word b').text($(this).text());

				});

				_this.next().find('.search_city_result a').click(function () {

					_this.find('span.key_word b').text($(this).text());

				});

				// 阻止冒泡
				$(document)
					.bind(
					'click',
					function (event) {
						if (!$(event.target).parent().hasClass(
							'boxSearch')
							&& !$(event.target).hasClass(
								'boxSearch')
							&& !$(event.target).parent()
								.parent().hasClass(
								'boxSearch')
							&& !$(event.target).hasClass(
								'input_city')) {
							$('#cl').remove();
							_this.children('.btn_search')
								.removeClass(
								'btn_search_current');
							_this.removeClass('boxSearchHover');
							_this.parent().find(
								'.search_form_suggest').hide();
						}
					});

			});

			$buildSearch.click(function () {
				var _this = $(this);
				// 点击本身显示隐藏
				if (_this.hasClass('boxSearchHover')) {
					$('#bl').remove();
					_this.removeClass('boxSearchHover');
					_this.children('.btn_search').removeClass(
						'btn_search_current');
					_this.parent().find('.search_form_suggest').hide();

				} else {
					_this.addClass('boxSearchHover');
					_this.children('.btn_search')
						.addClass('btn_search_current');
					_this.parent().find('.search_form_suggest').show();
					if (building == '')
						getbuild();
					else
						showbuild(building);
				}

				_this.next().find('.clr_after a').click(function () {

					_this.find('span.key_word b').text($(this).text());

				});

				_this.next().find('.search_city_result a').click(function () {

					_this.find('span.key_word b').text($(this).text());

				});

				// 阻止冒泡
				$(document)
					.bind(
					'click',
					function (event) {
						if (!$(event.target).parent().hasClass(
							'boxSearch')
							&& !$(event.target).hasClass(
								'boxSearch')
							&& !$(event.target).parent()
								.parent().hasClass(
								'boxSearch')
							&& !$(event.target).hasClass(
								'input_city')) {
							$('#bl').remove();
							_this.children('.btn_search')
								.removeClass(
								'btn_search_current');
							_this.removeClass('boxSearchHover');
							_this.parent().find(
								'.search_form_suggest').hide();
						}
					});

			});

			$spSearch.click(function () {
				var _this = $(this);
				// 点击本身显示隐藏
				if (_this.hasClass('boxSearchHover')) {
					$('#sl').remove();
					_this.removeClass('boxSearchHover');
					_this.children('.btn_search').removeClass(
						'btn_search_current');
					_this.parent().find('.search_form_suggest').hide();

				} else {
					_this.addClass('boxSearchHover');
					_this.children('.btn_search')
						.addClass('btn_search_current');
					_this.parent().find('.search_form_suggest').show();
					if (unit == '' || build != $('#build').text())
						getunit();
					else
						showunit(unit);
				}

				_this.next().find('.clr_after a').click(function () {

					_this.find('span.key_word b').text($(this).text());

				});

				_this.next().find('.search_city_result a').click(function () {

					_this.find('span.key_word b').text($(this).text());

				});

				// 阻止冒泡
				$(document)
					.bind(
					'click',
					function (event) {
						if (!$(event.target).parent().hasClass(
							'boxSearch')
							&& !$(event.target).hasClass(
								'boxSearch')
							&& !$(event.target).parent()
								.parent().hasClass(
								'boxSearch')
							&& !$(event.target).hasClass(
								'input_city')) {
							$('#sl').remove();
							_this.children('.btn_search')
								.removeClass(
								'btn_search_current');
							_this.removeClass('boxSearchHover');
							_this.parent().find(
								'.search_form_suggest').hide();
						}
					});

			});
			$('#submit').unbind('click').click(function () {
				submitForm();
			});
			$('#localImag').unbind("click").click(function () {
				console.log("----image=-----");
				upLoadImage();
			});

		});

	}

});

function showunit(a) {
	var str = '';
	for (var i = 0; i < a.length; i++) {
		str = str + "<a href='#'>" + a[i].name + "</a>";
	}
	$('#listsp').append("<dd class='clr_after' style='overflow-y:auto' id='sl'>" + str + "</dd>");
}
function showcity() {
	$('#listcity').append("<dd class='clr_after' id='cl'><a href='#'>广东</a><a href='#'>深圳</a><a href='#'>北京</a></dd>");
}

function showbuild(a) {
	var str = '';
	for (var i = 0; i < a.length; i++) {
		str = str + "<a href='#'>" + a[i].name + "</a>";
	}
	$('#listbuild').append("<dd class='clr_after' id='bl'>" + str + "</dd>");
}

// 获取建筑列表
function getbuild() {
	console.log("------getbuild--------");
	$.ajax({
		type: "POST",
		url: "/advertisement/getbuild",
		data: {
			"cityUuid": 10001
		},
		dataType: "json",
		success: function (data) {
			console.log(data);			
			building = data.items;
			showbuild(building);
		},
		error: function () {
			console.log("error");
		}
	});
}

function getunit() {
	console.log("------getunit--------");
	build = $('#build').text();
	if (build == '请选择楼栋') {
		layer.msg('请选择楼栋');
		return;
	}
	var data = getUuids(build, building);
	buildingid = data.uuid;
	$.ajax({
		type: "POST",
		url: "/advertisement/getunit",
		data: {
			"buildingUuid": data.uuid,
			"lat": data.lat,
			"lon": data.lon
		},
		dataType: "json",
		success: function (data) {
			console.log(data);
			showunit(data.items);
			unit = data.items;
		},
		error: function () {
			console.log("error");
		}
	});

};

function getUuids(title, Data) {
	console.log("title=" + title);
	for (var i = 0; i < Data.length; i++) {
		if (Data[i].name == title) {
			return Data[i];
		}
	}
	return;
}

function submitForm() {
	var re = "/^(-)?\d+(\.\d+)?$/";
	var city = $('#city').text();
	var buil = $('#build').text();
	var sp = $('#sp').text();
	var distance = parseFloat($('#distance').val());
	var name = $('#name').val();
	var levels = parseInt($('#leves').val());
	var score = parseInt($('#score').val());
	var description = $('#description').val();
	if (city == '请选择城市') {
		layer.msg('请选择城市');
		return;
	}
	if (build == '请选择楼栋') {
		layer.msg('请选择楼栋');
		return;
	}
	if (sp == '请选择商铺') {
		layer.msg('请选择商铺');
		return;
	}
	//  if(!re.test(distance)){
	//  layer.tips('数据有误', '#distance');
	//  return;
	//  }
	if (name == '') {
		layer.tips('名称不能为空', '#name');
		return;
	}
	if (levels == '') {
		layer.tips('积分不能为空', '#leves');
		return;
	}
	if (score == '') {
		layer.tips('等级不能为空', '#score');
		return;
	}
	if (description == '') {
		layer.tips('内容不能为空', '#description');
		return;
	}
	if (imgurl == '') {
		layer.msg('请上传图片');
		return;
	}
	var user = getCookie("company_id");
	var data = getUuids(sp, unit);
	console.log(data);
	console.log(data.uuid);
	var obj = {
		"user": user,
		"buildUuid": buildingid,
		"uuid": data.uuid,
		"sp": sp,
		"distance": distance,
		"name": name,
		"description": description,
		"image": imgurl,
		"levels": levels,
		"score": score
	};
	$.ajax({
		type: "POST",
		url: "/advertisement/saveadvert",
		data: obj,
		dataType: "text",
		success: function (data) {
			console.log(data);
			if (data == 'success') {
				layer.msg('提交成功');
				window.location.href = "/home";
			} else {
				layer.msg('提交失败');
			}

		},
		error: function (error) {
			layer.msg('提交失败');
			console.log(error);
		}
	});
}

function upLoadImage() {
	console.log("----image1-----");
	$('.fileupload').change(function (event) {

        if ($('.fileupload').val().length) {
            var fileName = $('.fileupload').val();
            var extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase();
            if (extension == ".jpg" || extension == ".png") {
				var data = new FormData();
				data.append('upload', $('#fileToUpload')[0].files[0]);
				$.ajax({
					url: 'advertisement/uploadimage',
					type: 'POST',
					data: data,
					cache: false,
					contentType: false, //不可缺参数
					processData: false, //不可缺参数
					success: function (data) {
						console.log(data);
						if (data.code == 200) {
							showimage(data.msg);
							imgurl = "http://mxhjan.com:4000/images/uploadimage" + data.msg;
						} else {
							layer.msg('上传失败');
						}
					},
					error: function () {
						console.log('error');
					}
				});
            }
        }
    });
}

function showimage(a) {
	$('#upimage').remove();
	$('#localImag').append("<div class='uploadimage'> <img src='images/uploadimage" + a + "' class='image'/></div>");
}

//获取cookie
function getCookie(name) {
	var strCookie = document.cookie;
	var arrCookie = strCookie.split("; ");
	for (var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		console.log("name=" + arr[0]);
		if (arr[0] == name) {
			return unescape(arr[1]);
		}
	}
    return "";

} 
