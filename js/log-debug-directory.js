$(function () {
    let date = new Date();
    let LocaleDate = date.toLocaleDateString();
    /*console.log(LocaleDate)*/
    let idArr = $("table").attr("id");
    let $table = $("#" + idArr);
    build_devInfo(DEFAULT_PAGE, $table);
    /*dataMenu($table);
    tableMenu($table);*/
})

function build_devInfo(page, $table) {
    $.ajax({
        type: "get",
        dataType: "json",
        url: API + "device/DevBasicInfo",
        data: page,
        success: function (result) {/*result：返回的json对象*/
            if (result.code === "1001") { /*与控制台的code对应，1001表示*获取数据成功*/
                $table.find(".checkAll").removeAttr("checked");
                build_devInfo_table(((result.data)["allDeviceBasicInfo"])["list"], $table);/*表格数据（见下面build_devInfo_table函数）*/
                build_pageInfo((result.data)["allDeviceBasicInfo"], $table);/*分页信息*/
                build_pageNav((result.data)["allDeviceBasicInfo"], $table);/*分页导航*/
                $table.parents(".card").find(".filterBtn").trigger("click");
            }
            if (result.code === "1002") {
            }
        }
    })
}
