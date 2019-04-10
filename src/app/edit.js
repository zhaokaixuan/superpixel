/** Editor page renderer.
 */
import { Layer } from '../image/layer'
import { Annotator } from '../helper/segment-annotator'
// Create the navigation menu.
var outdata = '';
var outparams = '';
var outsize = '';

// Write the brush tool
Annotator.prototype.brush = function (pos, label) {
  var offsets = [], labels = [];
  for (var y = -2; y <= 2; y++) {
    for (var x = -2; x <= 2; x++) {
      // it is circle bitches
      if ((x * x + y * y) > 7) continue;
      var offset = 4 * ((pos[1] + y) * this.layers.visualization.canvas.width + (pos[0] + x));
      offsets.push(offset);
      labels.push(label);
    }
  }
  this._updateAnnotation(offsets, labels);
  this.layers.visualization.render();
  if (typeof this.onchange === "function")
    this.onchange.call(this);
};
// Hightlight legend labels.
function highlightLabel(label) {
  var highlightClass = "edit-sidebar-button-highlight",
    elements = document.getElementsByClassName(highlightClass);
  for (var i = 0; i < elements.length; ++i)
    elements[i].classList.remove(highlightClass);
  var pickButton = document.getElementById("label-" + label + "-button");
  if (pickButton)
    pickButton.classList.add(highlightClass);
}


// Entry point.
function render(data, params, size) {
  outdata = data;
  outparams = params;
  outsize = size
  var child = document.getElementById("AllMight");
  if (child) {
    child.parentNode.removeChild(child);
  }

  if (!size) {
    size = 25
    outsize = size
  }
  var id = parseInt(params.id, 10);
  if (isNaN(id))
    throw ("Invalid id");
  var annotator = new Annotator(data.imageURLs[id], {
    width: params.width,
    height: params.height,
    colormap: data.colormap,
    superpixelOptions: { method: "slic", regionSize: size },
    onload: function () {
      if (data.annotationURLs)
        annotator.import(data.annotationURLs[id]);
      annotator.hide("boundary");
    },
    onchange: function () {
      var activeLabels = this.getUniqueLabels(),
        legendClass = "edit-sidebar-legend-label",
        legendActiveClass = "edit-sidebar-legend-label-active",
        elements = document.getElementsByClassName(legendClass),
        i;
      for (i = 0; i < elements.length; ++i)
        elements[i].classList.remove(legendActiveClass);
      for (i = 0; i < activeLabels.length; ++i)
        if (elements[activeLabels[i]]) {
          elements[activeLabels[i]].classList.add(legendActiveClass);
        }

    },
    onrightclick: function (label) {
      document.getElementById("label-" + label + "-button").click();
    },
    onmousemove: highlightLabel
  });













  //dom元素操作
  document.getElementById('SuperpixelContainer').appendChild(annotator.container);
  window.Template.getMarkResult = function () {
    return {
      baseImg: annotator.export()
    }
  }

  document.getElementsByClassName('superpixel_regionSize')[0].innerHTML = size;
  //显示块大小；
  function regionSizeShow() {
    document.getElementsByClassName('superpixel_regionSize')[0].innerHTML = annotator.segmentation.regionSize;
  }


  //工具栏添加点击效果
  var superpixel_item = document.getElementsByClassName('superpixel_item')
  function superpixelClick() {
    if (this.className.indexOf("superpixel_active") == -1) {
      for (let item of superpixel_item) {
        item.classList.remove('superpixel_active')
      }
      this.classList.add('superpixel_active')
    }
  }
  for (let item of superpixel_item) {
    item.addEventListener('click', superpixelClick);
  }
  //颜色栏添加点击效果
  var superpixel_color_item = document.getElementsByClassName('superpixel_color_item');
  function superpixelColorClick() {
    annotator.currentLabel = this.getAttribute('data-index');
    if (this.className.indexOf("superpixel_active") == -1) {
      for (let item of superpixel_color_item) {
        item.classList.remove('superpixel_active')
      }
      this.classList.add('superpixel_active')
    }
  }
  for (let val of superpixel_color_item) {
    val.addEventListener('click', superpixelColorClick)
    val.addEventListener("mouseenter", function () {
      let index = this.getAttribute('data-index') - 0;
      annotator.highlightLabel(index);
    })
    val.addEventListener('mouseleave', function () { annotator.unhighlightLabel(); })
  }

  //点击超像素按钮
  document.getElementById('SurperpixelButton').onclick = function () {
    annotator._setMode("superpixel");
  }
  //点击刷子按钮
  document.getElementById('BrushButton').onclick = function () {
    annotator._setMode("brush");
  }
  //显示隐藏边界
  document.getElementById('BoundaryButton').onclick = function () {
    let boundary_show_hide = this.classList.toggle("boundary_show_hide")
    if (boundary_show_hide) {
      annotator.hide("boundary");
    } else {
      annotator.show("boundary");
    }
  }
  //显示隐藏图片
  document.getElementById('ImageButton').onclick = function () {
    let boundary_show_hide = this.classList.toggle("image_show_hide")
    if (boundary_show_hide) {
      annotator.hide("image");
    } else {
      annotator.show("image");
    }
  }
  //减小边界
  document.getElementById('BoundaryDecreaseButton').onclick = function () {
    annotator.finer();
    let boundary_show_hide = this.className.indexOf('boundary_show_hide');
    if (boundary_show_hide != -1) {
      annotator.hide("boundary");
    } else {
      annotator.show("boundary");
    }
    regionSizeShow();
  }
  //增大边界
  document.getElementById('BoundaryIncreaseButton').onclick = function () {
    annotator.coarser();
    let boundary_show_hide = this.className.indexOf('boundary_show_hide')
    if (boundary_show_hide != -1) {
      annotator.hide("boundary");
    } else {
      annotator.show("boundary");
    }
    regionSizeShow()
  }
  //后退一步annotator.undo()
  document.getElementById('UndoButton').onclick = function () {
    annotator.undo()
  }
  //前进一步
  document.getElementById('RedoButton').onclick = function () {
    annotator.redo()
  }
  //缩小图片
  document.getElementById('ImageDecreaseButton').onclick = function () {
    annotator.zoomOut();
  }
  //放大图片 
  document.getElementById('ImageIncreaseButton').onclick = function () {
    annotator.zoomIn();
  }
  //图片透明度减小
  document.getElementById('ImageAlphaDecreaseButton').onclick = function () {
    annotator.moreAlpha();
  }
  //图片透明度增大
  document.getElementById('ImageAlphaIncreaseButton').onclick = function () {
    annotator.lessAlpha();
  }
}
export { render };
