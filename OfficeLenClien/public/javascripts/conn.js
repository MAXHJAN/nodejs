function saveReport() {
	console.log("--------login");
	if ($('#lusername').val() == "") {
		$('#usn').closest('.fg-line').addClass('has-error');
		layer.tips('用户名不能为空', '#lusername');
		return false;
	}
	if ($('#lpasswd').val() == "") {
		$('#pas').closest('.fg-line').addClass('has-error');
		layer.tips('邮箱不能为空', '#lpasswd');
		return false;
	}
	var load = layer.load(3);
	$("#login").ajaxSubmit({
		type : "post",
		dataType : "json",
		url : "/login",
		success : function(message) {
			window.console.log(message);
			layer.close(load);
			if (message.msg == "passwd_error") {
				$('#pas').closest('.fg-line').addClass('has-error');
				layer.msg('密码错误');
			} else if (message.msg == "not_user") {
				$('#usn').closest('.fg-line').addClass('has-error');
				layer.msg("没有该用户");
			} else if (message.msg == "success") {
				layer.msg('登录成功');
				document.cookie="company_id="+message.data;   
				window.location.href = "/home";
			} else
				layer.msg('登录失败');

		},
	});

	return false; // 必须返回false，否则表单会自己再做一次提交操作，并且页面跳转
}

function registerForm() {
	console.log("--------register----------");
	if ($('#rusername').val() == "") {
		layer.tips('用户名不能为空', '#rusername');
		return false;
	}
	if ($('#remail').val() == "") {
		layer.tips('邮箱不能为空', '#remail');
		return false;
	}
	if ($('#rphone').val() == "") {
		layer.tips('电话不能为空', '#rphone');
		return false;
	}
	if ($('#rpasswd').val() == "") {
		layer.tips('密码不能为空', '#rpasswd');
		return false;
	}

	$("#register").ajaxSubmit({
		type : "post",
		dataType : "text",
		url : "/register",
		success : function(message) {
			window.console.log("message=" + message);
			if (message == "success") {
				layer.msg('注册成功');
			} else if (message == "repeat") {
				$('#rname').closest('.fg-line').addClass('has-error');
				layer.tips('用户名重复', '#rusername');
			} else {
				layer.msg('注册失败', {
					icon : 5
				});
			}

		},
	});

	return false;
}
