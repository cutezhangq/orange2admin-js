let currentPageNum;
let favDeviceId;

$(function () {
    let url = window.location.href;
    let obj = parseURL(url);
    transferStation(obj);
});

function transferStation(obj) {
    /*{
        "deviceId": "gh_8f487a612fc9_cfd2ec3078d2bedc",
        "pageNum": "1",
        "pageSize": "5",
        "category": "all"
    }*/
    $("h2").text("设备ID: " + obj["deviceId"]);
    favDeviceId = obj["deviceId"];
    let category = obj["category"];
    let $favAlbum = $("#tbl-favAlbum");
    let $favProgram = $("#tbl-favProgram");
    let $favWord = $("#tbl-favWord");
    switch (category) {
        //1.选择“专辑”分类（Album）
        case "favorAlbum":
            $favProgram.parents(".row").css("display", "none");
            $favWord.parents(".row").css("display", "none");
            build_favAlbum(obj, $favAlbum);
            tableMenu($favAlbum);
            break;
        //2.选择“节目”分类（Program）
        case "favorProgram":
            $favAlbum.parents(".row").css("display", "none");
            $favWord.parents(".row").css("display", "none");
            build_favProgram(obj, $favProgram);
            tableMenu($favProgram);
            break;
        //3.选择“单词”分类（Word）
        case "favorWord":
            $favAlbum.parents(".row").css("display", "none");
            $favProgram.parents(".row").css("display", "none");
            build_favWord(obj, $favWord);
            tableMenu($favWord);
            break;
        default:
            build_favAlbum(obj, $favAlbum);
            tableMenu($favAlbum);
            build_favProgram(obj, $favProgram);
            tableMenu($favProgram);
            build_favWord(obj, $favWord);
            tableMenu($favWord);
            break;
    }
}

//url后缀参数解析
function parseURL(url) {
    let urlPara = url.split("?")[1];
    let para = urlPara.split("&");
    let len = para.length;
    let res = {};
    let arr = [];
    for (let i = 0; i < len; i++) {
        arr = para[i].split("=");
        res[arr[0]] = arr[1];
    }
    return res;
}

/*表1构建收藏专辑*/
function build_favAlbum(obj, $table) {
    $.ajax({
        type: "get",
        dataType: "json",
        url: API + "device/DevFavouriteInfo",
        data: obj,
        success: function (result) {
            $table.find(".checkAll").removeAttr("checked");
            build_favorAlbum_table((result.data)["allFavorAlbums"]["list"], $table);
            build_pageInfo((result.data)["allFavorAlbums"], $table);/*分页信息*/
            build_pageNav((result.data)["allFavorAlbums"], $table);/*分页导航*/
            $table.parents(".card").find(".filterBtn").trigger("click");
            dataMenu($table);
        }
    });
}

/*表2构建收藏节目*/
function build_favProgram(obj, $table) {
    $.ajax({
        type: "get",
        dataType: "json",
        url: API + "device/DevFavouriteInfo",
        data: obj,
        success: function (result) {
            $table.find(".checkAll").removeAttr("checked");
            build_favorProgram_table((result.data)["allFavorPrograms"]["list"], $table);
            build_pageInfo((result.data)["allFavorPrograms"], $table);/*分页信息*/
            build_pageNav((result.data)["allFavorPrograms"], $table);/*分页导航*/
            $table.parents(".card").find(".filterBtn").trigger("click");
            dataMenu($table);
        }
    });
}

/*表3构建收藏单词*/
function build_favWord(obj, $table) {
    $.ajax({
        type: "get",
        dataType: "json",
        url: API + "device/DevFavouriteInfo",
        data: obj,
        success: function (result) {
            $table.find(".checkAll").removeAttr("checked");
            build_favorWord_table((result.data)["allFavorWords"]["list"], $table);
            build_pageInfo((result.data)["allFavorWords"], $table);/*分页信息*/
            build_pageNav((result.data)["allFavorWords"], $table);/*分页导航*/
            $table.parents(".card").find(".filterBtn").trigger("click");
            dataMenu($table);
        }
    });
}

