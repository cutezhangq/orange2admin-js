/*获取设备基本表全部数据---1.构建 设备信息列表*/
/*构建 设备信息列表*/

/*build_devInfo 发送ajax请求（请求table数据，分页数据--1.分页信息2.分页导航）*/
$(function () {
    let idArr = $("table").attr("id");
    let $table = $("#" + idArr);
    build_devInfo(DEFAULT_PAGE, $table);
    dataMenu($table);
    tableMenu($table);
});

function build_devInfo(page, $table) {
    $.ajax({
        type: "get",
        dataType: "json",
        url: API + DEV_BASIC+"all",
        data: page,
        success: function (result) {/*result：返回的json对象*/
            if (result.code === "1001") { /*与控制台的code对应，1001表示*获取数据成功*/
                $table.find(".checkAll").removeAttr("checked");
                build_devInfo_table((result.data)["list"], $table);/*表格数据（见下面build_devInfo_table函数）*/
                build_pageInfo(result.data, $table);/*分页信息*/
                build_pageNav(result.data, $table);/*分页导航*/
                $table.parents(".card").find(".filterBtn").trigger("click");
            }
            if (result.code === "1002") {
            }
        }
    })
}
/*将成功获取到的数据插入到页面（插入在html中）*/ /*在上面 build_devInfo中调用*/
function build_devInfo_table(tableData, $table) {/*tableData是数组*/
    $table.children("tbody").empty();
    $.each(tableData, function (index, obj) {
        //深拷贝.extend
        let deviceBasicInfo = new DeviceBasicInfo();
        $.extend(true, deviceBasicInfo, obj);//true深度合并对象  多个对象的某个同名属性也都是对象，则该"属性对象"的属性也将进行合并。
        let choose = $("<td><label class='lyear-checkbox checkbox-primary'><input type='checkbox' class='checkItem'><span></span></label></td>").attr('style','width: 0.5px;');
        let deviceId = $("<td></td>").addClass("text-center").append(deviceBasicInfo.deviceId);
        let deviceMac = $("<td></td>").addClass("text-center").append(deviceBasicInfo.deviceMac);
        let batchId = $("<td></td>").addClass("text-center").append(deviceBasicInfo.batchId);
        let version = $("<td></td>").addClass("text-center").append(deviceBasicInfo.version);
        let bindCount = $("<td></td>").addClass("text-center").append(deviceBasicInfo.bindCount);
        let bindStatus = $("<td></td>").addClass("text-center").append(deviceBasicInfo.bindStatus);
        let authorizeTime = $("<td></td>").addClass("text-center").append(deviceBasicInfo.authorizeTime);
        let minAgePlayStatus = $("<td></td>").addClass("text-center").append(deviceBasicInfo.minAgePlayStatus);
        let maxAgePlayStatus = $("<td></td>").addClass("text-center").append(deviceBasicInfo.maxAgePlayStatus);
        let minAgePlayDays = $("<td></td>").addClass("text-center").append(deviceBasicInfo.minAgePlayDays);
        let maxAgePlayDays = $("<td></td>").addClass("text-center").append(deviceBasicInfo.maxAgePlayDays);
        let edit = $("<a></a>").addClass("editBtn btn btn-xs btn-default").append($("<li></li>").addClass("fa fa-pencil-square-o fa-lg"));
        let del = $("<a></a>").addClass("delBtn btn btn-xs btn-default ").append($("<li></li>").addClass("fa fa-trash-o fa-lg"));
        let operation = $("<td></td>").addClass("text-center").append($("<div></div>").addClass("btn-group").append(edit).append(del));
        $("<tr></tr>").append(choose)
            .append(choose)
            .append(deviceId)
            .append(deviceMac)
            .append(batchId)
            .append(version)
            .append(bindCount)
            .append(bindStatus)
            .append(authorizeTime)
            .append(minAgePlayStatus)
            .append(maxAgePlayStatus)
            .append(minAgePlayDays)
            .append(maxAgePlayDays)
            .append(operation)
            .appendTo($table);
    });
}

