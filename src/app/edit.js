/** Editor page renderer.
 */
import { Layer } from '../image/layer'
import { Annotator } from '../helper/segment-annotator'
// Create the navigation menu.
var outdata = '';
var outparams = '';
var outsize = '';
// Create the main content block.
function createMainDisplay(params, data, annotator, imageLayer) {
  var container = document.createElement("div"),
    annotatorTopMenu = createImageTopMenu(params, data, annotator),
    annotatorContainer = document.createElement("div"),
    sidebarSpacer = document.createElement("div"),
    sidebarContainer = document.createElement("div"),
    sidebar = createSidebar(params, data, annotator),

    changesizebutton = document.createElement("button"),
    changesizeinput = document.createElement("input"),
    changesizep = document.createElement("p");
  annotatorContainer.className = "edit-image-display";
  annotatorContainer.appendChild(annotatorTopMenu);
  annotatorContainer.appendChild(annotator.container);
  sidebarSpacer.className = "edit-image-top-menu";
  sidebarContainer.className = "edit-image-display";
  sidebarContainer.appendChild(sidebar);
  container.className = "edit-main-container";
  container.id = "AllMight";
  container.appendChild(annotatorContainer);
  container.appendChild(sidebarContainer);

  changesizeinput.className = "edit-size-input";
  changesizebutton.className = "edit-size-button";
  changesizeinput.placeholder = '更改块大小'
  changesizebutton.innerText = '更改'
  changesizep.innerText = '目前块大小' + outsize

  container.appendChild(changesizeinput);
  container.appendChild(changesizebutton);
  container.appendChild(changesizep);
  changesizebutton.addEventListener("click", function () {
    //alert(changesizeinput.value)
    var options = {
      method: "slic",
      regionSize: changesizeinput.value - 0
    }
    annotator.resetSuperpixels(options)
    //render(outdata, outparams, changesizeinput.value - 0)
  });
  console.log(container)
  return container;
}

// Create the menu above the editor.
function createImageTopMenu(params, data, annotator) {
  var container = document.createElement("div"),
    zoomOutButton = document.createElement("div"),
    zoomInButton = document.createElement("div"),
    spacer1 = document.createElement("span"),
    finerButton = document.createElement("div"),
    boundaryButton = document.createElement("div"),
    coarserButton = document.createElement("div"),
    spacer2 = document.createElement("span"),
    alphaMinusButton = document.createElement("div"),
    imageButton = document.createElement("div"),
    alphaPlusButton = document.createElement("div");
  zoomOutButton.appendChild(document.createTextNode("-"));
  zoomOutButton.classList.add("edit-image-top-button");
  zoomOutButton.addEventListener("click", function () {
    annotator.zoomOut();
  });
  zoomInButton.appendChild(document.createTextNode("zoom +"));
  zoomInButton.classList.add("edit-image-top-button");
  zoomInButton.addEventListener("click", function () {
    annotator.zoomIn();
  });
  spacer1.className = "edit-image-top-spacer";
  boundaryButton.id = "boundary-button";
  boundaryButton.className = "edit-image-top-button";
  boundaryButton.appendChild(document.createTextNode("boundary"));
  boundaryButton.addEventListener("click", function () {
    if (boundaryFlashTimeoutID)
      window.clearTimeout(boundaryFlashTimeoutID);
    if (boundaryButton.classList.contains("edit-image-top-button-enabled"))
      annotator.hide("boundary");
    else
      annotator.show("boundary");
    boundaryButton.classList.toggle("edit-image-top-button-enabled");
  });
  finerButton.appendChild(document.createTextNode("-"));
  finerButton.className = "edit-image-top-button";
  finerButton.addEventListener("click", function () {
    annotator.finer();
    boundaryFlash();
  });
  coarserButton.appendChild(document.createTextNode("+"));
  coarserButton.className = "edit-image-top-button";
  coarserButton.addEventListener("click", function () {
    annotator.coarser();
    boundaryFlash();
  });
  spacer2.className = "edit-image-top-spacer";
  alphaMinusButton.className = "edit-image-top-button";
  alphaMinusButton.appendChild(document.createTextNode("-"));
  alphaMinusButton.addEventListener("click", function () {
    annotator.moreAlpha();
  });
  imageButton.className = "edit-image-top-button " +
    "edit-image-top-button-enabled";
  imageButton.appendChild(document.createTextNode("image"));
  imageButton.addEventListener("click", function () {
    if (imageButton.classList.contains("edit-image-top-button-enabled"))
      annotator.hide("image");
    else
      annotator.show("image");
    imageButton.classList.toggle("edit-image-top-button-enabled");
  });
  alphaPlusButton.className = "edit-image-top-button";
  alphaPlusButton.appendChild(document.createTextNode("+"));
  alphaPlusButton.addEventListener("click", function () {
    annotator.lessAlpha();
  });
  //
  container.className = "edit-image-top-menu";
  container.appendChild(zoomOutButton);
  container.appendChild(zoomInButton);
  container.appendChild(spacer1);
  container.appendChild(finerButton);
  container.appendChild(boundaryButton);
  container.appendChild(coarserButton);
  container.appendChild(spacer2);
  container.appendChild(alphaMinusButton);
  container.appendChild(imageButton);
  container.appendChild(alphaPlusButton);
  return container;
}

