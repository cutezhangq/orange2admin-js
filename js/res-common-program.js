/*build_resProgram 发送ajax请求（请求table数据，分页数据--1.分页信息2.分页导航）*/
$(function () {
    let idArr = $("table").attr("id");
    let $table = $("#" + idArr);
    build_commonProgram(defaultPage, $table);
    allMenu($table);
    build_musicAudio(defaultPage, $table);//音频播放器部分
});

function build_commonProgram(page, $table) {
    $.ajax({
        type: "get",
        dataType: "json",
        url: API + "res/Programs",
        data: page,
        success: function (result) {/*result：返回的json对象*/
            if (result.code === "1001") { /*与控制台的code对应，1001表示*获取数据成功*/
                build_commonProgram_table(((result.data)["allProgramInfo"])["list"], $table);
                build_pageInfo((result.data)["allProgramInfo"], $table);/*分页信息*/
                build_pageNav((result.data)["allProgramInfo"], $table);/*分页导航*/
            }
            if (result.code === "1002") {
            }
        }
    })
}

/*将成功获取到的数据插入到页面（插入在html中）*/ /*在上面 build_resProgram中调用*/
function build_commonProgram_table(tableData, $table) {/*tableData是数组*/
    $table.children("tbody").empty();
    $.each(tableData, function (index, obj) {
        let commonProgramInfo = new CommonProgramInfo();
        $.extend(true, commonProgramInfo, obj);//true深度合并对象  多个对象的某个同名属性也都是对象，则该"属性对象"的属性也将进行合并。
        let choose = $("<td><label class='lyear-checkbox checkbox-primary'><input type='checkbox' class='checkItem'><span></span></label></td>");
        let programId = $("<td></td>").addClass("text-center").append(commonProgramInfo.programId);
        let programIcon = $("<img>").attr("src", commonProgramInfo.programIcon).attr('style', 'width:100px');//专辑封面(图片)
        let programimg = $("<td></td>").addClass("text-center").append(programIcon)
        let albumId = $("<td></td>").addClass("text-center").append(commonProgramInfo.albumId);
        let zhName = $("<td></td>").addClass("text-center").append(commonProgramInfo.zhName);
        let enName = $("<td></td>").addClass("text-center").append(commonProgramInfo.enName);
        let programName = $("<td></td>").addClass("text-center").append(commonProgramInfo.programName)
            .attr('style','word-break:break-all;width: 160px;');
        let programIndex = $("<td></td>").addClass("text-center").append(commonProgramInfo.index);
        let duration = $("<td></td>").addClass("text-center").append(commonProgramInfo.duration);
        //音频播放icon
        let resUrlicon = $("<a></a>").addClass("mdi mdi-music-circle").attr('href',commonProgramInfo.resUrl)
            .attr('target','blank').attr('style','font-size: 2.55em');
        let resUrl = $("<td></td>").addClass("text-center").append(resUrlicon);//资源链接

        let playTimes = $("<td></td>").addClass("text-center").append(commonProgramInfo.playTimes);
       /* let origin = $("<td></td>").addClass("text-center").append(commonProgramInfo.origin);*/
        let edit = $("<a></a>").addClass("editBtn btn btn-xs btn-default").append($("<li></li>").addClass("fa fa-pencil-square-o fa-lg"));
        let del = $("<a></a>").addClass("delBtn btn btn-xs btn-default").append($("<li></li>").addClass("fa fa-trash-o fa-lg"));
        let operation = $("<td></td>").addClass("text-center").append($("<div></div>").addClass("btn-group").append(edit).append(del));
        $("<tr></tr>").append(choose)
            .append(programId)//专辑封面
            .append(programimg)
            .append(albumId)
            .append(zhName)
            .append(enName)
            .append(programName)
            .append(programIndex)
            .append(duration)
            .append(resUrl)//音频播放
            .append(playTimes)
            /*.append(origin)*/
            .append(operation)
            .appendTo($table);
    });
}

function build_commonProgram_update_modal($tr) {

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

//音频播放器部分
function build_musicAudio(tableData, $table) {
    console.log(123)
    $(".mdi-rewind").on('click',function () {
        console.log(321)
    })
}

//动态改变音频播放器id
