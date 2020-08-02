$(function () {
    build_classInfo_manage();
});

function build_classInfo_manage(){
    $.ajax({
        url:"../../orange2admin-web/albumCategories.json",
        type: "GET",
        dataType: "json",
        success:function (result) {
            console.log(result);
            if (result.code ==="1001"){
                build_classmanage_classId((result.data)["allAlbumCategories"]);
            }
            if (result.code ==="1002"){
            }
        }
    })
}

/*将成功获取到的数据插入到页面*/
function build_classmanage_classId(ClassData) {
    $(".table-responsive").empty();
    $.each(ClassData,function (index, obj) {    //深拷贝---递归调用"浅拷贝”
        let allAlbumCategories = new AllAlbumCategories();
        $.extend(true,allAlbumCategories,obj);                          //$.extend( [deep ], target, object1 [, objectN ] )
        /*从后台接收的数据*/
        let className = $("<h3 class='category_name'></h3>").append(allAlbumCategories.name);
        let iconurl = allAlbumCategories.iconUrl;
        let classImg = $("<img alt='' src='' />").attr("src",iconurl);
        let numAlbum = $("<p></p>").text("该分类包含的专辑XXX");
        /*分类card 内框渲染(head和body)*/
        $("<div class='col-lg-2 innercard' id='innercard'></div>").appendTo($(".table-responsive"));
        let innercard = $('#innercard').attr("id",'innercard'+index);    /*加上索引避免重复*/
        let innercard_header = $("<div class='innercard-header'></div>");
        let innercard_body =  $("<div class='innercard-body'></div>");
        innercard.append(innercard_header).append(innercard_body);
        innercard_header.append($("<div class='row innerrow'></div>"));/*head部分*/
        innercard_body.append($("<div class='fadeInUp' data-wow-delay='0.2s' style='visibility: visible; animation-delay: 0.2s; animation-name: fadeInUp;'></div>"));/*logo+滑块*/
        /*innercard里面head部分*/
        function buildcardhead(){
            /*通过$innercard来区分每个生成的分类*/
            let incardIdArr = innercard.attr("id");
            let $cardId = $("#"+incardIdArr);  //$innercardId 区分的Id
            let innerrow = $cardId.find($(".innercard-header .innerrow"));
            innerrow.append(className);
        };
        buildcardhead();
        /*innercard里面body部分*/
        function buildcardbody(){
            /*body部分*/              //分类logo+滑块 及 专辑数量
            /*icon分类logo*/
            let incardIdArr = innercard.attr("id");
            let $cardId = $("#"+incardIdArr);
            let fadeInUp = $cardId.find($(".fadeInUp"));
            fadeInUp.append($("<div class='shop-products sp-thumb'></div>"));
            let sp_thumb = $cardId.find($(".sp-thumb"));
            sp_thumb.append(classImg); //分类logo图片
            sp_thumb.append($("<div class='product-action'></div>"));
            /* 滑块 滑出的按钮*/
            let product_action = $cardId.find($(".product-action"));
            let classbottombtn = $("<div class='cart-button'></div>").append($("<a href='#' class='btn-button enterAlbum'>查看相关专辑</a>"));
            let classleftbtn = $("<div class='button-left'></div>").append($("<ul class='ulbut'></ul>"));
            product_action.append(classleftbtn);
            product_action.append(classbottombtn);
            let ulbut = $cardId.find($(".ulbut"));
            let leftButton1 = $("<li></li>").append($("<a href='#' class='pink-bg'><i class='fa fa-pencil-square-o fa-lg'></i></a>"));
            let leftButton2 = $("<li></li>").append($("<a href='#' class='blue-bg'>2</a>"));
            let leftButton3 = $("<li></li>").append($("<a href='#' class='green-bg'><i class='fa fa-pencil-square-o fa-lg'></i></a>"));
            ulbut.append(leftButton1).append(leftButton2).append(leftButton3);
            /*专辑数量*/
            innercard_body.append(numAlbum);
        }
        buildcardbody();
    })



}


        
        

