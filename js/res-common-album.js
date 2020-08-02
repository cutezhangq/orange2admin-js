/*build_resAlbum 发送ajax请求（请求table数据，分页数据--1.分页信息2.分页导航）*/
$(function () {
    let idArr = $("table").attr("id");
    let $table = $("#" + idArr);
    build_commonAlbum(defaultPage, $table);
    allMenu($table);
});

function build_commonAlbum(page, $table) {
    $.ajax({
        type: "get",
        dataType: "json",
        url: API + "res/Albums",
        data: page,
        success: function (result) {/*result：返回的json对象*/
            if (result.code === "1001") { /*与控制台的code对应，1001表示*获取数据成功*/
                build_commonAlbum_table(((result.data)["allAlbumInfo"])["list"], $table);
                build_pageInfo((result.data)["allAlbumInfo"], $table);/*分页信息*/
                build_pageNav((result.data)["allAlbumInfo"], $table);/*分页导航*/
            }
            if (result.code === "1002") {
            }
        }
    })
}

/*将成功获取到的数据插入到页面（插入在html中）*/
function build_commonAlbum_table(tableData, $table) {/*tableData是数组*/
    $table.children("tbody").empty();
    $.each(tableData, function (index, obj) {
        let commonAlbumInfo = new CommonAlbumInfo();
        $.extend(true, commonAlbumInfo, obj);
        let choose = $("<td><label class='lyear-checkbox checkbox-primary'><input type='checkbox' class='checkItem'><span></span></label></td>");
        let albumIcon = $("<img>").attr("src", commonAlbumInfo.albumIcon).attr('style', 'width:100px');//专辑封面(图片)
        let albumimg = $("<td></td>").addClass("text-center").append(albumIcon);
        let albumId = $("<td></td>").addClass("text-center").append(commonAlbumInfo.albumId);
        let albumName = $("<td></td>").addClass("text-center").append(commonAlbumInfo.albumName)
            .attr('style','word-break:break-all;width: 220px;');
        let weChatName = $("<td></td>").addClass("text-center").append(commonAlbumInfo.weChatName);
        let programCount = $("<td></td>").addClass("text-center").append(commonAlbumInfo.programCount);
        let minAge = $("<i></i>").addClass("text-center").append(commonAlbumInfo.minAge);
        let maxAge = $("<i></i>").addClass("text-center").append(commonAlbumInfo.maxAge);
        let link = $("<i></i>").append("-");
        let ageRange = $("<td></td>").addClass("text-center").append(minAge).append(link).append(maxAge);
        let playTimes = $("<td></td>").addClass("text-center").append(commonAlbumInfo.playTimes);
        let edit = $("<a></a>").addClass("editBtn btn btn-xs btn-default").append($("<li></li>").addClass("fa fa-pencil-square-o fa-lg"));
        let del = $("<a></a>").addClass("delBtn btn btn-xs btn-default").append($("<li></li>").addClass("fa fa-trash-o fa-lg"));
        let operation = $("<td></td>").addClass("text-center").append($("<div></div>").addClass("btn-group").append(edit).append(del));
        $("<tr></tr>").append(choose)
            .append(albumId)
            .append(albumimg)//专辑封面
            .append(albumName)
            .append(weChatName)
            .append(programCount)
            .append(ageRange)
            .append(playTimes)
            .append(operation)
            .appendTo($table);
    });
}

function build_commonAlbum_update_modal($tr) {
    let $formFields = $tr.parents(".card").find(".updateData").find(".row");
    let $tableField = $tr.children("td");
    let deviceId = $tableField.eq(1).text();
    let deviceMac = $tableField.eq(2).text();
    let batch = $tableField.eq(3).text();
    let version = $tableField.eq(4).text();
    let bindCount = $tableField.eq(5).text();
    let authorizeTime = $tableField.eq(6).text();

    $formFields.eq(0).find("p").text(deviceId);
    $formFields.eq(1).find("p").text(deviceMac);

    $.ajax({
        type: "get",
        dataType: "json",
        url: API + "device/BatchBasicInfo",
        data: defaultPage,
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
}