// Set up the automatic flash of boundary.
var boundaryFlashTimeoutID = null;
function boundaryFlash() {
  var boundaryButton = document.getElementById("boundary-button");
  //console.log('boundaryFlashTimeoutID', boundaryFlashTimeoutID);
  if (boundaryFlashTimeoutID) {
    window.clearTimeout(boundaryFlashTimeoutID);
    boundaryFlashTimeoutID = window.setTimeout(function () {
      boundaryButton.click();
      boundaryFlashTimeoutID = null;
    }, 1000);
  }
  else if (!boundaryButton.classList.contains(
    "edit-image-top-button-enabled")) {
    boundaryButton.click();
    boundaryFlashTimeoutID = window.setTimeout(function () {
      boundaryButton.click();
      boundaryFlashTimeoutID = null;
    }, 1000);
  }
}

// Create the sidebar.
function createSidebar(params, data, annotator) {
  var container = document.createElement("div"),
    labelPicker = createLabelPicker(params, data, annotator),
    spacer1 = document.createElement("div"),
    undoButton = document.createElement("div"),
    redoButton = document.createElement("div"),
    spacer2 = document.createElement("div"),
    denoiseButton = document.createElement("div"),
    spacer3 = document.createElement("div"),
    superpixelToolButton = document.createElement("div"),
    spacer4 = document.createElement("div"),
    //polygonToolButton = document.createElement("div"),
    spacer5 = document.createElement("div"),
    brushToolButton = document.createElement("div"),
    spacer6 = document.createElement("div"),
    manualParagraph = document.createElement("p"),
    spacer7 = document.createElement("div"),
    exportButton = document.createElement("input"),
    manualText;
  exportButton.type = "submit";
  exportButton.value = "export";
  exportButton.className = "edit-sidebar-submit";
  exportButton.addEventListener("click", function () {
    var filename = (data.annotationURLs) ?
      data.annotationURLs[params.id].split(/[\\/]/).pop() :
      params.id + ".png";
    //downloadURI(annotator.export(), filename);
  });
  spacer1.className = "edit-sidebar-spacer";
  undoButton.className = "edit-sidebar-button";
  //undoButton.appendChild(document.createTextNode("undo"));
  undoButton.appendChild(document.createTextNode("后退一步"));
  undoButton.addEventListener("click", function () { annotator.undo(); });
  redoButton.className = "edit-sidebar-button";
  //redoButton.appendChild(document.createTextNode("redo"));
  redoButton.appendChild(document.createTextNode("前进一步"));
  redoButton.addEventListener("click", function () { annotator.redo(); });
  spacer2.className = "edit-sidebar-spacer";
  denoiseButton.className = "edit-sidebar-button";
  //denoiseButton.appendChild(document.createTextNode("denoise"));
  denoiseButton.appendChild(document.createTextNode("降噪"));
  denoiseButton.addEventListener("click", function () {
    annotator.denoise();
  });
  superpixelToolButton.className = "edit-sidebar-button";
  superpixelToolButton.appendChild(
    //document.createTextNode("Superpixel tool"));
    document.createTextNode("超像素工具"));
  superpixelToolButton.addEventListener("click", function () {
    //polygonToolButton.classList.remove("edit-sidebar-button-selected");
    brushToolButton.classList.remove("edit-sidebar-button-selected");
    superpixelToolButton.classList.add("edit-sidebar-button-selected");
    annotator._setMode("superpixel");
  });
  superpixelToolButton.classList.add("edit-sidebar-button-selected");
  // polygonToolButton.className = "edit-sidebar-button";
  // polygonToolButton.appendChild(document.createTextNode("Polygon tool"));
  // polygonToolButton.addEventListener("click", function () {
  //   superpixelToolButton.classList.remove("edit-sidebar-button-selected");
  //   brushToolButton.classList.remove("edit-sidebar-button-selected");
  //   polygonToolButton.classList.add("edit-sidebar-button-selected");
  //   annotator._setMode("polygon");
  // });

  brushToolButton.classList.add("edit-sidebar-button-selected");
  brushToolButton.className = "edit-sidebar-button";
  //brushToolButton.appendChild(document.createTextNode("Brush tool"));
  brushToolButton.appendChild(document.createTextNode("刷子"));
  brushToolButton.addEventListener("click", function () {
    superpixelToolButton.classList.remove("edit-sidebar-button-selected");
    //polygonToolButton.classList.remove("edit-sidebar-button-selected");
    brushToolButton.classList.add("edit-sidebar-button-selected");

    annotator._setMode("brush");
  });


  spacer3.className = "edit-sidebar-spacer";
  manualParagraph.appendChild(document.createTextNode("ctrl: toggle mode"));
  manualParagraph.appendChild(document.createElement("br"));
  manualParagraph.appendChild(document.createElement("br"));
  manualParagraph.appendChild(document.createTextNode("+Superpixel tool:"));
  manualParagraph.appendChild(document.createElement("br"));
  manualParagraph.appendChild(document.createTextNode("left: mark"));
  manualParagraph.appendChild(document.createElement("br"));
  manualParagraph.appendChild(document.createTextNode("right: pick label"));
  manualParagraph.appendChild(document.createElement("br"));
  manualParagraph.appendChild(document.createElement("br"));
  manualParagraph.appendChild(document.createTextNode("+Polygon tool:"));
  manualParagraph.appendChild(document.createElement("br"));
  manualParagraph.appendChild(document.createTextNode("left: draw line"));
  manualParagraph.appendChild(document.createElement("br"));
  manualParagraph.appendChild(document.createTextNode("right: abort"));
  spacer4.className = "edit-sidebar-spacer";
  container.className = "edit-sidebar";
  container.appendChild(labelPicker);
  container.appendChild(spacer1);
  container.appendChild(undoButton);
  container.appendChild(redoButton);
  container.appendChild(spacer2);
  container.appendChild(denoiseButton);
  container.appendChild(spacer3);
  //container.appendChild(polygonToolButton);
  container.appendChild(superpixelToolButton);
  container.appendChild(brushToolButton);
  //container.appendChild(manualParagraph);
  //container.appendChild(spacer4);
  container.appendChild(exportButton);
  return container;
}

