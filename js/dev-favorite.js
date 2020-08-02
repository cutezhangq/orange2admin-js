/*针对dev-favorite导航页面的部分*//*获取设备基本表全部数据---3.构建 设备收藏管理*/
/*添加点击事件 并 发送ajax给后台请求table*/
    //给搜索框添加点击事件
$("#DevFavorSearch").on("click", function () {
    let category = $("#DevFavorSelect option:selected").val();  /*获取下拉框(单选)选中值*/
    let searchDeviceId = $("#DeviceId").val();/*获取设备id的text*//*注意要用id来获取（class不行）*/
    build_devFav(DEFAULT_PAGE, category, searchDeviceId);
});

function build_devFav(page, category, deviceId) {   /* category分类（下拉框选择）, deviceId（搜索）*/
    let pageNum = page["pageNum"];
    let pageSize = page["pageSize"];
        $.ajax({
            type:"get",
            dataType:"json",
            url: API + "device/isExistDevFav?deviceId=" + deviceId,
            success:function (result) {
                if (result.code === '0003') {//获取数据成功
                    window.location.href = "dev-favorite-info.html?deviceId=" + deviceId + "&pageNum=" + pageNum + "&pageSize=" + pageSize + "&category=" + category;
                }
                if (result.code === '0002') {

                }
            }
        });
}

//搜索框整体大小调整
$(".maxselect").css("transform","scale(1.5)");


