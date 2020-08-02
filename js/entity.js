/*用于导航刷新页面的 深拷贝 .extend()中复制的*/
    /*设备信息列表table*/
function DeviceBasicInfo(deviceId,deviceMac,batchId,version,bindCount,bindStatus,authorizeTime,minAgePlayStatus,maxAgePlayStatus,minAgePlayDays,maxAgePlayDays) {
    this.deviceId=deviceId;
    this.deviceMac=deviceMac;
    this.batchId=batchId;
    this.version=version;
    this.bindCount=bindCount;
    this.bindStatus=bindStatus;
    this.authorizeTime=authorizeTime;
    this.minAgePlayStatus=minAgePlayStatus;
    this.maxAgePlayStatus=maxAgePlayStatus;
    this.minAgePlayDays=minAgePlayDays;
    this.maxAgePlayDays=maxAgePlayDays;
}
    /*设备定置管理table*/
function DeviceCustomizedInfo(deviceId,devVoice,devSpeed,ttsVoice,ttsSpeed,ttsOrigin,playMethod,lessonId,minAge,maxAge,turnOnPlay,turnOnLevel) {
    this.deviceId=deviceId;
    this.devVoice=devVoice;//设备发音性别
    this.devSpeed=devSpeed;//设备发音速度
    this.ttsVoice=ttsVoice;//合成发音角色
    this.ttsSpeed=ttsSpeed;//合成发音速度
    this.ttsOrigin=ttsOrigin;//语音合成来源
    this.playMethod=playMethod;//播放方式
    this.lessonId=lessonId;
    this.minAge=minAge;
    this.maxAge=maxAge;
    this.turnOnPlay=turnOnPlay;//每日推送提醒
    this.turnOnLevel=turnOnLevel;//等级提醒
}
    /*设备收藏---3个table的*/
function DeviceFavouriteInfo(albumId,albumName,programId,programName,wordId,wordName) {
    this.albumId=albumId;
    this.albumName=albumName;
    this.programId=programId;
    this.programName=programName;
    this.wordId=wordId;
    this.wordName=wordName;
}
    /*批次信息管理table*/
function BatchBasicInfo(batch, text, levelCode, audioMin, audioMax, modelId, deviceCount) {
    this.batch = batch;
    this.text=text;//赋值
    this.levelCode=levelCode;
    this.audioMin=audioMin;
    this.audioMax=audioMax;
    this.modelId=modelId;
    this.deviceCount=deviceCount;
}


    /*页码页长*/ /*作用于每个table*/
function CommonAlbumInfo(albumIcon, albumId, albumName, weChatName, albumIntro, programCount, minAge, maxAge, playTimes) {
    this.albumIcon = albumIcon;
    this.albumId = albumId;
    this.albumName = albumName;
    this.weChatName = weChatName;
    this.albumIntro = albumIntro;
    this.programCount = programCount;
    this.minAge = minAge;
    this.maxAge = maxAge;
    this.playTimes = playTimes;
}

function CommonProgramInfo(programId, programIcon, albumId, zhName, enName, programName, index, duration, resUrl, playTimes, origin) {
    this.programId = programId;
    this.programIcon = programIcon;
    this.albumId = albumId;
    this.zhName = zhName;
    this.enName = enName;
    this.programName = programName;
    this.index = index;
    this.duration = duration;
    this.resUrl = resUrl;
    this.playTimes = playTimes;
    this.origin = origin;
}

/*页码页长*/ /*作用于每个table*/
function Page(pageNum, pageSize) {
    this.pageNum = 1;
    this.pageSize = 5;
    this.pageNum = pageNum;
    this.pageSize = pageSize;
}

/*分页信息（页面左下方的）*/
function NavInfo(pageNum, pages, total) {
    this.pageNum = pageNum;
    this.pages = pages;
    this.total = total;
}

/*分页导航（页面右下方的）*/
function NavBar(pageNum, pageSize, pages, hasPreviousPage, hasNextPage, navigatepageNums) {
    this.pageNum = pageNum;
    this.pageSize = pageSize;
    this.pages = pages;
    this.hasPreviousPage = hasPreviousPage;
    this.hasNextPage = hasNextPage;
    this.navigatepageNums = navigatepageNums;
}

/*分类管理res-classInfo-manage*/
function AllAlbumCategories(id,name,iconUrl) {
    this.id = id;
    this.name = name;
    this.iconUrl = iconUrl;
}
/* END用于导航页面的 深拷贝 .extend()中复制的*/