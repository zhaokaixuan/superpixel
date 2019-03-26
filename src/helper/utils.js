/**
 *获取设备物理分辨率
 *根据需求需要：width-=200px;height-=140;
 * @returns
 */
function getScreen(){
    return {
        width: document.documentElement.clientWidth-200,
        height:document.documentElement.clientHeight-140
    }
}
export {getScreen};