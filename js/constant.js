/*存放用到的常量*//*全局变量*/

/*请求url前缀常量*/
const API = "http://localhost:8080/";
// const API = "http://106.12.20.45:8081/tcms/";
const DEV_BASIC="device/basicInfo/";
const DEV_CUSTOM="device/customInfo/";
const DEV_FAVORITE="device/favoriteInfo/";
/*设置初始页号，页长*/
const DEFAULT_PAGE = new Page(1, 5);
/*table-menu中批量删除*/
let checkedCount;
let checkedItem;
let defaultPage = new Page(1, 5);
/*table-menu中批量删除*/
let checkedId;
