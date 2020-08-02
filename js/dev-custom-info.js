/*获取设备基本表全部数据---2.构建 设备定置管理*/
/*构建 设备定置管理*/
$(function () {
    let idArr = $("table").attr("id");
    let $table = $("#" + idArr);
    build_devCustom(DEFAULT_PAGE, $table);
    /*delOperate($table);*/
    dataMenu($table);
    tableMenu($table);
});

function build_devCustom(page, $table) {
    $.ajax({
        type: "get",
        dataType: "json",
        data: page,
        /*url: API + "device/DevCustomizedInfo",*/
        url:"../orange2admin-web/设备定制列表.json",
        success: function (result) {
            if (result.code === "1001") {
                $table.find(".checkAll").removeAttr("checked");
                build_devCustom_table((result.data)["list"], $table);
                build_pageInfo(result.data, $table);
                build_pageNav(result.data, $table);
                $table.parents(".card").find(".filterBtn").trigger("click");
            }
            if (result.code === "1002") {

            }
        }
    })
}

function build_devCustom_table(tableData, $table) {
    $table.find("tbody").empty();
    $.each(tableData, function (index, obj) {
        let deviceCustomizedInfo = new DeviceCustomizedInfo();
        $.extend(true, deviceCustomizedInfo, obj);
        let choose = $("<td><label class='lyear-checkbox checkbox-primary'><input type='checkbox' class='checkItem'><span></span></label></td>").attr('style','width: 0.5px;');
        let deviceId = $("<td></td>").addClass("text-center").append(deviceCustomizedInfo.deviceId);
        let devVoice = $("<td></td>").addClass("text-center").append(deviceCustomizedInfo.devVoice);
        let devSpeed = $("<td></td>").addClass("text-center").append(deviceCustomizedInfo.devSpeed);
        let ttsVoice = $("<td></td>").addClass("text-center").append(deviceCustomizedInfo.ttsVoice);
        let ttsSpeed = $("<td></td>").addClass("text-center").append(deviceCustomizedInfo.ttsSpeed);
        let ttsOrigin = $("<td></td>").addClass("text-center").append(deviceCustomizedInfo.ttsOrigin);
        let playMethod = $("<td></td>").addClass("text-center").append(deviceCustomizedInfo.playMethod);
        let lessonId = $("<td></td>").addClass("text-center").append(deviceCustomizedInfo.lessonId);
        let ageRange = $("<td></td>").addClass("text-center").append(deviceCustomizedInfo.minAge + "~" + deviceCustomizedInfo.maxAge);
        let turnOnPlay = $("<td></td>").addClass("text-center").append(deviceCustomizedInfo.turnOnPlay);
        let turnOnLevel = $("<td></td>").addClass("text-center").append(deviceCustomizedInfo.turnOnLevel);
        let edit = $("<a></a>").addClass("editBtn btn btn-xs btn-default").append($("<li></li>").addClass("fa fa-pencil-square-o fa-lg"));
        let del = $("<a></a>").addClass("delBtn btn btn-xs btn-default").append($("<li></li>").addClass("fa fa-trash-o fa-lg"));
        let operation = $("<td></td>").addClass("text-center").append(edit).append(del);
        $("<tr></tr>").append(choose)
            .append(choose)
            .append(deviceId)
            .append(devVoice)
            .append(devSpeed)
            .append(ttsVoice)
            .append(ttsSpeed)
            .append(ttsOrigin)
            .append(playMethod)
            .append(lessonId)
            .append(ageRange)
            .append(turnOnPlay)
            .append(turnOnLevel)
            .append(operation)
            .appendTo($table);
    });
}


