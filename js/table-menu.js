/*table上的功能菜单（1.面板缩小、关闭2.全选/反选3.操作--修改，删除）*/

/*卡片刷新，缩小、关闭*/
/*
$(function () {
    $(".tbl-minus").on("click", function (e) {
        e.preventDefault();//防止链接打开
        $(this).closest(".panel").find(".panel-body").slideToggle();
    });
    $(".tbl-close").on("click", function (e) {
        e.preventDefault();
        $(this).closest(".panel").remove();
    });
});
*/
//加载表格菜单部分
function dataMenu($table) {
    checkAll($table);//全选
    dataOperate($table);//数据操作
}

function tableMenu($table) {
    showLineNumber($table); //显示行数
    filterFields($table); //筛选字段
    complexQueryData($table);//条件查询
    batchDelData($table);//批量删除
    addData($table);//新增数据
}

/*全选*/

//加载表格菜单部分
function allMenu($table) {
    checkAll($table);
    dataOperate($table);
    dataNumbers($table);
    filterFields($table);
    search($table);
    DelQuery($table);//批量删除
}

//全选
function checkAll($table) {
    $table.find(".checkAll").on("click", function () {
        $table.find(":checkbox[class=checkItem]").prop("checked", $(this).prop("checked"));
    });
    $table.undelegate();//首先要解绑，防止一个按钮被绑定多次事件
    $table.delegate(".checkItem", "click", function (event) {
        event.stopPropagation();//停止冒泡到父元素
    $table.delegate(".checkItem", "click", function (event) {
        event.stopPropagation();
        let flag = $table.find(".checkItem:checked").length === $table.find(".checkItem").length;
        $table.find(".checkAll").prop("checked", flag);
    });
}

/*数据操作*/
function dataOperate($table) {
    /*操作（table中的）--修改*/
    /*.delegate事件委托，类似.on*/
    $table.delegate(".editBtn", "click", function (event) {
        event.stopPropagation();//停止冒泡到父元素
        let $modal = $table.parents(".card").find(".updateDataModal");
        let $currentTr = $(this).parents("tr");
        switch ($table.attr("id")) {
            case "tbl-devInfo":
                build_devInfo_update_modal($currentTr,$table);
                break;
            case "tbl-devCustom":
                build_devCustom_update_modal($currentTr,$table);
                break;
            case "tbl-batchInfo":
                build_batchInfo_update_modal($currentTr,$table);
/*操作（修改，删除）*/
function dataOperate($table) {
    /*操作（table中的）--修改*/          /*.delegate事件委托，类似.on*/
    $table.delegate(".editBtn", "click", function (event) {
        event.stopPropagation();//停止冒泡到父元素
        let $modal = $table.parents(".card").find(".updateData");
        let $currentTr = $(this).parents("tr");
        switch ($table.attr("id")) {
            case "tbl-commonAlbum":
                build_commonAlbum($currentTr);
                break;
            case "tbl-commonProgram":
                build_commonProgram($currentTr);
                break;
        }
        $modal.modal('show');
    });
    /*操作（table中的）--删除*/
    $table.delegate(".delBtn", "click", function (event) {
        event.stopPropagation();//停止冒泡到父元素
        let $tr = $(this).parents("tr");//获取当前行
        let $tableField = $tr.children("td");
        let primaryId = $tableField.eq(1).text();//获取当前行的id
        switch ($table.attr("id")) {
            case "tbl-devInfo":
                delData_devInfo(primaryId, $table);
                break;
            case "tbl-devCustom":
                delData_devCustom(primaryId, $table);
                break;
            case "tbl-batchInfo":
                delData_batchInfo(primaryId, $table);
                break;
            case "tbl-favAlbum":
            case "tbl-favProgram":
            case "tbl-favWord":
                delData_favInfo(primaryId, $table);
                break;
        }
        alert("删除");    //弹出“删除”框
    });
}

/*显示行数*/
function showLineNumber($table) {
/*显示数目*/
function dataNumbers($table) {
    //获取已选择的option
    $table.parents(".card").find(".dataNumber").on("change", function () {   //当选中下拉框中的数据后，使用onchange事件
        //获取select选择的value，和当前页号这两个值
        let value = $table.parents(".card").find(".dataNumber option:selected").val();
        //创建page对象,pageNum和pageSize(selvalue获取的)两个属性放入刚获取的两个值
        let page = new Page(1, value);
        //判断是哪张表，对应的表的构建表函数里面传入page
        switch ($table.attr("id")) {
            case "tbl-devInfo":
                build_devInfo(page, $table);//将对象传给构建表格函数
                break;
            case "tbl-devCustom":
                build_devCustom(page, $table);
                break;
            case "tbl-batchInfo":
                build_devBatch(page, $table);
                break;
            case "tbl-favAlbum":
                let favAlbum = {
                    deviceId: favDeviceId,
                    category: "favorAlbum",
                    pageNum: page.pageNum,
                    pageSize: page.pageSize
                };
                build_favAlbum(favAlbum, $table);
                break;
            case "tbl-favProgram":
                let favProgram = {
                    deviceId: favDeviceId,
                    category: "favorProgram",
                    pageNum: page.pageNum,
                    pageSize: page.pageSize
                };
                build_favProgram(favProgram, $table);
                break;
            case "tbl-favWord":
                let favWord = {
                    deviceId: favDeviceId,
                    category: "favorWord",
                    pageNum: page.pageNum,
                    pageSize: page.pageSize
                };
                build_favWord(favWord, $table);
            case "tbl-commonAlbum":
                build_commonAlbum(page, $table);
                break;
            case "tbl-commonProgram":
                build_commonProgram(page, $table);
                break;
        }
    });
}

/*筛选字段*/
/*END 显示数目*/

/*筛选（下拉框动态获取后台传入的th值）*/
function filterFields($table) {
    // 先获取到所有的表字段节点
    let $th = $table.find("thead th");
    let $select = $table.parents(".card").find(".filterField").last();
    //清空下拉
    $select.empty();
    let $selectBtn = $table.parents(".card").find(".filterBtn");
    //构建下拉option，传入字段值
    for (let index=2;index<$th.length-1;index++){
    /*console.log($select[0]);*/
    let $selectBtn = $table.parents(".card").find(".filterBtn");
    //构建下拉option，传入字段值
    for (let index = 2; index < $th.length - 1; index++) {
        //将数组中的值创建到option中
        let value = $th.eq(index).text();
        $("<option></option>").attr("selected", "selected").append(value).appendTo($select);
    }
    //刷新selectpicker
    $select.selectpicker("refresh");
    $select.selectpicker("render");
    //给筛选按钮加点击事件
    $selectBtn.unbind().on("click", function () {
    $selectBtn.on("click", function () {
        // 先获取到所有的li
        let fields = $select.siblings().eq(1).find("li");
        let indexArr = [];
        //将所有的th,td全部正常显示
        $table.find("th").css("display", "");
        $table.find("td").css("display", "");
        // 遍历所有的li
        $.each(fields, function (index, obj) {
            //如果有哪个li的未被选中，将其下标放入数组
            if ($(obj).attr("class") !== "selected") {
                indexArr[indexArr.length] = index;
            }
        });
        //如果数组为空，说明全选中了
        if (indexArr.length === 0) {
            //直接退出此次回调函数
            return;
        } else {
            //否则，就需要隐藏表字段
            $.each(indexArr, function (index, value) {
                $table.find("th").eq(value + 2).css("display", "none");
                let trs = $table.children("tbody").children("tr");
                $.each(trs, function (index, obj) {
                   /* console.log(obj);*/
                    $(obj).find("td").eq(value + 2).css("display", "none");
                });
            });
        }
    });
}

/*新增数据*/
function addData($table) {
    let addBtn = $table.parents(".card").find(".newDataInfo");
    addBtn.on( "click", function () {
        let $modal = $table.parents(".card").find(".addDataModal");
        switch ($table.attr("id")) {
            case "tbl-devInfo":
                build_devInfo_add_modal($table);
                break;
            case "tbl-batchInfo":
                build_batchInfo_add_modal($table);
                break;
            case "tbl-favAlbum":
                build_favAlbum_add_modal($table);
                break;
            case "tbl-favProgram":
                build_favProgram_add_modal($table);
                break;
            case "tbl-favWord":
                build_favWord_add_modal($table);
                break;
        }
        $modal.modal('show');
    });
}


/*批量删除*/
function batchDelData($table) {
    //获取选择的选项
    let $batchDel = $table.parents(".card-body").siblings(".card-toolbar").find(".batchDel")//找到批量删除的按钮
    $batchDel.on("click", function () {//给批量删除按钮添加点击事件
        //td 获取到选择删除的数据
        checkedItem = $table.find(".checkItem:checked");
        let ids = [];
        $.each(checkedItem, function (index, value) {
            ids[ids.length] = $(value).parents("td").siblings().eq(0).text();
        });
        switch ($table.attr("id")) {
            case "tbl-devInfo":
                batchDelData_devInfo(ids, $table);
                break;
            case "tbl-devCustom":
                batchDelData_devCustom(ids, $table);
                break;
            case "tbl-batchInfo":
                batchDelData_batchInfo(ids, $table);
                break;
            case "tbl-favAlbum":
            case "tbl-favProgram":
            case "tbl-favWord":
                batchDelData_favInfo(ids, $table);
                break;
        }
    });
}


/*条件查询*/
function complexQueryData($table) {

}
/*END 筛选*/

/*搜索*/
function search($table) {
    // 先获取到所有的表字段节点
    let $th = $table.find("thead th");
    let $select = $table.parents(".card").find(".searchData").last();
    let $searchBtn = $table.parents(".card").find(".searchBtn");
    //构建下拉option，传入字段值
    for (let index = 1; index < $th.length - 1; index++) {
        //将数组中的值创建到option中
        let value = $th.eq(index).text();
        $("<option></option>").append(value).appendTo($select);
    }
    //刷新selectpicker
    $select.selectpicker("refresh");
    $select.selectpicker("render");
    //点击搜索
    $searchBtn.on("click", function () {
        //获取到下拉框中选择的值
        let inputValue = $select.siblings().eq(0).attr("title");
    });
}

/*END 搜索*/

/*批量删除--弹框 数据获取*/
function DelQuery($table) {
    //获取选择的选项
    $(".batchDel").on("click", function () {
        checkedItem = $table.find(".checkItem:checked");//td 获取到选择删除的数据
        /*console.log(checkedItem)*/
        checkedCount = checkedItem.length;
        /*console.log(checkedCount);*///获取到选择删除的数据个数
        //   console.log("checkedId="+delCheckedId);
        //思路：获取选择项，根据选择项找到相应id，点击批量删除后将该id传到后台，并将选择项的数目统计传到删除弹框中
        $.confirm({
            title: '批量删除',
            content: "确定要删除这" + checkedCount + "条数据吗？",
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
            }
        });
        checkedId = checkedItem.siblings()[1];
        console.log(checkedId)
    })

    $(".batchDel buttons omg text").on("click", function () {
        $.ajax({
            type: "get",
            dataType: "json",
            url: API + "device/BatchBasicInfo",
            data: checkedId,
            success: function (result) {
                if (result.code === "1001") {
                    console.log(ok)
                }
                if (result.code === "1002") {
                }
            }
        })
    })

}

/*END批量删除--弹框 数据获取*/