function createLabelButton(data, value, index, annotator) {
  var colorBox = document.createElement("span"),
    labelText = document.createElement("span"),
    pickButton = document.createElement("div"),
    popupButton = document.createElement("div"),
    popupContainer = document.createElement("div");
  colorBox.className = "edit-sidebar-legend-colorbox";
  colorBox.style.backgroundColor =
    "rgb(" + data.colormap[index].join(",") + ")";
  labelText.appendChild(document.createTextNode(value));
  labelText.className = "edit-sidebar-legend-label";
  popupButton.appendChild(document.createTextNode("+"));
  popupButton.className = "edit-sidebar-popup-trigger";
  popupButton.addEventListener("click", function () {
    popupContainer.classList.toggle("edit-sidebar-popup-active");
  });
  popupContainer.className = "edit-sidebar-popup";
  popupContainer.appendChild(
    createRelabelSelector(data, index, annotator, popupContainer)
  );
  popupContainer.addEventListener("click", function (event) {
    event.preventDefault();
  });
  pickButton.appendChild(colorBox);
  pickButton.appendChild(labelText);
  pickButton.appendChild(popupButton);
  pickButton.appendChild(popupContainer);
  pickButton.id = "label-" + index + "-button";
  pickButton.className = "edit-sidebar-button";
  pickButton.addEventListener("click", function () {
    var className = "edit-sidebar-button-selected";
    annotator.currentLabel = index;
    var selectedElements = document.getElementsByClassName(className);
    for (var i = 0; i < selectedElements.length; ++i)
      selectedElements[i].classList.remove(className);
    pickButton.classList.add(className);
  });
  //console.log('index', index);
  pickButton.addEventListener('mouseenter', function () {

    if (!document.getElementsByClassName("edit-sidebar-popup-active").length)

      annotator.highlightLabel(index);
  });
  pickButton.addEventListener('mouseleave', function () {
    if (!document.getElementsByClassName("edit-sidebar-popup-active").length)
      annotator.unhighlightLabel();
  });
  return pickButton;
}

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

  // let elements = document.getElementsByClassName('superpixel_color_item');
  // for(let i=0;i<elements.length;i++){
  //   elements[i].classList.remove("hover_light")
  //   if(elements[i].getAttribute("data-index")-0 == label){
  //       elements[i].classList.add('hover_light')
  //   }
  // }



  var highlightClass = "edit-sidebar-button-highlight",
    elements = document.getElementsByClassName(highlightClass);
  for (var i = 0; i < elements.length; ++i)
    elements[i].classList.remove(highlightClass);
  var pickButton = document.getElementById("label-" + label + "-button");
  if (pickButton)
    pickButton.classList.add(highlightClass);


}