/*针对 dev-favorite-all 里面的3个子表的构建*/
/*子表1.Album表(专辑)的构建*/
function build_favorAlbum_table(tableData, $table) {
    $table.children("tbody").empty();//将子表1中tbody里面的内容先清空
    $.each(tableData, function (index, obj) {
        let deviceFavouriteInfo = new DeviceFavouriteInfo();
        $.extend(true, deviceFavouriteInfo, obj);//深拷贝DeviceFavouriteInfo里的属性
        let choose = $("<td><label class='lyear-checkbox checkbox-primary'><input type='checkbox' class='checkItem'><span></span></label></td>").attr('style','width: 0.5px;');
        let albumId = $("<td></td>").addClass("text-center").append(deviceFavouriteInfo.albumId);
        let albumName = $("<td></td>").addClass("text-center").append(deviceFavouriteInfo.albumName);
        /*let edit = $("<a></a>").addClass("editBtn btn btn-xs btn-default").append($("<li></li>").addClass("fa fa-pencil-square-o fa-lg"));*/
        let del = $("<a></a>").addClass("delBtn btn btn-xs btn-default").append($("<li></li>").addClass("fa fa-trash-o fa-lg"));
        let operation = $("<td></td>").addClass("text-center").append($("<div></div>").addClass("btn-group").append(del));
        $("<tr></tr>").append(choose)
            .append(albumId)
            .append(albumName)
            .append(operation)
            .appendTo($table);
    });
};
/*子表2.Program表(节目)的构建*/
function build_favorProgram_table(tableData, $table) {
    $table.children("tbody").empty();//将子表1中tbody里面的内容先清空
    $.each(tableData, function (index, obj) {
        let deviceFavouriteInfo = new DeviceFavouriteInfo();
        $.extend(true, deviceFavouriteInfo, obj);
        let choose = $("<td><label class='lyear-checkbox checkbox-primary'><input type='checkbox' class='checkItem'><span></span></label></td>").attr('style','width: 0.5px;');
        let programId = $("<td></td>").addClass("text-center").append(deviceFavouriteInfo.programId);
        let programName = $("<td></td>").addClass("text-center").append(deviceFavouriteInfo.programName);
        let albumId = $("<td></td>").addClass("text-center").append(deviceFavouriteInfo.albumId);
        let albumName = $("<td></td>").addClass("text-center").append(deviceFavouriteInfo.albumName);
        /*let edit = $("<a></a>").addClass("editBtn btn btn-xs btn-default").append($("<li></li>").addClass("fa fa-pencil-square-o fa-lg"));*/
        let del = $("<a></a>").addClass("delBtn btn btn-xs btn-default").append($("<li></li>").addClass("fa fa-trash-o fa-lg"));
        let operation = $("<td></td>").addClass("text-center").append($("<div></div>").addClass("btn-group").append(del));
        $("<tr></tr>").append(choose)
            .append(programId)
            .append(programName)
            .append(albumId)
            .append(albumName)
            .append(operation)
            .appendTo($table);
    })
}
/*子表3.Word表(单词)的构建*/
function build_favorWord_table(tableData, $table) {
    $table.children("tbody").empty();//将子表1中tbody里面的内容先清空
    $.each(tableData, function (index, obj) {
        let deviceFavouriteInfo = new DeviceFavouriteInfo();
        $.extend(true, deviceFavouriteInfo, obj);
        let choose = $("<td><label class='lyear-checkbox checkbox-primary'><input type='checkbox' class='checkItem'><span></span></label></td>").attr('style','width: 0.5px;');
        let wordId = $("<td></td>").addClass("text-center").append(deviceFavouriteInfo.wordId);
        let wordName = $("<td></td>").addClass("text-center").append(deviceFavouriteInfo.wordName);
        let albumId = $("<td></td>").addClass("text-center").append(deviceFavouriteInfo.albumId);
        let albumName = $("<td></td>").addClass("text-center").append(deviceFavouriteInfo.albumName);
        /* let edit = $("<a></a>").addClass("editBtn btn btn-xs btn-default").append($("<li></li>").addClass("fa fa-pencil-square-o fa-lg"));*/
        let del = $("<a></a>").addClass("delBtn btn btn-xs btn-default").append($("<li></li>").addClass("fa fa-trash-o fa-lg"));
        let operation = $("<td></td>").addClass("text-center").append($("<div></div>").addClass("btn-group").append(del));
        $("<tr></tr>").append(choose)
            .append(wordId)
            .append(wordName)
            .append(albumId)
            .append(albumName)
            .append(operation)
            .appendTo($table);
    })
}

