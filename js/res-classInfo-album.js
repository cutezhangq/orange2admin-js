$(".draglist").dragsort({//调用jqurey.dragsort组件
    dragSelector: "li",//要拖动的css选择器
    dragBetween: true,//如果你要启用多组列表之间拖动选定的列表, 设置为“true”。默认值是false。
    dragEnd: saveOrder, //拖拽完成后回调函数
    placeHolderTemplate: "<li class='placeHolder'><div></div></li>" //拖动是阴影  //拖动项目的占位符的html(出现虚线框)  //拖动列表的HTML部分,默认值是"<li></li>".
});

function saveOrder() {
    var $this = $(this); //获取选中焦点
    var data = $this.parent().children().map(function() {//map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
        return $this.attr("data-id");
    }).get();

    var currentid = $this.attr("data-id"); //组件id
    var oldgroupid = $this.attr("data-groupid"); //所属组id  “老组”
    var groupid = $this.parent().attr("data-groupid"); //目标组id “新组”

    //跨组移动、移除旧组信息
    if (oldgroupid != groupid) {
        var oldgroup = $("#" + oldgroupid);
        var groupval = oldgroup.val().replace(currentid, "");
        oldgroup.val(groupval);
    }

    $("#" + groupid).val(data.join(",")); //添加所属组记录
    $this.attr("data-groupid", groupid); //改变所属组id
};


/**
 * 保存位置
 */
function savePosition() {
    var inputs = $("input[name='sortorder']");
    var arr = new Array();
    //构造数据
    inputs.each(function() {
        var $this = $(this);
        arr.push($this.attr("id") + "-" + $this.val());
    });

    $.ajax({
        url: "${ctx}/test/position.json",
        type: "POST",
        data: { "tiles": arr },
        dataType: "json",
        success: function(data) {
            if (data.flag)
                alert("保存成功");
            else
                alert("保存失败");
        }
    });
}

/*鼠标滑过变暗begin*/
/*
$(document).ready(function(){
    $(".rsp").hide();
    $(".row ul li").hover(function(){
        $(this).find(".rsp").stop().fadeTo(500,0.5)
        $(this).find(".rsptext").stop().animate({left:'0'}, {duration: 500})
    },function(){
        $(this).find(".rsp").stop().fadeTo(500,0)
        $(this).find(".rsptext").stop().animate({left:'318'}, {duration: "fast"})
        $(this).find(".rsptext").animate({left:'-318'}, {duration: 0})
    });
});*/