// Create the label picker button.
function createLabelPicker(params, data, annotator) {
  var container = document.createElement("div");
  container.className = "edit-sidebar-label-picker";
  for (var i = 0; i < data.labelsContent.length; ++i) {
    var labelButton = createLabelButton(data, data.labelsContent[i], i, annotator);
    if (i === 0) {
      annotator.currentLabel = 0;
      labelButton.classList.add("edit-sidebar-button-selected");
    }
    container.appendChild(labelButton);
  }
  window.addEventListener("click", cancelPopup, true);
  return container;
}

// Cancel popup.
function cancelPopup(event) {
  var isOutsidePopup = true,
    target = event.target;
  while (target.parentNode) {
    isOutsidePopup = isOutsidePopup &&
      !target.classList.contains("edit-sidebar-popup");
    target = target.parentNode;
  }
  if (isOutsidePopup) {
    var popups = document.getElementsByClassName(
      "edit-sidebar-popup-active");
    if (popups.length)
      for (var i = 0; i < popups.length; ++i)
        popups[i].classList.remove("edit-sidebar-popup-active");
  }
}

// Create the relabel selector.
function createRelabelSelector(data, index, annotator, popupContainer) {
  var select = document.createElement("select"),
    firstOption = document.createElement("option");
  firstOption.appendChild(document.createTextNode("Change to"));
  select.appendChild(firstOption);
  for (var i = 0; i < data.labelsContent.length; ++i) {
    if (i !== index) {
      var option = document.createElement("option");
      option.value = i;
      option.appendChild(document.createTextNode(data.labelsContent[i]));
      select.appendChild(option);
    }
  }
  select.addEventListener("change", function (event) {
    var sourceLabel = index;
    var targetLabel = parseInt(event.target.value, 10);
    if (sourceLabel !== targetLabel) {
      var currentLabel = annotator.currentLabel;
      annotator.currentLabel = targetLabel;
      annotator.fill(sourceLabel);
      annotator.currentLabel = currentLabel;
    }
    popupContainer.classList.remove("edit-sidebar-popup-active");
    firstOption.selected = true;
    event.preventDefault();
  });
  return select;
}

// Download trick.
function downloadURI(uri, filename) {
  var anchor = document.createElement("a");
  //anchor.style.display = "none";
  anchor.target = "_blank"; // Safari doesn't work.
  anchor.download = filename;
  anchor.href = uri;
  // document.getElementById('SuperpixelContainer').appendChild(anchor);
  anchor.click();
  // document.getElementById('SuperpixelContainer').removeChild(anchor);
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
  }),
    imageLayer = new Layer(data.imageURLs[id], {
      width: params.width,
      height: params.height
    });
  document.getElementById('SuperpixelContainer').appendChild(createMainDisplay(params,
    data,
    annotator,
    imageLayer));


  console.log(annotator)
  window.Template.getMarkResult = function () {
    return {
      baseImg: annotator.export()
    }
  }
  document.getElementsByClassName('superpixel_regionSize')[0].innerHTML = size;
  //显示块大小；
  function regionSizeShow(){
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
      let index = this.getAttribute('data-index')-0;
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