//单条删除
function delData_favInfo(id, $table) {
    currentPageNum = $table.parents(".card").find(".pageNav").find("li[class='active']").children("a").text();
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
            let obj = {
                deviceId: favDeviceId,
                pageNum: currentPageNum,
                pageSize: DEFAULT_PAGE.pageSize
            };
            if (action === "omg") {
                $.ajax({
                    type: 'DELETE',
                    url: API + "device/DevFavouriteInfo",
                    dataType: "json",//希望服务端返回的数据类型
                    // 返回前行的id给后台
                    // 用字面量的形式发送对象{属性，值}  发送给后台的数据要对应他的属性名
                    data: {"deviceId": favDeviceId, "id": id},
                    success: function (result) {
                        if (result.code === "4001") {
                            alert('删除数据成功');
                            switch ($table.attr("id")) {
                                case "tbl-favAlbum":
                                    obj.category = "favorAlbum";
                                    build_favAlbum(obj, $table);
                                    break;
                                case "tbl-favProgram":
                                    obj.category = "favorProgram";
                                    build_favProgram(obj, $table);
                                    break;
                                case "tbl-favWord":
                                    obj.category = "favorWord";
                                    build_favWord(obj, $table);
                                    break;
                            }
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

/*批量删除*/
function batchDelData_favInfo(ids, $table) {
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
            let obj = {
                deviceId: favDeviceId,
                pageNum: DEFAULT_PAGE.pageNum,
                pageSize: DEFAULT_PAGE.pageSize
            };
            if (action === "omg") {
                $.ajax({
                    type:'DELETE',
                    url:API + "device/DevFavouriteInfo/batch",
                    dataType: "json",//希望服务端返回的数据类型
                    contentType:"application/json",  //contentType代表发送端发送的实体数据的数据类型
                    data: JSON.stringify({"deviceId": favDeviceId, "ids": ids}),//返回json格式的id集合
                    success:function (result) {
                        if (result.code==="4001") {
                            alert('删除数据成功')
                            switch ($table.attr("id")) {
                                case "tbl-favAlbum":
                                    obj.category = "favorAlbum";
                                    build_favAlbum(obj, $table);
                                    break;
                                case "tbl-favProgram":
                                    obj.category = "favorProgram";
                                    build_favProgram(obj, $table);
                                    break;
                                case "tbl-favWord":
                                    obj.category = "favorWord";
                                    build_favWord(obj, $table);
                                    break;
                            }
                        }
                        if (result.code==="4002") {
                            alert('删除数据失败')
                        }
                    }
                })
            }
        }
    });
}


function build_favAlbum_update_modal($currentTr, $table) {
}

function build_favProgram_update_modal($currentTr, $table) {

}

function build_favWord_update_modal($currentTr, $table) {

}

//3个新增数据的模态框
function build_favAlbum_add_modal($tr) {
    let $formFields = $(".newDataInfo").parents(".card").find(".newDataModal").find(".row");
    //确认框-弹框
    $('.commitBtn').unbind().on('click', function () {
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
            onAction: function (action) {//回调函数
                let modalObj = new DeviceFavouriteInfo();
                modalObj.albumId = $modalFields.eq(0).find("input").val();
                modalObj.programId = $modalFields.eq(0).find("input").val();
                modalObj.wordId = $modalFields.eq(0).find("input").val();
                /*  console.log(modalObj)*/
                if (action == "omg") {
                    $.ajax({
                        type: 'post',
                        url: API + "device/DevFavouriteInfo",
                        dataType: "json",
                        contentType: "application/json",
                        data: {"deviceEnshrine": modalObj},
                        success: function (result) {
                            if (result.code === "2001") {
                                alert('添加数据成功')
                                $(".newDataModal").modal('hide');

                                switch ($table.attr("id")) {
                                    case "tbl-favAlbum":
                                        build_favAlbum(DEFAULT_PAGE, $table);
                                        break;
                                    case "tbl-favProgram":
                                        build_favProgram(DEFAULT_PAGE, $table);
                                        break;
                                    case "tbl-favWord":
                                        build_favWord(DEFAULT_PAGE, $table);
                                        break;
                                }
                            }
                            if (result.code === "2002") {
                                alert('添加数据失败')
                            }
                        }
                    })
                } else if (action == "close") {

                }
            }
        });
    });

}

function build_favProgram_add_modal($tr) {

}

function build_favWord_add_modal($tr) {

}