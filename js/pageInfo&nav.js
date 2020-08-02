//分页（page）部分  /*pagenum当前页号码  pageSize：    size:每页显示的信息条数*/

/*分页导航（页面右下方的）*/
function build_pageNav(pageInfoData, $table) {
    /*深拷贝NavBar里面的属性*/
    let navBar = new NavBar();
    $.extend(true, navBar, pageInfoData);
    //根据入参divId动态构建分页导航盒子的jQuery对象
    let $pageNavDiv = $table.parents(".card").find(".pageNav");
    let $ulPageNav = $pageNavDiv.find("ul");
    $ulPageNav.empty();
    let $liFirstPage = $("<li></li>").append($("<a></a>").append("首").attr("href", "javascript:void(0)"));
    let $liPrePage = $("<li></li>").append($("<a></a>").append("&laquo;").attr("href", "javascript:void(0)"));
    if (navBar.hasPreviousPage === false) {
        $liFirstPage.addClass("disabled");
        $liPrePage.addClass("disabled");
    } else {
        /*首页 点击事件*/
        $liFirstPage.on('click', function () {
            let firstPage = new Page(1, navBar.pageSize);
            /*选择表名,构建表*/
            switch ($table.attr("id")) {
                case "tbl-devInfo":
                    build_devInfo(firstPage, $table);//将对象传给构建表格函数
                    break;
                case "tbl-devCustom":
                    build_devCustom(firstPage, $table);
                    break;
                case "tbl-batchInfo":
                    build_devBatch(firstPage, $table);
                    break;
                case "tbl-favAlbum":
                    let favAlbum = {
                        deviceId: favDeviceId,
                        category: "favorAlbum",
                        pageNum: firstPage.pageNum,
                        pageSize: firstPage.pageSize
                    };
                    build_favAlbum(favAlbum, $table);
                    break;
                case "tbl-favProgram":
                    let favProgram = {
                        deviceId: favDeviceId,
                        category: "favorProgram",
                        pageNum: firstPage.pageNum,
                        pageSize: firstPage.pageSize
                    };
                    build_favProgram(favProgram, $table);
                    break;
                case "tbl-favWord":
                    let favWord = {
                        deviceId: favDeviceId,
                        category: "favorWord",
                        pageNum: firstPage.pageNum,
                        pageSize: firstPage.pageSize
                    };
                    build_favWord(favWord, $table);

                case "tbl-commonAlbum":
                    build_commonAlbum(firstPage, $table);
                    break;
                case "tbl-commonProgram":
                    build_commonProgram(firstPage, $table);

                    break;
            }
        });
        /*前一页 点击事件*/
        $liPrePage.on('click', function () {
            let prePage = new Page(navBar.pageNum - 1, navBar.pageSize);/*navBar全局变量*/
            switch ($table.attr("id")) {
                case "tbl-devInfo":
                    build_devInfo(prePage, $table);//将对象传给构建表格函数
                    break;
                case "tbl-devCustom":
                    build_devCustom(prePage, $table);
                    break;
                case "tbl-batchInfo":
                    build_devBatch(prePage, $table);
                    break;
                case "tbl-favAlbum":
                    let favAlbum = {
                        deviceId: favDeviceId,
                        category: "favorAlbum",
                        pageNum: prePage.pageNum,
                        pageSize: prePage.pageSize
                    };
                    build_favAlbum(favAlbum, $table);
                    break;
                case "tbl-favProgram":
                    let favProgram = {
                        deviceId: favDeviceId,
                        category: "favorProgram",
                        pageNum: prePage.pageNum,
                        pageSize: prePage.pageSize
                    };
                    build_favProgram(favProgram, $table);
                    break;
                case "tbl-favWord":
                    let favWord = {
                        deviceId: favDeviceId,
                        category: "favorWord",
                        pageNum: prePage.pageNum,
                        pageSize: prePage.pageSize
                    };
                    build_favWord(favWord, $table);

                case "tbl-commonAlbum":
                    build_commonAlbum(prePage, $table);
                    break;
                case "tbl-commonProgram":
                    build_commonProgram(prePage, $table);

                    break;
            }
        });
    }

    let $liLastPage = $("<li></li>").append($("<a></a>").append("尾").attr("href", "javascript:void(0)"));
    let $liNextPage = $("<li></li>").append($("<a></a>").append("&raquo;").attr("href", "javascript:void(0)"));
    if (navBar.hasNextPage === false) {/*已经在最后一页时*/
        $liLastPage.addClass("disabled");/*设置 最后一页和下一页 不可选择*/
        $liNextPage.addClass("disabled");
    } else {
        /*分页--尾页 点击事件*/
        $liLastPage.on('click', function () {
            let lastPage = new Page(navBar.pages, navBar.pageSize);
            switch ($table.attr("id")) {
                case "tbl-devInfo":
                    build_devInfo(lastPage, $table);//将对象传给构建表格函数
                    break;
                case "tbl-devCustom":
                    build_devCustom(lastPage, $table);
                    break;
                case "tbl-batchInfo":
                    build_devBatch(lastPage, $table);
                    break;
                case "tbl-favAlbum":
                    let favAlbum = {
                        deviceId: favDeviceId,
                        category: "favorAlbum",
                        pageNum: lastPage.pageNum,
                        pageSize: lastPage.pageSize
                    };
                    build_favAlbum(favAlbum, $table);
                    break;
                case "tbl-favProgram":
                    let favProgram = {
                        deviceId: favDeviceId,
                        category: "favorProgram",
                        pageNum: lastPage.pageNum,
                        pageSize: lastPage.pageSize
                    };
                    build_favProgram(favProgram, $table);
                    break;
                case "tbl-favWord":
                    let favWord = {
                        deviceId: favDeviceId,
                        category: "favorWord",
                        pageNum: lastPage.pageNum,
                        pageSize: lastPage.pageSize
                    };
                    build_favWord(favWord, $table);
                case "tbl-commonAlbum":
                    build_commonAlbum(lastPage, $table);
                    break;
                case "tbl-commonProgram":
                    build_commonProgram(lastPage, $table);

                    break;
            }
        });
        /*后一页点击事件*/
        $liNextPage.on('click', function () {
            let nextPage = new Page(navBar.pageNum + 1, navBar.pageSize);
            switch ($table.attr("id")) {
                case "tbl-devInfo":
                    build_devInfo(nextPage, $table);//将对象传给构建表格函数
                    break;
                case "tbl-devCustom":
                    build_devCustom(nextPage, $table);
                    break;
                case "tbl-batchInfo":
                    build_devBatch(nextPage, $table);
                    break;
                case "tbl-favAlbum":
                    let favAlbum = {
                        deviceId: favDeviceId,
                        category: "favorAlbum",
                        pageNum: nextPage.pageNum,
                        pageSize: nextPage.pageSize
                    };
                    build_favAlbum(favAlbum, $table);
                    break;
                case "tbl-favProgram":
                    let favProgram = {
                        deviceId: favDeviceId,
                        category: "favorProgram",
                        pageNum: nextPage.pageNum,
                        pageSize: nextPage.pageSize
                    };
                    build_favProgram(favProgram, $table);
                    break;
                case "tbl-favWord":
                    let favWord = {
                        deviceId: favDeviceId,
                        category: "favorWord",
                        pageNum: nextPage.pageNum,
                        pageSize: nextPage.pageSize
                    };
                    build_favWord(favWord, $table);
                case "tbl-commonAlbum":
                    build_commonAlbum(nextPage, $table);
                    break;
                case "tbl-commonProgram":

                    break;
            }
        });
    }
    $ulPageNav.append($liFirstPage).append($liPrePage);
    /*循环遍历导航条页码*/
    $.each(navBar.navigatepageNums, function (number, value) {
        let $li = $("<li></li>").append($("<a></a>").append(value).attr("href", "javascript:void(0)"));
        if (navBar.pageNum === value) {
            $li.addClass("active");
        }
        /*给每个页码加点击事件*/
        $li.on('click', function () {
            let navPage = new Page(value, navBar.pageSize);
            switch ($table.attr("id")) {
                case "tbl-devInfo":
                    build_devInfo(navPage, $table);//将对象传给构建表格函数
                    break;
                case "tbl-devCustom":
                    build_devCustom(navPage, $table);
                    break;
                case "tbl-batchInfo":
                    build_devBatch(navPage, $table);
                    break;
                case "tbl-favAlbum":
                    let favAlbum = {
                        deviceId: favDeviceId,
                        category: "favorAlbum",
                        pageNum: navPage.pageNum,
                        pageSize: navPage.pageSize
                    };
                    build_favAlbum(favAlbum, $table);
                    break;
                case "tbl-favProgram":
                    let favProgram = {
                        deviceId: favDeviceId,
                        category: "favorProgram",
                        pageNum: navPage.pageNum,
                        pageSize: navPage.pageSize
                    };
                    build_favProgram(favProgram, $table);
                    break;
                case "tbl-favWord":
                    let favWord = {
                        deviceId: favDeviceId,
                        category: "favorWord",
                        pageNum: navPage.pageNum,
                        pageSize: navPage.pageSize
                    };
                    build_favWord(favWord, $table);
                case "tbl-commonAlbum":
                    build_commonAlbum(navPage, $table);
                    break;
                case "tbl-commonProgram":
                    build_commonProgram(navPage, $table);

                    break;
            }
        });
        $li.appendTo($ulPageNav);
    })
    $ulPageNav.append($liNextPage).append($liLastPage);
}

/*分页信息（页面左下方的）*/
function build_pageInfo(pageInfoData, $table) {
    //根据入参divId动态构建分页信息盒子的jQuery对象（$pageInfoDiv）
    let $pageInfoDiv = $table.parents(".card").find(".pageInfo");
    let navInfo = new NavInfo();
    $.extend(true, navInfo, pageInfoData);//true：此处也可以深拷贝对象
    let pageNum = navInfo.pageNum;
    let pages = navInfo.pages;
    let total = navInfo.total;
    $pageInfoDiv.empty().append("当前第 " + pageNum + " 页,总共 " + pages + " 页,总共 " + total + " 条记录");
}