//操作--修改小图标--update--弹框及功能
$currentTr = $(this).parents("tr");
function build_devInfo_update_modal($tr,$table) {
    let currentPageNum = $table.parents(".card").find(".pageNav").find("li[class='active']").children("a").text();
    //模态框  $tr选中的的当前行
    let $formFields = $tr.parents(".card").find(".updateDataModal").find(".row");
    let $tableField = $tr.children("td");
    //提取出table里面的字段信息
    let deviceId = $tableField.eq(1).text();
    let deviceMac = $tableField.eq(2).text();
    let batch = $tableField.eq(3).text();
    let version = $tableField.eq(4).text();
    let bindCount = $tableField.eq(5).text();
    let authorizeTime = $tableField.eq(6).text();
    //固定的值(模态框中固定的显示table这一行的值)
    $formFields.eq(0).find("p").text(deviceId);
    $formFields.eq(1).find("p").text(deviceMac);
    //下拉选择框
    //1.所属批次
    $.ajax({
        type: "get",
        dataType: "json",
        /*url: API + "device/BatchBasicInfo",*/
        url:"../orange2admin-web/response.json",
        data: DEFAULT_PAGE,
        success: function (result) {
            $formFields.eq(2).find("select").empty();
            let arr = ((result.data)["allBatchBasicInfo"])["list"];
            $.each(arr, function (index, obj) {
                let $option = $("<option></option>").append(obj["batch"]);
                if (obj["batch"] === batch) {
                    $formFields.eq(2).find("select").append($option.attr("selected", "selected"));
                } else {
                    $formFields.eq(2).find("select").append($option);
                }
            });
        }
    });
    //2.固件版本
    $.ajax({
        type: "get",
        dataType: "json",
        url: API + "device/VersionInfo",
        success: function (result) {
            $formFields.eq(3).find("select").empty();
            let arr = result.data["versionNews"];
            $.each(arr, function (index, obj) {
                let $option = $("<option></option>").append(obj["version"]);
                if (obj["version"] === version) {
                    $formFields.eq(3).find("select").append($option.attr("selected", "selected"));
                } else {
                    $formFields.eq(3).find("select").append($option);
                }
            });
        }
    });
    $formFields.eq(3).find("p").text(deviceId);
    $formFields.eq(4).find("p").text(bindCount);
    $formFields.eq(5).find("input").datetimepicker({
        language: "zh-CN"
    });
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
                let deviceBasicInfo = new DeviceBasicInfo();
                deviceBasicInfo.deviceMac = $tableField.eq(2).text();
                deviceBasicInfo.deviceId= $tableField.eq(1).text();
                deviceBasicInfo.batch =  $modalFields.eq(2).find("select").val();
                deviceBasicInfo.version = $modalFields.eq(3).find("select").val();
                deviceBasicInfo.bindCount= $tableField.eq(5).text();
                deviceBasicInfo.authorizeTime = $modalFields.eq(5).find("input").val();
                console.log(deviceBasicInfo);
                if (action==="omg"){
                    $.ajax({
                        type: "PUT",
                        url:API + "device/DevBasicInfo",
                        dataType: "json",
                        contentType:"application/json",
                        data:JSON.stringify(deviceBasicInfo),
                        success:function (result) {
                            if (result.code==="3001") {
                                alert('更新数据成功')
                                $(".updateDataModal").modal('hide');
                                DEFAULT_PAGE.pageNum = currentPageNum;
                                build_devInfo(DEFAULT_PAGE, $table);
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

//操作--删除图标--弹框及ajax(删除当前行数据)
function delData_devInfo(id, $table) {
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
                    url: API + "device/DevBasicInfo",
                    dataType: "json",//希望服务端返回的数据类型
                    // 返回前行的id给后台 //用字面量的形式发送对象{属性，值}  发送给后台的数据要对应他的属性名
                    data: {"deviceId": id},
                    success: function (result) {
                        if (result.code === "4001") {
                            alert('删除数据成功')
                            //注意这里的默认页号已经在此函数开头重新赋值过
                            build_devInfo(DEFAULT_PAGE, $table);
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

//新增数据--模态框及功能的实现
function build_devInfo_add_modal($table) {
    let $modalFields = $(".newDataInfo").parents(".card").find(".addDataModal").find(".row");
    $modalFields.eq(0).find("input").val("");
    $modalFields.eq(1).find("input").val("");
    //1.所属批次
    $.ajax({
        type: "get",
        dataType: "json",
        url: API + "device/BatchBasicInfo",
        data: DEFAULT_PAGE,
        success: function (result) {
            if (result.code === "1001") {
                $modalFields.eq(2).find("select").empty();
                let arr = ((result.data)["allBatchBasicInfo"])["list"];
                $.each(arr, function (index, obj) {
                    let $option = $("<option></option>").append(obj["batch"]);
                    $modalFields.eq(2).find("select").append($option);
                });
            }
            if (result === "1002") {

            }
        }
    });
    //2.固件版本
    $.ajax({
        type: "get",
        dataType: "json",
        url: API + "device/VersionInfo",
        success: function (result) {
            if (result.code === "1001") {
                $modalFields.eq(3).find("select").empty();
                let arr = result.data["versionNews"];
                $.each(arr, function (index, obj) {
                    let $option = $("<option></option>").append(obj["version"]);
                    $modalFields.eq(3).find("select").append($option);
                });
            }
            if (result.code === "1002") {

            }
        }
    });
    //授权时间
    let $authDate = $modalFields.eq(4).find("input");
    $authDate.datetimepicker('setDate', new Date());
    //确认框-弹框
    $('#commit').unbind().on('click', function () {
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
                let modalObj = new DeviceBasicInfo();
                modalObj.deviceId = $modalFields.eq(0).find("input").val();
                modalObj.deviceMac = $modalFields.eq(1).find("input").val();
                modalObj.batch =  $modalFields.eq(2).find("select").val();
                modalObj.version = $modalFields.eq(3).find("select").val();
                modalObj.authorizeTime = $modalFields.eq(4).find("input").val();
               /* console.log(modalObj)*/
                if (action=="omg"){
                    $.ajax({
                        type:'post',
                        url:API + "device/DevBasicInfo",
                        dataType: "json",
                        contentType:"application/json",
                        data:JSON.stringify(modalObj),
                        success:function (result) {
                            if (result.code==="2001") {
                                alert('添加数据成功')
                                $(".addDataModal").modal('hide');
                                build_devInfo(DEFAULT_PAGE, $table);
                            }
                            if (result.code==="2002") {
                                alert('添加数据失败')
                            }
                        }
                    })
                }else if (action=="close") {

                }

            }
        });
    });
}


/*批量删除--弹框 数据获取*/
function batchDelData_devInfo(ids, $table) {
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
                if (action=="omg"){
                    $.ajax({
                        type:'DELETE',
                        url:API + "device/DevBasicInfo/batch",
                        dataType: "json",//希望服务端返回的数据类型
                        contentType:"application/json",  //contentType代表发送端发送的实体数据的数据类型
                        data:JSON.stringify(ids),//返回json格式的id集合
                        success:function (result) {
                            if (result.code==="4001") {
                                alert('删除数据成功')
                                build_devInfo(DEFAULT_PAGE, $table);
                            }
                            if (result.code==="4002") {
                                alert('删除数据失败')
                            }
                        }
                    })
                }else if (action=="close") {

                }
            },

        });
}


