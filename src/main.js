/* Main page dispatcher.
*/
import {render as editPage}  from './app/edit'

   let params = {
      id:0
    }
    window.getData = {
      "mode": 2,      //1：标注；2：质检(可修改)； 3：返修  4：查看；5：验收 0：预留
      "formData": {     //表单业务数据定义，可进行扩展定义 ［标注平台的配置项］
        "groupLst": {
          "propertyId": 3,
          "propertyStatus": "3",//3标签，4list
          "propertyType": 2,    //代表标签选项
          "propertyName": "标签",
          "groupId": 0,
          "propertyValueLst": [
            {
              "propertyValue": "skin",
              "propertyLabel": "皮肤",
              "boxColor": [226, 196, 196],       //框颜色值
              "boxColorOpacity": "1",       //框不透明度值：0-1
              "fillColor": [202, 255, 112],     //填充色值
              "fillColorOpacity": "0.2",       //填充色不透明度值：0-1
            },
            {
              "propertyValue": "hair",
              "propertyLabel": "头发",
              "boxColor": [64, 32, 32],       //框颜色值
              "boxColorOpacity": "1",       //框不透明度值：0-1
              "fillColor": [202, 255, 112],     //填充色值
              "fillColorOpacity": "0.2",       //填充色不透明度值：0-1
            },
            {
              "propertyValue": "dress",
              "propertyLabel": "连衣裙",
              "boxColor": [255, 0, 0],       //框颜色值
              "boxColorOpacity": "1",       //框不透明度值：0-1
              "fillColor": [202, 255, 112],     //填充色值
              "fillColorOpacity": "0.2",       //填充色不透明度值：0-1
            },
            {
              "propertyValue": "glasses",
              "propertyLabel": "眼睛",
              "boxColor": [128, 255, 0],       //框颜色值
              "boxColorOpacity": "1",       //框不透明度值：0-1
              "fillColor": [202, 255, 112],     //填充色值
              "fillColorOpacity": "0.2",       //填充色不透明度值：0-1
            },
            {
              "propertyValue": "jacket",
              "propertyLabel": "上衣",
              "boxColor": [0, 255, 255],       //框颜色值
              "boxColorOpacity": "1",       //框不透明度值：0-1
              "fillColor": [202, 255, 112],     //填充色值
              "fillColorOpacity": "0.2",       //填充色不透明度值：0-1
            },
            {
              "propertyValue": "skirt",
              "propertyLabel": "外衣",
              "boxColor": [128, 0, 255],       //框颜色值
              "boxColorOpacity": "1",       //框不透明度值：0-1
              "fillColor": [202, 255, 112],     //填充色值
              "fillColorOpacity": "0.2",       //填充色不透明度值：0-1
            }
          ]
        },
        "propertyLst": [
    
        ],
        "foundationConfig": [
    
        ],
      }
    }

    var data = {
      "labels": ["background"],
      "labelsContent":["背景"],
      "imageURLs": [
        //"data/images/2.jpg"
      ],
      "annotationURLs": [
        //"data/annotations/1.png"
      ],
      colormap:[[255, 255, 255]]
    }


    function colorFun(index,color,content,value){
      var colorHtmlItem = `
      <div class="superpixel_color_item" data-index="${index}">
            <div class="superpixel_color_icon" style="background:rgb(${color.join(',')})"></div>
            <div class="superpixel_color_cont" data-value="${value}">${content}</div>
        </div>
      `
      return colorHtmlItem;
    }

    window.getData.formData.groupLst.propertyValueLst.forEach((item,index)=>{
      data.labels.push(item.propertyValue);
      data.labelsContent.push(item.propertyLabel)
      data.colormap.push(item.boxColor);
     
    })
    var colorHtml = ""
    for(let i=0,len =data.colormap.length;i<len;i++){
      colorHtml +=colorFun(i,data.colormap[i],data.labelsContent[i],data.labels[i]);
    }
    document.getElementById('SuperpixelColor').innerHTML = colorHtml;
    window.Template = {}
    window.Template.setTemplateData = function(obj,url,callback){
      obj.baseImg?data.annotationURLs.push(obj.baseImg):"";  
      data.imageURLs.push(url)
      editPage(data, params);
      callback&&callback();
    };
    window.Template.setTemplateData({baseImg:""},"data/images/4.png",function(){
      console.log('finish')
    })
   