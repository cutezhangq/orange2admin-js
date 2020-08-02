/*获取设备基本表全部数据---4.构建 批次信息管理*/


/*构建 批次信息管理*/
$(function () {
    let idArr = $("table").attr("id");
    let $table = $("#" + idArr);
    build_devBatch(DEFAULT_PAGE, $table);
    dataMenu($table);
    tableMenu($table);
});

function build_devBatch(page, $table) {
    $.ajax({
        type: "get",
        dataType: "json",
         url:API+DEV_BASIC+"",
        data: page,
        url: API + "device/BatchBasicInfo",
        success: function (result) {
            if (result.code === "1001") {
                $table.find(".checkAll").removeAttr("checked");
                build_devBatch_table(((result.data)["allBatchBasicInfo"])["list"], $table);
                build_pageInfo((result.data)["allBatchBasicInfo"], $table);
                build_pageNav((result.data)["allBatchBasicInfo"], $table);
                $table.parents(".card").find(".filterBtn").trigger("click");
            }
            if (result.code === "1002") {

            }
        }
    })
}

function build_devBatch_table(tableData, $table) {
    $table.children("tbody").empty();
    $.each(tableData, function (index, obj) {
        let batchBasicInfo = new BatchBasicInfo();
        $.extend(true, batchBasicInfo, obj);
        let choose = $("<td><label class='lyear-checkbox checkbox-primary'><input type='checkbox' class='checkItem'><span></span></label></td>").attr('style','width: 0.5px;');
        let batch = $("<td></td>").addClass("text-center").append(batchBasicInfo.batch);
        let text = $("<td></td>").addClass("text-center").append(batchBasicInfo.text);
        let levelCode = $("<td></td>").addClass("text-center").append(batchBasicInfo.levelCode);
        let audioMin = $("<td></td>").addClass("text-center").append(batchBasicInfo.audioMin);
        let audioMax = $("<td></td>").addClass("text-center").append(batchBasicInfo.audioMax);
        let modelId = $("<td></td>").addClass("text-center").append(batchBasicInfo.modelId);
        let deviceCount = $("<td></td>").addClass("text-center").append(batchBasicInfo.deviceCount);
        let edit = $("<a></a>").addClass("editBtn btn btn-xs btn-default").append($("<li></li>").addClass("fa fa-pencil-square-o fa-lg"));
        let del = $("<a></a>").addClass("delBtn btn btn-xs btn-default").append($("<li></li>").addClass("fa fa-trash-o fa-lg"));
        let operation = $("<td></td>").addClass("text-center").append(edit).append(del);
        $("<tr></tr>").append(choose)
            .append(choose)
            .append(batch)
            .append(text)
            .append(levelCode)
            .append(audioMin)
            .append(audioMax)
            .append(modelId)
            .append(deviceCount)
            .append(operation)
            .appendTo($table);
    });
}

//操作--修改图标--弹框
function build_batchInfo_update_modal($tr,$table) {
    let currentPageNum = $table.parents(".card").find(".pageNav").find("li[class='active']").children("a").text();
    let $formFields = $tr.parents(".card").find(".updateDataModal").find(".row");
    let $tableField = $tr.children("td");
    //提取出table里面的字段信息
    let batch = $tableField.eq(1).text();
    let text = $tableField.eq(2).text();
    let levelCode = $tableField.eq(3).text();
    let audioMin = $tableField.eq(4).text();
    let audioMax = $tableField.eq(5).text();
    let modelId = $tableField.eq(6).text();//关联设备类别
    let deviceCount = $tableField.eq(7).text();
    //固定的值
    $formFields.eq(0).find("p").text(batch);
    $formFields.eq(1).find("textarea").val(text);
    $formFields.eq(3).find("input").val(audioMin);
    $formFields.eq(4).find("input").val(audioMax);
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
                let batchBasicInfo = new BatchBasicInfo();
                batchBasicInfo.batch = $modalFields.eq(0).find("p").text();
                batchBasicInfo.text = $modalFields.eq(1).find("textarea").val();
                batchBasicInfo.levelCode =  $modalFields.eq(2).find("input").val();
                batchBasicInfo.audioMin = $modalFields.eq(3).find("input").val();
                batchBasicInfo.audioMax = $modalFields.eq(4).find("input").val();
                batchBasicInfo.modelId = $modalFields.eq(5).find("option:checked").val();
                batchBasicInfo.deviceCount = $modalFields.eq(6).find("option:checked").val();
                /*console.log(deviceCustomizedInfo);*/
                if (action==="omg"){
                    $.ajax({
                        type:'put',
                        url:API + "device/BatchBasicInfo",
                        dataType: "json",
                        contentType:"application/json",
                        data:JSON.stringify(batchBasicInfo),
                        success:function (result) {
                            if (result.code==="3001") {
                                alert('更新数据成功')
                                $(".updateDataModal").modal('hide');
                                DEFAULT_PAGE.pageNum = currentPageNum;
                                build_devBatch(DEFAULT_PAGE, $table);
                            }
                            if (result.code==="3002") {
                                alert('更新数据失败')
                            }
                        }
                    })
                }else if (action==="close") {

                }

            }
        });
        /* console.log(deviceBasicInfo)*/
    });

}