//操作--修改小图标--update--弹框及功能
$currentTr = $(this).parents("tr");
function build_devCustom_update_modal($tr,$table) {
    let currentPageNum = $table.parents(".card").find(".pageNav").find("li[class='active']").children("a").text();
    let $formFields = $tr.parents(".card").find(".updateDataModal").find(".row");
    let $tableField = $tr.children("td");
    //提取出table里面的字段信息
    let deviceId = $tableField.eq(1).text();
    let voice = $tableField.eq(2).text();
    let speed = $tableField.eq(3).text();
    let ttsVoice = $tableField.eq(4).text();
    let playMethod = $tableField.eq(5).text();
    let Age = $tableField.eq(6).text();
    let turnOnLevel = $tableField.eq(7).text();
    let turnOnPlay = $tableField.eq(8).text();
    //固定的值
    $formFields.eq(0).find("p").text(deviceId);
    //确认框-弹框
    let $modalFields = $(".updateDataModal").find(".modal-body").find(".row");//模态框  $tr选中的的当前行
    $('#updateCommit').unbind().on('click', function () {//.unbind()避免重复出现多个弹框
        $.confirm({
            title: '提交',
            content: '确认提交信息',
            type: 'green',
            buttons: {
                omg: {
                    text: '确认',
                    btnClass: 'btn-green',
                },
                close: {
                    text: '返回',
                }
            },
            onAction:function (action) {//回调函数
                let deviceCustomizedInfo = new DeviceCustomizedInfo();
                deviceCustomizedInfo.deviceId = $modalFields.eq(0).find("p").text();
                deviceCustomizedInfo.voice = $modalFields.eq(1).find("input[name='optionsRadiosinline']:checked").val();
                deviceCustomizedInfo.ttsVoice =  $modalFields.eq(2).find("input[name='optionsRadiottsVoice']:checked").val();
                deviceCustomizedInfo.speed = $modalFields.eq(3).find("input[name='optionsSpeed']:checked").val();
                deviceCustomizedInfo.playMethod = $modalFields.eq(4).find("option:checked").val();
                deviceCustomizedInfo.minAge = $modalFields.eq(5).find(".minAge").find("option:checked").val();
                deviceCustomizedInfo.maxAge = $modalFields.eq(5).find(".maxAge").find("option:checked").val();
                deviceCustomizedInfo.turnOnPlay = $modalFields.eq(6).find("input[name='optionsRank']:checked").val();
                deviceCustomizedInfo.turnOnLevel = $modalFields.eq(7).find("input[name='optionStart']:checked").val();
                /*console.log(deviceCustomizedInfo);*/
                if (action=="omg"){
                    $.ajax({
                        type:'put',
                        url:API + "device/DevCustomizedInfo",
                        dataType: "json",
                        contentType:"application/json",
                        data:JSON.stringify(deviceCustomizedInfo),
                        success:function (result) {
                            if (result.code==="3001") {
                                alert('更新数据成功')
                                $(".updateDataModal").modal('hide');
                                DEFAULT_PAGE.pageNum = currentPageNum;
                                build_devCustom(DEFAULT_PAGE, $table);
                            }
                            if (result.code==="3002") {
                                alert('更新数据失败')
                            }
                        }
                    })
                }else if (action=="close") {

                }

            }
        });
        /* console.log(deviceBasicInfo)*/
    });


}

//单条删除
function delData_devCustom(id, $table) {
    let currentPageNum = $table.parents(".card").find(".pageNav").find("li[class='active']").children("a").text();
    DEFAULT_PAGE.pageNum = currentPageNum;
    $.confirm({
        title: '删除',
        content: "确定要删除这条数据吗？",
        type: 'orange',
        typeAnimated: false,
        buttons: {
            omg: {
                text: '确定',
                btnClass: 'btn-orange',
            },
            close: {
                text: '关闭',
            }
        },
        onAction: function (action) {
            if (action === "omg") {
                $.ajax({
                    type: 'DELETE',
                    url: API + "device/DevCustomizedInfo",
                    dataType: "json",//希望服务端返回的数据类型
                    // 返回前行的id给后台 //用字面量的形式发送对象{属性，值}  发送给后台的数据要对应他的属性名
                    data: {"deviceId": id},
                    success: function (result) {
                        if (result.code === "4001") {
                            alert('删除数据成功')
                            //注意这里的默认页号已经在此函数开头重新赋值过
                            build_devCustom(DEFAULT_PAGE, $table);
                        }
                        if (result.code === "4002") {
                            alert('删除数据失败')
                        }
                    }
                });
            }
        }
    });
}

/*批量删除--弹框 数据获取*/
function batchDelData_devCustom(ids, $table) {
    checkedCount = ids.length;//获取到选择删除的数据个数
        $.confirm({
            title: '批量删除',
            content: "确定要删除这"+checkedCount+"条数据吗？",
            type: 'orange',
            typeAnimated: false,
            buttons: {
                omg: {
                    text: '确定',
                    btnClass: 'btn-orange',
                },
                close: {
                    text: '关闭',
                }
            },
            onAction:function (action) {
                if (action === "omg") {
                    $.ajax({
                        type:'DELETE',
                        url:API + "device/DevCustomizedInfo/batch",
                        dataType: "json",//希望服务端返回的数据类型
                        contentType:"application/json",  //contentType代表发送端发送的实体数据的数据类型
                        data:JSON.stringify(ids),//返回json格式的id集合
                        success:function (result) {
                            if (result.code==="4001") {
                                alert('删除数据成功')
                                build_devCustom(DEFAULT_PAGE, $table);
                            }
                            if (result.code==="4002") {
                                alert('删除数据失败')
                            }
                        }
                    })
                } else if (action === "close") {

                }
            },

        });

}
/*END批量删除--弹框 数据获取*/