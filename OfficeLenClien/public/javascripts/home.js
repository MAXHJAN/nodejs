$(function () {
    getList();
});
function getList() {
    $.ajax({
        type: "POST",
        url: "/home/getlist",
        data: { "company_id": getCookie("company_id") },
        datatype: "json",
        success: function (data) {
            console.log(data);
            var a = data;
            showList(a);
        },
        error: function () {
            console.log("error");
        }
    });
}
function showList(a) {
    console.log("a=" + a);
    var i;
    $('#panel').append(" <div class='panel-heading'><h3 class='panel-title'>所有广告列表</h3></div>");

    for (i = 0; i < a.length; i++) {
        $('#panel').append("<div class='panel-body' style='cursor:pointer'><div class='col-md-1'>" +
            "<img src='" + a[i].imagesmall_path + "' class='img-circle' width='80' height='80'></div>" +
            "<div class='col-md-11'><p>&nbsp;&nbsp;&nbsp <span class='text-primary'><big>名称：</big></span>" + a[i].monster_name +
            "<span class='pull-right' style='margin-right:50px'><span class='text-success'>积分：</span>"+a[i].levels+"<span style='margin-left:30px'>等级：</span>"+a[i].score+"</span></p>"+
            "<p>&nbsp;&nbsp;&nbsp;&nbsp<span class='text-warning'><big>描述：</big></span>" + a[i].description + "</p>+</div></div>");
        $('#panel').append("<div class='panel'></div>")
    }


    $('#listcity').append("<dd class='clr_after'><a href='#'>北京</a><a href='#'>上海</a><a href='#'>广州</a>" +
        "<a href='#'>成都</a><a href='#'>杭州</a><a href='#'>南京</a><a href='#'>深圳</a>" +
        "<a href='#'>济南</a><a href='#'>石家庄</a><a href='#'>武汉</a></dd>");
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