//单条删除
function delData_batchInfo(id, $table) {
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
                    url: API + "device/BatchBasicInfo",
                    dataType: "json",//希望服务端返回的数据类型
                    // 返回前行的id给后台 //用字面量的形式发送对象{属性，值}  发送给后台的数据要对应他的属性名
                    data: {"batchId": id},
                    success: function (result) {
                        if (result.code === "4001") {
                            alert('删除数据成功')
                            //注意这里的默认页号已经在此函数开头重新赋值过
                            build_devBatch(DEFAULT_PAGE, $table);
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

//新增数据--模态框及功能
function  build_batchInfo_add_modal($table) {
    //模态框  $tr选中的的当前行
    let $modalFields = $(".newDataInfo").parents(".card").find(".addDataModal").find(".row");
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
                let modalObj = new BatchBasicInfo();
                modalObj.batch = $modalFields.eq(0).find("input").val();
                modalObj.text = $modalFields.eq(1).find("textarea").val();
                modalObj.levelCode = $modalFields.eq(2).find("input").val();
                modalObj.audioMin =  $modalFields.eq(3).find("input").val();
                modalObj.audioMax =  $modalFields.eq(4).find("input").val();
                modalObj.modelId =  $modalFields.eq(5).find("option:checked").val();
                modalObj.deviceCount =  $modalFields.eq(6).find("input").val();
              /*  console.log(modalObj)*/
                if (action === "omg") {
                    $.ajax({
                        type:'post',
                        url:API + "device/BatchBasicInfo",
                        dataType: "json",
                        contentType:"application/json",
                        data:JSON.stringify(modalObj),
                        success:function (result) {
                            if (result.code==="2001") {
                                alert('添加数据成功')
                                $(".addDataModal").modal('hide');
                                build_devBatch(DEFAULT_PAGE, $table);
                            }
                            if (result.code==="2002") {
                                alert('添加数据失败')
                            }
                        }
                    })
                } else if (action === "close") {

                }

            }
        });
    });

}

/*批量删除--弹框 数据获取*/
function batchDelData_batchInfo(ids, $table) {
    let currentPageNum = $table.parents(".card").find(".pageNav").find("li[class='active']").children("a").text();
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
                        url:API + "device/BatchBasicInfo/batch",
                        dataType: "json",//希望服务端返回的数据类型
                        contentType:"application/json",  //contentType代表发送端发送的实体数据的数据类型
                        data:JSON.stringify(ids),//返回json格式的id集合
                        success:function (result) {
                            if (result.code==="4001") {
                                alert('删除数据成功')
                                DEFAULT_PAGE.pageNum =
                                    build_devBatch(DEFAULT_PAGE, $table);
                            }
                            if (result.code==="4002") {
                                alert('删除数据失败')
                            }
                        }
                    })
                } else if (action === "close") {

                }
            }
        });
}
/*END批量删除--弹框 数据获取*/

/*每日推文-字数限制*/
/*
function textareaLimit() {
    $(".everydayTextarea").addEventListener("focus",function () {
        let textnumber =$(".everydayTextarea").text().length();
        console.log(textnumber)
        if (){

        } else{

        }
    })
}*/
