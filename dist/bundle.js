/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/edit.js":
/*!*************************!*\
  !*** ./src/app/edit.js ***!
  \*************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var _image_layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../image/layer */ "./src/image/layer.js");
/* harmony import */ var _helper_segment_annotator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/segment-annotator */ "./src/helper/segment-annotator.js");
/** Editor page renderer.
 */


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
_helper_segment_annotator__WEBPACK_IMPORTED_MODULE_1__["Annotator"].prototype.brush = function (pos, label) {
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
  var annotator = new _helper_segment_annotator__WEBPACK_IMPORTED_MODULE_1__["Annotator"](data.imageURLs[id], {
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
    imageLayer = new _image_layer__WEBPACK_IMPORTED_MODULE_0__["Layer"](data.imageURLs[id], {
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





/***/ }),

/***/ "./src/helper/segment-annotator.js":
/*!*****************************************!*\
  !*** ./src/helper/segment-annotator.js ***!
  \*****************************************/
/*! exports provided: Annotator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Annotator", function() { return Annotator; });
/* harmony import */ var _image_layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../image/layer */ "./src/image/layer.js");
/* harmony import */ var _image_segmentation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../image/segmentation */ "./src/image/segmentation.js");
/* harmony import */ var _image_morph__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../image/morph */ "./src/image/morph.js");
/**
 * Segment annotation widget.
 *
 * var annotator = new SegmentAnnotator("/path/to/image.jpg", {
 *   onload: function () {},
 *   onerror: function () {},
 *   onchange: function () {},
 *   onrightclick: function () {},
 *   onleftclick: function () {}
 * });
 * document.body.appendChild(annotator.container);
 *
 * Copyright 2015  Kota Yamaguchi
 */




// Segment annotator.
function Annotator(imageURL, options) {
  options = options || {};
  if (typeof imageURL !== "string") {
    throw "Invalid imageURL";
  }
  this.colormap = options.colormap || [[255, 255, 255], [255, 0, 0]];
  this.boundaryColor = options.boundaryColor || [255, 255, 255];
  this.boundaryAlpha = options.boundaryAlpha || 127;
  this.visualizationAlpha = options.visualizationAlpha || 144;
  this.highlightAlpha = options.highlightAlpha ||
    Math.min(255, this.visualizationAlpha + 128);
  this.currentZoom = 1.0;
  this.defaultLabel = options.defaultLabel || 0;
  this.maxHistoryRecord = options.maxHistoryRecord || 10;
  this.onchange = options.onchange || null;
  this.onrightclick = options.onrightclick || null;
  this.onleftclick = options.onleftclick || null;
  this.onhighlight = options.onhighlight || null;
  this.onmousemove = options.onmousemove || null;
  this._createLayers(options);
  this._initializeHistory(options);
  this._createLayers(options);
  this._initializeHistory(options);
  this.mode = "superpixel";
  this.polygonPoints = [];
  this.prevAnnotationImg = null;
  var annotator = this;
  this.layers.image.load(imageURL, {
    width: options.width,
    height: options.height,
    onload: function () { annotator._initialize(options); },
    onerror: options.onerror
  });
}

// Run superpixel segmentation.
Annotator.prototype.resetSuperpixels = function (options) {
  options = options || {};
  this.layers.superpixel.copy(this.layers.image);
  this.segmentation = _image_segmentation__WEBPACK_IMPORTED_MODULE_1__["methods"].create(this.layers.image.imageData,
    options);
  this._updateSuperpixels(options);
  return this;
};

// Adjust the superpixel resolution.
Annotator.prototype.finer = function (options) {
  this.segmentation.finer();
  this._updateSuperpixels(options);
  return this;
};

// Adjust the superpixel resolution.
Annotator.prototype.coarser = function (options) {
  this.segmentation.coarser();
  this._updateSuperpixels(options);
  return this;
};

// Undo the edit.
Annotator.prototype.undo = function () {
  if (this.currentHistoryRecord < 0)
    return false;
  var record = this.history[this.currentHistoryRecord--];
  this._fillPixels(record.pixels, record.prev);
  this.layers.visualization.render();
  if (typeof this.onchange === "function")
    this.onchange.call(this);
  return this.currentHistoryRecord < 0;
};

// Redo the edit.
Annotator.prototype.redo = function () {
  if (this.currentHistoryRecord >= this.history.length - 1)
    return false;
  var record = this.history[++this.currentHistoryRecord];
  this._fillPixels(record.pixels, record.next);
  this.layers.visualization.render();
  if (typeof this.onchange === "function")
    this.onchange.call(this);
  return this.currentHistoryRecord >= this.history.length;
};

// Get unique labels in the current annotation.
Annotator.prototype.getUniqueLabels = function () {
  var uniqueIndex = [],
    data = this.layers.annotation.imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    var label = _getEncodedLabel(data, i);
    if (uniqueIndex.indexOf(label) < 0) {
      uniqueIndex.push(label);
    }
  }
  return uniqueIndex.sort(function (a, b) { return a - b; });
};

// Fill all the pixels assigned the target label or all.
Annotator.prototype.fill = function (targetLabel) {
  var pixels = [],
    annotationData = this.layers.annotation.imageData.data;
  for (var i = 0; i < annotationData.length; i += 4) {
    var label = _getEncodedLabel(annotationData, i);
    if (label === targetLabel || targetLabel === undefined)
      pixels.push(i);
  }
  if (pixels.length > 0)
    this._updateAnnotation(pixels, this.currentLabel);
  return this;
};

Annotator.prototype.setAlpha = function (alpha) {
  this.visualizationAlpha = Math.max(Math.min(alpha, 255), 0);
  this.layers.visualization.setAlpha(this.visualizationAlpha).render();
  return this;
};

Annotator.prototype.lessAlpha = function (scale) {
  return this.setAlpha(this.visualizationAlpha - (scale || 1) * 20);
};

Annotator.prototype.moreAlpha = function (scale) {
  return this.setAlpha(this.visualizationAlpha + (scale || 1) * 20);
};

// Import an existing annotation.
Annotator.prototype.import = function (annotationURL, options) {
  options = options || {};
  var annotator = this;
  this.layers.annotation.load(annotationURL, {
    onload: function () {
      if (options.grayscale)
        this.gray2index();
      annotator.layers
        .visualization
        .copy(this)
        .applyColormap(annotator.colormap)
        .setAlpha(annotator.visualizationAlpha)
        .render();
      this.setAlpha(0).render();
      this.history = [];
      this.currentHistoryRecord = -1;
      if (typeof options.onload === "function")
        options.onload.call(annotator);
      if (typeof annotator.onchange === "function")
        annotator.onchange.call(annotator);
    },
    onerror: options.onerror
  });
  return this;
};

// Export the annotation in data URL.
Annotator.prototype.export = function () {
  this.layers.annotation.setAlpha(255);
  this.layers.annotation.render();
  var data = this.layers.annotation.canvas.toDataURL();
  this.layers.annotation.setAlpha(0);
  this.layers.annotation.render();
  return data;
};

// Show a specified layer.
Annotator.prototype.show = function (layer) {
  this.layers[layer].canvas.style.display = "inline-block";
  return this;
};

// Hide a specified layer.
Annotator.prototype.hide = function (layer) {
  this.layers[layer].canvas.style.display = "none";
  return this;
};

// Highlight a specified label.
Annotator.prototype.highlightLabel = function (label) {
  var pixels = [],
    annotationData = this.layers.annotation.imageData.data;
  for (var i = 0; i < annotationData.length; i += 4) {
    var currentLabel = _getEncodedLabel(annotationData, i);
    if (currentLabel === label)
      pixels.push(i);
  }
  this._updateHighlight(pixels);
  return this;
};

// Disable highlight.
Annotator.prototype.unhighlightLabel = function () {
  this._updateHighlight(null);
  return this;
};

// Zoom to specific resolution.
Annotator.prototype.zoom = function (scale) {
  this.currentZoom = Math.max(Math.min(scale || 1.0, 10.0), 1.0);
  this.innerContainer.style.zoom = this.currentZoom;
  this.innerContainer.style.MozTransform =
    "scale(" + this.currentZoom + ")";
  return this;
};

// Zoom in.
Annotator.prototype.zoomIn = function (scale) {
  return this.zoom(this.currentZoom + (scale || 0.25));
};

// Zoom out.
Annotator.prototype.zoomOut = function (scale) {
  return this.zoom(this.currentZoom - (scale || 0.25));
};

// // Align the current annotation to the boundary of superpixels.
// Annotator.prototype.alignBoundary = function () {
//   var annotationData = this.layers.annotation.imageData.data;
//   for (var i = 0; i < this.pixelIndex.length; ++i) {
//     var pixels = this.pixelIndex[i],
//         label = _findMostFrequent(annotationData, pixels);
//     this._fillPixels(pixels, label);
//   }
//   this.layers.visualization.render();
//   this.history = [];
//   this.currentHistoryRecord = 0;
// };

Annotator.prototype.denoise = function () {
  var indexImage = _image_morph__WEBPACK_IMPORTED_MODULE_2__["decodeIndexImage"](this.layers.annotation.imageData),
    result = _image_morph__WEBPACK_IMPORTED_MODULE_2__["maxFilter"](indexImage);
  var pixels = new Int32Array(result.data.length);
  for (var i = 0; i < pixels.length; ++i)
    pixels[i] = 4 * i;
  this._updateAnnotation(pixels, result.data);
  return this;
};

// Private methods.

Annotator.prototype._createLayers = function (options) {
  var onload = options.onload;
  delete options.onload;
  this.container = document.createElement("div");
  this.container.classList.add("segment-annotator-outer-container");
  this.innerContainer = document.createElement("div");
  this.innerContainer.classList.add("segment-annotator-inner-container");
  this.layers = {
    image: new _image_layer__WEBPACK_IMPORTED_MODULE_0__["Layer"](options),
    superpixel: new _image_layer__WEBPACK_IMPORTED_MODULE_0__["Layer"](options),
    visualization: new _image_layer__WEBPACK_IMPORTED_MODULE_0__["Layer"](options),
    boundary: new _image_layer__WEBPACK_IMPORTED_MODULE_0__["Layer"](options),
    annotation: new _image_layer__WEBPACK_IMPORTED_MODULE_0__["Layer"](options)
  };
  options.onload = onload;
  for (var key in this.layers) {
    var canvas = this.layers[key].canvas;
    canvas.classList.add("segment-annotator-layer");
    this.innerContainer.appendChild(canvas);
  }
  this.container.appendChild(this.innerContainer);
  this._resizeLayers(options);
};

Annotator.prototype._resizeLayers = function (options) {
  this.width = options.width || this.layers.image.canvas.width;
  this.height = options.height || this.layers.image.canvas.height;
  for (var key in this.layers) {
    if (key !== "image") {
      var canvas = this.layers[key].canvas;
      canvas.width = this.width;
      canvas.height = this.height;
    }
  }
  this.innerContainer.style.width = this.width + "px";
  this.innerContainer.style.height = this.height + "px";
  this.container.style.width = this.width + "px";
  this.container.style.height = this.height + "px";
};

Annotator.prototype._initializeHistory = function (options) {
  this.history = [];
  this.currentHistoryRecord = -1;
};

Annotator.prototype._initialize = function (options) {
  options = options || {};
  if (!options.width)
    this._resizeLayers(options);
  this._initializeAnnotationLayer();
  this._initializeVisualizationLayer();
  this._initializeEvents();
  this.resetSuperpixels(options.superpixelOptions);
  if (typeof options.onload === "function")
    options.onload.call(this);
  if (typeof this.onchange === "function")
    this.onchange.call(this);
};

Annotator.prototype._initializeEvents = function () {
  var canvas = this.layers.annotation.canvas,
    mousestate = { down: false, button: 0 },
    annotator = this;
  canvas.oncontextmenu = function () { return false; };
  function updateIfActive(event) {
    var offset = annotator._getClickOffset(event),
      superpixelData = annotator.layers.superpixel.imageData.data,
      annotationData = annotator.layers.annotation.imageData.data,
      superpixelIndex = _getEncodedLabel(superpixelData, offset),
      pixels = annotator.pixelIndex[superpixelIndex],
      existingLabel = _getEncodedLabel(annotationData, offset);
    if (annotator.mode === "superpixel")
      annotator._updateHighlight(pixels);
    if (typeof annotator.onmousemove === "function")
      annotator.onmousemove.call(annotator, existingLabel);
    if (mousestate.down) {
      if (mousestate.button == 2 &&
        typeof annotator.onrightclick === "function") {
        if (annotator.mode === "polygon")
          annotator._emptyPolygonPoints(); //reset
        else
          annotator.onrightclick.call(annotator, existingLabel);
      } else {
        if (annotator.mode === "brush" && event.button === 0) {
          annotator.brush(annotator._getClickPos(event), annotator.currentLabel);
        }
        if (event.button === 0 && annotator.mode === "polygon") {
          annotator._addPolygonPoint(event);
          if (annotator._checkLineIntersection())
            annotator._addPolygonToAnnotation();
        } else if (annotator.mode === "superpixel") {
          annotator._updateAnnotation(pixels, annotator.currentLabel);
        }
        if (typeof annotator.onleftclick === "function")
          annotator.onleftclick.call(annotator, annotator.currentLabel);
      }
    }
  }
  canvas.addEventListener('mousemove', updateIfActive);
  canvas.addEventListener('mouseup', updateIfActive);
  canvas.addEventListener('mouseleave', function () {
    annotator._updateHighlight(null);
    if (typeof annotator.onmousemove === "function") {
      annotator.onmousemove.call(annotator, null);
    }
  });

  canvas.addEventListener('mousedown', function (event) {
    mousestate.down = true;
    mousestate.button = event.button;
  });
  window.addEventListener('mouseup', function () {
    mousestate.down = false;
  });

  //polygon on/off with ctrl-key
  // window.onkeyup = function (e) {
  //   var key = e.keyCode ? e.keyCode : e.which;
  //   if (key == 17) {
  //     if (annotator.mode == "polygon") {
  //       annotator.mode = "superpixel";
  //     } else {
  //       annotator.mode = "polygon";
  //       annotator._updateHighlight(null);
  //     }
  //     annotator._emptyPolygonPoints();
  //   }
  // };
};

Annotator.prototype._updateBoundaryLayer = function () {
  var boundaryLayer = this.layers.boundary;
  boundaryLayer.copy(this.layers.superpixel);
  boundaryLayer.computeEdgemap({
    foreground: this.boundaryColor.concat(this.boundaryAlpha),
    background: this.boundaryColor.concat(0)
  });
  boundaryLayer.render();
};

Annotator.prototype._initializeAnnotationLayer = function () {
  var layer = this.layers.annotation;
  layer.resize(this.width, this.height);
  this.currentLabel = this.defaultLabel;
  layer.fill([this.defaultLabel, 0, 0, 0]);
  layer.render();
};

Annotator.prototype._initializeVisualizationLayer = function () {
  var layer = this.layers.visualization;
  layer.resize(this.width, this.height);
  var initialColor = this.colormap[this.defaultLabel]
    .concat([this.visualizationAlpha]);
  layer.fill(initialColor);
  layer.render();
};

Annotator.prototype._updateSuperpixels = function () {
  var annotator = this;
  this.layers.superpixel.process(function (imageData) {
    imageData.data.set(annotator.segmentation.result.data);
    annotator._createPixelIndex(annotator.segmentation.result.numSegments);
    annotator._updateBoundaryLayer();
    this.setAlpha(0).render();
  });
};

Annotator.prototype._createPixelIndex = function (numSegments) {
  var pixelIndex = new Array(numSegments),
    data = this.layers.superpixel.imageData.data,
    i;
  for (i = 0; i < numSegments; ++i)
    pixelIndex[i] = [];
  for (i = 0; i < data.length; i += 4) {
    var index = data[i] | (data[i + 1] << 8) | (data[i + 2] << 16);
    pixelIndex[index].push(i);
  }
  this.currentPixels = null;
  this.pixelIndex = pixelIndex;
};

Annotator.prototype._getClickOffset = function (event) {
  var pos = this._getClickPos(event),
    x = pos[0],
    y = pos[1];
  return 4 * (y * this.layers.visualization.canvas.width + x);
};

Annotator.prototype._getClickPos = function (event) {
  var container = this.container,
    containerRect = container.getBoundingClientRect(), win = window, docElem = document.documentElement,
    offsetLeft = containerRect.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0),
    offsetTop = containerRect.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
    x = Math.round(
      (event.pageX - offsetLeft + container.scrollLeft) *
      (container.offsetWidth / container.scrollWidth)
    ),
    y = Math.round(
      (event.pageY - offsetTop + container.scrollTop) *
      (container.offsetHeight / container.scrollHeight)
    ),
    x = Math.max(Math.min(x, this.layers.visualization.canvas.width - 1), 0);
  y = Math.max(Math.min(y, this.layers.visualization.canvas.height - 1), 0);
  return [x, y];
};

// polygon tool.
Annotator.prototype._addPolygonPoint = function (event) {
  var annotator = this,
    pos = this._getClickPos(event),
    x = pos[0],
    y = pos[1];
  //get canvas.
  var canvas = annotator.layers.annotation.canvas,
    ctx = canvas.getContext('2d');
  if (this.polygonPoints.length === 0) {
    ctx.save();  // remember previous state.
    annotator.prevAnnotationImg =
      ctx.getImageData(0, 0, canvas.width, canvas.height);
  }
  // draw.
  ctx.fillStyle = '#FA6900';
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;
  if (this.polygonPoints.length === 0) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  this.polygonPoints.push(pos);
};

Annotator.prototype._emptyPolygonPoints = function () {
  var annotator = this,
    ctx = annotator.layers.annotation.canvas.getContext('2d');
  ctx.restore();
  if (annotator.prevAnnotationImg)
    ctx.putImageData(annotator.prevAnnotationImg, 0, 0);
  //reset polygon-points
  annotator.polygonPoints = [];
};

Annotator.prototype._addPolygonToAnnotation = function () {
  var annotator = this,
    canvas = document.createElement('canvas'),
    x, y;
  // set canvas dimensions.
  canvas.width = annotator.layers.annotation.canvas.width;
  canvas.height = annotator.layers.annotation.canvas.height;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = "rgba(0, 0, 255, 255)";
  ctx.beginPath();
  ctx.moveTo(annotator.polygonPoints[0][0], annotator.polygonPoints[0][1]);
  for (i = 1; i < annotator.polygonPoints.length; ++i) {
    x = annotator.polygonPoints[i][0];
    y = annotator.polygonPoints[i][1];
    ctx.lineTo(x, y);
  }
  ctx.lineTo(annotator.polygonPoints[0][0], annotator.polygonPoints[0][1]);
  ctx.closePath();
  ctx.fill();
  //get pixels within polygon.
  var colorToCheck = [0, 0, 255, 255],
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height),
    data = imageData.data,
    pixelsPolygon = [];
  for (x = 0; x < canvas.width; ++x) {
    for (y = 0; y < canvas.height; ++y) {
      var index = (x + y * imageData.width) * 4;
      if (data[index + 0] == colorToCheck[0] &&
        data[index + 1] == colorToCheck[1] &&
        data[index + 2] == colorToCheck[2] &&
        data[index + 3] == colorToCheck[3]) {
        pixelsPolygon.push(index);
      }
    }
  }
  // update annotation.
  annotator._updateAnnotation(pixelsPolygon, annotator.currentLabel);
  annotator._emptyPolygonPoints();
};

Annotator.prototype._checkLineIntersection = function () {
  if (this.polygonPoints.length < 4)
    return false;
  var newLineStartX = this.polygonPoints[this.polygonPoints.length - 2][0],
    newLineStartY = this.polygonPoints[this.polygonPoints.length - 2][1],
    newLineEndX = this.polygonPoints[this.polygonPoints.length - 1][0],
    newLineEndY = this.polygonPoints[this.polygonPoints.length - 1][1];

  for (i = 1; i < this.polygonPoints.length - 2; ++i) {
    var line1StartX = this.polygonPoints[i - 1][0],
      line1StartY = this.polygonPoints[i - 1][1],
      line1EndX = this.polygonPoints[i][0],
      line1EndY = this.polygonPoints[i][1],
      denominator =
        ((newLineEndY - newLineStartY) * (line1EndX - line1StartX)) -
        ((newLineEndX - newLineStartX) * (line1EndY - line1StartY)),
      a = line1StartY - newLineStartY,
      b = line1StartX - newLineStartX,
      numerator1 = ((newLineEndX - newLineStartX) * a) -
        ((newLineEndY - newLineStartY) * b),
      numerator2 = ((line1EndX - line1StartX) * a) -
        ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;
    if (a > 0 && a < 1 && b > 0 && b < 1)
      return true;
  }
  return false;
};

Annotator.prototype._setMode = function (mode) {
  this.mode = mode;
};

Annotator.prototype._updateHighlight = function (pixels) {
  var visualizationData = this.layers.visualization.imageData.data,
    boundaryData = this.layers.boundary.imageData.data,
    annotationData = this.layers.annotation.imageData.data,
    i,
    color,
    offset;
  if (this.currentPixels !== null) {
    for (i = 0; i < this.currentPixels.length; ++i) {
      offset = this.currentPixels[i];
      color = this.colormap[_getEncodedLabel(annotationData, offset)];
      if (color) {
        visualizationData[offset + 0] = color[0];
        visualizationData[offset + 1] = color[1];
        visualizationData[offset + 2] = color[2];
        visualizationData[offset + 3] = this.visualizationAlpha;
      }

    }
  }
  this.currentPixels = pixels;
  if (this.currentPixels !== null) {
    for (i = 0; i < pixels.length; ++i) {
      offset = pixels[i];
      if (boundaryData[offset + 3]) {
        visualizationData[offset + 0] = this.boundaryColor[0];
        visualizationData[offset + 1] = this.boundaryColor[1];
        visualizationData[offset + 2] = this.boundaryColor[2];
        visualizationData[offset + 3] = this.highlightAlpha;
      }
      else {
        visualizationData[offset + 3] = this.highlightAlpha;
      }
    }
  }
  this.layers.visualization.render();
  this.layers.boundary.render();
  if (typeof this.onhighlight === "function")
    this.onhighlight.call(this);
};

Annotator.prototype._fillPixels = function (pixels, labels) {
  if (pixels.length !== labels.length)
    throw "Invalid fill: " + pixels.length + " !== " + labels.length;
  var annotationData = this.layers.annotation.imageData.data,
    visualizationData = this.layers.visualization.imageData.data;
  for (var i = 0; i < pixels.length; ++i) {
    var offset = pixels[i],
      label = labels[i],
      color = this.colormap[label];
    _setEncodedLabel(annotationData, offset, label);
    visualizationData[offset + 0] = color[0];
    visualizationData[offset + 1] = color[1];
    visualizationData[offset + 2] = color[2];
  }
};

// Update label.
Annotator.prototype._updateAnnotation = function (pixels, labels) {
  var updates;
  labels = (typeof labels === "object") ?
    labels : _fillArray(new Int32Array(pixels.length), labels);
  updates = this._getDifferentialUpdates(pixels, labels);
  if (updates.pixels.length === 0)
    return this;
  this._updateHistory(updates);
  this._fillPixels(updates.pixels, updates.next);
  this.layers.visualization.render();
  if (typeof this.onchange === "function")
    this.onchange.call(this);
  return this;
};

// Get the differential update of labels.
Annotator.prototype._getDifferentialUpdates = function (pixels, labels) {
  if (pixels.length !== labels.length)
    throw "Invalid labels";
  var annotationData = this.layers.annotation.imageData.data,
    updates = { pixels: [], prev: [], next: [] };
  for (var i = 0; i < pixels.length; ++i) {
    var label = _getEncodedLabel(annotationData, pixels[i]);
    if (label !== labels[i]) {
      updates.pixels.push(pixels[i]);
      updates.prev.push(label);
      updates.next.push(labels[i]);
    }
  }
  return updates;
};

Annotator.prototype._updateHistory = function (updates) {
  this.history = this.history.slice(0, this.currentHistoryRecord + 1);
  this.history.push(updates);
  if (this.history.length > this.maxHistoryRecord)
    this.history = this.history.slice(1, this.history.length);
  else
    ++this.currentHistoryRecord;
};

function _fillArray(array, value) {
  for (var i = 0; i < array.length; ++i)
    array[i] = value;
  return array;
}

// function _findMostFrequent(annotationData, pixels) {
//   var histogram = {},
//       j;
//   for (j = 0; j < pixels.length; ++j) {
//     var label = _getEncodedLabel(annotationData, pixels[j]);
//     histogram[label] = (histogram[label]) ? histogram[label] + 1 : 1;
//   }
//   var maxFrequency = 0,
//       majorLabel = 0;
//   for (j in histogram) {
//     var frequency = histogram[j];
//     if (frequency > maxFrequency) {
//       maxFrequency = frequency;
//       majorLabel = j;
//     }
//   }
//   return majorLabel;
// }

function _getEncodedLabel(array, offset) {
  return array[offset] |
    (array[offset + 1] << 8) |
    (array[offset + 2] << 16);
}

function _setEncodedLabel(array, offset, label) {
  array[offset + 0] = label & 255;
  array[offset + 1] = (label >>> 8) & 255;
  array[offset + 2] = (label >>> 16) & 255;
  array[offset + 3] = 255;
}




/***/ }),

/***/ "./src/helper/utils.js":
/*!*****************************!*\
  !*** ./src/helper/utils.js ***!
  \*****************************/
/*! exports provided: getScreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScreen", function() { return getScreen; });
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


/***/ }),

/***/ "./src/image/compat.js":
/*!*****************************!*\
  !*** ./src/image/compat.js ***!
  \*****************************/
/*! exports provided: createImageData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createImageData", function() { return createImageData; });
/** Compatibility API.
 *
 * Copyright 2015  Kota Yamaguchi
 */
  /**
   *
   *
   * @param {*} width
   * @param {*} height
   * @returns
   */
  function createImageData(width, height) {
    var context = document.createElement("canvas").getContext("2d");
    return context.createImageData(width, height);
  }
  



/***/ }),

/***/ "./src/image/layer.js":
/*!****************************!*\
  !*** ./src/image/layer.js ***!
  \****************************/
/*! exports provided: Layer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return Layer; });
/* harmony import */ var _helper_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/utils.js */ "./src/helper/utils.js");
/** Image canvas wrapper.
 *
 * Example:
 *
 *  var layer = new Layer("/path/to/image.jpg", {
 *    onload: function () {
 *      this.resize(200, 300);
 *      document.body.appendChild(this.canvas);
 *    }
 *  });
 *
 * Copyright 2015  Kota Yamaguchi
 */
  // Canvas wrapper object.
  

  function Layer(source, options) {
    options = options || {};
    this.canvas = document.createElement("canvas");
    this.canvas.width = options.width || this.canvas.width;
    this.canvas.height = options.height || this.canvas.height;
    if (source) {
      if (typeof source === "string" ||
          typeof source === "object" && source.nodeName === "IMG")  
        this.load(source, options);
      else if (typeof source === "object" &&
               (source.nodeName === "CANVAS" || source instanceof ImageData))
        this.fromCanvas(source, options);
    }
  }

  Layer.prototype.load = function (source, options) {
    options = options || {};
    if (typeof options === "function") options = { onload: options };
    var image, layer = this;
    this.canvas.width = options.width || this.canvas.width;
    this.canvas.height = options.height || this.canvas.height;
    if (typeof source === "string") {
      image = new Image();
      image.crossOrigin = "";
      image.src = source;
      
    }
    else
      image = source;
    image.onload = function() {
      var screenObj = Object(_helper_utils_js__WEBPACK_IMPORTED_MODULE_0__["getScreen"])();
      var scale = image.height/image.width;
      if(scale>=1){
        if(image.height>=screenObj.height){
          image.height = screenObj.height;
          image.width = image.height/scale;
        }
      }else{
        if(image.width>screenObj.width){
          image.width = screenObj.width;
          image.height = image.width*scale;
        }
      }
      layer._onImageLoad(image, options); 

    };
    if (typeof options.onerror === "function")
      image.onerror = options.onerror.call(this);
    return this;
  };

  Layer.prototype._onImageLoad = function (image, options) {
    this.canvas.width = options.width || image.width;
    this.canvas.height = options.height || image.height;
    var context = this.canvas.getContext("2d");
    this._setImageSmoothing(context, options);
    context.drawImage(image, 0, 0, image.width, image.height,
                             0, 0, this.canvas.width, this.canvas.height);
    this.imageData = context.getImageData(0, 0,
                                          this.canvas.width,
                                          this.canvas.height);
    if (typeof options.onload === "function")
      options.onload.call(this);
  };

  Layer.prototype.fromCanvas = function (source, options) {
    options = options || {};
    if (typeof options === "function") options = { onload: options };
    this.canvas.width = source.width;
    this.canvas.height = source.height;
    var context = this.canvas.getContext("2d");
    this._setImageSmoothing(context, options);
    if (source instanceof ImageData)
      context.putImageData(source, 0, 0);
    else
      context.drawImage(source, 0, 0, this.canvas.width, this.canvas.height);
    this.imageData = context.getImageData(0, 0,
                                          this.canvas.width,
                                          this.canvas.height);
    if (typeof options.onload === "function")
      options.onload.call(this);
    return this;
  };

  Layer.prototype.fromImageData = function (imageData, options) {
    options = options || {};
    if (typeof options === "function") options = { onload: options };
    this.canvas.width = imageData.width;
    this.canvas.height = imageData.height;
    var context = this.canvas.getContext("2d");
    this._setImageSmoothing(context, options);
    context.drawImage(imageData, 0, 0, this.canvas.width, this.canvas.height);
    this.imageData = context.getImageData(0, 0,
                                          this.canvas.width,
                                          this.canvas.height);
    if (typeof options.onload === "function")
      options.onload.call(this);
    return this;
  };

  Layer.prototype._setImageSmoothing = function (context, options) {
    if (typeof options.imageSmoothingEnabled === "undefined")
      options.imageSmoothingEnabled = true;
    context.mozImageSmoothingEnabled = options.imageSmoothingEnabled;
    context.webkitImageSmoothingEnabled = options.imageSmoothingEnabled;
    context.msImageSmoothingEnabled = options.imageSmoothingEnabled;
    context.imageSmoothingEnabled = options.imageSmoothingEnabled;
  };

  Layer.prototype.copy = function (source) {
    source.render();
    this.fromCanvas(source.canvas);
    return this;
  };

  Layer.prototype.process = function (callback) {
    if (typeof callback !== "function")
      throw "Invalid callback";
    callback.call(this, this.imageData);
    return this.render();
  };

  Layer.prototype.render = function () {
    if (this.imageData)
      this.canvas.getContext("2d").putImageData(this.imageData, 0, 0);
    return this;
  };

  Layer.prototype.setAlpha = function (alpha) {
    var data = this.imageData.data;
    for (var i = 3; i < data.length; i += 4)
      data[i] = alpha;
    return this;
  };

  Layer.prototype.fill = function (rgba) {
    var data = this.imageData.data;
    for (var i = 0; i < data.length; i += 4)
      for (var j = 0; j < rgba.length; ++j)
        data[i + j] = rgba[j];
    return this;
  };

  Layer.prototype.resize = function (width, height, options) {
    options = options || {};
    var temporaryCanvas = document.createElement("canvas"),
        tempoaryContext = temporaryCanvas.getContext("2d");
    temporaryCanvas.width = width;
    temporaryCanvas.height = height;
    tempoaryContext.drawImage(this.canvas, 0, 0, width, height);
    this.canvas.width = width;
    this.canvas.height = height;
    var context = this.canvas.getContext("2d");
    this._setImageSmoothing(context, options);
    context.drawImage(temporaryCanvas, 0, 0);
    this.imageData = context.getImageData(0, 0, width, height);
    return this;
  };

  Layer.prototype.applyColormap = function (colormap, grayscale) {
    var data = this.imageData.data;
    if (typeof grayscale === "undefined") grayscale = true;
    for (var i = 0; i < data.length; i += 4) {
      var index = data[i];
      if (!grayscale)
        index |= (data[i + 1] << 8) | (data[i + 2] << 16);
      if (colormap[index]) {
        data[i + 0] = colormap[index][0];
        data[i + 1] = colormap[index][1];
        data[i + 2] = colormap[index][2];
      }

    }
    return this;
  };

  Layer.prototype.computeEdgemap = function (options) {
    if (typeof options === "undefined") options = {};
    var data = this.imageData.data,
        width = this.imageData.width,
        height = this.imageData.height,
        edgeMap = new Uint8Array(this.imageData.data),
        foreground = options.foreground || [255, 255, 255],
        background = options.background || [0, 0, 0],
        i, j, k;
    for (i = 0; i < height; ++i) {
      for (j = 0; j < width; ++j) {
        var offset = 4 * (i * width + j),
            index = data[4 * (i * width + j)],
            isBoundary = (i === 0 ||
                          j === 0 ||
                          i === (height - 1) ||
                          j === (width - 1) ||
                          index !== data[4 * (i * width + j - 1)] ||
                          index !== data[4 * (i * width + j + 1)] ||
                          index !== data[4 * ((i - 1) * width + j)] ||
                          index !== data[4 * ((i + 1) * width + j)]);
        if (isBoundary) {
          for (k = 0; k < foreground.length; ++k)
            edgeMap[offset + k] = foreground[k];
        }
        else {
          for (k = 0; k < background.length; ++k)
            edgeMap[offset + k] = background[k];
        }
      }
    }
    data.set(edgeMap);
    return this;
  };

  Layer.prototype.gray2index = function () {
    var data = this.imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      data[i + 1] = 0;
      data[i + 2] = 0;
    }
    return this;
  };

  


/***/ }),

/***/ "./src/image/morph.js":
/*!****************************!*\
  !*** ./src/image/morph.js ***!
  \****************************/
/*! exports provided: encodeIndexImage, decodeIndexImage, maxFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeIndexImage", function() { return encodeIndexImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decodeIndexImage", function() { return decodeIndexImage; });
/* harmony import */ var _compat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./compat */ "./src/image/compat.js");
/* harmony import */ var _morph_max_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./morph/max-filter */ "./src/image/morph/max-filter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "maxFilter", function() { return _morph_max_filter__WEBPACK_IMPORTED_MODULE_1__["maxFilter"]; });

/** Image morphology operations and index image I/O.
 *
 * Copyright 2015  Kota Yamaguchi
 */


  function decodeIndexImage(imageData) {
    var indexImage = {
      width: imageData.width,
      height: imageData.height,
      data: new Int32Array(imageData.width * imageData.height)
    };
    for (var i = 0; i < imageData.data.length; ++i) {
      var offset = 4 * i;
      indexImage.data[i] = (imageData.data[offset + 0]) |
                           (imageData.data[offset + 1] << 8) |
                           (imageData.data[offset + 2] << 16);
    }
    return indexImage;
  }

  function encodeIndexImage(indexImage) {
    var imageData = _compat__WEBPACK_IMPORTED_MODULE_0__["createImageData"](indexImage.width, indexImage.height);
    for (var i = 0; i < indexImage.length; ++i) {
      var offset = 4 * i,
          value = indexImage.data[i];
      imageData.data[offset] = 255 & value;
      imageData.data[offset + 1] = 255 & (value >>> 8);
      imageData.data[offset + 2] = 255 & (value >>> 16);
      imageData.data[offset + 3] = 255;
    }
    return imageData;
  }

  


/***/ }),

/***/ "./src/image/morph/max-filter.js":
/*!***************************************!*\
  !*** ./src/image/morph/max-filter.js ***!
  \***************************************/
/*! exports provided: maxFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maxFilter", function() { return maxFilter; });
/* harmony import */ var _neighbor_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./neighbor-map */ "./src/image/morph/neighbor-map.js");
/** Max filter for an index image.
 *
 * Copyright 2015  Kota Yamaguchi
 */


  function findDominantLabel(data, neighbors) {
    var histogram = {},
        i, label;
    for (i = 0; i < neighbors.length; ++i) {
      label = data[neighbors[i]];
      if (histogram[label])
        ++histogram[label];
      else
        histogram[label] = 1;
    }
    var labels = Object.keys(histogram),
        count = 0,
        dominantLabel = null;
    for (i = 0; i < labels.length; ++i) {
      label = labels[i];
      if (histogram[label] > count) {
        dominantLabel = parseInt(label, 10);
        count = histogram[label];
      }
    }
    return dominantLabel;
  }

  function maxFilter(indexImage, options) {
    options = options || {};
    var neighbors = options.neighbors || [[-1, -1], [-1, 0], [-1, 1],
                                          [ 0, -1], [ 0, 0], [ 0, 1],
                                          [ 1, -1], [ 1, 0], [ 1, 1]],
        result = new Int32Array(indexImage.data.length),
        neighborMap = new _neighbor_map__WEBPACK_IMPORTED_MODULE_0__["NeighborMap"](indexImage.width,
                                      indexImage.height,
                                      neighbors);
    for (var i = 0; i < indexImage.data.length; ++i)
      result[i] = findDominantLabel(indexImage.data,
                                    neighborMap.get(i));
    return {
      width: indexImage.width,
      height: indexImage.height,
      data: result
    };
  }

   


/***/ }),

/***/ "./src/image/morph/neighbor-map.js":
/*!*****************************************!*\
  !*** ./src/image/morph/neighbor-map.js ***!
  \*****************************************/
/*! exports provided: NeighborMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NeighborMap", function() { return NeighborMap; });
/** Create a map of neighbor offsets.
 *
 *  var neighborMap = new NeighborMap(width, height);
 *  for (var i = 0; i < data.length; ++i) {
 *    var neighbors = neighborMap.get(i);
 *    for (var j = 0; j < neighbors.length; ++j) {
 *      var pixel = data[neighbors[j]];
 *    }
 *  }
 *
 * Copyright 2015  Kota Yamaguchi
 */
  // Neighbor Map.
  function NeighborMap(width, height, neighbors) {
    this.neighbors = neighbors || [[-1, -1], [-1, 0], [-1, 1],
                                   [ 0, -1],          [ 0, 1],
                                   [ 1, -1], [ 1, 0], [ 1, 1]];
    this.maps = [];
    for (var k = 0; k < this.neighbors.length; ++k) {
      var dy = this.neighbors[k][0],
          dx = this.neighbors[k][1],
          map = new Int32Array(width * height);
      for (var y = 0; y < height; ++y) {
        for (var x = 0; x < width; ++x) {
          var Y = y + dy,
              X = x + dx;
          map[y * width + x] = (Y < 0 || height <= Y || X < 0 || width <= X) ?
                               -1 : Y * width + X;
        }
      }
      this.maps.push(map);
    }
  }

  NeighborMap.prototype.get = function (offset) {
    var neighborOffsets = [];
    for (var k = 0; k < this.neighbors.length; ++k) {
      var neighborOffset = this.maps[k][offset];
      if (neighborOffset >= 0)
        neighborOffsets.push(neighborOffset);
    }
    return neighborOffsets;
  };

  


/***/ }),

/***/ "./src/image/segmentation.js":
/*!***********************************!*\
  !*** ./src/image/segmentation.js ***!
  \***********************************/
/*! exports provided: methods */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "methods", function() { return methods; });
/* harmony import */ var _segmentation_pff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./segmentation/pff */ "./src/image/segmentation/pff.js");
/* harmony import */ var _segmentation_slic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./segmentation/slic */ "./src/image/segmentation/slic.js");
/* harmony import */ var _segmentation_slico__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./segmentation/slico */ "./src/image/segmentation/slico.js");
/** Image segmentation factory.
 *
 *  var segm = segmentation.create(imageData);
 *  var segmentData = segm.result;  // imageData with numSegments.
 *
 *  segm.finer();
 *  segm.coarser();
 *
 * Copyright 2015  Kota Yamaguchi
 */




  var methods = {
    pff: _segmentation_pff__WEBPACK_IMPORTED_MODULE_0__["pff"],
    slic: _segmentation_slic__WEBPACK_IMPORTED_MODULE_1__["slic"],
    slico: _segmentation_slico__WEBPACK_IMPORTED_MODULE_2__["slico"],
  };

  methods.create = function (imageData, options) {
    options = options || {};
    options.method = options.method || "slic";
    if (!methods[options.method])
      throw "Invalid method: " + options.method;
    return new methods[options.method](imageData, options);
  };

  


/***/ }),

/***/ "./src/image/segmentation/base.js":
/*!****************************************!*\
  !*** ./src/image/segmentation/base.js ***!
  \****************************************/
/*! exports provided: BaseSegmentation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseSegmentation", function() { return BaseSegmentation; });
/* harmony import */ var _compat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../compat */ "./src/image/compat.js");
/**
 * Base class for over-segmentation algorithms.
 *
 * Copyright 2015  Kota Yamaguchi
 */


  function BaseSegmentation(imageData, options) {
    if (!(imageData instanceof ImageData))
      throw "Invalid ImageData";
    this.imageData = _compat__WEBPACK_IMPORTED_MODULE_0__["createImageData"](imageData.width, imageData.height);
    this.imageData.data.set(imageData.data);
  }

  BaseSegmentation.prototype.finer = function () {};

  BaseSegmentation.prototype.coarser = function () {};

  


/***/ }),

/***/ "./src/image/segmentation/pff.js":
/*!***************************************!*\
  !*** ./src/image/segmentation/pff.js ***!
  \***************************************/
/*! exports provided: pff */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pff", function() { return PFF; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./src/image/segmentation/base.js");
/* harmony import */ var _compat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../compat */ "./src/image/compat.js");
/**
 * Javascript implementation of an image segmentation algorithm of
 *
 *    Efficient Graph-Based Image Segmentation
 *    Pedro F. Felzenszwalb and Daniel P. Huttenlocher
 *    International Journal of Computer Vision, 59(2) September 2004.
 *
 * API
 * ---
 *
 *    new PFF(imageData, options)
 *
 * The function takes the following options.
 * * `sigma` - Parameter for Gaussian pre-smoothing. Default 0.5.
 * * `threshold` - Threshold value of the algorithm. Default 500.
 * * `minSize` - Minimum segment size in pixels. Default 20.
 *
 * Copyright 2015  Kota Yamaguchi
 */

 
 

  function PFF(imageData, options) {
    _base__WEBPACK_IMPORTED_MODULE_0__["BaseSegmentation"].call(this, imageData, options);
    options = options || {};
    this.sigma = options.sigma || Math.sqrt(2.0);
    this.threshold = options.threshold || 500;
    this.minSize = options.minSize || 20;
    this.result = this._compute();
  }

  PFF.prototype = Object.create(_base__WEBPACK_IMPORTED_MODULE_0__["BaseSegmentation"].prototype);

  // Compute segmentation.
  PFF.prototype._compute = function () {
    var smoothedImage = _compat__WEBPACK_IMPORTED_MODULE_1__["createImageData"](this.imageData.width,
                                               this.imageData.height);
    smoothedImage.data.set(this.imageData.data);
    smoothImage(smoothedImage, this.sigma);
    var universe = segmentGraph(smoothedImage, this.threshold, this.minSize),
        indexMap = createIndexMap(universe, smoothedImage),
        result = _compat__WEBPACK_IMPORTED_MODULE_1__["createImageData"](smoothedImage.width,
                                        smoothedImage.height);
    encodeLabels(indexMap, result.data);
    result.numSegments = universe.nodes;
    return result;
  };

  // Finer.
  PFF.prototype.finer = function (scale) {
    this.sigma /= (scale || Math.sqrt(2));
    this.threshold /= (scale || Math.sqrt(2));
    this.result = this._compute();
  };

  // Coarser.
  PFF.prototype.coarser = function (scale) {
    this.sigma *= (scale || Math.sqrt(2.0));
    this.threshold *= (scale || Math.sqrt(2.0));
    this.result = this._compute();
  };

  // Create a normalized Gaussian filter.
  function createGaussian(sigma) {
    sigma = Math.max(sigma, 0.01);
    var length = Math.ceil(sigma * 4) + 1,
        mask = new Float32Array(length),
        sumValues = 0,
        i;
    for (i = 0; i < length; ++i) {
      var value = Math.exp(-0.5 * Math.pow(i / sigma, 2));
      sumValues += Math.abs(value);
      mask[i] = value;
    }
    sumValues = 2 * sumValues - Math.abs(mask[0]); // 2x except center.
    for (i = 0; i < length; ++i)
      mask[i] /= sumValues;
    return mask;
  }

  // Convolve even.
  function convolveEven(imageData, filter) {
    var width = imageData.width,
        height = imageData.height,
        source = imageData.data,
        temporary = new Float32Array(source),
        i,
        j,
        k,
        l,
        sum;
    // Horizontal filter.
    for (i = 0; i < height; ++i) {
      for (j = 0; j < width; ++j) {
        for (k = 0; k < 3; ++k) {
          sum = filter[0] * source[4 * (i * width + j) + k];
          for (l = 1; l < filter.length; ++l) {
            sum += filter[l] * (
              source[4 * (i * width + Math.max(j - l, 0)) + k] +
              source[4 * (i * width + Math.min(j + l, width - 1)) + k]
              );
          }
          temporary[4 * (i * width + j) + k] = sum;
        }
      }
    }
    // Vertical filter.
    for (i = 0; i < height; ++i) {
      for (j = 0; j < width; ++j) {
        for (k = 0; k < 3; ++k) {
          sum = filter[0] * temporary[4 * (i * width + j) + k];
          for (l = 1; l < filter.length; ++l) {
            sum += filter[l] * (
              temporary[4 * (Math.max(i - l, 0) * width + j) + k] +
              temporary[4 * (Math.min(i + l, height - 1) * width + j) + k]
              );
          }
          source[4 * (i * width + j) + k] = sum;
        }
      }
    }
  }

  // Smooth an image.
  function smoothImage(imageData, sigma) {
    var gaussian = createGaussian(sigma);
    convolveEven(imageData, gaussian);
  }

  // Create an edge structure.
  function createEdges(imageData) {
    var width = imageData.width,
        height = imageData.height,
        rgbData = imageData.data,
        edgeSize = 4 * width * height - 3 * width - 3 * height + 2,
        index = 0,
        edges = {
          a: new Int32Array(edgeSize),
          b: new Int32Array(edgeSize),
          w: new Float32Array(edgeSize)
        },
        x1,
        x2;
    for (var i = 0; i < height; ++i) {
      for (var j = 0; j < width; ++j) {
        if (j < width - 1) {
          x1 = i * width + j;
          x2 = i * width + j + 1;
          edges.a[index] = x1;
          edges.b[index] = x2;
          x1 = 4 * x1;
          x2 = 4 * x2;
          edges.w[index] = Math.sqrt(
            Math.pow(rgbData[x1 + 0] - rgbData[x2 + 0], 2) +
            Math.pow(rgbData[x1 + 1] - rgbData[x2 + 1], 2) +
            Math.pow(rgbData[x1 + 2] - rgbData[x2 + 2], 2)
            );
          ++index;
        }
        if (i < height - 1) {
          x1 = i * width + j;
          x2 = (i + 1) * width + j;
          edges.a[index] = x1;
          edges.b[index] = x2;
          x1 = 4 * x1;
          x2 = 4 * x2;
          edges.w[index] = Math.sqrt(
            Math.pow(rgbData[x1 + 0] - rgbData[x2 + 0], 2) +
            Math.pow(rgbData[x1 + 1] - rgbData[x2 + 1], 2) +
            Math.pow(rgbData[x1 + 2] - rgbData[x2 + 2], 2)
            );
          ++index;
        }
        if ((j < width - 1) && (i < height - 1)) {
          x1 = i * width + j;
          x2 = (i + 1) * width + j + 1;
          edges.a[index] = x1;
          edges.b[index] = x2;
          x1 = 4 * x1;
          x2 = 4 * x2;
          edges.w[index] = Math.sqrt(
            Math.pow(rgbData[x1 + 0] - rgbData[x2 + 0], 2) +
            Math.pow(rgbData[x1 + 1] - rgbData[x2 + 1], 2) +
            Math.pow(rgbData[x1 + 2] - rgbData[x2 + 2], 2)
            );
          ++index;
        }
        if ((j < width - 1) && (i > 0)) {
          x1 = i * width + j;
          x2 = (i - 1) * width + j + 1;
          edges.a[index] = x1;
          edges.b[index] = x2;
          x1 = 4 * x1;
          x2 = 4 * x2;
          edges.w[index] = Math.sqrt(
            Math.pow(rgbData[x1 + 0] - rgbData[x2 + 0], 2) +
            Math.pow(rgbData[x1 + 1] - rgbData[x2 + 1], 2) +
            Math.pow(rgbData[x1 + 2] - rgbData[x2 + 2], 2)
            );
          ++index;
        }
      }
    }
    return edges;
  }

  // Sort edges.
  function sortEdgesByWeights(edges) {
    var order = new Array(edges.w.length),
        i;
    for (i = 0; i < order.length; ++i)
      order[i] = i;
    var a = edges.a,
        b = edges.b,
        w = edges.w;
    order.sort(function(i, j) { return w[i] - w[j]; });
    var temporaryA = new Uint32Array(a),
        temporaryB = new Uint32Array(b),
        temporaryW = new Float32Array(w);
    for (i = 0; i < order.length; ++i) {
      temporaryA[i] = a[order[i]];
      temporaryB[i] = b[order[i]];
      temporaryW[i] = w[order[i]];
    }
    edges.a = temporaryA;
    edges.b = temporaryB;
    edges.w = temporaryW;
  }

  // Create a universe struct.
  function createUniverse(nodes, c) {
    var universe = {
      nodes: nodes,
      rank: new Int32Array(nodes),
      p: new Int32Array(nodes),
      size: new Int32Array(nodes),
      threshold: new Float32Array(nodes)
    };
    for (var i = 0; i < nodes; ++i) {
      universe.size[i] = 1;
      universe.p[i] = i;
      universe.threshold[i] = c;
    }
    return universe;
  }

  // Find a vertex pointing self.
  function findNode(universe, index) {
    var i = index;
    while (i !== universe.p[i])
      i = universe.p[i];
    universe.p[index] = i;
    return i;
  }

  // Join a node.
  function joinNode(universe, a, b) {
    if (universe.rank[a] > universe.rank[b]) {
      universe.p[b] = a;
      universe.size[a] += universe.size[b];
    }
    else {
      universe.p[a] = b;
      universe.size[b] += universe.size[a];
      if (universe.rank[a] == universe.rank[b])
        universe.rank[b]++;
    }
    universe.nodes--;
  }

  // Segment a graph.
  function segmentGraph(imageData, c, minSize) {
    var edges = createEdges(imageData),
        a, b, i;
    sortEdgesByWeights(edges);
    var universe = createUniverse(imageData.width * imageData.height, c);
    // Bottom-up merge.
    for (i = 0; i < edges.a.length; ++i) {
      a = findNode(universe, edges.a[i]);
      b = findNode(universe, edges.b[i]);
      if (a != b &&
          edges.w[i] <= universe.threshold[a] &&
          edges.w[i] <= universe.threshold[b]) {
        joinNode(universe, a, b);
        a = findNode(universe, a);
        universe.threshold[a] = edges.w[i] + (c / universe.size[a]);
      }
    }
    // Merge small components.
    for (i = 0; i < edges.a.length; ++i) {
      a = findNode(universe, edges.a[i]);
      b = findNode(universe, edges.b[i]);
      if (a != b &&
          (universe.size[a] < minSize || universe.size[b] < minSize))
        joinNode(universe, a, b);
    }
    return universe;
  }

  // Create an index map.
  function createIndexMap(universe, imageData) {
    var width = imageData.width,
        height = imageData.height,
        indexMap = new Int32Array(width * height),
        nodeIds = [],
        lastId = 0;
    for (var i = 0; i < height; ++i) {
      for (var j = 0; j < width; ++j) {
        var component = findNode(universe, i * width + j),
            index = nodeIds[component];
        if (index === undefined) {
          index = lastId;
          nodeIds[component] = lastId++;
        }
        indexMap[i * width + j] = index;
      }
    }
    return indexMap;
  }

  function encodeLabels(indexMap, data) {
    for (var i = 0; i < indexMap.length; ++i) {
      var value = indexMap[i];
      data[4 * i + 0] = value & 255;
      data[4 * i + 1] = (value >>> 8) & 255;
      data[4 * i + 2] = (value >>> 16) & 255;
      data[4 * i + 3] = 255;
    }
  }

  


/***/ }),

/***/ "./src/image/segmentation/slic.js":
/*!****************************************!*\
  !*** ./src/image/segmentation/slic.js ***!
  \****************************************/
/*! exports provided: slic */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slic", function() { return SLIC; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./src/image/segmentation/base.js");
/* harmony import */ var _compat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../compat */ "./src/image/compat.js");
/**
 * Javascript implementation of an image segmentation algorithm of
 *
 *    SLIC Superpixels
 *    Radhakrishna Achanta, Appu Shaji, Kevin Smith, Aurelien Lucchi, Pascal
 *    Fua, and Sabine Süsstrunk
 *    IEEE Transactions on Pattern Analysis and Machine Intelligence, vol. 34,
 *    num. 11, p. 2274 - 2282, May 2012.
 *
 * and based on the VLFeat implementation.
 *
 * API
 * ---
 *
 *    SLIC(imageURL, options)
 *
 * The function takes the following options.
 * * `regionSize` - Parameter of superpixel size
 * * `minRegionSize` - Minimum segment size in pixels.
 *
 * Copyright 2014  LongLong Yu.
 */



  // SLIC segmentation.
  function SLIC(imageData, options) {
    _base__WEBPACK_IMPORTED_MODULE_0__["BaseSegmentation"].call(this, imageData, options);
    options = options || {};
    this.regionSize = options.regionSize || 16;
    this.minRegionSize = options.minRegionSize ||
                         Math.round(this.regionSize * 0.8);
    this.maxIterations = options.maxIterations || 10;
    this._compute();
  }

  SLIC.prototype = Object.create(_base__WEBPACK_IMPORTED_MODULE_0__["BaseSegmentation"].prototype);

  SLIC.prototype.finer = function () {
    var newSize = Math.max(5, Math.round(this.regionSize / Math.sqrt(2.0)));
    if (newSize !== this.regionSize) {
      this.regionSize = newSize;
      this.minRegionSize = Math.round(newSize * 0.8);
      this._compute();
    }
  };

  SLIC.prototype.coarser = function () {
    var newSize = Math.min(640, Math.round(this.regionSize * Math.sqrt(2.0)));
    if (newSize !== this.regionSize) {
      this.regionSize = newSize;
      this.minRegionSize = Math.round(newSize * 0.8);
      this._compute();
    }
  };

  SLIC.prototype._compute = function () {
    this.result = computeSLICSegmentation(this.imageData,
                                          this.regionSize,
                                          this.minRegionSize,
                                          this.maxIterations);
  };

  // Convert RGBA into XYZ color space. rgba: Red Green Blue Alpha.
  function rgb2xyz(rgba, w, h) {
    var xyz = new Float32Array(3*w*h),
        gamma = 2.2;
    for (var i = 0; i<w*h; i++) {
      // 1.0 / 255.9 = 0.00392156862.
      var r = rgba[4*i+0] * 0.00392156862,
          g = rgba[4*i+1] * 0.00392156862,
          b = rgba[4*i+2] * 0.00392156862;
      r = Math.pow(r, gamma);
      g = Math.pow(g, gamma);
      b = Math.pow(b, gamma);
      xyz[i] = (r * 0.4887180 + g * 0.310680 + b * 0.2006020);
      xyz[i + w*h] = (r * 0.1762040 + g * 0.812985 + b * 0.0108109);
      xyz[i + 2*w*h] = (g * 0.0102048 + b * 0.989795);
    }
    return xyz;
  }

  // Convert XYZ to Lab.
  function xyz2lab(xyz, w, h) {
    function f(x) {
      if (x > 0.00856)
        return Math.pow(x, 0.33333333);
      else
        return 7.78706891568 * x + 0.1379310336;
    }
    var xw = 1.0 / 3.0,
        yw = 1.0 / 3.0,
        Yw = 1.0,
        Xw = xw / yw,
        Zw = (1-xw-yw) / (yw * Yw),
        ix = 1.0 / Xw,
        iy = 1.0 / Yw,
        iz = 1.0 / Zw,
        labData = new Float32Array(3*w*h);
    for (var i = 0; i<w*h; i++) {
      var fx = f(xyz[i] * ix),
          fy = f(xyz[w*h + i] * iy),
          fz = f(xyz[2*w*h + i] * iz);
      labData[i] = 116.0 * fy - 16.0;
      labData[i + w*h] = 500.0 * (fx - fy);
      labData[i + 2*w*h] = 200.0 * (fy - fz);
    }
    return labData;
  }

  // Compute gradient of 3 channel color space image.
  function computeEdge(image, edgeMap, w, h) {
    for (var k = 0; k<3; k++) {
      for (var y = 1; y<h-1; y++) {
        for (var x = 1; x<w-1; x++) {
          var a = image[k*w*h + y*w + x-1],
              b = image[k*w*h + y*w + x+1],
              c = image[k*w*h + (y+1)*w + x],
              d = image[k*w*h + (y-1)*w + x];
          edgeMap[y*w +x] += Math.pow(a-b, 2) + Math.pow(c-d, 2);
        }
      }
    }
  }

  // Initialize superpixel clusters.
  function initializeKmeansCenters(image,
                                   edgeMap,
                                   centers,
                                   clusterParams,
                                   numRegionsX,
                                   numRegionsY,
                                   regionSize,
                                   imW,
                                   imH) {
    var i = 0,
        j = 0,
        x,
        y;
    for (var v = 0; v < numRegionsY; v++) {
      for (var u = 0; u < numRegionsX; u++) {
        var centerx = 0,
            centery = 0,
            minEdgeValue = Infinity,
            xp,
            yp;
        x = parseInt(Math.round(regionSize * (u + 0.5)), 10);
        y = parseInt(Math.round(regionSize * (v + 0.5)), 10);
        x = Math.max(Math.min(x, imW-1),0);
        y = Math.max(Math.min(y, imH-1),0);
        // Search in a 3x3 neighbourhood the smallest edge response.
        for (yp = Math.max(0, y-1); yp <= Math.min(imH-1, y+1); ++yp) {
          for (xp = Math.max(0, x-1); xp <= Math.min(imW-1, x+1); ++xp) {
            var thisEdgeValue = edgeMap[yp * imW + xp];
            if (thisEdgeValue < minEdgeValue) {
              minEdgeValue = thisEdgeValue;
              centerx = xp;
              centery = yp;
            }
          }
        }

        // Initialize the new center at this location.
        centers[i++] = parseFloat(centerx);
        centers[i++] = parseFloat(centery);
        // 3 channels.
        centers[i++] = image[centery * imW + centerx];
        centers[i++] = image[imW * imH + centery * imW + centerx];
        centers[i++] = image[2 * imW * imH + centery * imW + centerx];
        // THIS IS THE VARIABLE VALUE OF M, just start with 5.
        clusterParams[j++] = 10*10;
        clusterParams[j++] = regionSize * regionSize;
      }
    }
  }

  // Re-compute clusters.
  function computeCenters(image,
                          segmentation,
                          masses,
                          centers,
                          numRegions,
                          imW,
                          imH) {
    var region;
    for (var y = 0; y < imH; y++) {
      for (var x = 0; x < imW; x++) {
        region = segmentation[x + y * imW];
        masses[region]++;
        centers[region * 5 + 0] += x;
        centers[region * 5 + 1] += y;
        centers[region * 5 + 2] += image[y*imW + x];
        centers[region * 5 + 3] += image[imW*imH + y*imW + x];
        centers[region * 5 + 4] += image[2*imW*imH + y*imW + x];
      }
    }
    for (region = 0; region < numRegions; region++) {
      var iMass = 1.0 / Math.max(masses[region], 1e-8);
      centers[region*5] = centers[region*5] * iMass;
      centers[region*5+1] = centers[region*5+1] * iMass;
      centers[region*5+2] = centers[region*5+2] * iMass;
      centers[region*5+3] = centers[region*5+3] * iMass;
      centers[region*5+4] = centers[region*5+4] * iMass;
    }
  }

  // Remove small superpixels and assign them the nearest superpixel label.
  function eliminateSmallRegions(segmentation,
                                 minRegionSize,
                                 numPixels,
                                 imW,
                                 imH) {
    var cleaned = new Int32Array(numPixels),
        segment = new Int32Array(numPixels),
        dx = new Array(1, -1, 0, 0),
        dy = new Array(0, 0, 1, -1),
        segmentSize,
        label,
        cleanedLabel,
        numExpanded,
        pixel,
        x,
        y,
        xp,
        yp,
        neighbor,
        direction;
    for (pixel = 0; pixel < numPixels; ++pixel) {
      if (cleaned[pixel]) continue;
      label = segmentation[pixel];
      numExpanded = 0;
      segmentSize = 0;
      segment[segmentSize++] = pixel;
      /** Find cleanedLabel as the label of an already cleaned region neighbor
       * of this pixel.
       */
      cleanedLabel = label + 1;
      cleaned[pixel] = label + 1;
      x = (pixel % imW);
      y = Math.floor(pixel / imW);
      for (direction = 0; direction < 4; direction++) {
        xp = x + dx[direction];
        yp = y + dy[direction];
        neighbor = xp + yp * imW;
        if (0 <= xp && xp < imW && 0 <= yp && yp < imH && cleaned[neighbor])
          cleanedLabel = cleaned[neighbor];
      }
      // Expand the segment.
      while (numExpanded < segmentSize) {
        var open = segment[numExpanded++];
        x = open % imW;
        y = Math.floor(open / imW);
        for (direction = 0; direction < 4; ++direction) {
          xp = x + dx[direction];
          yp = y + dy[direction];
          neighbor = xp + yp * imW;
          if (0 <= xp &&
              xp < imW &&
              0 <= yp &&
              yp < imH &&
              cleaned[neighbor] === 0 &&
              segmentation[neighbor] === label) {
            cleaned[neighbor] = label + 1;
            segment[segmentSize++] = neighbor;
          }
        }
      }

      // Change label to cleanedLabel if the semgent is too small.
      if (segmentSize < minRegionSize) {
        while (segmentSize > 0)
          cleaned[segment[--segmentSize]] = cleanedLabel;
      }
    }
    // Restore base 0 indexing of the regions.
    for (pixel = 0; pixel < numPixels; ++pixel)
      --cleaned[pixel];
    for (var i =0; i < numPixels; ++i)
      segmentation[i] = cleaned[i];
  }

  // Update cluster parameters.
  function updateClusterParams(segmentation, mcMap, msMap, clusterParams) {
    var mc = new Float32Array(clusterParams.length/2),
        ms = new Float32Array(clusterParams.length/2);
    for (var i = 0; i<segmentation.length; i++) {
      var region = segmentation[i];
      if (mc[region] < mcMap[region]) {
        mc[region] = mcMap[region];
        clusterParams[region*2+0] = mcMap[region];
      }
      if (ms[region] < msMap[region]) {
        ms[region] = msMap[region];
        clusterParams[region*2+1] = msMap[region];
      }
    }
  }

  // Assign superpixel label.
  function assignSuperpixelLabel(im,
                                 segmentation,
                                 mcMap,
                                 msMap,
                                 distanceMap,
                                 centers,
                                 clusterParams,
                                 numRegionsX,
                                 numRegionsY,
                                 regionSize,
                                 imW,
                                 imH) {
    var x,
        y;
    for (var i = 0; i < distanceMap.length; ++i)
      distanceMap[i] = Infinity;
    var S = regionSize;
    for (var region =0; region<numRegionsX * numRegionsY; ++region) {
      var cx = Math.round(centers[region*5+0]),
          cy = Math.round(centers[region*5+1]);
      for (y = Math.max(0, cy - S);  y < Math.min(imH, cy + S); ++y) {
        for (x = Math.max(0, cx - S); x < Math.min(imW, cx + S); ++x) {
          var spatial = (x - cx) * (x - cx) + (y - cy) * (y - cy),
              dR = im[y*imW + x] - centers[5*region + 2],
              dG = im[imW * imH + y*imW + x] - centers[5*region + 3],
              dB = im[2 * imW * imH + y*imW + x] - centers[5*region + 4],
              appearance = dR * dR + dG * dG + dB * dB,
              distance = Math.sqrt( appearance / clusterParams[region*2 + 0] +
                         spatial / clusterParams[region*2 + 1]);
          if (distance < distanceMap[y*imW + x]) {
            distanceMap[y*imW + x] = distance;
            segmentation[y*imW + x] = region;
          }
        }
      }
    }
    // Update the max distance of color and space.
    for (y = 0; y < imH; ++y) {
      for (x = 0; x < imW; ++x) {
        if (clusterParams[segmentation[y*imW + x]*2] < mcMap[y*imW + x])
          clusterParams[segmentation[y*imW + x]*2] = mcMap[y*imW + x];
        if (clusterParams[segmentation[y*imW + x]*2+1] < msMap[y*imW + x])
          clusterParams[segmentation[y*imW + x]*2+1] = msMap[y*imW + x];
      }
    }
  }

  // ...
  function computeResidualError(prevCenters, currentCenters) {
    var error = 0.0;
    for (var i = 0; i < prevCenters.length; ++i) {
      var d = prevCenters[i] - currentCenters[i];
      error += Math.sqrt(d*d);
    }
    return error;
  }

  // Remap label indices.
  function remapLabels(segmentation) {
    var map = {},
        index = 0;
    for (var i = 0; i < segmentation.length; ++i) {
      var label = segmentation[i];
      if (map[label] === undefined)
        map[label] = index++;
      segmentation[i] = map[label];
    }
    return index;
  }

  // Encode labels in RGB.
  function encodeLabels(segmentation, data) {
    for (var i = 0; i < segmentation.length; ++i) {
      var value = Math.floor(segmentation[i]);
      data[4 * i + 0] = value & 255;
      data[4 * i + 1] = (value >>> 8) & 255;
      data[4 * i + 2] = (value >>> 16) & 255;
      data[4 * i + 3] = 255;
    }
  }

  // Compute SLIC Segmentation.
  function computeSLICSegmentation(imageData,
                                   regionSize,
                                   minRegionSize,
                                   maxIterations) {
    var i,
        imWidth = imageData.width,
        imHeight = imageData.height,
        numRegionsX = Math.floor(imWidth / regionSize),
        numRegionsY = Math.floor(imHeight / regionSize),
        numRegions = Math.floor(numRegionsX * numRegionsY),
        numPixels = Math.floor(imWidth * imHeight),
        edgeMap = new Float32Array(numPixels),
        masses = new Array(numPixels),
        // 2 (geometric: x & y) and 3 (RGB or Lab)
        currentCenters = new Float32Array((2+3)*numRegions),
        newCenters = new Float32Array((2+3)*numRegions),
        clusterParams = new Float32Array(2*numRegions),
        mcMap = new Float32Array(numPixels),
        msMap = new Float32Array(numPixels),
        distanceMap = new Float32Array(numPixels),
        xyzData = rgb2xyz(imageData.data, imWidth, imHeight),
        labData = xyz2lab(xyzData, imWidth, imHeight);
    // Compute edge.
    computeEdge(labData, edgeMap, imWidth, imHeight);
    // Initialize K-Means Centers.
    initializeKmeansCenters(labData,
                            edgeMap,
                            currentCenters,
                            clusterParams,
                            numRegionsX,
                            numRegionsY,
                            regionSize,
                            imWidth,
                            imHeight);
    var segmentation = new Int32Array(numPixels);
    /** SLICO implementation: "SLIC Superpixels Compared to State-of-the-art
     * Superpixel Methods"
     */
    for (var iter = 0; iter < maxIterations; ++iter) {
      // Do assignment.
      assignSuperpixelLabel(labData,
                            segmentation,
                            mcMap,
                            msMap,
                            distanceMap,
                            currentCenters,
                            clusterParams,
                            numRegionsX,
                            numRegionsY,
                            regionSize,
                            imWidth,
                            imHeight);
      // Update maximum spatial and color distances [1].
      updateClusterParams(segmentation, mcMap, msMap, clusterParams);
      // Compute new centers.
      for (i = 0; i < masses.length; ++i)
        masses[i] = 0;
      for (i = 0; i < newCenters.length; ++i)
        newCenters[i] = 0;
      computeCenters(labData,
                     segmentation,
                     masses,
                     newCenters,
                     numRegions,
                     imWidth,
                     imHeight);
      // Compute residual error of assignment.
      var error = computeResidualError(currentCenters, newCenters);
      if (error < 1e-5)
        break;
      for (i = 0; i < currentCenters.length; ++i)
        currentCenters[i] = newCenters[i];
    }
    eliminateSmallRegions(segmentation,
                          minRegionSize,
                          numPixels,
                          imWidth,
                          imHeight);
    // Refresh the canvas.
    var result = _compat__WEBPACK_IMPORTED_MODULE_1__["createImageData"](imWidth, imHeight);
    result.numSegments = remapLabels(segmentation);
    encodeLabels(segmentation, result.data);
    return result;
  }

  


/***/ }),

/***/ "./src/image/segmentation/slico.js":
/*!*****************************************!*\
  !*** ./src/image/segmentation/slico.js ***!
  \*****************************************/
/*! exports provided: slico */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slico", function() { return SLICO; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./src/image/segmentation/base.js");
/** SLICO segmentation implementation.
 *
 *    SLIC Superpixels
 *    Radhakrishna Achanta, Appu Shaji, Kevin Smith, Aurelien Lucchi, Pascal
 *    Fua, and Sabine Süsstrunk
 *    IEEE Transactions on Pattern Analysis and Machine Intelligence, vol. 34,
 *    num. 11, p. 2274 - 2282, May 2012.
 *
 *  http://ivrl.epfl.ch/research/superpixels
 *
 * Copyright 2015  Kota Yamaguchi
 */


  function SLICO(imageData, options) {
    _base__WEBPACK_IMPORTED_MODULE_0__["BaseSegmentation"].call(this, imageData, options);
    this.width  = this.imageData.width;
    this.height = this.imageData.height;
    options = options || {};
    this.method = options.method || "FixedK";
    this.perturb = (typeof options.perturb === "undefined") ?
            true : options.perturb;
    this.maxIterations = options.maxIterations || 10;
    this.K = options.K || 1024;
    this.step = options.step || 200;
    this.enforceConnectivity = (options.enforceConnectivity === false) ?
                                false : true;
    this._compute();
  }

  SLICO.prototype = Object.create(_base__WEBPACK_IMPORTED_MODULE_0__["BaseSegmentation"].prototype);

  SLICO.prototype.finer = function () {
    var newK = Math.min(8962, Math.round(this.K * (2.0)));
    if (newK !== this.K) {
      this.K = newK;
      this._compute();
    }
  };

  SLICO.prototype.coarser = function () {
    var newK = Math.max(16, Math.round(this.K / (2.0)));
    if (newK !== this.K) {
      this.K = newK;
      this._compute();
    }
  };

  SLICO.prototype._compute = function () {
    var labels = (this.method === "FixedK") ?
        this.performSLICOForGivenK() : this.performSLICOForGivenStepSize();
    var result = new ImageData(this.width, this.height);
    result.numSegments = remapLabels(labels);
    encodeLabels(labels, result.data);
    this.result = result;
  };

  // sRGB (D65 illuninant assumption) to XYZ conversion.
  SLICO.prototype.rgb2xyz = function (sRGB) {
    var R = parseInt(sRGB[0], 10) / 255.0,
        G = parseInt(sRGB[1], 10) / 255.0,
        B = parseInt(sRGB[2], 10) / 255.0,
        r = (R <= 0.04045) ? R / 12.92 : Math.pow((R + 0.055) / 1.055, 2.4),
        g = (G <= 0.04045) ? G / 12.92 : Math.pow((R + 0.055) / 1.055, 2.4),
        b = (B <= 0.04045) ? B / 12.92 : Math.pow((R + 0.055) / 1.055, 2.4);
    return [
      r * 0.4124564 + g * 0.3575761 + b * 0.1804375,
      r * 0.2126729 + g * 0.7151522 + b * 0.0721750,
      r * 0.0193339 + g * 0.1191920 + b * 0.9503041
    ];
  };

  // sRGB to Lab conversion.
  SLICO.prototype.rgb2lab = function (sRGB) {
    var epsilon = 0.008856,  //actual CIE standard
        kappa   = 903.3,     //actual CIE standard
        Xr = 0.950456,       //reference white
        Yr = 1.0,            //reference white
        Zr = 1.088754,       //reference white
        xyz = this.rgb2xyz(sRGB),
        xr = xyz[0] / Xr,
        yr = xyz[1] / Yr,
        zr = xyz[2] / Zr,
        fx = (xr > epsilon) ?
            Math.pow(xr, 1.0/3.0) : (kappa * xr + 16.0) / 116.0,
        fy = (yr > epsilon) ?
            Math.pow(yr, 1.0/3.0) : (kappa * yr + 16.0) / 116.0,
        fz = (zr > epsilon) ?
            Math.pow(zr, 1.0/3.0) : (kappa * zr + 16.0) / 116.0;
    return [
      116.0 * fy - 16.0,
      500.0 * (fx - fy),
      200.0 * (fy - fz)
    ];
  };

  SLICO.prototype.doRGBtoLABConversion = function (imageData) {
    var size = this.width * this.height,
        data = imageData.data;
    this.lvec = new Float64Array(size);
    this.avec = new Float64Array(size);
    this.bvec = new Float64Array(size);
    for (var j = 0; j < size; ++j) {
      var r = data[4 * j + 0],
          g = data[4 * j + 1],
          b = data[4 * j + 2];
      var lab = this.rgb2lab([r, g, b]);
      this.lvec[j] = lab[0];
      this.avec[j] = lab[1];
      this.bvec[j] = lab[2];
    }
  };

  SLICO.prototype.detectLabEdges = function () {
    var w = this.width;
    this.edges = fillArray(new Float64Array(this.width * this.height), 0);
    for (var j = 1; j < this.height - 1; ++j) {
      for (var k = 1; k < this.width - 1; ++k) {
        var i = parseInt(j * this.width + k, 10),
            dx = Math.pow(this.lvec[i - 1] - this.lvec[i + 1], 2) +
                 Math.pow(this.avec[i - 1] - this.avec[i + 1], 2) +
                 Math.pow(this.bvec[i - 1] - this.bvec[i + 1], 2),
            dy = Math.pow(this.lvec[i - w] - this.lvec[i + w], 2) +
                 Math.pow(this.avec[i - w] - this.avec[i + w], 2) +
                 Math.pow(this.bvec[i - w] - this.bvec[i + w], 2);
        this.edges[i] = dx + dy;
      }
    }
  };

  SLICO.prototype.perturbSeeds = function () {
    var dx8 = [-1, -1,  0,  1, 1, 1, 0, -1],
        dy8 = [ 0, -1, -1, -1, 0, 1, 1,  1],
        numSeeds = this.kSeedsL.length;
    for (var n = 0; n < numSeeds; ++n) {
      var ox = parseInt(this.kSeedsX[n], 10),  //original x
          oy = parseInt(this.kSeedsY[n], 10),  //original y
          oind = parseInt(oy * this.width + ox, 10),
          storeind = parseInt(oind, 10);
      for (var i = 0; i < 8; ++i) {
        var nx = parseInt(ox + dx8[i], 10);  //new x
        var ny = parseInt(oy + dy8[i], 10);  //new y
        if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
          var nind = parseInt(ny * this.width + nx, 10);
          if (this.edges[nind] < this.edges[storeind])
            storeind = nind;
        }
      }
      if (storeind != oind) {
        this.kSeedsX[n] = Math.floor(storeind % this.width);
        this.kSeedsY[n] = Math.floor(storeind / this.width);
        this.kSeedsL[n] = this.lvec[storeind];
        this.kSeedsA[n] = this.avec[storeind];
        this.kSeedsB[n] = this.bvec[storeind];
      }
    }
  };

  SLICO.prototype.getLABXYSeedsForGivenStepSize = function(step, perturb) {
    var n = 0,
        xstrips = Math.round(0.5 + parseFloat(this.width) / parseFloat(step)),
        ystrips = Math.round(0.5 + parseFloat(this.height) / parseFloat(step)),
        xerr = Math.round(this.width  - step * xstrips),
        yerr = Math.round(this.height - step * ystrips),
        xerrperstrip = parseFloat(xerr) / parseFloat(xstrips),
        yerrperstrip = parseFloat(yerr) / parseFloat(ystrips),
        xoff = Math.floor(step / 2),
        yoff = Math.floor(step / 2),
        numSeeds = xstrips * ystrips;
    this.kSeedsL = new Float64Array(numSeeds);
    this.kSeedsA = new Float64Array(numSeeds);
    this.kSeedsB = new Float64Array(numSeeds);
    this.kSeedsX = new Float64Array(numSeeds);
    this.kSeedsY = new Float64Array(numSeeds);
    for (var y = 0; y < ystrips; ++y) {
      var ye = Math.floor(y * yerrperstrip);
      for (var x = 0; x < xstrips; ++x) {
        var xe = Math.floor(x * xerrperstrip);
        var i = Math.floor((y * step + yoff + ye) * this.width +
                           (x * step + xoff + xe));
        this.kSeedsL[n] = this.lvec[i];
        this.kSeedsA[n] = this.avec[i];
        this.kSeedsB[n] = this.bvec[i];
        this.kSeedsX[n] = (x * step + xoff + xe);
        this.kSeedsY[n] = (y * step + yoff + ye);
        ++n;
      }
    }
    if (perturb)
      this.perturbSeeds();
  };

  SLICO.prototype.getLABXYSeedsForGivenK = function(K, perturb) {
    var size = Math.floor(this.width * this.height);
    var step = Math.sqrt(parseFloat(size) / parseFloat(K));
    var xoff = Math.round(step / 2);
    var yoff = Math.round(step / 2);
    var n = 0;
    var r = 0;
    this.kSeedsL = [];
    this.kSeedsA = [];
    this.kSeedsB = [];
    this.kSeedsX = [];
    this.kSeedsY = [];
    for (var y = 0; y < this.height; ++y) {
      var Y = Math.floor(y * step + yoff);
      if (Y > this.height - 1)
        break;
      for (var x = 0; x < this.width; ++x) {
        //var X = x*step + xoff;  //square grid
        var X = Math.floor(x * step + (xoff << (r & 0x1)));  //hex grid
        if (X > this.width - 1)
          break;
        var i = Math.floor(Y * this.width + X);
        this.kSeedsL.push(this.lvec[i]);
        this.kSeedsA.push(this.avec[i]);
        this.kSeedsB.push(this.bvec[i]);
        this.kSeedsX.push(X);
        this.kSeedsY.push(Y);
        ++n;
      }
      ++r;
    }
    if (perturb)
      this.perturbSeeds();
  };

  function fillArray(array, value) {
    for (var i = 0; i < array.length; ++i)
      array[i] = value;
    return array;
  }

  SLICO.prototype.performSuperpixelSegmentationVariableSandM = function (
    kLabels,
    step,
    maxIterations
    ) {
    var size = Math.floor(this.width * this.height),
        numK = this.kSeedsL.length,
        numIter = 0,
        offset = Math.floor((step < 10) ? step * 1.5 : step),
        sigmal = fillArray(new Float64Array(numK), 0),
        sigmaa = fillArray(new Float64Array(numK), 0),
        sigmab = fillArray(new Float64Array(numK), 0),
        sigmax = fillArray(new Float64Array(numK), 0),
        sigmay = fillArray(new Float64Array(numK), 0),
        clusterSize = fillArray(new Int32Array(numK), 0),
        distxy = fillArray(new Float64Array(size), Infinity),
        distlab = fillArray(new Float64Array(size), Infinity),
        distvec = fillArray(new Float64Array(size), Infinity),
        maxlab = fillArray(new Float64Array(numK), Math.pow(10, 2)),
        maxxy = fillArray(new Float64Array(numK), Math.pow(step, 2)),
        i, j, k, n, x, y;
    while (numIter < maxIterations) {
      ++numIter;
      // Assign the closest cluster.
      fillArray(distvec, Infinity);
      for (n = 0; n < numK; ++n) {
        var y1 = Math.floor(Math.max(0, this.kSeedsY[n] - offset)),
            y2 = Math.floor(Math.min(this.height, this.kSeedsY[n] + offset)),
            x1 = Math.floor(Math.max(0, this.kSeedsX[n] - offset)),
            x2 = Math.floor(Math.min(this.width, this.kSeedsX[n] + offset));
        for (y = y1; y < y2; ++y) {
          for (x = x1; x < x2; ++x) {
            i = Math.floor(y * this.width + x);
            if (!(y < this.height && x < this.width && y >= 0 && x >= 0))
              throw "Assertion error";
            var l = this.lvec[i],
                a = this.avec[i],
                b = this.bvec[i];
            distlab[i] = Math.pow(l - this.kSeedsL[n], 2) +
                         Math.pow(a - this.kSeedsA[n], 2) +
                         Math.pow(b - this.kSeedsB[n], 2);
            distxy[i] = Math.pow(x - this.kSeedsX[n], 2) +
                        Math.pow(y - this.kSeedsY[n], 2);
            var dist = distlab[i] / maxlab[n] + distxy[i] / maxxy[n];
            if (dist < distvec[i]) {
              distvec[i] = dist;
              kLabels[i] = n;
            }
          }
        }
      }
      //console.log("iter = " + numIter + ", sum_dist = " + sum(distvec));
      // Assign the max color distance for a cluster.
      if (numIter === 0) {
        fillArray(maxlab, 1);
        fillArray(maxxy, 1);
      }
      for (i = 0; i < size; ++i) {
        if (maxlab[kLabels[i]] < distlab[i])
          maxlab[kLabels[i]] = distlab[i];
        if (maxxy[kLabels[i]] < distxy[i])
          maxxy[kLabels[i]] = distxy[i];
      }
      // Recalculate the centroid and store in the seed values.
      fillArray(sigmal, 0);
      fillArray(sigmaa, 0);
      fillArray(sigmab, 0);
      fillArray(sigmax, 0);
      fillArray(sigmay, 0);
      fillArray(clusterSize, 0);
      for (j = 0; j < size; ++j) {
        var temp = kLabels[j];
        if (temp < 0)
          throw "Assertion error";
        sigmal[temp] += this.lvec[j];
        sigmaa[temp] += this.avec[j];
        sigmab[temp] += this.bvec[j];
        sigmax[temp] += (j % this.width);
        sigmay[temp] += (j / this.width);
        clusterSize[temp]++;
      }
      for (k = 0; k < numK; ++k) {
        if (clusterSize[k] <= 0)
          clusterSize[k] = 1;
        //computing inverse now to multiply, than divide later.
        var inv = 1.0 / clusterSize[k];
        this.kSeedsL[k] = sigmal[k] * inv;
        this.kSeedsA[k] = sigmaa[k] * inv;
        this.kSeedsB[k] = sigmab[k] * inv;
        this.kSeedsX[k] = sigmax[k] * inv;
        this.kSeedsY[k] = sigmay[k] * inv;
      }
    }
  };

  SLICO.prototype.enforceLabelConnectivity = function (labels, nlabels, K) {
    var dx4 = [-1,  0,  1,  0],
        dy4 = [ 0, -1,  0,  1],
        size = this.width * this.height,
        SUPSZ = Math.floor(size / K),
        c, n, x, y, nindex;
    var label = 0,
        xvec = new Int32Array(size),
        yvec = new Int32Array(size),
        oindex = 0,
        adjlabel = 0;  // adjacent label
    for (var j = 0; j < this.height; ++j) {
      for (var k = 0; k < this.width; ++k) {
        if (nlabels[oindex] < 0) {
          nlabels[oindex] = label;
          // Start a new segment.
          xvec[0] = k;
          yvec[0] = j;
          //  Quickly find an adjacent label for use later if needed.
          for (n = 0; n < 4; ++n) {
            x = Math.floor(xvec[0] + dx4[n]);
            y = Math.floor(yvec[0] + dy4[n]);
            if ((x >= 0 && x < this.width) && (y >= 0 && y < this.height)) {
              nindex = Math.floor(y * this.width + x);
              if (nlabels[nindex] >= 0)
                adjlabel = nlabels[nindex];
            }
          }
          var count = 1;
          for (c = 0; c < count; ++c) {
            for (n = 0; n < 4; ++n) {
              x = Math.floor(xvec[c] + dx4[n]);
              y = Math.floor(yvec[c] + dy4[n]);
              if ((x >= 0 && x < this.width) && (y >= 0 && y < this.height)) {
                nindex = Math.floor(y * this.width + x);
                if (nlabels[nindex] < 0 && labels[oindex] == labels[nindex]) {
                  xvec[count] = x;
                  yvec[count] = y;
                  nlabels[nindex] = label;
                  ++count;
                }
              }
            }
          }
          // If segment size is less then a limit, assign an
          // adjacent label found before, and decrement label count.
          if (count <= SUPSZ >> 2) {
            for (c = 0; c < count; c++ ) {
              var ind = Math.floor(yvec[c] * this.width + xvec[c]);
              nlabels[ind] = adjlabel;
            }
            --label;
          }
          ++label;
        }
        ++oindex;
      }
    }
    return label;
  };

  SLICO.prototype.performSLICOForGivenStepSize = function() {
    var size = this.width * this.height,
        kLabels = fillArray(new Int32Array(size), -1);
    this.doRGBtoLABConversion(this.imageData);
    if (this.perturb)
      this.detectLabEdges();
    this.getLABXYSeedsForGivenStepSize(this.step, this.perturb);
    this.performSuperpixelSegmentationVariableSandM(kLabels,
                                                    this.step,
                                                    this.maxIterations);
    var numlabels = kLabels.length;
    if (this.enforceConnectivity) {
      var nlabels = fillArray(new Int32Array(size), -1);
      numlabels = this.enforceLabelConnectivity(kLabels,
                                                nlabels,
                                                size / (this.step * this.estep));
      for (var i = 0; i < size; ++i)
        kLabels[i] = nlabels[i];
    }
    return kLabels;
  };

  SLICO.prototype.performSLICOForGivenK = function() {
    var size = this.width * this.height,
        kLabels = fillArray(new Int32Array(size), -1);
    this.doRGBtoLABConversion(this.imageData);
    if (this.perturb)
      this.detectLabEdges();
    this.getLABXYSeedsForGivenK(this.K, this.perturb);
    var step = Math.sqrt(size / this.K) + 2.0;
    this.performSuperpixelSegmentationVariableSandM(kLabels,
                                                    step,
                                                    this.maxIterations);
    var numlabels = kLabels.length;
    if (this.enforceConnectivity) {
      var nlabels = fillArray(new Int32Array(size), -1);
      numlabels = this.enforceLabelConnectivity(kLabels, nlabels, this.K);
      for (var i = 0; i < size; ++i)
        kLabels[i] = nlabels[i];
    }
    return kLabels;
  };

  SLICO.prototype.drawContoursAroundSegments = function (result) {
    var imageData = new ImageData(this.width, this.height),
        data = fillArray(imageData.data, 255),
        color = [255, 0, 0],
        dx8 = [-1, -1,  0,  1, 1, 1, 0, -1],
        dy8 = [ 0, -1, -1, -1, 0, 1, 1,  1],
        istaken = fillArray(new Uint8Array(this.width * this.height), 0);
    var mainindex = 0;
    for (var j = 0; j < this.height; ++j) {
      for (var k = 0; k < this.width; ++k) {
        var np = 0;
        for (var i = 0; i < 8; ++i) {
          var x = k + dx8[i],
              y = j + dy8[i];
          if ((x >= 0 && x < this.width) && (y >= 0 && y < this.height)) {
            var index = y * this.width + x;
            if (istaken[index] === 0 &&
                result.labels[mainindex] !== result.labels[index])
              ++np;
          }
        }
        if (np > 1) {
          data[4 * mainindex + 0] = color[0];
          data[4 * mainindex + 1] = color[1];
          data[4 * mainindex + 2] = color[2];
        }
        ++mainindex;
      }
    }
    return imageData;
  };

  // Remap label indices.
  function remapLabels(labels) {
    var map = {},
        index = 0;
    for (var i = 0; i < labels.length; ++i) {
      var label = labels[i];
      if (map[label] === undefined)
        map[label] = index++;
        labels[i] = map[label];
    }
    return index;
  }

  function encodeLabels(labels, data) {
    for (var i = 0; i < labels.length; ++i) {
      var label = labels[i];
      data[4 * i + 0] = 255 & label;
      data[4 * i + 1] = 255 & (label >> 8);
      data[4 * i + 2] = 255 & (label >> 16);
      data[4 * i + 3] = 255;
    }
  }

  


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_edit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/edit */ "./src/app/edit.js");
/* Main page dispatcher.
*/


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
      Object(_app_edit__WEBPACK_IMPORTED_MODULE_0__["render"])(data, params);
      callback&&callback();
    };
    window.Template.setTemplateData({baseImg:""},"data/images/4.png",function(){
      console.log('finish')
    })
   

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9lZGl0LmpzIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXIvc2VnbWVudC1hbm5vdGF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlci91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UvY29tcGF0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZS9sYXllci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UvbW9ycGguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlL21vcnBoL21heC1maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlL21vcnBoL25laWdoYm9yLW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2Uvc2VnbWVudGF0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZS9zZWdtZW50YXRpb24vYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2Uvc2VnbWVudGF0aW9uL3BmZi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2Uvc2VnbWVudGF0aW9uL3NsaWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlL3NlZ21lbnRhdGlvbi9zbGljby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNzQztBQUNpQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELGtCQUFrQixFQUFFO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxrQkFBa0IsRUFBRTtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUEwQjs7Ozs7Ozs7Ozs7OztBQ3ZlMUI7QUFBQTtBQUFBO0FBQ0E7QUFDOEM7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLHVEQUF1RCxNQUFNO0FBQzdELHVFQUF1RSxnQkFBZ0I7QUFDdkYsNkRBQTZELE1BQU0sSUFBSSxRQUFRO0FBQy9FO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBLDBDQUEwQyxNQUFNO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyRDtBQUNBO0FBQ0EsTUFBTSx3REFBUTtBQUNkO0FBQ0E7QUFDQSxxQ0FBcUMsV0FBVztBQUNoRDtBQUNBLEtBQUsiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi5qc1wiKTtcbiIsIi8qKiBFZGl0b3IgcGFnZSByZW5kZXJlci5cbiAqL1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9pbWFnZS9sYXllcidcbmltcG9ydCB7IEFubm90YXRvciB9IGZyb20gJy4uL2hlbHBlci9zZWdtZW50LWFubm90YXRvcidcbi8vIENyZWF0ZSB0aGUgbmF2aWdhdGlvbiBtZW51LlxudmFyIG91dGRhdGEgPSAnJztcbnZhciBvdXRwYXJhbXMgPSAnJztcbnZhciBvdXRzaXplID0gJyc7XG4vLyBDcmVhdGUgdGhlIG1haW4gY29udGVudCBibG9jay5cbmZ1bmN0aW9uIGNyZWF0ZU1haW5EaXNwbGF5KHBhcmFtcywgZGF0YSwgYW5ub3RhdG9yLCBpbWFnZUxheWVyKSB7XG4gIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgIGFubm90YXRvclRvcE1lbnUgPSBjcmVhdGVJbWFnZVRvcE1lbnUocGFyYW1zLCBkYXRhLCBhbm5vdGF0b3IpLFxuICAgIGFubm90YXRvckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksXG4gICAgc2lkZWJhclNwYWNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksXG4gICAgc2lkZWJhckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksXG4gICAgc2lkZWJhciA9IGNyZWF0ZVNpZGViYXIocGFyYW1zLCBkYXRhLCBhbm5vdGF0b3IpLFxuXG4gICAgY2hhbmdlc2l6ZWJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiksXG4gICAgY2hhbmdlc2l6ZWlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpLFxuICAgIGNoYW5nZXNpemVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGFubm90YXRvckNvbnRhaW5lci5jbGFzc05hbWUgPSBcImVkaXQtaW1hZ2UtZGlzcGxheVwiO1xuICBhbm5vdGF0b3JDb250YWluZXIuYXBwZW5kQ2hpbGQoYW5ub3RhdG9yVG9wTWVudSk7XG4gIGFubm90YXRvckNvbnRhaW5lci5hcHBlbmRDaGlsZChhbm5vdGF0b3IuY29udGFpbmVyKTtcbiAgc2lkZWJhclNwYWNlci5jbGFzc05hbWUgPSBcImVkaXQtaW1hZ2UtdG9wLW1lbnVcIjtcbiAgc2lkZWJhckNvbnRhaW5lci5jbGFzc05hbWUgPSBcImVkaXQtaW1hZ2UtZGlzcGxheVwiO1xuICBzaWRlYmFyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNpZGViYXIpO1xuICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJlZGl0LW1haW4tY29udGFpbmVyXCI7XG4gIGNvbnRhaW5lci5pZCA9IFwiQWxsTWlnaHRcIjtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFubm90YXRvckNvbnRhaW5lcik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzaWRlYmFyQ29udGFpbmVyKTtcblxuICBjaGFuZ2VzaXplaW5wdXQuY2xhc3NOYW1lID0gXCJlZGl0LXNpemUtaW5wdXRcIjtcbiAgY2hhbmdlc2l6ZWJ1dHRvbi5jbGFzc05hbWUgPSBcImVkaXQtc2l6ZS1idXR0b25cIjtcbiAgY2hhbmdlc2l6ZWlucHV0LnBsYWNlaG9sZGVyID0gJ+abtOaUueWdl+Wkp+WwjydcbiAgY2hhbmdlc2l6ZWJ1dHRvbi5pbm5lclRleHQgPSAn5pu05pS5J1xuICBjaGFuZ2VzaXplcC5pbm5lclRleHQgPSAn55uu5YmN5Z2X5aSn5bCPJyArIG91dHNpemVcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY2hhbmdlc2l6ZWlucHV0KTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNoYW5nZXNpemVidXR0b24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY2hhbmdlc2l6ZXApO1xuICBjaGFuZ2VzaXplYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgLy9hbGVydChjaGFuZ2VzaXplaW5wdXQudmFsdWUpXG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6IFwic2xpY1wiLFxuICAgICAgcmVnaW9uU2l6ZTogY2hhbmdlc2l6ZWlucHV0LnZhbHVlIC0gMFxuICAgIH1cbiAgICBhbm5vdGF0b3IucmVzZXRTdXBlcnBpeGVscyhvcHRpb25zKVxuICAgIC8vcmVuZGVyKG91dGRhdGEsIG91dHBhcmFtcywgY2hhbmdlc2l6ZWlucHV0LnZhbHVlIC0gMClcbiAgfSk7XG4gIGNvbnNvbGUubG9nKGNvbnRhaW5lcilcbiAgcmV0dXJuIGNvbnRhaW5lcjtcbn1cblxuLy8gQ3JlYXRlIHRoZSBtZW51IGFib3ZlIHRoZSBlZGl0b3IuXG5mdW5jdGlvbiBjcmVhdGVJbWFnZVRvcE1lbnUocGFyYW1zLCBkYXRhLCBhbm5vdGF0b3IpIHtcbiAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksXG4gICAgem9vbU91dEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksXG4gICAgem9vbUluQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxcbiAgICBzcGFjZXIxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIiksXG4gICAgZmluZXJCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgIGJvdW5kYXJ5QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxcbiAgICBjb2Fyc2VyQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxcbiAgICBzcGFjZXIyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIiksXG4gICAgYWxwaGFNaW51c0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksXG4gICAgaW1hZ2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgIGFscGhhUGx1c0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHpvb21PdXRCdXR0b24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCItXCIpKTtcbiAgem9vbU91dEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1pbWFnZS10b3AtYnV0dG9uXCIpO1xuICB6b29tT3V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgYW5ub3RhdG9yLnpvb21PdXQoKTtcbiAgfSk7XG4gIHpvb21JbkJ1dHRvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcInpvb20gK1wiKSk7XG4gIHpvb21JbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1pbWFnZS10b3AtYnV0dG9uXCIpO1xuICB6b29tSW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBhbm5vdGF0b3Iuem9vbUluKCk7XG4gIH0pO1xuICBzcGFjZXIxLmNsYXNzTmFtZSA9IFwiZWRpdC1pbWFnZS10b3Atc3BhY2VyXCI7XG4gIGJvdW5kYXJ5QnV0dG9uLmlkID0gXCJib3VuZGFyeS1idXR0b25cIjtcbiAgYm91bmRhcnlCdXR0b24uY2xhc3NOYW1lID0gXCJlZGl0LWltYWdlLXRvcC1idXR0b25cIjtcbiAgYm91bmRhcnlCdXR0b24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJib3VuZGFyeVwiKSk7XG4gIGJvdW5kYXJ5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGJvdW5kYXJ5Rmxhc2hUaW1lb3V0SUQpXG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGJvdW5kYXJ5Rmxhc2hUaW1lb3V0SUQpO1xuICAgIGlmIChib3VuZGFyeUJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0LWltYWdlLXRvcC1idXR0b24tZW5hYmxlZFwiKSlcbiAgICAgIGFubm90YXRvci5oaWRlKFwiYm91bmRhcnlcIik7XG4gICAgZWxzZVxuICAgICAgYW5ub3RhdG9yLnNob3coXCJib3VuZGFyeVwiKTtcbiAgICBib3VuZGFyeUJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKFwiZWRpdC1pbWFnZS10b3AtYnV0dG9uLWVuYWJsZWRcIik7XG4gIH0pO1xuICBmaW5lckJ1dHRvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIi1cIikpO1xuICBmaW5lckJ1dHRvbi5jbGFzc05hbWUgPSBcImVkaXQtaW1hZ2UtdG9wLWJ1dHRvblwiO1xuICBmaW5lckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgIGFubm90YXRvci5maW5lcigpO1xuICAgIGJvdW5kYXJ5Rmxhc2goKTtcbiAgfSk7XG4gIGNvYXJzZXJCdXR0b24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCIrXCIpKTtcbiAgY29hcnNlckJ1dHRvbi5jbGFzc05hbWUgPSBcImVkaXQtaW1hZ2UtdG9wLWJ1dHRvblwiO1xuICBjb2Fyc2VyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgYW5ub3RhdG9yLmNvYXJzZXIoKTtcbiAgICBib3VuZGFyeUZsYXNoKCk7XG4gIH0pO1xuICBzcGFjZXIyLmNsYXNzTmFtZSA9IFwiZWRpdC1pbWFnZS10b3Atc3BhY2VyXCI7XG4gIGFscGhhTWludXNCdXR0b24uY2xhc3NOYW1lID0gXCJlZGl0LWltYWdlLXRvcC1idXR0b25cIjtcbiAgYWxwaGFNaW51c0J1dHRvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIi1cIikpO1xuICBhbHBoYU1pbnVzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgYW5ub3RhdG9yLm1vcmVBbHBoYSgpO1xuICB9KTtcbiAgaW1hZ2VCdXR0b24uY2xhc3NOYW1lID0gXCJlZGl0LWltYWdlLXRvcC1idXR0b24gXCIgK1xuICAgIFwiZWRpdC1pbWFnZS10b3AtYnV0dG9uLWVuYWJsZWRcIjtcbiAgaW1hZ2VCdXR0b24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJpbWFnZVwiKSk7XG4gIGltYWdlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGltYWdlQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcImVkaXQtaW1hZ2UtdG9wLWJ1dHRvbi1lbmFibGVkXCIpKVxuICAgICAgYW5ub3RhdG9yLmhpZGUoXCJpbWFnZVwiKTtcbiAgICBlbHNlXG4gICAgICBhbm5vdGF0b3Iuc2hvdyhcImltYWdlXCIpO1xuICAgIGltYWdlQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoXCJlZGl0LWltYWdlLXRvcC1idXR0b24tZW5hYmxlZFwiKTtcbiAgfSk7XG4gIGFscGhhUGx1c0J1dHRvbi5jbGFzc05hbWUgPSBcImVkaXQtaW1hZ2UtdG9wLWJ1dHRvblwiO1xuICBhbHBoYVBsdXNCdXR0b24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCIrXCIpKTtcbiAgYWxwaGFQbHVzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgYW5ub3RhdG9yLmxlc3NBbHBoYSgpO1xuICB9KTtcbiAgLy9cbiAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiZWRpdC1pbWFnZS10b3AtbWVudVwiO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoem9vbU91dEJ1dHRvbik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh6b29tSW5CdXR0b24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3BhY2VyMSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmaW5lckJ1dHRvbik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChib3VuZGFyeUJ1dHRvbik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb2Fyc2VyQnV0dG9uKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNwYWNlcjIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYWxwaGFNaW51c0J1dHRvbik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChpbWFnZUJ1dHRvbik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhbHBoYVBsdXNCdXR0b24pO1xuICByZXR1cm4gY29udGFpbmVyO1xufVxuXG4vLyBTZXQgdXAgdGhlIGF1dG9tYXRpYyBmbGFzaCBvZiBib3VuZGFyeS5cbnZhciBib3VuZGFyeUZsYXNoVGltZW91dElEID0gbnVsbDtcbmZ1bmN0aW9uIGJvdW5kYXJ5Rmxhc2goKSB7XG4gIHZhciBib3VuZGFyeUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm91bmRhcnktYnV0dG9uXCIpO1xuICAvL2NvbnNvbGUubG9nKCdib3VuZGFyeUZsYXNoVGltZW91dElEJywgYm91bmRhcnlGbGFzaFRpbWVvdXRJRCk7XG4gIGlmIChib3VuZGFyeUZsYXNoVGltZW91dElEKSB7XG4gICAgd2luZG93LmNsZWFyVGltZW91dChib3VuZGFyeUZsYXNoVGltZW91dElEKTtcbiAgICBib3VuZGFyeUZsYXNoVGltZW91dElEID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgYm91bmRhcnlCdXR0b24uY2xpY2soKTtcbiAgICAgIGJvdW5kYXJ5Rmxhc2hUaW1lb3V0SUQgPSBudWxsO1xuICAgIH0sIDEwMDApO1xuICB9XG4gIGVsc2UgaWYgKCFib3VuZGFyeUJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoXG4gICAgXCJlZGl0LWltYWdlLXRvcC1idXR0b24tZW5hYmxlZFwiKSkge1xuICAgIGJvdW5kYXJ5QnV0dG9uLmNsaWNrKCk7XG4gICAgYm91bmRhcnlGbGFzaFRpbWVvdXRJRCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGJvdW5kYXJ5QnV0dG9uLmNsaWNrKCk7XG4gICAgICBib3VuZGFyeUZsYXNoVGltZW91dElEID0gbnVsbDtcbiAgICB9LCAxMDAwKTtcbiAgfVxufVxuXG4vLyBDcmVhdGUgdGhlIHNpZGViYXIuXG5mdW5jdGlvbiBjcmVhdGVTaWRlYmFyKHBhcmFtcywgZGF0YSwgYW5ub3RhdG9yKSB7XG4gIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgIGxhYmVsUGlja2VyID0gY3JlYXRlTGFiZWxQaWNrZXIocGFyYW1zLCBkYXRhLCBhbm5vdGF0b3IpLFxuICAgIHNwYWNlcjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgIHVuZG9CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgIHJlZG9CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgIHNwYWNlcjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgIGRlbm9pc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgIHNwYWNlcjMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgIHN1cGVycGl4ZWxUb29sQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxcbiAgICBzcGFjZXI0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxcbiAgICAvL3BvbHlnb25Ub29sQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxcbiAgICBzcGFjZXI1ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxcbiAgICBicnVzaFRvb2xCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgIHNwYWNlcjYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgIG1hbnVhbFBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpLFxuICAgIHNwYWNlcjcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgIGV4cG9ydEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSxcbiAgICBtYW51YWxUZXh0O1xuICBleHBvcnRCdXR0b24udHlwZSA9IFwic3VibWl0XCI7XG4gIGV4cG9ydEJ1dHRvbi52YWx1ZSA9IFwiZXhwb3J0XCI7XG4gIGV4cG9ydEJ1dHRvbi5jbGFzc05hbWUgPSBcImVkaXQtc2lkZWJhci1zdWJtaXRcIjtcbiAgZXhwb3J0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZpbGVuYW1lID0gKGRhdGEuYW5ub3RhdGlvblVSTHMpID9cbiAgICAgIGRhdGEuYW5ub3RhdGlvblVSTHNbcGFyYW1zLmlkXS5zcGxpdCgvW1xcXFwvXS8pLnBvcCgpIDpcbiAgICAgIHBhcmFtcy5pZCArIFwiLnBuZ1wiO1xuICAgIC8vZG93bmxvYWRVUkkoYW5ub3RhdG9yLmV4cG9ydCgpLCBmaWxlbmFtZSk7XG4gIH0pO1xuICBzcGFjZXIxLmNsYXNzTmFtZSA9IFwiZWRpdC1zaWRlYmFyLXNwYWNlclwiO1xuICB1bmRvQnV0dG9uLmNsYXNzTmFtZSA9IFwiZWRpdC1zaWRlYmFyLWJ1dHRvblwiO1xuICAvL3VuZG9CdXR0b24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJ1bmRvXCIpKTtcbiAgdW5kb0J1dHRvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIuWQjumAgOS4gOatpVwiKSk7XG4gIHVuZG9CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHsgYW5ub3RhdG9yLnVuZG8oKTsgfSk7XG4gIHJlZG9CdXR0b24uY2xhc3NOYW1lID0gXCJlZGl0LXNpZGViYXItYnV0dG9uXCI7XG4gIC8vcmVkb0J1dHRvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcInJlZG9cIikpO1xuICByZWRvQnV0dG9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwi5YmN6L+b5LiA5q2lXCIpKTtcbiAgcmVkb0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkgeyBhbm5vdGF0b3IucmVkbygpOyB9KTtcbiAgc3BhY2VyMi5jbGFzc05hbWUgPSBcImVkaXQtc2lkZWJhci1zcGFjZXJcIjtcbiAgZGVub2lzZUJ1dHRvbi5jbGFzc05hbWUgPSBcImVkaXQtc2lkZWJhci1idXR0b25cIjtcbiAgLy9kZW5vaXNlQnV0dG9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiZGVub2lzZVwiKSk7XG4gIGRlbm9pc2VCdXR0b24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCLpmY3lmapcIikpO1xuICBkZW5vaXNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgYW5ub3RhdG9yLmRlbm9pc2UoKTtcbiAgfSk7XG4gIHN1cGVycGl4ZWxUb29sQnV0dG9uLmNsYXNzTmFtZSA9IFwiZWRpdC1zaWRlYmFyLWJ1dHRvblwiO1xuICBzdXBlcnBpeGVsVG9vbEJ1dHRvbi5hcHBlbmRDaGlsZChcbiAgICAvL2RvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiU3VwZXJwaXhlbCB0b29sXCIpKTtcbiAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIui2heWDj+e0oOW3peWFt1wiKSk7XG4gIHN1cGVycGl4ZWxUb29sQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgLy9wb2x5Z29uVG9vbEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZWRpdC1zaWRlYmFyLWJ1dHRvbi1zZWxlY3RlZFwiKTtcbiAgICBicnVzaFRvb2xCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImVkaXQtc2lkZWJhci1idXR0b24tc2VsZWN0ZWRcIik7XG4gICAgc3VwZXJwaXhlbFRvb2xCdXR0b24uY2xhc3NMaXN0LmFkZChcImVkaXQtc2lkZWJhci1idXR0b24tc2VsZWN0ZWRcIik7XG4gICAgYW5ub3RhdG9yLl9zZXRNb2RlKFwic3VwZXJwaXhlbFwiKTtcbiAgfSk7XG4gIHN1cGVycGl4ZWxUb29sQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJlZGl0LXNpZGViYXItYnV0dG9uLXNlbGVjdGVkXCIpO1xuICAvLyBwb2x5Z29uVG9vbEJ1dHRvbi5jbGFzc05hbWUgPSBcImVkaXQtc2lkZWJhci1idXR0b25cIjtcbiAgLy8gcG9seWdvblRvb2xCdXR0b24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJQb2x5Z29uIHRvb2xcIikpO1xuICAvLyBwb2x5Z29uVG9vbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAvLyAgIHN1cGVycGl4ZWxUb29sQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJlZGl0LXNpZGViYXItYnV0dG9uLXNlbGVjdGVkXCIpO1xuICAvLyAgIGJydXNoVG9vbEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZWRpdC1zaWRlYmFyLWJ1dHRvbi1zZWxlY3RlZFwiKTtcbiAgLy8gICBwb2x5Z29uVG9vbEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1zaWRlYmFyLWJ1dHRvbi1zZWxlY3RlZFwiKTtcbiAgLy8gICBhbm5vdGF0b3IuX3NldE1vZGUoXCJwb2x5Z29uXCIpO1xuICAvLyB9KTtcblxuICBicnVzaFRvb2xCdXR0b24uY2xhc3NMaXN0LmFkZChcImVkaXQtc2lkZWJhci1idXR0b24tc2VsZWN0ZWRcIik7XG4gIGJydXNoVG9vbEJ1dHRvbi5jbGFzc05hbWUgPSBcImVkaXQtc2lkZWJhci1idXR0b25cIjtcbiAgLy9icnVzaFRvb2xCdXR0b24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJCcnVzaCB0b29sXCIpKTtcbiAgYnJ1c2hUb29sQnV0dG9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwi5Yi35a2QXCIpKTtcbiAgYnJ1c2hUb29sQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgc3VwZXJwaXhlbFRvb2xCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImVkaXQtc2lkZWJhci1idXR0b24tc2VsZWN0ZWRcIik7XG4gICAgLy9wb2x5Z29uVG9vbEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZWRpdC1zaWRlYmFyLWJ1dHRvbi1zZWxlY3RlZFwiKTtcbiAgICBicnVzaFRvb2xCdXR0b24uY2xhc3NMaXN0LmFkZChcImVkaXQtc2lkZWJhci1idXR0b24tc2VsZWN0ZWRcIik7XG5cbiAgICBhbm5vdGF0b3IuX3NldE1vZGUoXCJicnVzaFwiKTtcbiAgfSk7XG5cblxuICBzcGFjZXIzLmNsYXNzTmFtZSA9IFwiZWRpdC1zaWRlYmFyLXNwYWNlclwiO1xuICBtYW51YWxQYXJhZ3JhcGguYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJjdHJsOiB0b2dnbGUgbW9kZVwiKSk7XG4gIG1hbnVhbFBhcmFncmFwaC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuICBtYW51YWxQYXJhZ3JhcGguYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgbWFudWFsUGFyYWdyYXBoLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiK1N1cGVycGl4ZWwgdG9vbDpcIikpO1xuICBtYW51YWxQYXJhZ3JhcGguYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgbWFudWFsUGFyYWdyYXBoLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwibGVmdDogbWFya1wiKSk7XG4gIG1hbnVhbFBhcmFncmFwaC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuICBtYW51YWxQYXJhZ3JhcGguYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJyaWdodDogcGljayBsYWJlbFwiKSk7XG4gIG1hbnVhbFBhcmFncmFwaC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuICBtYW51YWxQYXJhZ3JhcGguYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgbWFudWFsUGFyYWdyYXBoLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiK1BvbHlnb24gdG9vbDpcIikpO1xuICBtYW51YWxQYXJhZ3JhcGguYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgbWFudWFsUGFyYWdyYXBoLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwibGVmdDogZHJhdyBsaW5lXCIpKTtcbiAgbWFudWFsUGFyYWdyYXBoLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gIG1hbnVhbFBhcmFncmFwaC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcInJpZ2h0OiBhYm9ydFwiKSk7XG4gIHNwYWNlcjQuY2xhc3NOYW1lID0gXCJlZGl0LXNpZGViYXItc3BhY2VyXCI7XG4gIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcImVkaXQtc2lkZWJhclwiO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGFiZWxQaWNrZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3BhY2VyMSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh1bmRvQnV0dG9uKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJlZG9CdXR0b24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3BhY2VyMik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkZW5vaXNlQnV0dG9uKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNwYWNlcjMpO1xuICAvL2NvbnRhaW5lci5hcHBlbmRDaGlsZChwb2x5Z29uVG9vbEJ1dHRvbik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdXBlcnBpeGVsVG9vbEJ1dHRvbik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChicnVzaFRvb2xCdXR0b24pO1xuICAvL2NvbnRhaW5lci5hcHBlbmRDaGlsZChtYW51YWxQYXJhZ3JhcGgpO1xuICAvL2NvbnRhaW5lci5hcHBlbmRDaGlsZChzcGFjZXI0KTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGV4cG9ydEJ1dHRvbik7XG4gIHJldHVybiBjb250YWluZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxhYmVsQnV0dG9uKGRhdGEsIHZhbHVlLCBpbmRleCwgYW5ub3RhdG9yKSB7XG4gIHZhciBjb2xvckJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpLFxuICAgIGxhYmVsVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpLFxuICAgIHBpY2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgIHBvcHVwQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxcbiAgICBwb3B1cENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbG9yQm94LmNsYXNzTmFtZSA9IFwiZWRpdC1zaWRlYmFyLWxlZ2VuZC1jb2xvcmJveFwiO1xuICBjb2xvckJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPVxuICAgIFwicmdiKFwiICsgZGF0YS5jb2xvcm1hcFtpbmRleF0uam9pbihcIixcIikgKyBcIilcIjtcbiAgbGFiZWxUZXh0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlKSk7XG4gIGxhYmVsVGV4dC5jbGFzc05hbWUgPSBcImVkaXQtc2lkZWJhci1sZWdlbmQtbGFiZWxcIjtcbiAgcG9wdXBCdXR0b24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCIrXCIpKTtcbiAgcG9wdXBCdXR0b24uY2xhc3NOYW1lID0gXCJlZGl0LXNpZGViYXItcG9wdXAtdHJpZ2dlclwiO1xuICBwb3B1cEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgIHBvcHVwQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoXCJlZGl0LXNpZGViYXItcG9wdXAtYWN0aXZlXCIpO1xuICB9KTtcbiAgcG9wdXBDb250YWluZXIuY2xhc3NOYW1lID0gXCJlZGl0LXNpZGViYXItcG9wdXBcIjtcbiAgcG9wdXBDb250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgY3JlYXRlUmVsYWJlbFNlbGVjdG9yKGRhdGEsIGluZGV4LCBhbm5vdGF0b3IsIHBvcHVwQ29udGFpbmVyKVxuICApO1xuICBwb3B1cENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG4gIHBpY2tCdXR0b24uYXBwZW5kQ2hpbGQoY29sb3JCb3gpO1xuICBwaWNrQnV0dG9uLmFwcGVuZENoaWxkKGxhYmVsVGV4dCk7XG4gIHBpY2tCdXR0b24uYXBwZW5kQ2hpbGQocG9wdXBCdXR0b24pO1xuICBwaWNrQnV0dG9uLmFwcGVuZENoaWxkKHBvcHVwQ29udGFpbmVyKTtcbiAgcGlja0J1dHRvbi5pZCA9IFwibGFiZWwtXCIgKyBpbmRleCArIFwiLWJ1dHRvblwiO1xuICBwaWNrQnV0dG9uLmNsYXNzTmFtZSA9IFwiZWRpdC1zaWRlYmFyLWJ1dHRvblwiO1xuICBwaWNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNsYXNzTmFtZSA9IFwiZWRpdC1zaWRlYmFyLWJ1dHRvbi1zZWxlY3RlZFwiO1xuICAgIGFubm90YXRvci5jdXJyZW50TGFiZWwgPSBpbmRleDtcbiAgICB2YXIgc2VsZWN0ZWRFbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGVjdGVkRWxlbWVudHMubGVuZ3RoOyArK2kpXG4gICAgICBzZWxlY3RlZEVsZW1lbnRzW2ldLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICBwaWNrQnV0dG9uLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfSk7XG4gIC8vY29uc29sZS5sb2coJ2luZGV4JywgaW5kZXgpO1xuICBwaWNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XG5cbiAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlZGl0LXNpZGViYXItcG9wdXAtYWN0aXZlXCIpLmxlbmd0aClcblxuICAgICAgYW5ub3RhdG9yLmhpZ2hsaWdodExhYmVsKGluZGV4KTtcbiAgfSk7XG4gIHBpY2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlZGl0LXNpZGViYXItcG9wdXAtYWN0aXZlXCIpLmxlbmd0aClcbiAgICAgIGFubm90YXRvci51bmhpZ2hsaWdodExhYmVsKCk7XG4gIH0pO1xuICByZXR1cm4gcGlja0J1dHRvbjtcbn1cblxuLy8gV3JpdGUgdGhlIGJydXNoIHRvb2xcbkFubm90YXRvci5wcm90b3R5cGUuYnJ1c2ggPSBmdW5jdGlvbiAocG9zLCBsYWJlbCkge1xuICB2YXIgb2Zmc2V0cyA9IFtdLCBsYWJlbHMgPSBbXTtcbiAgZm9yICh2YXIgeSA9IC0yOyB5IDw9IDI7IHkrKykge1xuICAgIGZvciAodmFyIHggPSAtMjsgeCA8PSAyOyB4KyspIHtcbiAgICAgIC8vIGl0IGlzIGNpcmNsZSBiaXRjaGVzXG4gICAgICBpZiAoKHggKiB4ICsgeSAqIHkpID4gNykgY29udGludWU7XG4gICAgICB2YXIgb2Zmc2V0ID0gNCAqICgocG9zWzFdICsgeSkgKiB0aGlzLmxheWVycy52aXN1YWxpemF0aW9uLmNhbnZhcy53aWR0aCArIChwb3NbMF0gKyB4KSk7XG4gICAgICBvZmZzZXRzLnB1c2gob2Zmc2V0KTtcbiAgICAgIGxhYmVscy5wdXNoKGxhYmVsKTtcbiAgICB9XG4gIH1cbiAgdGhpcy5fdXBkYXRlQW5ub3RhdGlvbihvZmZzZXRzLCBsYWJlbHMpO1xuICB0aGlzLmxheWVycy52aXN1YWxpemF0aW9uLnJlbmRlcigpO1xuICBpZiAodHlwZW9mIHRoaXMub25jaGFuZ2UgPT09IFwiZnVuY3Rpb25cIilcbiAgICB0aGlzLm9uY2hhbmdlLmNhbGwodGhpcyk7XG59O1xuXG4vLyBIaWdodGxpZ2h0IGxlZ2VuZCBsYWJlbHMuXG5mdW5jdGlvbiBoaWdobGlnaHRMYWJlbChsYWJlbCkge1xuXG4gIC8vIGxldCBlbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3N1cGVycGl4ZWxfY29sb3JfaXRlbScpO1xuICAvLyBmb3IobGV0IGk9MDtpPGVsZW1lbnRzLmxlbmd0aDtpKyspe1xuICAvLyAgIGVsZW1lbnRzW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJob3Zlcl9saWdodFwiKVxuICAvLyAgIGlmKGVsZW1lbnRzW2ldLmdldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIiktMCA9PSBsYWJlbCl7XG4gIC8vICAgICAgIGVsZW1lbnRzW2ldLmNsYXNzTGlzdC5hZGQoJ2hvdmVyX2xpZ2h0JylcbiAgLy8gICB9XG4gIC8vIH1cblxuXG5cbiAgdmFyIGhpZ2hsaWdodENsYXNzID0gXCJlZGl0LXNpZGViYXItYnV0dG9uLWhpZ2hsaWdodFwiLFxuICAgIGVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShoaWdobGlnaHRDbGFzcyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyArK2kpXG4gICAgZWxlbWVudHNbaV0uY2xhc3NMaXN0LnJlbW92ZShoaWdobGlnaHRDbGFzcyk7XG4gIHZhciBwaWNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYWJlbC1cIiArIGxhYmVsICsgXCItYnV0dG9uXCIpO1xuICBpZiAocGlja0J1dHRvbilcbiAgICBwaWNrQnV0dG9uLmNsYXNzTGlzdC5hZGQoaGlnaGxpZ2h0Q2xhc3MpO1xuXG5cbn1cblxuLy8gQ3JlYXRlIHRoZSBsYWJlbCBwaWNrZXIgYnV0dG9uLlxuZnVuY3Rpb24gY3JlYXRlTGFiZWxQaWNrZXIocGFyYW1zLCBkYXRhLCBhbm5vdGF0b3IpIHtcbiAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcImVkaXQtc2lkZWJhci1sYWJlbC1waWNrZXJcIjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxhYmVsc0NvbnRlbnQubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgbGFiZWxCdXR0b24gPSBjcmVhdGVMYWJlbEJ1dHRvbihkYXRhLCBkYXRhLmxhYmVsc0NvbnRlbnRbaV0sIGksIGFubm90YXRvcik7XG4gICAgaWYgKGkgPT09IDApIHtcbiAgICAgIGFubm90YXRvci5jdXJyZW50TGFiZWwgPSAwO1xuICAgICAgbGFiZWxCdXR0b24uY2xhc3NMaXN0LmFkZChcImVkaXQtc2lkZWJhci1idXR0b24tc2VsZWN0ZWRcIik7XG4gICAgfVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsYWJlbEJ1dHRvbik7XG4gIH1cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjYW5jZWxQb3B1cCwgdHJ1ZSk7XG4gIHJldHVybiBjb250YWluZXI7XG59XG5cbi8vIENhbmNlbCBwb3B1cC5cbmZ1bmN0aW9uIGNhbmNlbFBvcHVwKGV2ZW50KSB7XG4gIHZhciBpc091dHNpZGVQb3B1cCA9IHRydWUsXG4gICAgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICB3aGlsZSAodGFyZ2V0LnBhcmVudE5vZGUpIHtcbiAgICBpc091dHNpZGVQb3B1cCA9IGlzT3V0c2lkZVBvcHVwICYmXG4gICAgICAhdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXQtc2lkZWJhci1wb3B1cFwiKTtcbiAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgfVxuICBpZiAoaXNPdXRzaWRlUG9wdXApIHtcbiAgICB2YXIgcG9wdXBzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcbiAgICAgIFwiZWRpdC1zaWRlYmFyLXBvcHVwLWFjdGl2ZVwiKTtcbiAgICBpZiAocG9wdXBzLmxlbmd0aClcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9wdXBzLmxlbmd0aDsgKytpKVxuICAgICAgICBwb3B1cHNbaV0uY2xhc3NMaXN0LnJlbW92ZShcImVkaXQtc2lkZWJhci1wb3B1cC1hY3RpdmVcIik7XG4gIH1cbn1cblxuLy8gQ3JlYXRlIHRoZSByZWxhYmVsIHNlbGVjdG9yLlxuZnVuY3Rpb24gY3JlYXRlUmVsYWJlbFNlbGVjdG9yKGRhdGEsIGluZGV4LCBhbm5vdGF0b3IsIHBvcHVwQ29udGFpbmVyKSB7XG4gIHZhciBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpLFxuICAgIGZpcnN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgZmlyc3RPcHRpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJDaGFuZ2UgdG9cIikpO1xuICBzZWxlY3QuYXBwZW5kQ2hpbGQoZmlyc3RPcHRpb24pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGFiZWxzQ29udGVudC5sZW5ndGg7ICsraSkge1xuICAgIGlmIChpICE9PSBpbmRleCkge1xuICAgICAgdmFyIG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICBvcHRpb24udmFsdWUgPSBpO1xuICAgICAgb3B0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRhdGEubGFiZWxzQ29udGVudFtpXSkpO1xuICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgfVxuICB9XG4gIHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBzb3VyY2VMYWJlbCA9IGluZGV4O1xuICAgIHZhciB0YXJnZXRMYWJlbCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC52YWx1ZSwgMTApO1xuICAgIGlmIChzb3VyY2VMYWJlbCAhPT0gdGFyZ2V0TGFiZWwpIHtcbiAgICAgIHZhciBjdXJyZW50TGFiZWwgPSBhbm5vdGF0b3IuY3VycmVudExhYmVsO1xuICAgICAgYW5ub3RhdG9yLmN1cnJlbnRMYWJlbCA9IHRhcmdldExhYmVsO1xuICAgICAgYW5ub3RhdG9yLmZpbGwoc291cmNlTGFiZWwpO1xuICAgICAgYW5ub3RhdG9yLmN1cnJlbnRMYWJlbCA9IGN1cnJlbnRMYWJlbDtcbiAgICB9XG4gICAgcG9wdXBDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImVkaXQtc2lkZWJhci1wb3B1cC1hY3RpdmVcIik7XG4gICAgZmlyc3RPcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xuICByZXR1cm4gc2VsZWN0O1xufVxuXG4vLyBEb3dubG9hZCB0cmljay5cbmZ1bmN0aW9uIGRvd25sb2FkVVJJKHVyaSwgZmlsZW5hbWUpIHtcbiAgdmFyIGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAvL2FuY2hvci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIGFuY2hvci50YXJnZXQgPSBcIl9ibGFua1wiOyAvLyBTYWZhcmkgZG9lc24ndCB3b3JrLlxuICBhbmNob3IuZG93bmxvYWQgPSBmaWxlbmFtZTtcbiAgYW5jaG9yLmhyZWYgPSB1cmk7XG4gIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdTdXBlcnBpeGVsQ29udGFpbmVyJykuYXBwZW5kQ2hpbGQoYW5jaG9yKTtcbiAgYW5jaG9yLmNsaWNrKCk7XG4gIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdTdXBlcnBpeGVsQ29udGFpbmVyJykucmVtb3ZlQ2hpbGQoYW5jaG9yKTtcbn1cblxuLy8gRW50cnkgcG9pbnQuXG5mdW5jdGlvbiByZW5kZXIoZGF0YSwgcGFyYW1zLCBzaXplKSB7XG4gIG91dGRhdGEgPSBkYXRhO1xuICBvdXRwYXJhbXMgPSBwYXJhbXM7XG4gIG91dHNpemUgPSBzaXplXG4gIHZhciBjaGlsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQWxsTWlnaHRcIik7XG4gIGlmIChjaGlsZCkge1xuICAgIGNoaWxkLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICB9XG5cbiAgaWYgKCFzaXplKSB7XG4gICAgc2l6ZSA9IDI1XG4gICAgb3V0c2l6ZSA9IHNpemVcbiAgfVxuICB2YXIgaWQgPSBwYXJzZUludChwYXJhbXMuaWQsIDEwKTtcbiAgaWYgKGlzTmFOKGlkKSlcbiAgICB0aHJvdyAoXCJJbnZhbGlkIGlkXCIpO1xuICB2YXIgYW5ub3RhdG9yID0gbmV3IEFubm90YXRvcihkYXRhLmltYWdlVVJMc1tpZF0sIHtcbiAgICB3aWR0aDogcGFyYW1zLndpZHRoLFxuICAgIGhlaWdodDogcGFyYW1zLmhlaWdodCxcbiAgICBjb2xvcm1hcDogZGF0YS5jb2xvcm1hcCxcbiAgICBzdXBlcnBpeGVsT3B0aW9uczogeyBtZXRob2Q6IFwic2xpY1wiLCByZWdpb25TaXplOiBzaXplIH0sXG4gICAgb25sb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoZGF0YS5hbm5vdGF0aW9uVVJMcylcbiAgICAgICAgYW5ub3RhdG9yLmltcG9ydChkYXRhLmFubm90YXRpb25VUkxzW2lkXSk7XG4gICAgICBhbm5vdGF0b3IuaGlkZShcImJvdW5kYXJ5XCIpO1xuICAgIH0sXG4gICAgb25jaGFuZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBhY3RpdmVMYWJlbHMgPSB0aGlzLmdldFVuaXF1ZUxhYmVscygpLFxuICAgICAgICBsZWdlbmRDbGFzcyA9IFwiZWRpdC1zaWRlYmFyLWxlZ2VuZC1sYWJlbFwiLFxuICAgICAgICBsZWdlbmRBY3RpdmVDbGFzcyA9IFwiZWRpdC1zaWRlYmFyLWxlZ2VuZC1sYWJlbC1hY3RpdmVcIixcbiAgICAgICAgZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGxlZ2VuZENsYXNzKSxcbiAgICAgICAgaTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7ICsraSlcbiAgICAgICAgZWxlbWVudHNbaV0uY2xhc3NMaXN0LnJlbW92ZShsZWdlbmRBY3RpdmVDbGFzcyk7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgYWN0aXZlTGFiZWxzLmxlbmd0aDsgKytpKVxuICAgICAgICBpZiAoZWxlbWVudHNbYWN0aXZlTGFiZWxzW2ldXSkge1xuICAgICAgICAgIGVsZW1lbnRzW2FjdGl2ZUxhYmVsc1tpXV0uY2xhc3NMaXN0LmFkZChsZWdlbmRBY3RpdmVDbGFzcyk7XG4gICAgICAgIH1cblxuICAgIH0sXG4gICAgb25yaWdodGNsaWNrOiBmdW5jdGlvbiAobGFiZWwpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFiZWwtXCIgKyBsYWJlbCArIFwiLWJ1dHRvblwiKS5jbGljaygpO1xuICAgIH0sXG4gICAgb25tb3VzZW1vdmU6IGhpZ2hsaWdodExhYmVsXG4gIH0pLFxuICAgIGltYWdlTGF5ZXIgPSBuZXcgTGF5ZXIoZGF0YS5pbWFnZVVSTHNbaWRdLCB7XG4gICAgICB3aWR0aDogcGFyYW1zLndpZHRoLFxuICAgICAgaGVpZ2h0OiBwYXJhbXMuaGVpZ2h0XG4gICAgfSk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdTdXBlcnBpeGVsQ29udGFpbmVyJykuYXBwZW5kQ2hpbGQoY3JlYXRlTWFpbkRpc3BsYXkocGFyYW1zLFxuICAgIGRhdGEsXG4gICAgYW5ub3RhdG9yLFxuICAgIGltYWdlTGF5ZXIpKTtcblxuXG4gIGNvbnNvbGUubG9nKGFubm90YXRvcilcbiAgd2luZG93LlRlbXBsYXRlLmdldE1hcmtSZXN1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJhc2VJbWc6IGFubm90YXRvci5leHBvcnQoKVxuICAgIH1cbiAgfVxuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzdXBlcnBpeGVsX3JlZ2lvblNpemUnKVswXS5pbm5lckhUTUwgPSBzaXplO1xuICAvL+aYvuekuuWdl+Wkp+Wwj++8m1xuICBmdW5jdGlvbiByZWdpb25TaXplU2hvdygpe1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3N1cGVycGl4ZWxfcmVnaW9uU2l6ZScpWzBdLmlubmVySFRNTCA9IGFubm90YXRvci5zZWdtZW50YXRpb24ucmVnaW9uU2l6ZTtcbiAgfVxuXG5cbiAgLy/lt6XlhbfmoI/mt7vliqDngrnlh7vmlYjmnpxcbiAgdmFyIHN1cGVycGl4ZWxfaXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3N1cGVycGl4ZWxfaXRlbScpXG4gIGZ1bmN0aW9uIHN1cGVycGl4ZWxDbGljaygpIHtcbiAgICBpZiAodGhpcy5jbGFzc05hbWUuaW5kZXhPZihcInN1cGVycGl4ZWxfYWN0aXZlXCIpID09IC0xKSB7XG4gICAgICBmb3IgKGxldCBpdGVtIG9mIHN1cGVycGl4ZWxfaXRlbSkge1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3N1cGVycGl4ZWxfYWN0aXZlJylcbiAgICAgIH1cbiAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnc3VwZXJwaXhlbF9hY3RpdmUnKVxuICAgIH1cbiAgfVxuICBmb3IgKGxldCBpdGVtIG9mIHN1cGVycGl4ZWxfaXRlbSkge1xuICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdXBlcnBpeGVsQ2xpY2spO1xuICB9XG4gIC8v6aKc6Imy5qCP5re75Yqg54K55Ye75pWI5p6cXG4gIHZhciBzdXBlcnBpeGVsX2NvbG9yX2l0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzdXBlcnBpeGVsX2NvbG9yX2l0ZW0nKTtcbiAgZnVuY3Rpb24gc3VwZXJwaXhlbENvbG9yQ2xpY2soKSB7XG4gICAgYW5ub3RhdG9yLmN1cnJlbnRMYWJlbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgaWYgKHRoaXMuY2xhc3NOYW1lLmluZGV4T2YoXCJzdXBlcnBpeGVsX2FjdGl2ZVwiKSA9PSAtMSkge1xuICAgICAgZm9yIChsZXQgaXRlbSBvZiBzdXBlcnBpeGVsX2NvbG9yX2l0ZW0pIHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdzdXBlcnBpeGVsX2FjdGl2ZScpXG4gICAgICB9XG4gICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ3N1cGVycGl4ZWxfYWN0aXZlJylcbiAgICB9XG4gIH1cbiAgZm9yIChsZXQgdmFsIG9mIHN1cGVycGl4ZWxfY29sb3JfaXRlbSkge1xuICAgIHZhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN1cGVycGl4ZWxDb2xvckNsaWNrKVxuICAgIHZhbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgaW5kZXggPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLTA7XG4gICAgICBhbm5vdGF0b3IuaGlnaGxpZ2h0TGFiZWwoaW5kZXgpO1xuICAgIH0pXG4gICAgdmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7IGFubm90YXRvci51bmhpZ2hsaWdodExhYmVsKCk7IH0pXG4gIH1cblxuICAvL+eCueWHu+i2heWDj+e0oOaMiemSrlxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnU3VycGVycGl4ZWxCdXR0b24nKS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIGFubm90YXRvci5fc2V0TW9kZShcInN1cGVycGl4ZWxcIik7XG4gIH1cbiAgLy/ngrnlh7vliLflrZDmjInpkq5cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0JydXNoQnV0dG9uJykub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICBhbm5vdGF0b3IuX3NldE1vZGUoXCJicnVzaFwiKTtcbiAgfVxuICAvL+aYvuekuumakOiXj+i+ueeVjFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQm91bmRhcnlCdXR0b24nKS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBib3VuZGFyeV9zaG93X2hpZGUgPSB0aGlzLmNsYXNzTGlzdC50b2dnbGUoXCJib3VuZGFyeV9zaG93X2hpZGVcIilcbiAgICBpZiAoYm91bmRhcnlfc2hvd19oaWRlKSB7XG4gICAgICBhbm5vdGF0b3IuaGlkZShcImJvdW5kYXJ5XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbm5vdGF0b3Iuc2hvdyhcImJvdW5kYXJ5XCIpO1xuICAgIH1cbiAgfVxuICAvL+aYvuekuumakOiXj+WbvueJh1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnSW1hZ2VCdXR0b24nKS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBib3VuZGFyeV9zaG93X2hpZGUgPSB0aGlzLmNsYXNzTGlzdC50b2dnbGUoXCJpbWFnZV9zaG93X2hpZGVcIilcbiAgICBpZiAoYm91bmRhcnlfc2hvd19oaWRlKSB7XG4gICAgICBhbm5vdGF0b3IuaGlkZShcImltYWdlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbm5vdGF0b3Iuc2hvdyhcImltYWdlXCIpO1xuICAgIH1cbiAgfVxuICAvL+WHj+Wwj+i+ueeVjFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQm91bmRhcnlEZWNyZWFzZUJ1dHRvbicpLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgYW5ub3RhdG9yLmZpbmVyKCk7XG4gICAgbGV0IGJvdW5kYXJ5X3Nob3dfaGlkZSA9IHRoaXMuY2xhc3NOYW1lLmluZGV4T2YoJ2JvdW5kYXJ5X3Nob3dfaGlkZScpO1xuICAgIGlmIChib3VuZGFyeV9zaG93X2hpZGUgIT0gLTEpIHtcbiAgICAgIGFubm90YXRvci5oaWRlKFwiYm91bmRhcnlcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFubm90YXRvci5zaG93KFwiYm91bmRhcnlcIik7XG4gICAgfVxuICAgIHJlZ2lvblNpemVTaG93KCk7XG4gIH1cbiAgLy/lop7lpKfovrnnlYxcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0JvdW5kYXJ5SW5jcmVhc2VCdXR0b24nKS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIGFubm90YXRvci5jb2Fyc2VyKCk7XG4gICAgbGV0IGJvdW5kYXJ5X3Nob3dfaGlkZSA9IHRoaXMuY2xhc3NOYW1lLmluZGV4T2YoJ2JvdW5kYXJ5X3Nob3dfaGlkZScpXG4gICAgaWYgKGJvdW5kYXJ5X3Nob3dfaGlkZSAhPSAtMSkge1xuICAgICAgYW5ub3RhdG9yLmhpZGUoXCJib3VuZGFyeVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYW5ub3RhdG9yLnNob3coXCJib3VuZGFyeVwiKTtcbiAgICB9XG4gICAgcmVnaW9uU2l6ZVNob3coKVxuICB9XG4gIC8v5ZCO6YCA5LiA5q2lYW5ub3RhdG9yLnVuZG8oKVxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnVW5kb0J1dHRvbicpLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgYW5ub3RhdG9yLnVuZG8oKVxuICB9XG4gIC8v5YmN6L+b5LiA5q2lXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdSZWRvQnV0dG9uJykub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICBhbm5vdGF0b3IucmVkbygpXG4gIH1cbiAgLy/nvKnlsI/lm77niYdcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0ltYWdlRGVjcmVhc2VCdXR0b24nKS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIGFubm90YXRvci56b29tT3V0KCk7XG4gIH1cbiAgLy/mlL7lpKflm77niYcgXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdJbWFnZUluY3JlYXNlQnV0dG9uJykub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICBhbm5vdGF0b3Iuem9vbUluKCk7XG4gIH1cbiAgLy/lm77niYfpgI/mmI7luqblh4/lsI9cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0ltYWdlQWxwaGFEZWNyZWFzZUJ1dHRvbicpLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgYW5ub3RhdG9yLm1vcmVBbHBoYSgpO1xuICB9XG4gIC8v5Zu+54mH6YCP5piO5bqm5aKe5aSnXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdJbWFnZUFscGhhSW5jcmVhc2VCdXR0b24nKS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIGFubm90YXRvci5sZXNzQWxwaGEoKTtcbiAgfVxuXG5cbn1cblxuXG5leHBvcnQgeyByZW5kZXIgfTtcbiIsIi8qKlxuICogU2VnbWVudCBhbm5vdGF0aW9uIHdpZGdldC5cbiAqXG4gKiB2YXIgYW5ub3RhdG9yID0gbmV3IFNlZ21lbnRBbm5vdGF0b3IoXCIvcGF0aC90by9pbWFnZS5qcGdcIiwge1xuICogICBvbmxvYWQ6IGZ1bmN0aW9uICgpIHt9LFxuICogICBvbmVycm9yOiBmdW5jdGlvbiAoKSB7fSxcbiAqICAgb25jaGFuZ2U6IGZ1bmN0aW9uICgpIHt9LFxuICogICBvbnJpZ2h0Y2xpY2s6IGZ1bmN0aW9uICgpIHt9LFxuICogICBvbmxlZnRjbGljazogZnVuY3Rpb24gKCkge31cbiAqIH0pO1xuICogZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhbm5vdGF0b3IuY29udGFpbmVyKTtcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNSAgS290YSBZYW1hZ3VjaGlcbiAqL1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9pbWFnZS9sYXllcidcbmltcG9ydCB7IG1ldGhvZHMgYXMgc2VnbWVudGF0aW9uIH0gZnJvbSAnLi4vaW1hZ2Uvc2VnbWVudGF0aW9uJ1xuaW1wb3J0ICogYXMgbW9ycGggZnJvbSAnLi4vaW1hZ2UvbW9ycGgnXG5cbi8vIFNlZ21lbnQgYW5ub3RhdG9yLlxuZnVuY3Rpb24gQW5ub3RhdG9yKGltYWdlVVJMLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBpZiAodHlwZW9mIGltYWdlVVJMICE9PSBcInN0cmluZ1wiKSB7XG4gICAgdGhyb3cgXCJJbnZhbGlkIGltYWdlVVJMXCI7XG4gIH1cbiAgdGhpcy5jb2xvcm1hcCA9IG9wdGlvbnMuY29sb3JtYXAgfHwgW1syNTUsIDI1NSwgMjU1XSwgWzI1NSwgMCwgMF1dO1xuICB0aGlzLmJvdW5kYXJ5Q29sb3IgPSBvcHRpb25zLmJvdW5kYXJ5Q29sb3IgfHwgWzI1NSwgMjU1LCAyNTVdO1xuICB0aGlzLmJvdW5kYXJ5QWxwaGEgPSBvcHRpb25zLmJvdW5kYXJ5QWxwaGEgfHwgMTI3O1xuICB0aGlzLnZpc3VhbGl6YXRpb25BbHBoYSA9IG9wdGlvbnMudmlzdWFsaXphdGlvbkFscGhhIHx8IDE0NDtcbiAgdGhpcy5oaWdobGlnaHRBbHBoYSA9IG9wdGlvbnMuaGlnaGxpZ2h0QWxwaGEgfHxcbiAgICBNYXRoLm1pbigyNTUsIHRoaXMudmlzdWFsaXphdGlvbkFscGhhICsgMTI4KTtcbiAgdGhpcy5jdXJyZW50Wm9vbSA9IDEuMDtcbiAgdGhpcy5kZWZhdWx0TGFiZWwgPSBvcHRpb25zLmRlZmF1bHRMYWJlbCB8fCAwO1xuICB0aGlzLm1heEhpc3RvcnlSZWNvcmQgPSBvcHRpb25zLm1heEhpc3RvcnlSZWNvcmQgfHwgMTA7XG4gIHRoaXMub25jaGFuZ2UgPSBvcHRpb25zLm9uY2hhbmdlIHx8IG51bGw7XG4gIHRoaXMub25yaWdodGNsaWNrID0gb3B0aW9ucy5vbnJpZ2h0Y2xpY2sgfHwgbnVsbDtcbiAgdGhpcy5vbmxlZnRjbGljayA9IG9wdGlvbnMub25sZWZ0Y2xpY2sgfHwgbnVsbDtcbiAgdGhpcy5vbmhpZ2hsaWdodCA9IG9wdGlvbnMub25oaWdobGlnaHQgfHwgbnVsbDtcbiAgdGhpcy5vbm1vdXNlbW92ZSA9IG9wdGlvbnMub25tb3VzZW1vdmUgfHwgbnVsbDtcbiAgdGhpcy5fY3JlYXRlTGF5ZXJzKG9wdGlvbnMpO1xuICB0aGlzLl9pbml0aWFsaXplSGlzdG9yeShvcHRpb25zKTtcbiAgdGhpcy5fY3JlYXRlTGF5ZXJzKG9wdGlvbnMpO1xuICB0aGlzLl9pbml0aWFsaXplSGlzdG9yeShvcHRpb25zKTtcbiAgdGhpcy5tb2RlID0gXCJzdXBlcnBpeGVsXCI7XG4gIHRoaXMucG9seWdvblBvaW50cyA9IFtdO1xuICB0aGlzLnByZXZBbm5vdGF0aW9uSW1nID0gbnVsbDtcbiAgdmFyIGFubm90YXRvciA9IHRoaXM7XG4gIHRoaXMubGF5ZXJzLmltYWdlLmxvYWQoaW1hZ2VVUkwsIHtcbiAgICB3aWR0aDogb3B0aW9ucy53aWR0aCxcbiAgICBoZWlnaHQ6IG9wdGlvbnMuaGVpZ2h0LFxuICAgIG9ubG9hZDogZnVuY3Rpb24gKCkgeyBhbm5vdGF0b3IuX2luaXRpYWxpemUob3B0aW9ucyk7IH0sXG4gICAgb25lcnJvcjogb3B0aW9ucy5vbmVycm9yXG4gIH0pO1xufVxuXG4vLyBSdW4gc3VwZXJwaXhlbCBzZWdtZW50YXRpb24uXG5Bbm5vdGF0b3IucHJvdG90eXBlLnJlc2V0U3VwZXJwaXhlbHMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdGhpcy5sYXllcnMuc3VwZXJwaXhlbC5jb3B5KHRoaXMubGF5ZXJzLmltYWdlKTtcbiAgdGhpcy5zZWdtZW50YXRpb24gPSBzZWdtZW50YXRpb24uY3JlYXRlKHRoaXMubGF5ZXJzLmltYWdlLmltYWdlRGF0YSxcbiAgICBvcHRpb25zKTtcbiAgdGhpcy5fdXBkYXRlU3VwZXJwaXhlbHMob3B0aW9ucyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gQWRqdXN0IHRoZSBzdXBlcnBpeGVsIHJlc29sdXRpb24uXG5Bbm5vdGF0b3IucHJvdG90eXBlLmZpbmVyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgdGhpcy5zZWdtZW50YXRpb24uZmluZXIoKTtcbiAgdGhpcy5fdXBkYXRlU3VwZXJwaXhlbHMob3B0aW9ucyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gQWRqdXN0IHRoZSBzdXBlcnBpeGVsIHJlc29sdXRpb24uXG5Bbm5vdGF0b3IucHJvdG90eXBlLmNvYXJzZXIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB0aGlzLnNlZ21lbnRhdGlvbi5jb2Fyc2VyKCk7XG4gIHRoaXMuX3VwZGF0ZVN1cGVycGl4ZWxzKG9wdGlvbnMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIFVuZG8gdGhlIGVkaXQuXG5Bbm5vdGF0b3IucHJvdG90eXBlLnVuZG8gPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmN1cnJlbnRIaXN0b3J5UmVjb3JkIDwgMClcbiAgICByZXR1cm4gZmFsc2U7XG4gIHZhciByZWNvcmQgPSB0aGlzLmhpc3RvcnlbdGhpcy5jdXJyZW50SGlzdG9yeVJlY29yZC0tXTtcbiAgdGhpcy5fZmlsbFBpeGVscyhyZWNvcmQucGl4ZWxzLCByZWNvcmQucHJldik7XG4gIHRoaXMubGF5ZXJzLnZpc3VhbGl6YXRpb24ucmVuZGVyKCk7XG4gIGlmICh0eXBlb2YgdGhpcy5vbmNoYW5nZSA9PT0gXCJmdW5jdGlvblwiKVxuICAgIHRoaXMub25jaGFuZ2UuY2FsbCh0aGlzKTtcbiAgcmV0dXJuIHRoaXMuY3VycmVudEhpc3RvcnlSZWNvcmQgPCAwO1xufTtcblxuLy8gUmVkbyB0aGUgZWRpdC5cbkFubm90YXRvci5wcm90b3R5cGUucmVkbyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuY3VycmVudEhpc3RvcnlSZWNvcmQgPj0gdGhpcy5oaXN0b3J5Lmxlbmd0aCAtIDEpXG4gICAgcmV0dXJuIGZhbHNlO1xuICB2YXIgcmVjb3JkID0gdGhpcy5oaXN0b3J5WysrdGhpcy5jdXJyZW50SGlzdG9yeVJlY29yZF07XG4gIHRoaXMuX2ZpbGxQaXhlbHMocmVjb3JkLnBpeGVscywgcmVjb3JkLm5leHQpO1xuICB0aGlzLmxheWVycy52aXN1YWxpemF0aW9uLnJlbmRlcigpO1xuICBpZiAodHlwZW9mIHRoaXMub25jaGFuZ2UgPT09IFwiZnVuY3Rpb25cIilcbiAgICB0aGlzLm9uY2hhbmdlLmNhbGwodGhpcyk7XG4gIHJldHVybiB0aGlzLmN1cnJlbnRIaXN0b3J5UmVjb3JkID49IHRoaXMuaGlzdG9yeS5sZW5ndGg7XG59O1xuXG4vLyBHZXQgdW5pcXVlIGxhYmVscyBpbiB0aGUgY3VycmVudCBhbm5vdGF0aW9uLlxuQW5ub3RhdG9yLnByb3RvdHlwZS5nZXRVbmlxdWVMYWJlbHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB1bmlxdWVJbmRleCA9IFtdLFxuICAgIGRhdGEgPSB0aGlzLmxheWVycy5hbm5vdGF0aW9uLmltYWdlRGF0YS5kYXRhO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICB2YXIgbGFiZWwgPSBfZ2V0RW5jb2RlZExhYmVsKGRhdGEsIGkpO1xuICAgIGlmICh1bmlxdWVJbmRleC5pbmRleE9mKGxhYmVsKSA8IDApIHtcbiAgICAgIHVuaXF1ZUluZGV4LnB1c2gobGFiZWwpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5pcXVlSW5kZXguc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYSAtIGI7IH0pO1xufTtcblxuLy8gRmlsbCBhbGwgdGhlIHBpeGVscyBhc3NpZ25lZCB0aGUgdGFyZ2V0IGxhYmVsIG9yIGFsbC5cbkFubm90YXRvci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uICh0YXJnZXRMYWJlbCkge1xuICB2YXIgcGl4ZWxzID0gW10sXG4gICAgYW5ub3RhdGlvbkRhdGEgPSB0aGlzLmxheWVycy5hbm5vdGF0aW9uLmltYWdlRGF0YS5kYXRhO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFubm90YXRpb25EYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgdmFyIGxhYmVsID0gX2dldEVuY29kZWRMYWJlbChhbm5vdGF0aW9uRGF0YSwgaSk7XG4gICAgaWYgKGxhYmVsID09PSB0YXJnZXRMYWJlbCB8fCB0YXJnZXRMYWJlbCA9PT0gdW5kZWZpbmVkKVxuICAgICAgcGl4ZWxzLnB1c2goaSk7XG4gIH1cbiAgaWYgKHBpeGVscy5sZW5ndGggPiAwKVxuICAgIHRoaXMuX3VwZGF0ZUFubm90YXRpb24ocGl4ZWxzLCB0aGlzLmN1cnJlbnRMYWJlbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuQW5ub3RhdG9yLnByb3RvdHlwZS5zZXRBbHBoYSA9IGZ1bmN0aW9uIChhbHBoYSkge1xuICB0aGlzLnZpc3VhbGl6YXRpb25BbHBoYSA9IE1hdGgubWF4KE1hdGgubWluKGFscGhhLCAyNTUpLCAwKTtcbiAgdGhpcy5sYXllcnMudmlzdWFsaXphdGlvbi5zZXRBbHBoYSh0aGlzLnZpc3VhbGl6YXRpb25BbHBoYSkucmVuZGVyKCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuQW5ub3RhdG9yLnByb3RvdHlwZS5sZXNzQWxwaGEgPSBmdW5jdGlvbiAoc2NhbGUpIHtcbiAgcmV0dXJuIHRoaXMuc2V0QWxwaGEodGhpcy52aXN1YWxpemF0aW9uQWxwaGEgLSAoc2NhbGUgfHwgMSkgKiAyMCk7XG59O1xuXG5Bbm5vdGF0b3IucHJvdG90eXBlLm1vcmVBbHBoYSA9IGZ1bmN0aW9uIChzY2FsZSkge1xuICByZXR1cm4gdGhpcy5zZXRBbHBoYSh0aGlzLnZpc3VhbGl6YXRpb25BbHBoYSArIChzY2FsZSB8fCAxKSAqIDIwKTtcbn07XG5cbi8vIEltcG9ydCBhbiBleGlzdGluZyBhbm5vdGF0aW9uLlxuQW5ub3RhdG9yLnByb3RvdHlwZS5pbXBvcnQgPSBmdW5jdGlvbiAoYW5ub3RhdGlvblVSTCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIGFubm90YXRvciA9IHRoaXM7XG4gIHRoaXMubGF5ZXJzLmFubm90YXRpb24ubG9hZChhbm5vdGF0aW9uVVJMLCB7XG4gICAgb25sb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAob3B0aW9ucy5ncmF5c2NhbGUpXG4gICAgICAgIHRoaXMuZ3JheTJpbmRleCgpO1xuICAgICAgYW5ub3RhdG9yLmxheWVyc1xuICAgICAgICAudmlzdWFsaXphdGlvblxuICAgICAgICAuY29weSh0aGlzKVxuICAgICAgICAuYXBwbHlDb2xvcm1hcChhbm5vdGF0b3IuY29sb3JtYXApXG4gICAgICAgIC5zZXRBbHBoYShhbm5vdGF0b3IudmlzdWFsaXphdGlvbkFscGhhKVxuICAgICAgICAucmVuZGVyKCk7XG4gICAgICB0aGlzLnNldEFscGhhKDApLnJlbmRlcigpO1xuICAgICAgdGhpcy5oaXN0b3J5ID0gW107XG4gICAgICB0aGlzLmN1cnJlbnRIaXN0b3J5UmVjb3JkID0gLTE7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMub25sb2FkID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIG9wdGlvbnMub25sb2FkLmNhbGwoYW5ub3RhdG9yKTtcbiAgICAgIGlmICh0eXBlb2YgYW5ub3RhdG9yLm9uY2hhbmdlID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGFubm90YXRvci5vbmNoYW5nZS5jYWxsKGFubm90YXRvcik7XG4gICAgfSxcbiAgICBvbmVycm9yOiBvcHRpb25zLm9uZXJyb3JcbiAgfSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gRXhwb3J0IHRoZSBhbm5vdGF0aW9uIGluIGRhdGEgVVJMLlxuQW5ub3RhdG9yLnByb3RvdHlwZS5leHBvcnQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubGF5ZXJzLmFubm90YXRpb24uc2V0QWxwaGEoMjU1KTtcbiAgdGhpcy5sYXllcnMuYW5ub3RhdGlvbi5yZW5kZXIoKTtcbiAgdmFyIGRhdGEgPSB0aGlzLmxheWVycy5hbm5vdGF0aW9uLmNhbnZhcy50b0RhdGFVUkwoKTtcbiAgdGhpcy5sYXllcnMuYW5ub3RhdGlvbi5zZXRBbHBoYSgwKTtcbiAgdGhpcy5sYXllcnMuYW5ub3RhdGlvbi5yZW5kZXIoKTtcbiAgcmV0dXJuIGRhdGE7XG59O1xuXG4vLyBTaG93IGEgc3BlY2lmaWVkIGxheWVyLlxuQW5ub3RhdG9yLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKGxheWVyKSB7XG4gIHRoaXMubGF5ZXJzW2xheWVyXS5jYW52YXMuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gSGlkZSBhIHNwZWNpZmllZCBsYXllci5cbkFubm90YXRvci5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uIChsYXllcikge1xuICB0aGlzLmxheWVyc1tsYXllcl0uY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBIaWdobGlnaHQgYSBzcGVjaWZpZWQgbGFiZWwuXG5Bbm5vdGF0b3IucHJvdG90eXBlLmhpZ2hsaWdodExhYmVsID0gZnVuY3Rpb24gKGxhYmVsKSB7XG4gIHZhciBwaXhlbHMgPSBbXSxcbiAgICBhbm5vdGF0aW9uRGF0YSA9IHRoaXMubGF5ZXJzLmFubm90YXRpb24uaW1hZ2VEYXRhLmRhdGE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYW5ub3RhdGlvbkRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICB2YXIgY3VycmVudExhYmVsID0gX2dldEVuY29kZWRMYWJlbChhbm5vdGF0aW9uRGF0YSwgaSk7XG4gICAgaWYgKGN1cnJlbnRMYWJlbCA9PT0gbGFiZWwpXG4gICAgICBwaXhlbHMucHVzaChpKTtcbiAgfVxuICB0aGlzLl91cGRhdGVIaWdobGlnaHQocGl4ZWxzKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBEaXNhYmxlIGhpZ2hsaWdodC5cbkFubm90YXRvci5wcm90b3R5cGUudW5oaWdobGlnaHRMYWJlbCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fdXBkYXRlSGlnaGxpZ2h0KG51bGwpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIFpvb20gdG8gc3BlY2lmaWMgcmVzb2x1dGlvbi5cbkFubm90YXRvci5wcm90b3R5cGUuem9vbSA9IGZ1bmN0aW9uIChzY2FsZSkge1xuICB0aGlzLmN1cnJlbnRab29tID0gTWF0aC5tYXgoTWF0aC5taW4oc2NhbGUgfHwgMS4wLCAxMC4wKSwgMS4wKTtcbiAgdGhpcy5pbm5lckNvbnRhaW5lci5zdHlsZS56b29tID0gdGhpcy5jdXJyZW50Wm9vbTtcbiAgdGhpcy5pbm5lckNvbnRhaW5lci5zdHlsZS5Nb3pUcmFuc2Zvcm0gPVxuICAgIFwic2NhbGUoXCIgKyB0aGlzLmN1cnJlbnRab29tICsgXCIpXCI7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gWm9vbSBpbi5cbkFubm90YXRvci5wcm90b3R5cGUuem9vbUluID0gZnVuY3Rpb24gKHNjYWxlKSB7XG4gIHJldHVybiB0aGlzLnpvb20odGhpcy5jdXJyZW50Wm9vbSArIChzY2FsZSB8fCAwLjI1KSk7XG59O1xuXG4vLyBab29tIG91dC5cbkFubm90YXRvci5wcm90b3R5cGUuem9vbU91dCA9IGZ1bmN0aW9uIChzY2FsZSkge1xuICByZXR1cm4gdGhpcy56b29tKHRoaXMuY3VycmVudFpvb20gLSAoc2NhbGUgfHwgMC4yNSkpO1xufTtcblxuLy8gLy8gQWxpZ24gdGhlIGN1cnJlbnQgYW5ub3RhdGlvbiB0byB0aGUgYm91bmRhcnkgb2Ygc3VwZXJwaXhlbHMuXG4vLyBBbm5vdGF0b3IucHJvdG90eXBlLmFsaWduQm91bmRhcnkgPSBmdW5jdGlvbiAoKSB7XG4vLyAgIHZhciBhbm5vdGF0aW9uRGF0YSA9IHRoaXMubGF5ZXJzLmFubm90YXRpb24uaW1hZ2VEYXRhLmRhdGE7XG4vLyAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5waXhlbEluZGV4Lmxlbmd0aDsgKytpKSB7XG4vLyAgICAgdmFyIHBpeGVscyA9IHRoaXMucGl4ZWxJbmRleFtpXSxcbi8vICAgICAgICAgbGFiZWwgPSBfZmluZE1vc3RGcmVxdWVudChhbm5vdGF0aW9uRGF0YSwgcGl4ZWxzKTtcbi8vICAgICB0aGlzLl9maWxsUGl4ZWxzKHBpeGVscywgbGFiZWwpO1xuLy8gICB9XG4vLyAgIHRoaXMubGF5ZXJzLnZpc3VhbGl6YXRpb24ucmVuZGVyKCk7XG4vLyAgIHRoaXMuaGlzdG9yeSA9IFtdO1xuLy8gICB0aGlzLmN1cnJlbnRIaXN0b3J5UmVjb3JkID0gMDtcbi8vIH07XG5cbkFubm90YXRvci5wcm90b3R5cGUuZGVub2lzZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGluZGV4SW1hZ2UgPSBtb3JwaC5kZWNvZGVJbmRleEltYWdlKHRoaXMubGF5ZXJzLmFubm90YXRpb24uaW1hZ2VEYXRhKSxcbiAgICByZXN1bHQgPSBtb3JwaC5tYXhGaWx0ZXIoaW5kZXhJbWFnZSk7XG4gIHZhciBwaXhlbHMgPSBuZXcgSW50MzJBcnJheShyZXN1bHQuZGF0YS5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHBpeGVscy5sZW5ndGg7ICsraSlcbiAgICBwaXhlbHNbaV0gPSA0ICogaTtcbiAgdGhpcy5fdXBkYXRlQW5ub3RhdGlvbihwaXhlbHMsIHJlc3VsdC5kYXRhKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBQcml2YXRlIG1ldGhvZHMuXG5cbkFubm90YXRvci5wcm90b3R5cGUuX2NyZWF0ZUxheWVycyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIHZhciBvbmxvYWQgPSBvcHRpb25zLm9ubG9hZDtcbiAgZGVsZXRlIG9wdGlvbnMub25sb2FkO1xuICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJzZWdtZW50LWFubm90YXRvci1vdXRlci1jb250YWluZXJcIik7XG4gIHRoaXMuaW5uZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0aGlzLmlubmVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJzZWdtZW50LWFubm90YXRvci1pbm5lci1jb250YWluZXJcIik7XG4gIHRoaXMubGF5ZXJzID0ge1xuICAgIGltYWdlOiBuZXcgTGF5ZXIob3B0aW9ucyksXG4gICAgc3VwZXJwaXhlbDogbmV3IExheWVyKG9wdGlvbnMpLFxuICAgIHZpc3VhbGl6YXRpb246IG5ldyBMYXllcihvcHRpb25zKSxcbiAgICBib3VuZGFyeTogbmV3IExheWVyKG9wdGlvbnMpLFxuICAgIGFubm90YXRpb246IG5ldyBMYXllcihvcHRpb25zKVxuICB9O1xuICBvcHRpb25zLm9ubG9hZCA9IG9ubG9hZDtcbiAgZm9yICh2YXIga2V5IGluIHRoaXMubGF5ZXJzKSB7XG4gICAgdmFyIGNhbnZhcyA9IHRoaXMubGF5ZXJzW2tleV0uY2FudmFzO1xuICAgIGNhbnZhcy5jbGFzc0xpc3QuYWRkKFwic2VnbWVudC1hbm5vdGF0b3ItbGF5ZXJcIik7XG4gICAgdGhpcy5pbm5lckNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW52YXMpO1xuICB9XG4gIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuaW5uZXJDb250YWluZXIpO1xuICB0aGlzLl9yZXNpemVMYXllcnMob3B0aW9ucyk7XG59O1xuXG5Bbm5vdGF0b3IucHJvdG90eXBlLl9yZXNpemVMYXllcnMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB0aGlzLndpZHRoID0gb3B0aW9ucy53aWR0aCB8fCB0aGlzLmxheWVycy5pbWFnZS5jYW52YXMud2lkdGg7XG4gIHRoaXMuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgdGhpcy5sYXllcnMuaW1hZ2UuY2FudmFzLmhlaWdodDtcbiAgZm9yICh2YXIga2V5IGluIHRoaXMubGF5ZXJzKSB7XG4gICAgaWYgKGtleSAhPT0gXCJpbWFnZVwiKSB7XG4gICAgICB2YXIgY2FudmFzID0gdGhpcy5sYXllcnNba2V5XS5jYW52YXM7XG4gICAgICBjYW52YXMud2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgIH1cbiAgfVxuICB0aGlzLmlubmVyQ29udGFpbmVyLnN0eWxlLndpZHRoID0gdGhpcy53aWR0aCArIFwicHhcIjtcbiAgdGhpcy5pbm5lckNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCArIFwicHhcIjtcbiAgdGhpcy5jb250YWluZXIuc3R5bGUud2lkdGggPSB0aGlzLndpZHRoICsgXCJweFwiO1xuICB0aGlzLmNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCArIFwicHhcIjtcbn07XG5cbkFubm90YXRvci5wcm90b3R5cGUuX2luaXRpYWxpemVIaXN0b3J5ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgdGhpcy5oaXN0b3J5ID0gW107XG4gIHRoaXMuY3VycmVudEhpc3RvcnlSZWNvcmQgPSAtMTtcbn07XG5cbkFubm90YXRvci5wcm90b3R5cGUuX2luaXRpYWxpemUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKCFvcHRpb25zLndpZHRoKVxuICAgIHRoaXMuX3Jlc2l6ZUxheWVycyhvcHRpb25zKTtcbiAgdGhpcy5faW5pdGlhbGl6ZUFubm90YXRpb25MYXllcigpO1xuICB0aGlzLl9pbml0aWFsaXplVmlzdWFsaXphdGlvbkxheWVyKCk7XG4gIHRoaXMuX2luaXRpYWxpemVFdmVudHMoKTtcbiAgdGhpcy5yZXNldFN1cGVycGl4ZWxzKG9wdGlvbnMuc3VwZXJwaXhlbE9wdGlvbnMpO1xuICBpZiAodHlwZW9mIG9wdGlvbnMub25sb2FkID09PSBcImZ1bmN0aW9uXCIpXG4gICAgb3B0aW9ucy5vbmxvYWQuY2FsbCh0aGlzKTtcbiAgaWYgKHR5cGVvZiB0aGlzLm9uY2hhbmdlID09PSBcImZ1bmN0aW9uXCIpXG4gICAgdGhpcy5vbmNoYW5nZS5jYWxsKHRoaXMpO1xufTtcblxuQW5ub3RhdG9yLnByb3RvdHlwZS5faW5pdGlhbGl6ZUV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGNhbnZhcyA9IHRoaXMubGF5ZXJzLmFubm90YXRpb24uY2FudmFzLFxuICAgIG1vdXNlc3RhdGUgPSB7IGRvd246IGZhbHNlLCBidXR0b246IDAgfSxcbiAgICBhbm5vdGF0b3IgPSB0aGlzO1xuICBjYW52YXMub25jb250ZXh0bWVudSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9O1xuICBmdW5jdGlvbiB1cGRhdGVJZkFjdGl2ZShldmVudCkge1xuICAgIHZhciBvZmZzZXQgPSBhbm5vdGF0b3IuX2dldENsaWNrT2Zmc2V0KGV2ZW50KSxcbiAgICAgIHN1cGVycGl4ZWxEYXRhID0gYW5ub3RhdG9yLmxheWVycy5zdXBlcnBpeGVsLmltYWdlRGF0YS5kYXRhLFxuICAgICAgYW5ub3RhdGlvbkRhdGEgPSBhbm5vdGF0b3IubGF5ZXJzLmFubm90YXRpb24uaW1hZ2VEYXRhLmRhdGEsXG4gICAgICBzdXBlcnBpeGVsSW5kZXggPSBfZ2V0RW5jb2RlZExhYmVsKHN1cGVycGl4ZWxEYXRhLCBvZmZzZXQpLFxuICAgICAgcGl4ZWxzID0gYW5ub3RhdG9yLnBpeGVsSW5kZXhbc3VwZXJwaXhlbEluZGV4XSxcbiAgICAgIGV4aXN0aW5nTGFiZWwgPSBfZ2V0RW5jb2RlZExhYmVsKGFubm90YXRpb25EYXRhLCBvZmZzZXQpO1xuICAgIGlmIChhbm5vdGF0b3IubW9kZSA9PT0gXCJzdXBlcnBpeGVsXCIpXG4gICAgICBhbm5vdGF0b3IuX3VwZGF0ZUhpZ2hsaWdodChwaXhlbHMpO1xuICAgIGlmICh0eXBlb2YgYW5ub3RhdG9yLm9ubW91c2Vtb3ZlID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICBhbm5vdGF0b3Iub25tb3VzZW1vdmUuY2FsbChhbm5vdGF0b3IsIGV4aXN0aW5nTGFiZWwpO1xuICAgIGlmIChtb3VzZXN0YXRlLmRvd24pIHtcbiAgICAgIGlmIChtb3VzZXN0YXRlLmJ1dHRvbiA9PSAyICYmXG4gICAgICAgIHR5cGVvZiBhbm5vdGF0b3Iub25yaWdodGNsaWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgaWYgKGFubm90YXRvci5tb2RlID09PSBcInBvbHlnb25cIilcbiAgICAgICAgICBhbm5vdGF0b3IuX2VtcHR5UG9seWdvblBvaW50cygpOyAvL3Jlc2V0XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBhbm5vdGF0b3Iub25yaWdodGNsaWNrLmNhbGwoYW5ub3RhdG9yLCBleGlzdGluZ0xhYmVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChhbm5vdGF0b3IubW9kZSA9PT0gXCJicnVzaFwiICYmIGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgIGFubm90YXRvci5icnVzaChhbm5vdGF0b3IuX2dldENsaWNrUG9zKGV2ZW50KSwgYW5ub3RhdG9yLmN1cnJlbnRMYWJlbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCAmJiBhbm5vdGF0b3IubW9kZSA9PT0gXCJwb2x5Z29uXCIpIHtcbiAgICAgICAgICBhbm5vdGF0b3IuX2FkZFBvbHlnb25Qb2ludChldmVudCk7XG4gICAgICAgICAgaWYgKGFubm90YXRvci5fY2hlY2tMaW5lSW50ZXJzZWN0aW9uKCkpXG4gICAgICAgICAgICBhbm5vdGF0b3IuX2FkZFBvbHlnb25Ub0Fubm90YXRpb24oKTtcbiAgICAgICAgfSBlbHNlIGlmIChhbm5vdGF0b3IubW9kZSA9PT0gXCJzdXBlcnBpeGVsXCIpIHtcbiAgICAgICAgICBhbm5vdGF0b3IuX3VwZGF0ZUFubm90YXRpb24ocGl4ZWxzLCBhbm5vdGF0b3IuY3VycmVudExhYmVsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGFubm90YXRvci5vbmxlZnRjbGljayA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICAgIGFubm90YXRvci5vbmxlZnRjbGljay5jYWxsKGFubm90YXRvciwgYW5ub3RhdG9yLmN1cnJlbnRMYWJlbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB1cGRhdGVJZkFjdGl2ZSk7XG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdXBkYXRlSWZBY3RpdmUpO1xuICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBhbm5vdGF0b3IuX3VwZGF0ZUhpZ2hsaWdodChudWxsKTtcbiAgICBpZiAodHlwZW9mIGFubm90YXRvci5vbm1vdXNlbW92ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBhbm5vdGF0b3Iub25tb3VzZW1vdmUuY2FsbChhbm5vdGF0b3IsIG51bGwpO1xuICAgIH1cbiAgfSk7XG5cbiAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIG1vdXNlc3RhdGUuZG93biA9IHRydWU7XG4gICAgbW91c2VzdGF0ZS5idXR0b24gPSBldmVudC5idXR0b247XG4gIH0pO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uICgpIHtcbiAgICBtb3VzZXN0YXRlLmRvd24gPSBmYWxzZTtcbiAgfSk7XG5cbiAgLy9wb2x5Z29uIG9uL29mZiB3aXRoIGN0cmwta2V5XG4gIC8vIHdpbmRvdy5vbmtleXVwID0gZnVuY3Rpb24gKGUpIHtcbiAgLy8gICB2YXIga2V5ID0gZS5rZXlDb2RlID8gZS5rZXlDb2RlIDogZS53aGljaDtcbiAgLy8gICBpZiAoa2V5ID09IDE3KSB7XG4gIC8vICAgICBpZiAoYW5ub3RhdG9yLm1vZGUgPT0gXCJwb2x5Z29uXCIpIHtcbiAgLy8gICAgICAgYW5ub3RhdG9yLm1vZGUgPSBcInN1cGVycGl4ZWxcIjtcbiAgLy8gICAgIH0gZWxzZSB7XG4gIC8vICAgICAgIGFubm90YXRvci5tb2RlID0gXCJwb2x5Z29uXCI7XG4gIC8vICAgICAgIGFubm90YXRvci5fdXBkYXRlSGlnaGxpZ2h0KG51bGwpO1xuICAvLyAgICAgfVxuICAvLyAgICAgYW5ub3RhdG9yLl9lbXB0eVBvbHlnb25Qb2ludHMoKTtcbiAgLy8gICB9XG4gIC8vIH07XG59O1xuXG5Bbm5vdGF0b3IucHJvdG90eXBlLl91cGRhdGVCb3VuZGFyeUxheWVyID0gZnVuY3Rpb24gKCkge1xuICB2YXIgYm91bmRhcnlMYXllciA9IHRoaXMubGF5ZXJzLmJvdW5kYXJ5O1xuICBib3VuZGFyeUxheWVyLmNvcHkodGhpcy5sYXllcnMuc3VwZXJwaXhlbCk7XG4gIGJvdW5kYXJ5TGF5ZXIuY29tcHV0ZUVkZ2VtYXAoe1xuICAgIGZvcmVncm91bmQ6IHRoaXMuYm91bmRhcnlDb2xvci5jb25jYXQodGhpcy5ib3VuZGFyeUFscGhhKSxcbiAgICBiYWNrZ3JvdW5kOiB0aGlzLmJvdW5kYXJ5Q29sb3IuY29uY2F0KDApXG4gIH0pO1xuICBib3VuZGFyeUxheWVyLnJlbmRlcigpO1xufTtcblxuQW5ub3RhdG9yLnByb3RvdHlwZS5faW5pdGlhbGl6ZUFubm90YXRpb25MYXllciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGxheWVyID0gdGhpcy5sYXllcnMuYW5ub3RhdGlvbjtcbiAgbGF5ZXIucmVzaXplKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgdGhpcy5jdXJyZW50TGFiZWwgPSB0aGlzLmRlZmF1bHRMYWJlbDtcbiAgbGF5ZXIuZmlsbChbdGhpcy5kZWZhdWx0TGFiZWwsIDAsIDAsIDBdKTtcbiAgbGF5ZXIucmVuZGVyKCk7XG59O1xuXG5Bbm5vdGF0b3IucHJvdG90eXBlLl9pbml0aWFsaXplVmlzdWFsaXphdGlvbkxheWVyID0gZnVuY3Rpb24gKCkge1xuICB2YXIgbGF5ZXIgPSB0aGlzLmxheWVycy52aXN1YWxpemF0aW9uO1xuICBsYXllci5yZXNpemUodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICB2YXIgaW5pdGlhbENvbG9yID0gdGhpcy5jb2xvcm1hcFt0aGlzLmRlZmF1bHRMYWJlbF1cbiAgICAuY29uY2F0KFt0aGlzLnZpc3VhbGl6YXRpb25BbHBoYV0pO1xuICBsYXllci5maWxsKGluaXRpYWxDb2xvcik7XG4gIGxheWVyLnJlbmRlcigpO1xufTtcblxuQW5ub3RhdG9yLnByb3RvdHlwZS5fdXBkYXRlU3VwZXJwaXhlbHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhbm5vdGF0b3IgPSB0aGlzO1xuICB0aGlzLmxheWVycy5zdXBlcnBpeGVsLnByb2Nlc3MoZnVuY3Rpb24gKGltYWdlRGF0YSkge1xuICAgIGltYWdlRGF0YS5kYXRhLnNldChhbm5vdGF0b3Iuc2VnbWVudGF0aW9uLnJlc3VsdC5kYXRhKTtcbiAgICBhbm5vdGF0b3IuX2NyZWF0ZVBpeGVsSW5kZXgoYW5ub3RhdG9yLnNlZ21lbnRhdGlvbi5yZXN1bHQubnVtU2VnbWVudHMpO1xuICAgIGFubm90YXRvci5fdXBkYXRlQm91bmRhcnlMYXllcigpO1xuICAgIHRoaXMuc2V0QWxwaGEoMCkucmVuZGVyKCk7XG4gIH0pO1xufTtcblxuQW5ub3RhdG9yLnByb3RvdHlwZS5fY3JlYXRlUGl4ZWxJbmRleCA9IGZ1bmN0aW9uIChudW1TZWdtZW50cykge1xuICB2YXIgcGl4ZWxJbmRleCA9IG5ldyBBcnJheShudW1TZWdtZW50cyksXG4gICAgZGF0YSA9IHRoaXMubGF5ZXJzLnN1cGVycGl4ZWwuaW1hZ2VEYXRhLmRhdGEsXG4gICAgaTtcbiAgZm9yIChpID0gMDsgaSA8IG51bVNlZ21lbnRzOyArK2kpXG4gICAgcGl4ZWxJbmRleFtpXSA9IFtdO1xuICBmb3IgKGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgIHZhciBpbmRleCA9IGRhdGFbaV0gfCAoZGF0YVtpICsgMV0gPDwgOCkgfCAoZGF0YVtpICsgMl0gPDwgMTYpO1xuICAgIHBpeGVsSW5kZXhbaW5kZXhdLnB1c2goaSk7XG4gIH1cbiAgdGhpcy5jdXJyZW50UGl4ZWxzID0gbnVsbDtcbiAgdGhpcy5waXhlbEluZGV4ID0gcGl4ZWxJbmRleDtcbn07XG5cbkFubm90YXRvci5wcm90b3R5cGUuX2dldENsaWNrT2Zmc2V0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHZhciBwb3MgPSB0aGlzLl9nZXRDbGlja1BvcyhldmVudCksXG4gICAgeCA9IHBvc1swXSxcbiAgICB5ID0gcG9zWzFdO1xuICByZXR1cm4gNCAqICh5ICogdGhpcy5sYXllcnMudmlzdWFsaXphdGlvbi5jYW52YXMud2lkdGggKyB4KTtcbn07XG5cbkFubm90YXRvci5wcm90b3R5cGUuX2dldENsaWNrUG9zID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcixcbiAgICBjb250YWluZXJSZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCB3aW4gPSB3aW5kb3csIGRvY0VsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgb2Zmc2V0TGVmdCA9IGNvbnRhaW5lclJlY3QubGVmdCArICh3aW4ucGFnZVhPZmZzZXQgfHwgZG9jRWxlbS5zY3JvbGxMZWZ0KSAtIChkb2NFbGVtLmNsaWVudExlZnQgfHwgMCksXG4gICAgb2Zmc2V0VG9wID0gY29udGFpbmVyUmVjdC50b3AgKyAod2luLnBhZ2VZT2Zmc2V0IHx8IGRvY0VsZW0uc2Nyb2xsVG9wKSAtIChkb2NFbGVtLmNsaWVudFRvcCB8fCAwKSxcbiAgICB4ID0gTWF0aC5yb3VuZChcbiAgICAgIChldmVudC5wYWdlWCAtIG9mZnNldExlZnQgKyBjb250YWluZXIuc2Nyb2xsTGVmdCkgKlxuICAgICAgKGNvbnRhaW5lci5vZmZzZXRXaWR0aCAvIGNvbnRhaW5lci5zY3JvbGxXaWR0aClcbiAgICApLFxuICAgIHkgPSBNYXRoLnJvdW5kKFxuICAgICAgKGV2ZW50LnBhZ2VZIC0gb2Zmc2V0VG9wICsgY29udGFpbmVyLnNjcm9sbFRvcCkgKlxuICAgICAgKGNvbnRhaW5lci5vZmZzZXRIZWlnaHQgLyBjb250YWluZXIuc2Nyb2xsSGVpZ2h0KVxuICAgICksXG4gICAgeCA9IE1hdGgubWF4KE1hdGgubWluKHgsIHRoaXMubGF5ZXJzLnZpc3VhbGl6YXRpb24uY2FudmFzLndpZHRoIC0gMSksIDApO1xuICB5ID0gTWF0aC5tYXgoTWF0aC5taW4oeSwgdGhpcy5sYXllcnMudmlzdWFsaXphdGlvbi5jYW52YXMuaGVpZ2h0IC0gMSksIDApO1xuICByZXR1cm4gW3gsIHldO1xufTtcblxuLy8gcG9seWdvbiB0b29sLlxuQW5ub3RhdG9yLnByb3RvdHlwZS5fYWRkUG9seWdvblBvaW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHZhciBhbm5vdGF0b3IgPSB0aGlzLFxuICAgIHBvcyA9IHRoaXMuX2dldENsaWNrUG9zKGV2ZW50KSxcbiAgICB4ID0gcG9zWzBdLFxuICAgIHkgPSBwb3NbMV07XG4gIC8vZ2V0IGNhbnZhcy5cbiAgdmFyIGNhbnZhcyA9IGFubm90YXRvci5sYXllcnMuYW5ub3RhdGlvbi5jYW52YXMsXG4gICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIGlmICh0aGlzLnBvbHlnb25Qb2ludHMubGVuZ3RoID09PSAwKSB7XG4gICAgY3R4LnNhdmUoKTsgIC8vIHJlbWVtYmVyIHByZXZpb3VzIHN0YXRlLlxuICAgIGFubm90YXRvci5wcmV2QW5ub3RhdGlvbkltZyA9XG4gICAgICBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gIH1cbiAgLy8gZHJhdy5cbiAgY3R4LmZpbGxTdHlsZSA9ICcjRkE2OTAwJztcbiAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwMDAwXCI7XG4gIGN0eC5saW5lV2lkdGggPSAxO1xuICBpZiAodGhpcy5wb2x5Z29uUG9pbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKHgsIHkpO1xuICB9IGVsc2Uge1xuICAgIGN0eC5saW5lVG8oeCwgeSk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICB9XG4gIHRoaXMucG9seWdvblBvaW50cy5wdXNoKHBvcyk7XG59O1xuXG5Bbm5vdGF0b3IucHJvdG90eXBlLl9lbXB0eVBvbHlnb25Qb2ludHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhbm5vdGF0b3IgPSB0aGlzLFxuICAgIGN0eCA9IGFubm90YXRvci5sYXllcnMuYW5ub3RhdGlvbi5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgY3R4LnJlc3RvcmUoKTtcbiAgaWYgKGFubm90YXRvci5wcmV2QW5ub3RhdGlvbkltZylcbiAgICBjdHgucHV0SW1hZ2VEYXRhKGFubm90YXRvci5wcmV2QW5ub3RhdGlvbkltZywgMCwgMCk7XG4gIC8vcmVzZXQgcG9seWdvbi1wb2ludHNcbiAgYW5ub3RhdG9yLnBvbHlnb25Qb2ludHMgPSBbXTtcbn07XG5cbkFubm90YXRvci5wcm90b3R5cGUuX2FkZFBvbHlnb25Ub0Fubm90YXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhbm5vdGF0b3IgPSB0aGlzLFxuICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLFxuICAgIHgsIHk7XG4gIC8vIHNldCBjYW52YXMgZGltZW5zaW9ucy5cbiAgY2FudmFzLndpZHRoID0gYW5ub3RhdG9yLmxheWVycy5hbm5vdGF0aW9uLmNhbnZhcy53aWR0aDtcbiAgY2FudmFzLmhlaWdodCA9IGFubm90YXRvci5sYXllcnMuYW5ub3RhdGlvbi5jYW52YXMuaGVpZ2h0O1xuICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIGN0eC5maWxsU3R5bGUgPSBcInJnYmEoMCwgMCwgMjU1LCAyNTUpXCI7XG4gIGN0eC5iZWdpblBhdGgoKTtcbiAgY3R4Lm1vdmVUbyhhbm5vdGF0b3IucG9seWdvblBvaW50c1swXVswXSwgYW5ub3RhdG9yLnBvbHlnb25Qb2ludHNbMF1bMV0pO1xuICBmb3IgKGkgPSAxOyBpIDwgYW5ub3RhdG9yLnBvbHlnb25Qb2ludHMubGVuZ3RoOyArK2kpIHtcbiAgICB4ID0gYW5ub3RhdG9yLnBvbHlnb25Qb2ludHNbaV1bMF07XG4gICAgeSA9IGFubm90YXRvci5wb2x5Z29uUG9pbnRzW2ldWzFdO1xuICAgIGN0eC5saW5lVG8oeCwgeSk7XG4gIH1cbiAgY3R4LmxpbmVUbyhhbm5vdGF0b3IucG9seWdvblBvaW50c1swXVswXSwgYW5ub3RhdG9yLnBvbHlnb25Qb2ludHNbMF1bMV0pO1xuICBjdHguY2xvc2VQYXRoKCk7XG4gIGN0eC5maWxsKCk7XG4gIC8vZ2V0IHBpeGVscyB3aXRoaW4gcG9seWdvbi5cbiAgdmFyIGNvbG9yVG9DaGVjayA9IFswLCAwLCAyNTUsIDI1NV0sXG4gICAgaW1hZ2VEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpLFxuICAgIGRhdGEgPSBpbWFnZURhdGEuZGF0YSxcbiAgICBwaXhlbHNQb2x5Z29uID0gW107XG4gIGZvciAoeCA9IDA7IHggPCBjYW52YXMud2lkdGg7ICsreCkge1xuICAgIGZvciAoeSA9IDA7IHkgPCBjYW52YXMuaGVpZ2h0OyArK3kpIHtcbiAgICAgIHZhciBpbmRleCA9ICh4ICsgeSAqIGltYWdlRGF0YS53aWR0aCkgKiA0O1xuICAgICAgaWYgKGRhdGFbaW5kZXggKyAwXSA9PSBjb2xvclRvQ2hlY2tbMF0gJiZcbiAgICAgICAgZGF0YVtpbmRleCArIDFdID09IGNvbG9yVG9DaGVja1sxXSAmJlxuICAgICAgICBkYXRhW2luZGV4ICsgMl0gPT0gY29sb3JUb0NoZWNrWzJdICYmXG4gICAgICAgIGRhdGFbaW5kZXggKyAzXSA9PSBjb2xvclRvQ2hlY2tbM10pIHtcbiAgICAgICAgcGl4ZWxzUG9seWdvbi5wdXNoKGluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gdXBkYXRlIGFubm90YXRpb24uXG4gIGFubm90YXRvci5fdXBkYXRlQW5ub3RhdGlvbihwaXhlbHNQb2x5Z29uLCBhbm5vdGF0b3IuY3VycmVudExhYmVsKTtcbiAgYW5ub3RhdG9yLl9lbXB0eVBvbHlnb25Qb2ludHMoKTtcbn07XG5cbkFubm90YXRvci5wcm90b3R5cGUuX2NoZWNrTGluZUludGVyc2VjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMucG9seWdvblBvaW50cy5sZW5ndGggPCA0KVxuICAgIHJldHVybiBmYWxzZTtcbiAgdmFyIG5ld0xpbmVTdGFydFggPSB0aGlzLnBvbHlnb25Qb2ludHNbdGhpcy5wb2x5Z29uUG9pbnRzLmxlbmd0aCAtIDJdWzBdLFxuICAgIG5ld0xpbmVTdGFydFkgPSB0aGlzLnBvbHlnb25Qb2ludHNbdGhpcy5wb2x5Z29uUG9pbnRzLmxlbmd0aCAtIDJdWzFdLFxuICAgIG5ld0xpbmVFbmRYID0gdGhpcy5wb2x5Z29uUG9pbnRzW3RoaXMucG9seWdvblBvaW50cy5sZW5ndGggLSAxXVswXSxcbiAgICBuZXdMaW5lRW5kWSA9IHRoaXMucG9seWdvblBvaW50c1t0aGlzLnBvbHlnb25Qb2ludHMubGVuZ3RoIC0gMV1bMV07XG5cbiAgZm9yIChpID0gMTsgaSA8IHRoaXMucG9seWdvblBvaW50cy5sZW5ndGggLSAyOyArK2kpIHtcbiAgICB2YXIgbGluZTFTdGFydFggPSB0aGlzLnBvbHlnb25Qb2ludHNbaSAtIDFdWzBdLFxuICAgICAgbGluZTFTdGFydFkgPSB0aGlzLnBvbHlnb25Qb2ludHNbaSAtIDFdWzFdLFxuICAgICAgbGluZTFFbmRYID0gdGhpcy5wb2x5Z29uUG9pbnRzW2ldWzBdLFxuICAgICAgbGluZTFFbmRZID0gdGhpcy5wb2x5Z29uUG9pbnRzW2ldWzFdLFxuICAgICAgZGVub21pbmF0b3IgPVxuICAgICAgICAoKG5ld0xpbmVFbmRZIC0gbmV3TGluZVN0YXJ0WSkgKiAobGluZTFFbmRYIC0gbGluZTFTdGFydFgpKSAtXG4gICAgICAgICgobmV3TGluZUVuZFggLSBuZXdMaW5lU3RhcnRYKSAqIChsaW5lMUVuZFkgLSBsaW5lMVN0YXJ0WSkpLFxuICAgICAgYSA9IGxpbmUxU3RhcnRZIC0gbmV3TGluZVN0YXJ0WSxcbiAgICAgIGIgPSBsaW5lMVN0YXJ0WCAtIG5ld0xpbmVTdGFydFgsXG4gICAgICBudW1lcmF0b3IxID0gKChuZXdMaW5lRW5kWCAtIG5ld0xpbmVTdGFydFgpICogYSkgLVxuICAgICAgICAoKG5ld0xpbmVFbmRZIC0gbmV3TGluZVN0YXJ0WSkgKiBiKSxcbiAgICAgIG51bWVyYXRvcjIgPSAoKGxpbmUxRW5kWCAtIGxpbmUxU3RhcnRYKSAqIGEpIC1cbiAgICAgICAgKChsaW5lMUVuZFkgLSBsaW5lMVN0YXJ0WSkgKiBiKTtcbiAgICBhID0gbnVtZXJhdG9yMSAvIGRlbm9taW5hdG9yO1xuICAgIGIgPSBudW1lcmF0b3IyIC8gZGVub21pbmF0b3I7XG4gICAgaWYgKGEgPiAwICYmIGEgPCAxICYmIGIgPiAwICYmIGIgPCAxKVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuQW5ub3RhdG9yLnByb3RvdHlwZS5fc2V0TW9kZSA9IGZ1bmN0aW9uIChtb2RlKSB7XG4gIHRoaXMubW9kZSA9IG1vZGU7XG59O1xuXG5Bbm5vdGF0b3IucHJvdG90eXBlLl91cGRhdGVIaWdobGlnaHQgPSBmdW5jdGlvbiAocGl4ZWxzKSB7XG4gIHZhciB2aXN1YWxpemF0aW9uRGF0YSA9IHRoaXMubGF5ZXJzLnZpc3VhbGl6YXRpb24uaW1hZ2VEYXRhLmRhdGEsXG4gICAgYm91bmRhcnlEYXRhID0gdGhpcy5sYXllcnMuYm91bmRhcnkuaW1hZ2VEYXRhLmRhdGEsXG4gICAgYW5ub3RhdGlvbkRhdGEgPSB0aGlzLmxheWVycy5hbm5vdGF0aW9uLmltYWdlRGF0YS5kYXRhLFxuICAgIGksXG4gICAgY29sb3IsXG4gICAgb2Zmc2V0O1xuICBpZiAodGhpcy5jdXJyZW50UGl4ZWxzICE9PSBudWxsKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMuY3VycmVudFBpeGVscy5sZW5ndGg7ICsraSkge1xuICAgICAgb2Zmc2V0ID0gdGhpcy5jdXJyZW50UGl4ZWxzW2ldO1xuICAgICAgY29sb3IgPSB0aGlzLmNvbG9ybWFwW19nZXRFbmNvZGVkTGFiZWwoYW5ub3RhdGlvbkRhdGEsIG9mZnNldCldO1xuICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgIHZpc3VhbGl6YXRpb25EYXRhW29mZnNldCArIDBdID0gY29sb3JbMF07XG4gICAgICAgIHZpc3VhbGl6YXRpb25EYXRhW29mZnNldCArIDFdID0gY29sb3JbMV07XG4gICAgICAgIHZpc3VhbGl6YXRpb25EYXRhW29mZnNldCArIDJdID0gY29sb3JbMl07XG4gICAgICAgIHZpc3VhbGl6YXRpb25EYXRhW29mZnNldCArIDNdID0gdGhpcy52aXN1YWxpemF0aW9uQWxwaGE7XG4gICAgICB9XG5cbiAgICB9XG4gIH1cbiAgdGhpcy5jdXJyZW50UGl4ZWxzID0gcGl4ZWxzO1xuICBpZiAodGhpcy5jdXJyZW50UGl4ZWxzICE9PSBudWxsKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IHBpeGVscy5sZW5ndGg7ICsraSkge1xuICAgICAgb2Zmc2V0ID0gcGl4ZWxzW2ldO1xuICAgICAgaWYgKGJvdW5kYXJ5RGF0YVtvZmZzZXQgKyAzXSkge1xuICAgICAgICB2aXN1YWxpemF0aW9uRGF0YVtvZmZzZXQgKyAwXSA9IHRoaXMuYm91bmRhcnlDb2xvclswXTtcbiAgICAgICAgdmlzdWFsaXphdGlvbkRhdGFbb2Zmc2V0ICsgMV0gPSB0aGlzLmJvdW5kYXJ5Q29sb3JbMV07XG4gICAgICAgIHZpc3VhbGl6YXRpb25EYXRhW29mZnNldCArIDJdID0gdGhpcy5ib3VuZGFyeUNvbG9yWzJdO1xuICAgICAgICB2aXN1YWxpemF0aW9uRGF0YVtvZmZzZXQgKyAzXSA9IHRoaXMuaGlnaGxpZ2h0QWxwaGE7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmlzdWFsaXphdGlvbkRhdGFbb2Zmc2V0ICsgM10gPSB0aGlzLmhpZ2hsaWdodEFscGhhO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICB0aGlzLmxheWVycy52aXN1YWxpemF0aW9uLnJlbmRlcigpO1xuICB0aGlzLmxheWVycy5ib3VuZGFyeS5yZW5kZXIoKTtcbiAgaWYgKHR5cGVvZiB0aGlzLm9uaGlnaGxpZ2h0ID09PSBcImZ1bmN0aW9uXCIpXG4gICAgdGhpcy5vbmhpZ2hsaWdodC5jYWxsKHRoaXMpO1xufTtcblxuQW5ub3RhdG9yLnByb3RvdHlwZS5fZmlsbFBpeGVscyA9IGZ1bmN0aW9uIChwaXhlbHMsIGxhYmVscykge1xuICBpZiAocGl4ZWxzLmxlbmd0aCAhPT0gbGFiZWxzLmxlbmd0aClcbiAgICB0aHJvdyBcIkludmFsaWQgZmlsbDogXCIgKyBwaXhlbHMubGVuZ3RoICsgXCIgIT09IFwiICsgbGFiZWxzLmxlbmd0aDtcbiAgdmFyIGFubm90YXRpb25EYXRhID0gdGhpcy5sYXllcnMuYW5ub3RhdGlvbi5pbWFnZURhdGEuZGF0YSxcbiAgICB2aXN1YWxpemF0aW9uRGF0YSA9IHRoaXMubGF5ZXJzLnZpc3VhbGl6YXRpb24uaW1hZ2VEYXRhLmRhdGE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGl4ZWxzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIG9mZnNldCA9IHBpeGVsc1tpXSxcbiAgICAgIGxhYmVsID0gbGFiZWxzW2ldLFxuICAgICAgY29sb3IgPSB0aGlzLmNvbG9ybWFwW2xhYmVsXTtcbiAgICBfc2V0RW5jb2RlZExhYmVsKGFubm90YXRpb25EYXRhLCBvZmZzZXQsIGxhYmVsKTtcbiAgICB2aXN1YWxpemF0aW9uRGF0YVtvZmZzZXQgKyAwXSA9IGNvbG9yWzBdO1xuICAgIHZpc3VhbGl6YXRpb25EYXRhW29mZnNldCArIDFdID0gY29sb3JbMV07XG4gICAgdmlzdWFsaXphdGlvbkRhdGFbb2Zmc2V0ICsgMl0gPSBjb2xvclsyXTtcbiAgfVxufTtcblxuLy8gVXBkYXRlIGxhYmVsLlxuQW5ub3RhdG9yLnByb3RvdHlwZS5fdXBkYXRlQW5ub3RhdGlvbiA9IGZ1bmN0aW9uIChwaXhlbHMsIGxhYmVscykge1xuICB2YXIgdXBkYXRlcztcbiAgbGFiZWxzID0gKHR5cGVvZiBsYWJlbHMgPT09IFwib2JqZWN0XCIpID9cbiAgICBsYWJlbHMgOiBfZmlsbEFycmF5KG5ldyBJbnQzMkFycmF5KHBpeGVscy5sZW5ndGgpLCBsYWJlbHMpO1xuICB1cGRhdGVzID0gdGhpcy5fZ2V0RGlmZmVyZW50aWFsVXBkYXRlcyhwaXhlbHMsIGxhYmVscyk7XG4gIGlmICh1cGRhdGVzLnBpeGVscy5sZW5ndGggPT09IDApXG4gICAgcmV0dXJuIHRoaXM7XG4gIHRoaXMuX3VwZGF0ZUhpc3RvcnkodXBkYXRlcyk7XG4gIHRoaXMuX2ZpbGxQaXhlbHModXBkYXRlcy5waXhlbHMsIHVwZGF0ZXMubmV4dCk7XG4gIHRoaXMubGF5ZXJzLnZpc3VhbGl6YXRpb24ucmVuZGVyKCk7XG4gIGlmICh0eXBlb2YgdGhpcy5vbmNoYW5nZSA9PT0gXCJmdW5jdGlvblwiKVxuICAgIHRoaXMub25jaGFuZ2UuY2FsbCh0aGlzKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBHZXQgdGhlIGRpZmZlcmVudGlhbCB1cGRhdGUgb2YgbGFiZWxzLlxuQW5ub3RhdG9yLnByb3RvdHlwZS5fZ2V0RGlmZmVyZW50aWFsVXBkYXRlcyA9IGZ1bmN0aW9uIChwaXhlbHMsIGxhYmVscykge1xuICBpZiAocGl4ZWxzLmxlbmd0aCAhPT0gbGFiZWxzLmxlbmd0aClcbiAgICB0aHJvdyBcIkludmFsaWQgbGFiZWxzXCI7XG4gIHZhciBhbm5vdGF0aW9uRGF0YSA9IHRoaXMubGF5ZXJzLmFubm90YXRpb24uaW1hZ2VEYXRhLmRhdGEsXG4gICAgdXBkYXRlcyA9IHsgcGl4ZWxzOiBbXSwgcHJldjogW10sIG5leHQ6IFtdIH07XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGl4ZWxzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGxhYmVsID0gX2dldEVuY29kZWRMYWJlbChhbm5vdGF0aW9uRGF0YSwgcGl4ZWxzW2ldKTtcbiAgICBpZiAobGFiZWwgIT09IGxhYmVsc1tpXSkge1xuICAgICAgdXBkYXRlcy5waXhlbHMucHVzaChwaXhlbHNbaV0pO1xuICAgICAgdXBkYXRlcy5wcmV2LnB1c2gobGFiZWwpO1xuICAgICAgdXBkYXRlcy5uZXh0LnB1c2gobGFiZWxzW2ldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVwZGF0ZXM7XG59O1xuXG5Bbm5vdGF0b3IucHJvdG90eXBlLl91cGRhdGVIaXN0b3J5ID0gZnVuY3Rpb24gKHVwZGF0ZXMpIHtcbiAgdGhpcy5oaXN0b3J5ID0gdGhpcy5oaXN0b3J5LnNsaWNlKDAsIHRoaXMuY3VycmVudEhpc3RvcnlSZWNvcmQgKyAxKTtcbiAgdGhpcy5oaXN0b3J5LnB1c2godXBkYXRlcyk7XG4gIGlmICh0aGlzLmhpc3RvcnkubGVuZ3RoID4gdGhpcy5tYXhIaXN0b3J5UmVjb3JkKVxuICAgIHRoaXMuaGlzdG9yeSA9IHRoaXMuaGlzdG9yeS5zbGljZSgxLCB0aGlzLmhpc3RvcnkubGVuZ3RoKTtcbiAgZWxzZVxuICAgICsrdGhpcy5jdXJyZW50SGlzdG9yeVJlY29yZDtcbn07XG5cbmZ1bmN0aW9uIF9maWxsQXJyYXkoYXJyYXksIHZhbHVlKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyArK2kpXG4gICAgYXJyYXlbaV0gPSB2YWx1ZTtcbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vLyBmdW5jdGlvbiBfZmluZE1vc3RGcmVxdWVudChhbm5vdGF0aW9uRGF0YSwgcGl4ZWxzKSB7XG4vLyAgIHZhciBoaXN0b2dyYW0gPSB7fSxcbi8vICAgICAgIGo7XG4vLyAgIGZvciAoaiA9IDA7IGogPCBwaXhlbHMubGVuZ3RoOyArK2opIHtcbi8vICAgICB2YXIgbGFiZWwgPSBfZ2V0RW5jb2RlZExhYmVsKGFubm90YXRpb25EYXRhLCBwaXhlbHNbal0pO1xuLy8gICAgIGhpc3RvZ3JhbVtsYWJlbF0gPSAoaGlzdG9ncmFtW2xhYmVsXSkgPyBoaXN0b2dyYW1bbGFiZWxdICsgMSA6IDE7XG4vLyAgIH1cbi8vICAgdmFyIG1heEZyZXF1ZW5jeSA9IDAsXG4vLyAgICAgICBtYWpvckxhYmVsID0gMDtcbi8vICAgZm9yIChqIGluIGhpc3RvZ3JhbSkge1xuLy8gICAgIHZhciBmcmVxdWVuY3kgPSBoaXN0b2dyYW1bal07XG4vLyAgICAgaWYgKGZyZXF1ZW5jeSA+IG1heEZyZXF1ZW5jeSkge1xuLy8gICAgICAgbWF4RnJlcXVlbmN5ID0gZnJlcXVlbmN5O1xuLy8gICAgICAgbWFqb3JMYWJlbCA9IGo7XG4vLyAgICAgfVxuLy8gICB9XG4vLyAgIHJldHVybiBtYWpvckxhYmVsO1xuLy8gfVxuXG5mdW5jdGlvbiBfZ2V0RW5jb2RlZExhYmVsKGFycmF5LCBvZmZzZXQpIHtcbiAgcmV0dXJuIGFycmF5W29mZnNldF0gfFxuICAgIChhcnJheVtvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKGFycmF5W29mZnNldCArIDJdIDw8IDE2KTtcbn1cblxuZnVuY3Rpb24gX3NldEVuY29kZWRMYWJlbChhcnJheSwgb2Zmc2V0LCBsYWJlbCkge1xuICBhcnJheVtvZmZzZXQgKyAwXSA9IGxhYmVsICYgMjU1O1xuICBhcnJheVtvZmZzZXQgKyAxXSA9IChsYWJlbCA+Pj4gOCkgJiAyNTU7XG4gIGFycmF5W29mZnNldCArIDJdID0gKGxhYmVsID4+PiAxNikgJiAyNTU7XG4gIGFycmF5W29mZnNldCArIDNdID0gMjU1O1xufVxuXG5leHBvcnQgeyBBbm5vdGF0b3IgfTtcbiIsIi8qKlxyXG4gKuiOt+WPluiuvuWkh+eJqeeQhuWIhui+qOeOh1xyXG4gKuagueaNrumcgOaxgumcgOimge+8mndpZHRoLT0yMDBweDtoZWlnaHQtPTE0MDtcclxuICogQHJldHVybnNcclxuICovXHJcbmZ1bmN0aW9uIGdldFNjcmVlbigpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB3aWR0aDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLTIwMCxcclxuICAgICAgICBoZWlnaHQ6ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodC0xNDBcclxuICAgIH1cclxufVxyXG5leHBvcnQge2dldFNjcmVlbn07IiwiLyoqIENvbXBhdGliaWxpdHkgQVBJLlxuICpcbiAqIENvcHlyaWdodCAyMDE1ICBLb3RhIFlhbWFndWNoaVxuICovXG4gIC8qKlxuICAgKlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHdpZHRoXG4gICAqIEBwYXJhbSB7Kn0gaGVpZ2h0XG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVJbWFnZURhdGEod2lkdGgsIGhlaWdodCkge1xuICAgIHZhciBjb250ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgcmV0dXJuIGNvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKHdpZHRoLCBoZWlnaHQpO1xuICB9XG4gIGV4cG9ydCB7Y3JlYXRlSW1hZ2VEYXRhfVxuXG4iLCIvKiogSW1hZ2UgY2FudmFzIHdyYXBwZXIuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgdmFyIGxheWVyID0gbmV3IExheWVyKFwiL3BhdGgvdG8vaW1hZ2UuanBnXCIsIHtcbiAqICAgIG9ubG9hZDogZnVuY3Rpb24gKCkge1xuICogICAgICB0aGlzLnJlc2l6ZSgyMDAsIDMwMCk7XG4gKiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jYW52YXMpO1xuICogICAgfVxuICogIH0pO1xuICpcbiAqIENvcHlyaWdodCAyMDE1ICBLb3RhIFlhbWFndWNoaVxuICovXG4gIC8vIENhbnZhcyB3cmFwcGVyIG9iamVjdC5cbiAgaW1wb3J0IHtnZXRTY3JlZW59IGZyb20gXCIuLi9oZWxwZXIvdXRpbHMuanNcIjtcblxuICBmdW5jdGlvbiBMYXllcihzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgdGhpcy5jYW52YXMud2lkdGggPSBvcHRpb25zLndpZHRoIHx8IHRoaXMuY2FudmFzLndpZHRoO1xuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0IHx8IHRoaXMuY2FudmFzLmhlaWdodDtcbiAgICBpZiAoc291cmNlKSB7XG4gICAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gXCJzdHJpbmdcIiB8fFxuICAgICAgICAgIHR5cGVvZiBzb3VyY2UgPT09IFwib2JqZWN0XCIgJiYgc291cmNlLm5vZGVOYW1lID09PSBcIklNR1wiKSAgXG4gICAgICAgIHRoaXMubG9hZChzb3VyY2UsIG9wdGlvbnMpO1xuICAgICAgZWxzZSBpZiAodHlwZW9mIHNvdXJjZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgICAgKHNvdXJjZS5ub2RlTmFtZSA9PT0gXCJDQU5WQVNcIiB8fCBzb3VyY2UgaW5zdGFuY2VvZiBJbWFnZURhdGEpKVxuICAgICAgICB0aGlzLmZyb21DYW52YXMoc291cmNlLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBMYXllci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uIChzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwiZnVuY3Rpb25cIikgb3B0aW9ucyA9IHsgb25sb2FkOiBvcHRpb25zIH07XG4gICAgdmFyIGltYWdlLCBsYXllciA9IHRoaXM7XG4gICAgdGhpcy5jYW52YXMud2lkdGggPSBvcHRpb25zLndpZHRoIHx8IHRoaXMuY2FudmFzLndpZHRoO1xuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0IHx8IHRoaXMuY2FudmFzLmhlaWdodDtcbiAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltYWdlLmNyb3NzT3JpZ2luID0gXCJcIjtcbiAgICAgIGltYWdlLnNyYyA9IHNvdXJjZTtcbiAgICAgIFxuICAgIH1cbiAgICBlbHNlXG4gICAgICBpbWFnZSA9IHNvdXJjZTtcbiAgICBpbWFnZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzY3JlZW5PYmogPSBnZXRTY3JlZW4oKTtcbiAgICAgIHZhciBzY2FsZSA9IGltYWdlLmhlaWdodC9pbWFnZS53aWR0aDtcbiAgICAgIGlmKHNjYWxlPj0xKXtcbiAgICAgICAgaWYoaW1hZ2UuaGVpZ2h0Pj1zY3JlZW5PYmouaGVpZ2h0KXtcbiAgICAgICAgICBpbWFnZS5oZWlnaHQgPSBzY3JlZW5PYmouaGVpZ2h0O1xuICAgICAgICAgIGltYWdlLndpZHRoID0gaW1hZ2UuaGVpZ2h0L3NjYWxlO1xuICAgICAgICB9XG4gICAgICB9ZWxzZXtcbiAgICAgICAgaWYoaW1hZ2Uud2lkdGg+c2NyZWVuT2JqLndpZHRoKXtcbiAgICAgICAgICBpbWFnZS53aWR0aCA9IHNjcmVlbk9iai53aWR0aDtcbiAgICAgICAgICBpbWFnZS5oZWlnaHQgPSBpbWFnZS53aWR0aCpzY2FsZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGF5ZXIuX29uSW1hZ2VMb2FkKGltYWdlLCBvcHRpb25zKTsgXG5cbiAgICB9O1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5vbmVycm9yID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICBpbWFnZS5vbmVycm9yID0gb3B0aW9ucy5vbmVycm9yLmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgTGF5ZXIucHJvdG90eXBlLl9vbkltYWdlTG9hZCA9IGZ1bmN0aW9uIChpbWFnZSwgb3B0aW9ucykge1xuICAgIHRoaXMuY2FudmFzLndpZHRoID0gb3B0aW9ucy53aWR0aCB8fCBpbWFnZS53aWR0aDtcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBvcHRpb25zLmhlaWdodCB8fCBpbWFnZS5oZWlnaHQ7XG4gICAgdmFyIGNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdGhpcy5fc2V0SW1hZ2VTbW9vdGhpbmcoY29udGV4dCwgb3B0aW9ucyk7XG4gICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDAsIGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMub25sb2FkID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICBvcHRpb25zLm9ubG9hZC5jYWxsKHRoaXMpO1xuICB9O1xuXG4gIExheWVyLnByb3RvdHlwZS5mcm9tQ2FudmFzID0gZnVuY3Rpb24gKHNvdXJjZSwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJmdW5jdGlvblwiKSBvcHRpb25zID0geyBvbmxvYWQ6IG9wdGlvbnMgfTtcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHNvdXJjZS53aWR0aDtcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBzb3VyY2UuaGVpZ2h0O1xuICAgIHZhciBjb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMuX3NldEltYWdlU21vb3RoaW5nKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBJbWFnZURhdGEpXG4gICAgICBjb250ZXh0LnB1dEltYWdlRGF0YShzb3VyY2UsIDAsIDApO1xuICAgIGVsc2VcbiAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHNvdXJjZSwgMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgdGhpcy5pbWFnZURhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW52YXMud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5vbmxvYWQgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgIG9wdGlvbnMub25sb2FkLmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgTGF5ZXIucHJvdG90eXBlLmZyb21JbWFnZURhdGEgPSBmdW5jdGlvbiAoaW1hZ2VEYXRhLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSBcImZ1bmN0aW9uXCIpIG9wdGlvbnMgPSB7IG9ubG9hZDogb3B0aW9ucyB9O1xuICAgIHRoaXMuY2FudmFzLndpZHRoID0gaW1hZ2VEYXRhLndpZHRoO1xuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGltYWdlRGF0YS5oZWlnaHQ7XG4gICAgdmFyIGNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdGhpcy5fc2V0SW1hZ2VTbW9vdGhpbmcoY29udGV4dCwgb3B0aW9ucyk7XG4gICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VEYXRhLCAwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICB0aGlzLmltYWdlRGF0YSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLm9ubG9hZCA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgb3B0aW9ucy5vbmxvYWQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBMYXllci5wcm90b3R5cGUuX3NldEltYWdlU21vb3RoaW5nID0gZnVuY3Rpb24gKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgb3B0aW9ucy5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0cnVlO1xuICAgIGNvbnRleHQubW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gb3B0aW9ucy5pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgY29udGV4dC53ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWQgPSBvcHRpb25zLmltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICBjb250ZXh0Lm1zSW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gb3B0aW9ucy5pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBvcHRpb25zLmltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgfTtcblxuICBMYXllci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICBzb3VyY2UucmVuZGVyKCk7XG4gICAgdGhpcy5mcm9tQ2FudmFzKHNvdXJjZS5jYW52YXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIExheWVyLnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKVxuICAgICAgdGhyb3cgXCJJbnZhbGlkIGNhbGxiYWNrXCI7XG4gICAgY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmltYWdlRGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyKCk7XG4gIH07XG5cbiAgTGF5ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pbWFnZURhdGEpXG4gICAgICB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikucHV0SW1hZ2VEYXRhKHRoaXMuaW1hZ2VEYXRhLCAwLCAwKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBMYXllci5wcm90b3R5cGUuc2V0QWxwaGEgPSBmdW5jdGlvbiAoYWxwaGEpIHtcbiAgICB2YXIgZGF0YSA9IHRoaXMuaW1hZ2VEYXRhLmRhdGE7XG4gICAgZm9yICh2YXIgaSA9IDM7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KVxuICAgICAgZGF0YVtpXSA9IGFscGhhO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIExheWVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gKHJnYmEpIHtcbiAgICB2YXIgZGF0YSA9IHRoaXMuaW1hZ2VEYXRhLmRhdGE7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByZ2JhLmxlbmd0aDsgKytqKVxuICAgICAgICBkYXRhW2kgKyBqXSA9IHJnYmFbal07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgTGF5ZXIucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdmFyIHRlbXBvcmFyeUNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksXG4gICAgICAgIHRlbXBvYXJ5Q29udGV4dCA9IHRlbXBvcmFyeUNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdGVtcG9yYXJ5Q2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgdGVtcG9yYXJ5Q2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0ZW1wb2FyeUNvbnRleHQuZHJhd0ltYWdlKHRoaXMuY2FudmFzLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICB2YXIgY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLl9zZXRJbWFnZVNtb290aGluZyhjb250ZXh0LCBvcHRpb25zKTtcbiAgICBjb250ZXh0LmRyYXdJbWFnZSh0ZW1wb3JhcnlDYW52YXMsIDAsIDApO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgTGF5ZXIucHJvdG90eXBlLmFwcGx5Q29sb3JtYXAgPSBmdW5jdGlvbiAoY29sb3JtYXAsIGdyYXlzY2FsZSkge1xuICAgIHZhciBkYXRhID0gdGhpcy5pbWFnZURhdGEuZGF0YTtcbiAgICBpZiAodHlwZW9mIGdyYXlzY2FsZSA9PT0gXCJ1bmRlZmluZWRcIikgZ3JheXNjYWxlID0gdHJ1ZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIHZhciBpbmRleCA9IGRhdGFbaV07XG4gICAgICBpZiAoIWdyYXlzY2FsZSlcbiAgICAgICAgaW5kZXggfD0gKGRhdGFbaSArIDFdIDw8IDgpIHwgKGRhdGFbaSArIDJdIDw8IDE2KTtcbiAgICAgIGlmIChjb2xvcm1hcFtpbmRleF0pIHtcbiAgICAgICAgZGF0YVtpICsgMF0gPSBjb2xvcm1hcFtpbmRleF1bMF07XG4gICAgICAgIGRhdGFbaSArIDFdID0gY29sb3JtYXBbaW5kZXhdWzFdO1xuICAgICAgICBkYXRhW2kgKyAyXSA9IGNvbG9ybWFwW2luZGV4XVsyXTtcbiAgICAgIH1cblxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBMYXllci5wcm90b3R5cGUuY29tcHV0ZUVkZ2VtYXAgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucyA9IHt9O1xuICAgIHZhciBkYXRhID0gdGhpcy5pbWFnZURhdGEuZGF0YSxcbiAgICAgICAgd2lkdGggPSB0aGlzLmltYWdlRGF0YS53aWR0aCxcbiAgICAgICAgaGVpZ2h0ID0gdGhpcy5pbWFnZURhdGEuaGVpZ2h0LFxuICAgICAgICBlZGdlTWFwID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5pbWFnZURhdGEuZGF0YSksXG4gICAgICAgIGZvcmVncm91bmQgPSBvcHRpb25zLmZvcmVncm91bmQgfHwgWzI1NSwgMjU1LCAyNTVdLFxuICAgICAgICBiYWNrZ3JvdW5kID0gb3B0aW9ucy5iYWNrZ3JvdW5kIHx8IFswLCAwLCAwXSxcbiAgICAgICAgaSwgaiwgaztcbiAgICBmb3IgKGkgPSAwOyBpIDwgaGVpZ2h0OyArK2kpIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCB3aWR0aDsgKytqKSB7XG4gICAgICAgIHZhciBvZmZzZXQgPSA0ICogKGkgKiB3aWR0aCArIGopLFxuICAgICAgICAgICAgaW5kZXggPSBkYXRhWzQgKiAoaSAqIHdpZHRoICsgaildLFxuICAgICAgICAgICAgaXNCb3VuZGFyeSA9IChpID09PSAwIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGogPT09IDAgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9PT0gKGhlaWdodCAtIDEpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGogPT09ICh3aWR0aCAtIDEpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ICE9PSBkYXRhWzQgKiAoaSAqIHdpZHRoICsgaiAtIDEpXSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCAhPT0gZGF0YVs0ICogKGkgKiB3aWR0aCArIGogKyAxKV0gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggIT09IGRhdGFbNCAqICgoaSAtIDEpICogd2lkdGggKyBqKV0gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggIT09IGRhdGFbNCAqICgoaSArIDEpICogd2lkdGggKyBqKV0pO1xuICAgICAgICBpZiAoaXNCb3VuZGFyeSkge1xuICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBmb3JlZ3JvdW5kLmxlbmd0aDsgKytrKVxuICAgICAgICAgICAgZWRnZU1hcFtvZmZzZXQgKyBrXSA9IGZvcmVncm91bmRba107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZm9yIChrID0gMDsgayA8IGJhY2tncm91bmQubGVuZ3RoOyArK2spXG4gICAgICAgICAgICBlZGdlTWFwW29mZnNldCArIGtdID0gYmFja2dyb3VuZFtrXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhLnNldChlZGdlTWFwKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBMYXllci5wcm90b3R5cGUuZ3JheTJpbmRleCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZGF0YSA9IHRoaXMuaW1hZ2VEYXRhLmRhdGE7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICBkYXRhW2kgKyAxXSA9IDA7XG4gICAgICBkYXRhW2kgKyAyXSA9IDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGV4cG9ydCB7TGF5ZXJ9O1xuIiwiLyoqIEltYWdlIG1vcnBob2xvZ3kgb3BlcmF0aW9ucyBhbmQgaW5kZXggaW1hZ2UgSS9PLlxuICpcbiAqIENvcHlyaWdodCAyMDE1ICBLb3RhIFlhbWFndWNoaVxuICovXG5pbXBvcnQgKiBhcyBjb21wYXQgZnJvbSBcIi4vY29tcGF0XCI7XG5pbXBvcnQge21heEZpbHRlcn0gZnJvbSBcIi4vbW9ycGgvbWF4LWZpbHRlclwiO1xuICBmdW5jdGlvbiBkZWNvZGVJbmRleEltYWdlKGltYWdlRGF0YSkge1xuICAgIHZhciBpbmRleEltYWdlID0ge1xuICAgICAgd2lkdGg6IGltYWdlRGF0YS53aWR0aCxcbiAgICAgIGhlaWdodDogaW1hZ2VEYXRhLmhlaWdodCxcbiAgICAgIGRhdGE6IG5ldyBJbnQzMkFycmF5KGltYWdlRGF0YS53aWR0aCAqIGltYWdlRGF0YS5oZWlnaHQpXG4gICAgfTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltYWdlRGF0YS5kYXRhLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgb2Zmc2V0ID0gNCAqIGk7XG4gICAgICBpbmRleEltYWdlLmRhdGFbaV0gPSAoaW1hZ2VEYXRhLmRhdGFbb2Zmc2V0ICsgMF0pIHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIChpbWFnZURhdGEuZGF0YVtvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAoaW1hZ2VEYXRhLmRhdGFbb2Zmc2V0ICsgMl0gPDwgMTYpO1xuICAgIH1cbiAgICByZXR1cm4gaW5kZXhJbWFnZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuY29kZUluZGV4SW1hZ2UoaW5kZXhJbWFnZSkge1xuICAgIHZhciBpbWFnZURhdGEgPSBjb21wYXQuY3JlYXRlSW1hZ2VEYXRhKGluZGV4SW1hZ2Uud2lkdGgsIGluZGV4SW1hZ2UuaGVpZ2h0KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGV4SW1hZ2UubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBvZmZzZXQgPSA0ICogaSxcbiAgICAgICAgICB2YWx1ZSA9IGluZGV4SW1hZ2UuZGF0YVtpXTtcbiAgICAgIGltYWdlRGF0YS5kYXRhW29mZnNldF0gPSAyNTUgJiB2YWx1ZTtcbiAgICAgIGltYWdlRGF0YS5kYXRhW29mZnNldCArIDFdID0gMjU1ICYgKHZhbHVlID4+PiA4KTtcbiAgICAgIGltYWdlRGF0YS5kYXRhW29mZnNldCArIDJdID0gMjU1ICYgKHZhbHVlID4+PiAxNik7XG4gICAgICBpbWFnZURhdGEuZGF0YVtvZmZzZXQgKyAzXSA9IDI1NTtcbiAgICB9XG4gICAgcmV0dXJuIGltYWdlRGF0YTtcbiAgfVxuXG4gIGV4cG9ydCB7XG4gICAgZW5jb2RlSW5kZXhJbWFnZSxcbiAgICBkZWNvZGVJbmRleEltYWdlLFxuICAgIG1heEZpbHRlclxuICB9O1xuIiwiLyoqIE1heCBmaWx0ZXIgZm9yIGFuIGluZGV4IGltYWdlLlxuICpcbiAqIENvcHlyaWdodCAyMDE1ICBLb3RhIFlhbWFndWNoaVxuICovXG5pbXBvcnQge05laWdoYm9yTWFwfSBmcm9tIFwiLi9uZWlnaGJvci1tYXBcIlxuXG4gIGZ1bmN0aW9uIGZpbmREb21pbmFudExhYmVsKGRhdGEsIG5laWdoYm9ycykge1xuICAgIHZhciBoaXN0b2dyYW0gPSB7fSxcbiAgICAgICAgaSwgbGFiZWw7XG4gICAgZm9yIChpID0gMDsgaSA8IG5laWdoYm9ycy5sZW5ndGg7ICsraSkge1xuICAgICAgbGFiZWwgPSBkYXRhW25laWdoYm9yc1tpXV07XG4gICAgICBpZiAoaGlzdG9ncmFtW2xhYmVsXSlcbiAgICAgICAgKytoaXN0b2dyYW1bbGFiZWxdO1xuICAgICAgZWxzZVxuICAgICAgICBoaXN0b2dyYW1bbGFiZWxdID0gMTtcbiAgICB9XG4gICAgdmFyIGxhYmVscyA9IE9iamVjdC5rZXlzKGhpc3RvZ3JhbSksXG4gICAgICAgIGNvdW50ID0gMCxcbiAgICAgICAgZG9taW5hbnRMYWJlbCA9IG51bGw7XG4gICAgZm9yIChpID0gMDsgaSA8IGxhYmVscy5sZW5ndGg7ICsraSkge1xuICAgICAgbGFiZWwgPSBsYWJlbHNbaV07XG4gICAgICBpZiAoaGlzdG9ncmFtW2xhYmVsXSA+IGNvdW50KSB7XG4gICAgICAgIGRvbWluYW50TGFiZWwgPSBwYXJzZUludChsYWJlbCwgMTApO1xuICAgICAgICBjb3VudCA9IGhpc3RvZ3JhbVtsYWJlbF07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkb21pbmFudExhYmVsO1xuICB9XG5cbiAgZnVuY3Rpb24gbWF4RmlsdGVyKGluZGV4SW1hZ2UsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgbmVpZ2hib3JzID0gb3B0aW9ucy5uZWlnaGJvcnMgfHwgW1stMSwgLTFdLCBbLTEsIDBdLCBbLTEsIDFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWyAwLCAtMV0sIFsgMCwgMF0sIFsgMCwgMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbIDEsIC0xXSwgWyAxLCAwXSwgWyAxLCAxXV0sXG4gICAgICAgIHJlc3VsdCA9IG5ldyBJbnQzMkFycmF5KGluZGV4SW1hZ2UuZGF0YS5sZW5ndGgpLFxuICAgICAgICBuZWlnaGJvck1hcCA9IG5ldyBOZWlnaGJvck1hcChpbmRleEltYWdlLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleEltYWdlLmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGV4SW1hZ2UuZGF0YS5sZW5ndGg7ICsraSlcbiAgICAgIHJlc3VsdFtpXSA9IGZpbmREb21pbmFudExhYmVsKGluZGV4SW1hZ2UuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5laWdoYm9yTWFwLmdldChpKSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiBpbmRleEltYWdlLndpZHRoLFxuICAgICAgaGVpZ2h0OiBpbmRleEltYWdlLmhlaWdodCxcbiAgICAgIGRhdGE6IHJlc3VsdFxuICAgIH07XG4gIH1cblxuICAgZXhwb3J0IHttYXhGaWx0ZXJ9O1xuIiwiLyoqIENyZWF0ZSBhIG1hcCBvZiBuZWlnaGJvciBvZmZzZXRzLlxuICpcbiAqICB2YXIgbmVpZ2hib3JNYXAgPSBuZXcgTmVpZ2hib3JNYXAod2lkdGgsIGhlaWdodCk7XG4gKiAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgKytpKSB7XG4gKiAgICB2YXIgbmVpZ2hib3JzID0gbmVpZ2hib3JNYXAuZ2V0KGkpO1xuICogICAgZm9yICh2YXIgaiA9IDA7IGogPCBuZWlnaGJvcnMubGVuZ3RoOyArK2opIHtcbiAqICAgICAgdmFyIHBpeGVsID0gZGF0YVtuZWlnaGJvcnNbal1dO1xuICogICAgfVxuICogIH1cbiAqXG4gKiBDb3B5cmlnaHQgMjAxNSAgS290YSBZYW1hZ3VjaGlcbiAqL1xuICAvLyBOZWlnaGJvciBNYXAuXG4gIGZ1bmN0aW9uIE5laWdoYm9yTWFwKHdpZHRoLCBoZWlnaHQsIG5laWdoYm9ycykge1xuICAgIHRoaXMubmVpZ2hib3JzID0gbmVpZ2hib3JzIHx8IFtbLTEsIC0xXSwgWy0xLCAwXSwgWy0xLCAxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWyAwLCAtMV0sICAgICAgICAgIFsgMCwgMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsgMSwgLTFdLCBbIDEsIDBdLCBbIDEsIDFdXTtcbiAgICB0aGlzLm1hcHMgPSBbXTtcbiAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubmVpZ2hib3JzLmxlbmd0aDsgKytrKSB7XG4gICAgICB2YXIgZHkgPSB0aGlzLm5laWdoYm9yc1trXVswXSxcbiAgICAgICAgICBkeCA9IHRoaXMubmVpZ2hib3JzW2tdWzFdLFxuICAgICAgICAgIG1hcCA9IG5ldyBJbnQzMkFycmF5KHdpZHRoICogaGVpZ2h0KTtcbiAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgaGVpZ2h0OyArK3kpIHtcbiAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCB3aWR0aDsgKyt4KSB7XG4gICAgICAgICAgdmFyIFkgPSB5ICsgZHksXG4gICAgICAgICAgICAgIFggPSB4ICsgZHg7XG4gICAgICAgICAgbWFwW3kgKiB3aWR0aCArIHhdID0gKFkgPCAwIHx8IGhlaWdodCA8PSBZIHx8IFggPCAwIHx8IHdpZHRoIDw9IFgpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtMSA6IFkgKiB3aWR0aCArIFg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMubWFwcy5wdXNoKG1hcCk7XG4gICAgfVxuICB9XG5cbiAgTmVpZ2hib3JNYXAucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgICB2YXIgbmVpZ2hib3JPZmZzZXRzID0gW107XG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLm5laWdoYm9ycy5sZW5ndGg7ICsraykge1xuICAgICAgdmFyIG5laWdoYm9yT2Zmc2V0ID0gdGhpcy5tYXBzW2tdW29mZnNldF07XG4gICAgICBpZiAobmVpZ2hib3JPZmZzZXQgPj0gMClcbiAgICAgICAgbmVpZ2hib3JPZmZzZXRzLnB1c2gobmVpZ2hib3JPZmZzZXQpO1xuICAgIH1cbiAgICByZXR1cm4gbmVpZ2hib3JPZmZzZXRzO1xuICB9O1xuXG4gIGV4cG9ydCB7TmVpZ2hib3JNYXB9O1xuIiwiLyoqIEltYWdlIHNlZ21lbnRhdGlvbiBmYWN0b3J5LlxuICpcbiAqICB2YXIgc2VnbSA9IHNlZ21lbnRhdGlvbi5jcmVhdGUoaW1hZ2VEYXRhKTtcbiAqICB2YXIgc2VnbWVudERhdGEgPSBzZWdtLnJlc3VsdDsgIC8vIGltYWdlRGF0YSB3aXRoIG51bVNlZ21lbnRzLlxuICpcbiAqICBzZWdtLmZpbmVyKCk7XG4gKiAgc2VnbS5jb2Fyc2VyKCk7XG4gKlxuICogQ29weXJpZ2h0IDIwMTUgIEtvdGEgWWFtYWd1Y2hpXG4gKi9cbmltcG9ydCB7cGZmfSBmcm9tIFwiLi9zZWdtZW50YXRpb24vcGZmXCJcbmltcG9ydCB7c2xpY30gZnJvbSBcIi4vc2VnbWVudGF0aW9uL3NsaWNcIlxuaW1wb3J0IHtzbGljb30gZnJvbSBcIi4vc2VnbWVudGF0aW9uL3NsaWNvXCJcblxuICB2YXIgbWV0aG9kcyA9IHtcbiAgICBwZmY6IHBmZixcbiAgICBzbGljOiBzbGljLFxuICAgIHNsaWNvOiBzbGljbyxcbiAgfTtcblxuICBtZXRob2RzLmNyZWF0ZSA9IGZ1bmN0aW9uIChpbWFnZURhdGEsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zLm1ldGhvZCA9IG9wdGlvbnMubWV0aG9kIHx8IFwic2xpY1wiO1xuICAgIGlmICghbWV0aG9kc1tvcHRpb25zLm1ldGhvZF0pXG4gICAgICB0aHJvdyBcIkludmFsaWQgbWV0aG9kOiBcIiArIG9wdGlvbnMubWV0aG9kO1xuICAgIHJldHVybiBuZXcgbWV0aG9kc1tvcHRpb25zLm1ldGhvZF0oaW1hZ2VEYXRhLCBvcHRpb25zKTtcbiAgfTtcblxuICBleHBvcnQge21ldGhvZHN9O1xuIiwiLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBvdmVyLXNlZ21lbnRhdGlvbiBhbGdvcml0aG1zLlxuICpcbiAqIENvcHlyaWdodCAyMDE1ICBLb3RhIFlhbWFndWNoaVxuICovXG5pbXBvcnQgKiBhcyBjb21wYXQgZnJvbSBcIi4uL2NvbXBhdFwiXG5cbiAgZnVuY3Rpb24gQmFzZVNlZ21lbnRhdGlvbihpbWFnZURhdGEsIG9wdGlvbnMpIHtcbiAgICBpZiAoIShpbWFnZURhdGEgaW5zdGFuY2VvZiBJbWFnZURhdGEpKVxuICAgICAgdGhyb3cgXCJJbnZhbGlkIEltYWdlRGF0YVwiO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gY29tcGF0LmNyZWF0ZUltYWdlRGF0YShpbWFnZURhdGEud2lkdGgsIGltYWdlRGF0YS5oZWlnaHQpO1xuICAgIHRoaXMuaW1hZ2VEYXRhLmRhdGEuc2V0KGltYWdlRGF0YS5kYXRhKTtcbiAgfVxuXG4gIEJhc2VTZWdtZW50YXRpb24ucHJvdG90eXBlLmZpbmVyID0gZnVuY3Rpb24gKCkge307XG5cbiAgQmFzZVNlZ21lbnRhdGlvbi5wcm90b3R5cGUuY29hcnNlciA9IGZ1bmN0aW9uICgpIHt9O1xuXG4gIGV4cG9ydCB7QmFzZVNlZ21lbnRhdGlvbn07XG4iLCIvKipcbiAqIEphdmFzY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgYW4gaW1hZ2Ugc2VnbWVudGF0aW9uIGFsZ29yaXRobSBvZlxuICpcbiAqICAgIEVmZmljaWVudCBHcmFwaC1CYXNlZCBJbWFnZSBTZWdtZW50YXRpb25cbiAqICAgIFBlZHJvIEYuIEZlbHplbnN6d2FsYiBhbmQgRGFuaWVsIFAuIEh1dHRlbmxvY2hlclxuICogICAgSW50ZXJuYXRpb25hbCBKb3VybmFsIG9mIENvbXB1dGVyIFZpc2lvbiwgNTkoMikgU2VwdGVtYmVyIDIwMDQuXG4gKlxuICogQVBJXG4gKiAtLS1cbiAqXG4gKiAgICBuZXcgUEZGKGltYWdlRGF0YSwgb3B0aW9ucylcbiAqXG4gKiBUaGUgZnVuY3Rpb24gdGFrZXMgdGhlIGZvbGxvd2luZyBvcHRpb25zLlxuICogKiBgc2lnbWFgIC0gUGFyYW1ldGVyIGZvciBHYXVzc2lhbiBwcmUtc21vb3RoaW5nLiBEZWZhdWx0IDAuNS5cbiAqICogYHRocmVzaG9sZGAgLSBUaHJlc2hvbGQgdmFsdWUgb2YgdGhlIGFsZ29yaXRobS4gRGVmYXVsdCA1MDAuXG4gKiAqIGBtaW5TaXplYCAtIE1pbmltdW0gc2VnbWVudCBzaXplIGluIHBpeGVscy4gRGVmYXVsdCAyMC5cbiAqXG4gKiBDb3B5cmlnaHQgMjAxNSAgS290YSBZYW1hZ3VjaGlcbiAqL1xuXG4gaW1wb3J0IHtCYXNlU2VnbWVudGF0aW9ufSBmcm9tIFwiLi9iYXNlXCI7XG4gaW1wb3J0ICogYXMgY29tcGF0IGZyb20gXCIuLi9jb21wYXRcIlxuXG4gIGZ1bmN0aW9uIFBGRihpbWFnZURhdGEsIG9wdGlvbnMpIHtcbiAgICBCYXNlU2VnbWVudGF0aW9uLmNhbGwodGhpcywgaW1hZ2VEYXRhLCBvcHRpb25zKTtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLnNpZ21hID0gb3B0aW9ucy5zaWdtYSB8fCBNYXRoLnNxcnQoMi4wKTtcbiAgICB0aGlzLnRocmVzaG9sZCA9IG9wdGlvbnMudGhyZXNob2xkIHx8IDUwMDtcbiAgICB0aGlzLm1pblNpemUgPSBvcHRpb25zLm1pblNpemUgfHwgMjA7XG4gICAgdGhpcy5yZXN1bHQgPSB0aGlzLl9jb21wdXRlKCk7XG4gIH1cblxuICBQRkYucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXNlU2VnbWVudGF0aW9uLnByb3RvdHlwZSk7XG5cbiAgLy8gQ29tcHV0ZSBzZWdtZW50YXRpb24uXG4gIFBGRi5wcm90b3R5cGUuX2NvbXB1dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNtb290aGVkSW1hZ2UgPSBjb21wYXQuY3JlYXRlSW1hZ2VEYXRhKHRoaXMuaW1hZ2VEYXRhLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlRGF0YS5oZWlnaHQpO1xuICAgIHNtb290aGVkSW1hZ2UuZGF0YS5zZXQodGhpcy5pbWFnZURhdGEuZGF0YSk7XG4gICAgc21vb3RoSW1hZ2Uoc21vb3RoZWRJbWFnZSwgdGhpcy5zaWdtYSk7XG4gICAgdmFyIHVuaXZlcnNlID0gc2VnbWVudEdyYXBoKHNtb290aGVkSW1hZ2UsIHRoaXMudGhyZXNob2xkLCB0aGlzLm1pblNpemUpLFxuICAgICAgICBpbmRleE1hcCA9IGNyZWF0ZUluZGV4TWFwKHVuaXZlcnNlLCBzbW9vdGhlZEltYWdlKSxcbiAgICAgICAgcmVzdWx0ID0gY29tcGF0LmNyZWF0ZUltYWdlRGF0YShzbW9vdGhlZEltYWdlLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNtb290aGVkSW1hZ2UuaGVpZ2h0KTtcbiAgICBlbmNvZGVMYWJlbHMoaW5kZXhNYXAsIHJlc3VsdC5kYXRhKTtcbiAgICByZXN1bHQubnVtU2VnbWVudHMgPSB1bml2ZXJzZS5ub2RlcztcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIEZpbmVyLlxuICBQRkYucHJvdG90eXBlLmZpbmVyID0gZnVuY3Rpb24gKHNjYWxlKSB7XG4gICAgdGhpcy5zaWdtYSAvPSAoc2NhbGUgfHwgTWF0aC5zcXJ0KDIpKTtcbiAgICB0aGlzLnRocmVzaG9sZCAvPSAoc2NhbGUgfHwgTWF0aC5zcXJ0KDIpKTtcbiAgICB0aGlzLnJlc3VsdCA9IHRoaXMuX2NvbXB1dGUoKTtcbiAgfTtcblxuICAvLyBDb2Fyc2VyLlxuICBQRkYucHJvdG90eXBlLmNvYXJzZXIgPSBmdW5jdGlvbiAoc2NhbGUpIHtcbiAgICB0aGlzLnNpZ21hICo9IChzY2FsZSB8fCBNYXRoLnNxcnQoMi4wKSk7XG4gICAgdGhpcy50aHJlc2hvbGQgKj0gKHNjYWxlIHx8IE1hdGguc3FydCgyLjApKTtcbiAgICB0aGlzLnJlc3VsdCA9IHRoaXMuX2NvbXB1dGUoKTtcbiAgfTtcblxuICAvLyBDcmVhdGUgYSBub3JtYWxpemVkIEdhdXNzaWFuIGZpbHRlci5cbiAgZnVuY3Rpb24gY3JlYXRlR2F1c3NpYW4oc2lnbWEpIHtcbiAgICBzaWdtYSA9IE1hdGgubWF4KHNpZ21hLCAwLjAxKTtcbiAgICB2YXIgbGVuZ3RoID0gTWF0aC5jZWlsKHNpZ21hICogNCkgKyAxLFxuICAgICAgICBtYXNrID0gbmV3IEZsb2F0MzJBcnJheShsZW5ndGgpLFxuICAgICAgICBzdW1WYWx1ZXMgPSAwLFxuICAgICAgICBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgdmFyIHZhbHVlID0gTWF0aC5leHAoLTAuNSAqIE1hdGgucG93KGkgLyBzaWdtYSwgMikpO1xuICAgICAgc3VtVmFsdWVzICs9IE1hdGguYWJzKHZhbHVlKTtcbiAgICAgIG1hc2tbaV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgc3VtVmFsdWVzID0gMiAqIHN1bVZhbHVlcyAtIE1hdGguYWJzKG1hc2tbMF0pOyAvLyAyeCBleGNlcHQgY2VudGVyLlxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7ICsraSlcbiAgICAgIG1hc2tbaV0gLz0gc3VtVmFsdWVzO1xuICAgIHJldHVybiBtYXNrO1xuICB9XG5cbiAgLy8gQ29udm9sdmUgZXZlbi5cbiAgZnVuY3Rpb24gY29udm9sdmVFdmVuKGltYWdlRGF0YSwgZmlsdGVyKSB7XG4gICAgdmFyIHdpZHRoID0gaW1hZ2VEYXRhLndpZHRoLFxuICAgICAgICBoZWlnaHQgPSBpbWFnZURhdGEuaGVpZ2h0LFxuICAgICAgICBzb3VyY2UgPSBpbWFnZURhdGEuZGF0YSxcbiAgICAgICAgdGVtcG9yYXJ5ID0gbmV3IEZsb2F0MzJBcnJheShzb3VyY2UpLFxuICAgICAgICBpLFxuICAgICAgICBqLFxuICAgICAgICBrLFxuICAgICAgICBsLFxuICAgICAgICBzdW07XG4gICAgLy8gSG9yaXpvbnRhbCBmaWx0ZXIuXG4gICAgZm9yIChpID0gMDsgaSA8IGhlaWdodDsgKytpKSB7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgd2lkdGg7ICsraikge1xuICAgICAgICBmb3IgKGsgPSAwOyBrIDwgMzsgKytrKSB7XG4gICAgICAgICAgc3VtID0gZmlsdGVyWzBdICogc291cmNlWzQgKiAoaSAqIHdpZHRoICsgaikgKyBrXTtcbiAgICAgICAgICBmb3IgKGwgPSAxOyBsIDwgZmlsdGVyLmxlbmd0aDsgKytsKSB7XG4gICAgICAgICAgICBzdW0gKz0gZmlsdGVyW2xdICogKFxuICAgICAgICAgICAgICBzb3VyY2VbNCAqIChpICogd2lkdGggKyBNYXRoLm1heChqIC0gbCwgMCkpICsga10gK1xuICAgICAgICAgICAgICBzb3VyY2VbNCAqIChpICogd2lkdGggKyBNYXRoLm1pbihqICsgbCwgd2lkdGggLSAxKSkgKyBrXVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0ZW1wb3JhcnlbNCAqIChpICogd2lkdGggKyBqKSArIGtdID0gc3VtO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFZlcnRpY2FsIGZpbHRlci5cbiAgICBmb3IgKGkgPSAwOyBpIDwgaGVpZ2h0OyArK2kpIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCB3aWR0aDsgKytqKSB7XG4gICAgICAgIGZvciAoayA9IDA7IGsgPCAzOyArK2spIHtcbiAgICAgICAgICBzdW0gPSBmaWx0ZXJbMF0gKiB0ZW1wb3JhcnlbNCAqIChpICogd2lkdGggKyBqKSArIGtdO1xuICAgICAgICAgIGZvciAobCA9IDE7IGwgPCBmaWx0ZXIubGVuZ3RoOyArK2wpIHtcbiAgICAgICAgICAgIHN1bSArPSBmaWx0ZXJbbF0gKiAoXG4gICAgICAgICAgICAgIHRlbXBvcmFyeVs0ICogKE1hdGgubWF4KGkgLSBsLCAwKSAqIHdpZHRoICsgaikgKyBrXSArXG4gICAgICAgICAgICAgIHRlbXBvcmFyeVs0ICogKE1hdGgubWluKGkgKyBsLCBoZWlnaHQgLSAxKSAqIHdpZHRoICsgaikgKyBrXVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzb3VyY2VbNCAqIChpICogd2lkdGggKyBqKSArIGtdID0gc3VtO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gU21vb3RoIGFuIGltYWdlLlxuICBmdW5jdGlvbiBzbW9vdGhJbWFnZShpbWFnZURhdGEsIHNpZ21hKSB7XG4gICAgdmFyIGdhdXNzaWFuID0gY3JlYXRlR2F1c3NpYW4oc2lnbWEpO1xuICAgIGNvbnZvbHZlRXZlbihpbWFnZURhdGEsIGdhdXNzaWFuKTtcbiAgfVxuXG4gIC8vIENyZWF0ZSBhbiBlZGdlIHN0cnVjdHVyZS5cbiAgZnVuY3Rpb24gY3JlYXRlRWRnZXMoaW1hZ2VEYXRhKSB7XG4gICAgdmFyIHdpZHRoID0gaW1hZ2VEYXRhLndpZHRoLFxuICAgICAgICBoZWlnaHQgPSBpbWFnZURhdGEuaGVpZ2h0LFxuICAgICAgICByZ2JEYXRhID0gaW1hZ2VEYXRhLmRhdGEsXG4gICAgICAgIGVkZ2VTaXplID0gNCAqIHdpZHRoICogaGVpZ2h0IC0gMyAqIHdpZHRoIC0gMyAqIGhlaWdodCArIDIsXG4gICAgICAgIGluZGV4ID0gMCxcbiAgICAgICAgZWRnZXMgPSB7XG4gICAgICAgICAgYTogbmV3IEludDMyQXJyYXkoZWRnZVNpemUpLFxuICAgICAgICAgIGI6IG5ldyBJbnQzMkFycmF5KGVkZ2VTaXplKSxcbiAgICAgICAgICB3OiBuZXcgRmxvYXQzMkFycmF5KGVkZ2VTaXplKVxuICAgICAgICB9LFxuICAgICAgICB4MSxcbiAgICAgICAgeDI7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoZWlnaHQ7ICsraSkge1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB3aWR0aDsgKytqKSB7XG4gICAgICAgIGlmIChqIDwgd2lkdGggLSAxKSB7XG4gICAgICAgICAgeDEgPSBpICogd2lkdGggKyBqO1xuICAgICAgICAgIHgyID0gaSAqIHdpZHRoICsgaiArIDE7XG4gICAgICAgICAgZWRnZXMuYVtpbmRleF0gPSB4MTtcbiAgICAgICAgICBlZGdlcy5iW2luZGV4XSA9IHgyO1xuICAgICAgICAgIHgxID0gNCAqIHgxO1xuICAgICAgICAgIHgyID0gNCAqIHgyO1xuICAgICAgICAgIGVkZ2VzLndbaW5kZXhdID0gTWF0aC5zcXJ0KFxuICAgICAgICAgICAgTWF0aC5wb3cocmdiRGF0YVt4MSArIDBdIC0gcmdiRGF0YVt4MiArIDBdLCAyKSArXG4gICAgICAgICAgICBNYXRoLnBvdyhyZ2JEYXRhW3gxICsgMV0gLSByZ2JEYXRhW3gyICsgMV0sIDIpICtcbiAgICAgICAgICAgIE1hdGgucG93KHJnYkRhdGFbeDEgKyAyXSAtIHJnYkRhdGFbeDIgKyAyXSwgMilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgKytpbmRleDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA8IGhlaWdodCAtIDEpIHtcbiAgICAgICAgICB4MSA9IGkgKiB3aWR0aCArIGo7XG4gICAgICAgICAgeDIgPSAoaSArIDEpICogd2lkdGggKyBqO1xuICAgICAgICAgIGVkZ2VzLmFbaW5kZXhdID0geDE7XG4gICAgICAgICAgZWRnZXMuYltpbmRleF0gPSB4MjtcbiAgICAgICAgICB4MSA9IDQgKiB4MTtcbiAgICAgICAgICB4MiA9IDQgKiB4MjtcbiAgICAgICAgICBlZGdlcy53W2luZGV4XSA9IE1hdGguc3FydChcbiAgICAgICAgICAgIE1hdGgucG93KHJnYkRhdGFbeDEgKyAwXSAtIHJnYkRhdGFbeDIgKyAwXSwgMikgK1xuICAgICAgICAgICAgTWF0aC5wb3cocmdiRGF0YVt4MSArIDFdIC0gcmdiRGF0YVt4MiArIDFdLCAyKSArXG4gICAgICAgICAgICBNYXRoLnBvdyhyZ2JEYXRhW3gxICsgMl0gLSByZ2JEYXRhW3gyICsgMl0sIDIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICsraW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChqIDwgd2lkdGggLSAxKSAmJiAoaSA8IGhlaWdodCAtIDEpKSB7XG4gICAgICAgICAgeDEgPSBpICogd2lkdGggKyBqO1xuICAgICAgICAgIHgyID0gKGkgKyAxKSAqIHdpZHRoICsgaiArIDE7XG4gICAgICAgICAgZWRnZXMuYVtpbmRleF0gPSB4MTtcbiAgICAgICAgICBlZGdlcy5iW2luZGV4XSA9IHgyO1xuICAgICAgICAgIHgxID0gNCAqIHgxO1xuICAgICAgICAgIHgyID0gNCAqIHgyO1xuICAgICAgICAgIGVkZ2VzLndbaW5kZXhdID0gTWF0aC5zcXJ0KFxuICAgICAgICAgICAgTWF0aC5wb3cocmdiRGF0YVt4MSArIDBdIC0gcmdiRGF0YVt4MiArIDBdLCAyKSArXG4gICAgICAgICAgICBNYXRoLnBvdyhyZ2JEYXRhW3gxICsgMV0gLSByZ2JEYXRhW3gyICsgMV0sIDIpICtcbiAgICAgICAgICAgIE1hdGgucG93KHJnYkRhdGFbeDEgKyAyXSAtIHJnYkRhdGFbeDIgKyAyXSwgMilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgKytpbmRleDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKGogPCB3aWR0aCAtIDEpICYmIChpID4gMCkpIHtcbiAgICAgICAgICB4MSA9IGkgKiB3aWR0aCArIGo7XG4gICAgICAgICAgeDIgPSAoaSAtIDEpICogd2lkdGggKyBqICsgMTtcbiAgICAgICAgICBlZGdlcy5hW2luZGV4XSA9IHgxO1xuICAgICAgICAgIGVkZ2VzLmJbaW5kZXhdID0geDI7XG4gICAgICAgICAgeDEgPSA0ICogeDE7XG4gICAgICAgICAgeDIgPSA0ICogeDI7XG4gICAgICAgICAgZWRnZXMud1tpbmRleF0gPSBNYXRoLnNxcnQoXG4gICAgICAgICAgICBNYXRoLnBvdyhyZ2JEYXRhW3gxICsgMF0gLSByZ2JEYXRhW3gyICsgMF0sIDIpICtcbiAgICAgICAgICAgIE1hdGgucG93KHJnYkRhdGFbeDEgKyAxXSAtIHJnYkRhdGFbeDIgKyAxXSwgMikgK1xuICAgICAgICAgICAgTWF0aC5wb3cocmdiRGF0YVt4MSArIDJdIC0gcmdiRGF0YVt4MiArIDJdLCAyKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICArK2luZGV4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlZGdlcztcbiAgfVxuXG4gIC8vIFNvcnQgZWRnZXMuXG4gIGZ1bmN0aW9uIHNvcnRFZGdlc0J5V2VpZ2h0cyhlZGdlcykge1xuICAgIHZhciBvcmRlciA9IG5ldyBBcnJheShlZGdlcy53Lmxlbmd0aCksXG4gICAgICAgIGk7XG4gICAgZm9yIChpID0gMDsgaSA8IG9yZGVyLmxlbmd0aDsgKytpKVxuICAgICAgb3JkZXJbaV0gPSBpO1xuICAgIHZhciBhID0gZWRnZXMuYSxcbiAgICAgICAgYiA9IGVkZ2VzLmIsXG4gICAgICAgIHcgPSBlZGdlcy53O1xuICAgIG9yZGVyLnNvcnQoZnVuY3Rpb24oaSwgaikgeyByZXR1cm4gd1tpXSAtIHdbal07IH0pO1xuICAgIHZhciB0ZW1wb3JhcnlBID0gbmV3IFVpbnQzMkFycmF5KGEpLFxuICAgICAgICB0ZW1wb3JhcnlCID0gbmV3IFVpbnQzMkFycmF5KGIpLFxuICAgICAgICB0ZW1wb3JhcnlXID0gbmV3IEZsb2F0MzJBcnJheSh3KTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgb3JkZXIubGVuZ3RoOyArK2kpIHtcbiAgICAgIHRlbXBvcmFyeUFbaV0gPSBhW29yZGVyW2ldXTtcbiAgICAgIHRlbXBvcmFyeUJbaV0gPSBiW29yZGVyW2ldXTtcbiAgICAgIHRlbXBvcmFyeVdbaV0gPSB3W29yZGVyW2ldXTtcbiAgICB9XG4gICAgZWRnZXMuYSA9IHRlbXBvcmFyeUE7XG4gICAgZWRnZXMuYiA9IHRlbXBvcmFyeUI7XG4gICAgZWRnZXMudyA9IHRlbXBvcmFyeVc7XG4gIH1cblxuICAvLyBDcmVhdGUgYSB1bml2ZXJzZSBzdHJ1Y3QuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVuaXZlcnNlKG5vZGVzLCBjKSB7XG4gICAgdmFyIHVuaXZlcnNlID0ge1xuICAgICAgbm9kZXM6IG5vZGVzLFxuICAgICAgcmFuazogbmV3IEludDMyQXJyYXkobm9kZXMpLFxuICAgICAgcDogbmV3IEludDMyQXJyYXkobm9kZXMpLFxuICAgICAgc2l6ZTogbmV3IEludDMyQXJyYXkobm9kZXMpLFxuICAgICAgdGhyZXNob2xkOiBuZXcgRmxvYXQzMkFycmF5KG5vZGVzKVxuICAgIH07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlczsgKytpKSB7XG4gICAgICB1bml2ZXJzZS5zaXplW2ldID0gMTtcbiAgICAgIHVuaXZlcnNlLnBbaV0gPSBpO1xuICAgICAgdW5pdmVyc2UudGhyZXNob2xkW2ldID0gYztcbiAgICB9XG4gICAgcmV0dXJuIHVuaXZlcnNlO1xuICB9XG5cbiAgLy8gRmluZCBhIHZlcnRleCBwb2ludGluZyBzZWxmLlxuICBmdW5jdGlvbiBmaW5kTm9kZSh1bml2ZXJzZSwgaW5kZXgpIHtcbiAgICB2YXIgaSA9IGluZGV4O1xuICAgIHdoaWxlIChpICE9PSB1bml2ZXJzZS5wW2ldKVxuICAgICAgaSA9IHVuaXZlcnNlLnBbaV07XG4gICAgdW5pdmVyc2UucFtpbmRleF0gPSBpO1xuICAgIHJldHVybiBpO1xuICB9XG5cbiAgLy8gSm9pbiBhIG5vZGUuXG4gIGZ1bmN0aW9uIGpvaW5Ob2RlKHVuaXZlcnNlLCBhLCBiKSB7XG4gICAgaWYgKHVuaXZlcnNlLnJhbmtbYV0gPiB1bml2ZXJzZS5yYW5rW2JdKSB7XG4gICAgICB1bml2ZXJzZS5wW2JdID0gYTtcbiAgICAgIHVuaXZlcnNlLnNpemVbYV0gKz0gdW5pdmVyc2Uuc2l6ZVtiXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB1bml2ZXJzZS5wW2FdID0gYjtcbiAgICAgIHVuaXZlcnNlLnNpemVbYl0gKz0gdW5pdmVyc2Uuc2l6ZVthXTtcbiAgICAgIGlmICh1bml2ZXJzZS5yYW5rW2FdID09IHVuaXZlcnNlLnJhbmtbYl0pXG4gICAgICAgIHVuaXZlcnNlLnJhbmtbYl0rKztcbiAgICB9XG4gICAgdW5pdmVyc2Uubm9kZXMtLTtcbiAgfVxuXG4gIC8vIFNlZ21lbnQgYSBncmFwaC5cbiAgZnVuY3Rpb24gc2VnbWVudEdyYXBoKGltYWdlRGF0YSwgYywgbWluU2l6ZSkge1xuICAgIHZhciBlZGdlcyA9IGNyZWF0ZUVkZ2VzKGltYWdlRGF0YSksXG4gICAgICAgIGEsIGIsIGk7XG4gICAgc29ydEVkZ2VzQnlXZWlnaHRzKGVkZ2VzKTtcbiAgICB2YXIgdW5pdmVyc2UgPSBjcmVhdGVVbml2ZXJzZShpbWFnZURhdGEud2lkdGggKiBpbWFnZURhdGEuaGVpZ2h0LCBjKTtcbiAgICAvLyBCb3R0b20tdXAgbWVyZ2UuXG4gICAgZm9yIChpID0gMDsgaSA8IGVkZ2VzLmEubGVuZ3RoOyArK2kpIHtcbiAgICAgIGEgPSBmaW5kTm9kZSh1bml2ZXJzZSwgZWRnZXMuYVtpXSk7XG4gICAgICBiID0gZmluZE5vZGUodW5pdmVyc2UsIGVkZ2VzLmJbaV0pO1xuICAgICAgaWYgKGEgIT0gYiAmJlxuICAgICAgICAgIGVkZ2VzLndbaV0gPD0gdW5pdmVyc2UudGhyZXNob2xkW2FdICYmXG4gICAgICAgICAgZWRnZXMud1tpXSA8PSB1bml2ZXJzZS50aHJlc2hvbGRbYl0pIHtcbiAgICAgICAgam9pbk5vZGUodW5pdmVyc2UsIGEsIGIpO1xuICAgICAgICBhID0gZmluZE5vZGUodW5pdmVyc2UsIGEpO1xuICAgICAgICB1bml2ZXJzZS50aHJlc2hvbGRbYV0gPSBlZGdlcy53W2ldICsgKGMgLyB1bml2ZXJzZS5zaXplW2FdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gTWVyZ2Ugc21hbGwgY29tcG9uZW50cy5cbiAgICBmb3IgKGkgPSAwOyBpIDwgZWRnZXMuYS5sZW5ndGg7ICsraSkge1xuICAgICAgYSA9IGZpbmROb2RlKHVuaXZlcnNlLCBlZGdlcy5hW2ldKTtcbiAgICAgIGIgPSBmaW5kTm9kZSh1bml2ZXJzZSwgZWRnZXMuYltpXSk7XG4gICAgICBpZiAoYSAhPSBiICYmXG4gICAgICAgICAgKHVuaXZlcnNlLnNpemVbYV0gPCBtaW5TaXplIHx8IHVuaXZlcnNlLnNpemVbYl0gPCBtaW5TaXplKSlcbiAgICAgICAgam9pbk5vZGUodW5pdmVyc2UsIGEsIGIpO1xuICAgIH1cbiAgICByZXR1cm4gdW5pdmVyc2U7XG4gIH1cblxuICAvLyBDcmVhdGUgYW4gaW5kZXggbWFwLlxuICBmdW5jdGlvbiBjcmVhdGVJbmRleE1hcCh1bml2ZXJzZSwgaW1hZ2VEYXRhKSB7XG4gICAgdmFyIHdpZHRoID0gaW1hZ2VEYXRhLndpZHRoLFxuICAgICAgICBoZWlnaHQgPSBpbWFnZURhdGEuaGVpZ2h0LFxuICAgICAgICBpbmRleE1hcCA9IG5ldyBJbnQzMkFycmF5KHdpZHRoICogaGVpZ2h0KSxcbiAgICAgICAgbm9kZUlkcyA9IFtdLFxuICAgICAgICBsYXN0SWQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGVpZ2h0OyArK2kpIHtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgd2lkdGg7ICsraikge1xuICAgICAgICB2YXIgY29tcG9uZW50ID0gZmluZE5vZGUodW5pdmVyc2UsIGkgKiB3aWR0aCArIGopLFxuICAgICAgICAgICAgaW5kZXggPSBub2RlSWRzW2NvbXBvbmVudF07XG4gICAgICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaW5kZXggPSBsYXN0SWQ7XG4gICAgICAgICAgbm9kZUlkc1tjb21wb25lbnRdID0gbGFzdElkKys7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZXhNYXBbaSAqIHdpZHRoICsgal0gPSBpbmRleDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGluZGV4TWFwO1xuICB9XG5cbiAgZnVuY3Rpb24gZW5jb2RlTGFiZWxzKGluZGV4TWFwLCBkYXRhKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRleE1hcC5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIHZhbHVlID0gaW5kZXhNYXBbaV07XG4gICAgICBkYXRhWzQgKiBpICsgMF0gPSB2YWx1ZSAmIDI1NTtcbiAgICAgIGRhdGFbNCAqIGkgKyAxXSA9ICh2YWx1ZSA+Pj4gOCkgJiAyNTU7XG4gICAgICBkYXRhWzQgKiBpICsgMl0gPSAodmFsdWUgPj4+IDE2KSAmIDI1NTtcbiAgICAgIGRhdGFbNCAqIGkgKyAzXSA9IDI1NTtcbiAgICB9XG4gIH1cblxuICBleHBvcnQge1BGRiBhcyBwZmZ9O1xuIiwiLyoqXG4gKiBKYXZhc2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIGFuIGltYWdlIHNlZ21lbnRhdGlvbiBhbGdvcml0aG0gb2ZcbiAqXG4gKiAgICBTTElDIFN1cGVycGl4ZWxzXG4gKiAgICBSYWRoYWtyaXNobmEgQWNoYW50YSwgQXBwdSBTaGFqaSwgS2V2aW4gU21pdGgsIEF1cmVsaWVuIEx1Y2NoaSwgUGFzY2FsXG4gKiAgICBGdWEsIGFuZCBTYWJpbmUgU8O8c3N0cnVua1xuICogICAgSUVFRSBUcmFuc2FjdGlvbnMgb24gUGF0dGVybiBBbmFseXNpcyBhbmQgTWFjaGluZSBJbnRlbGxpZ2VuY2UsIHZvbC4gMzQsXG4gKiAgICBudW0uIDExLCBwLiAyMjc0IC0gMjI4MiwgTWF5IDIwMTIuXG4gKlxuICogYW5kIGJhc2VkIG9uIHRoZSBWTEZlYXQgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQVBJXG4gKiAtLS1cbiAqXG4gKiAgICBTTElDKGltYWdlVVJMLCBvcHRpb25zKVxuICpcbiAqIFRoZSBmdW5jdGlvbiB0YWtlcyB0aGUgZm9sbG93aW5nIG9wdGlvbnMuXG4gKiAqIGByZWdpb25TaXplYCAtIFBhcmFtZXRlciBvZiBzdXBlcnBpeGVsIHNpemVcbiAqICogYG1pblJlZ2lvblNpemVgIC0gTWluaW11bSBzZWdtZW50IHNpemUgaW4gcGl4ZWxzLlxuICpcbiAqIENvcHlyaWdodCAyMDE0ICBMb25nTG9uZyBZdS5cbiAqL1xuaW1wb3J0IHtCYXNlU2VnbWVudGF0aW9ufSBmcm9tIFwiLi9iYXNlXCI7XG5pbXBvcnQgKiBhcyBjb21wYXQgZnJvbSBcIi4uL2NvbXBhdFwiXG5cbiAgLy8gU0xJQyBzZWdtZW50YXRpb24uXG4gIGZ1bmN0aW9uIFNMSUMoaW1hZ2VEYXRhLCBvcHRpb25zKSB7XG4gICAgQmFzZVNlZ21lbnRhdGlvbi5jYWxsKHRoaXMsIGltYWdlRGF0YSwgb3B0aW9ucyk7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5yZWdpb25TaXplID0gb3B0aW9ucy5yZWdpb25TaXplIHx8IDE2O1xuICAgIHRoaXMubWluUmVnaW9uU2l6ZSA9IG9wdGlvbnMubWluUmVnaW9uU2l6ZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQodGhpcy5yZWdpb25TaXplICogMC44KTtcbiAgICB0aGlzLm1heEl0ZXJhdGlvbnMgPSBvcHRpb25zLm1heEl0ZXJhdGlvbnMgfHwgMTA7XG4gICAgdGhpcy5fY29tcHV0ZSgpO1xuICB9XG5cbiAgU0xJQy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhc2VTZWdtZW50YXRpb24ucHJvdG90eXBlKTtcblxuICBTTElDLnByb3RvdHlwZS5maW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbmV3U2l6ZSA9IE1hdGgubWF4KDUsIE1hdGgucm91bmQodGhpcy5yZWdpb25TaXplIC8gTWF0aC5zcXJ0KDIuMCkpKTtcbiAgICBpZiAobmV3U2l6ZSAhPT0gdGhpcy5yZWdpb25TaXplKSB7XG4gICAgICB0aGlzLnJlZ2lvblNpemUgPSBuZXdTaXplO1xuICAgICAgdGhpcy5taW5SZWdpb25TaXplID0gTWF0aC5yb3VuZChuZXdTaXplICogMC44KTtcbiAgICAgIHRoaXMuX2NvbXB1dGUoKTtcbiAgICB9XG4gIH07XG5cbiAgU0xJQy5wcm90b3R5cGUuY29hcnNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbmV3U2l6ZSA9IE1hdGgubWluKDY0MCwgTWF0aC5yb3VuZCh0aGlzLnJlZ2lvblNpemUgKiBNYXRoLnNxcnQoMi4wKSkpO1xuICAgIGlmIChuZXdTaXplICE9PSB0aGlzLnJlZ2lvblNpemUpIHtcbiAgICAgIHRoaXMucmVnaW9uU2l6ZSA9IG5ld1NpemU7XG4gICAgICB0aGlzLm1pblJlZ2lvblNpemUgPSBNYXRoLnJvdW5kKG5ld1NpemUgKiAwLjgpO1xuICAgICAgdGhpcy5fY29tcHV0ZSgpO1xuICAgIH1cbiAgfTtcblxuICBTTElDLnByb3RvdHlwZS5fY29tcHV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnJlc3VsdCA9IGNvbXB1dGVTTElDU2VnbWVudGF0aW9uKHRoaXMuaW1hZ2VEYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWdpb25TaXplLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5SZWdpb25TaXplLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXhJdGVyYXRpb25zKTtcbiAgfTtcblxuICAvLyBDb252ZXJ0IFJHQkEgaW50byBYWVogY29sb3Igc3BhY2UuIHJnYmE6IFJlZCBHcmVlbiBCbHVlIEFscGhhLlxuICBmdW5jdGlvbiByZ2IyeHl6KHJnYmEsIHcsIGgpIHtcbiAgICB2YXIgeHl6ID0gbmV3IEZsb2F0MzJBcnJheSgzKncqaCksXG4gICAgICAgIGdhbW1hID0gMi4yO1xuICAgIGZvciAodmFyIGkgPSAwOyBpPHcqaDsgaSsrKSB7XG4gICAgICAvLyAxLjAgLyAyNTUuOSA9IDAuMDAzOTIxNTY4NjIuXG4gICAgICB2YXIgciA9IHJnYmFbNCppKzBdICogMC4wMDM5MjE1Njg2MixcbiAgICAgICAgICBnID0gcmdiYVs0KmkrMV0gKiAwLjAwMzkyMTU2ODYyLFxuICAgICAgICAgIGIgPSByZ2JhWzQqaSsyXSAqIDAuMDAzOTIxNTY4NjI7XG4gICAgICByID0gTWF0aC5wb3cociwgZ2FtbWEpO1xuICAgICAgZyA9IE1hdGgucG93KGcsIGdhbW1hKTtcbiAgICAgIGIgPSBNYXRoLnBvdyhiLCBnYW1tYSk7XG4gICAgICB4eXpbaV0gPSAociAqIDAuNDg4NzE4MCArIGcgKiAwLjMxMDY4MCArIGIgKiAwLjIwMDYwMjApO1xuICAgICAgeHl6W2kgKyB3KmhdID0gKHIgKiAwLjE3NjIwNDAgKyBnICogMC44MTI5ODUgKyBiICogMC4wMTA4MTA5KTtcbiAgICAgIHh5eltpICsgMip3KmhdID0gKGcgKiAwLjAxMDIwNDggKyBiICogMC45ODk3OTUpO1xuICAgIH1cbiAgICByZXR1cm4geHl6O1xuICB9XG5cbiAgLy8gQ29udmVydCBYWVogdG8gTGFiLlxuICBmdW5jdGlvbiB4eXoybGFiKHh5eiwgdywgaCkge1xuICAgIGZ1bmN0aW9uIGYoeCkge1xuICAgICAgaWYgKHggPiAwLjAwODU2KVxuICAgICAgICByZXR1cm4gTWF0aC5wb3coeCwgMC4zMzMzMzMzMyk7XG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiA3Ljc4NzA2ODkxNTY4ICogeCArIDAuMTM3OTMxMDMzNjtcbiAgICB9XG4gICAgdmFyIHh3ID0gMS4wIC8gMy4wLFxuICAgICAgICB5dyA9IDEuMCAvIDMuMCxcbiAgICAgICAgWXcgPSAxLjAsXG4gICAgICAgIFh3ID0geHcgLyB5dyxcbiAgICAgICAgWncgPSAoMS14dy15dykgLyAoeXcgKiBZdyksXG4gICAgICAgIGl4ID0gMS4wIC8gWHcsXG4gICAgICAgIGl5ID0gMS4wIC8gWXcsXG4gICAgICAgIGl6ID0gMS4wIC8gWncsXG4gICAgICAgIGxhYkRhdGEgPSBuZXcgRmxvYXQzMkFycmF5KDMqdypoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaTx3Kmg7IGkrKykge1xuICAgICAgdmFyIGZ4ID0gZih4eXpbaV0gKiBpeCksXG4gICAgICAgICAgZnkgPSBmKHh5elt3KmggKyBpXSAqIGl5KSxcbiAgICAgICAgICBmeiA9IGYoeHl6WzIqdypoICsgaV0gKiBpeik7XG4gICAgICBsYWJEYXRhW2ldID0gMTE2LjAgKiBmeSAtIDE2LjA7XG4gICAgICBsYWJEYXRhW2kgKyB3KmhdID0gNTAwLjAgKiAoZnggLSBmeSk7XG4gICAgICBsYWJEYXRhW2kgKyAyKncqaF0gPSAyMDAuMCAqIChmeSAtIGZ6KTtcbiAgICB9XG4gICAgcmV0dXJuIGxhYkRhdGE7XG4gIH1cblxuICAvLyBDb21wdXRlIGdyYWRpZW50IG9mIDMgY2hhbm5lbCBjb2xvciBzcGFjZSBpbWFnZS5cbiAgZnVuY3Rpb24gY29tcHV0ZUVkZ2UoaW1hZ2UsIGVkZ2VNYXAsIHcsIGgpIHtcbiAgICBmb3IgKHZhciBrID0gMDsgazwzOyBrKyspIHtcbiAgICAgIGZvciAodmFyIHkgPSAxOyB5PGgtMTsgeSsrKSB7XG4gICAgICAgIGZvciAodmFyIHggPSAxOyB4PHctMTsgeCsrKSB7XG4gICAgICAgICAgdmFyIGEgPSBpbWFnZVtrKncqaCArIHkqdyArIHgtMV0sXG4gICAgICAgICAgICAgIGIgPSBpbWFnZVtrKncqaCArIHkqdyArIHgrMV0sXG4gICAgICAgICAgICAgIGMgPSBpbWFnZVtrKncqaCArICh5KzEpKncgKyB4XSxcbiAgICAgICAgICAgICAgZCA9IGltYWdlW2sqdypoICsgKHktMSkqdyArIHhdO1xuICAgICAgICAgIGVkZ2VNYXBbeSp3ICt4XSArPSBNYXRoLnBvdyhhLWIsIDIpICsgTWF0aC5wb3coYy1kLCAyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIEluaXRpYWxpemUgc3VwZXJwaXhlbCBjbHVzdGVycy5cbiAgZnVuY3Rpb24gaW5pdGlhbGl6ZUttZWFuc0NlbnRlcnMoaW1hZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkZ2VNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsdXN0ZXJQYXJhbXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVJlZ2lvbnNYLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1SZWdpb25zWSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnaW9uU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1XLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbUgpIHtcbiAgICB2YXIgaSA9IDAsXG4gICAgICAgIGogPSAwLFxuICAgICAgICB4LFxuICAgICAgICB5O1xuICAgIGZvciAodmFyIHYgPSAwOyB2IDwgbnVtUmVnaW9uc1k7IHYrKykge1xuICAgICAgZm9yICh2YXIgdSA9IDA7IHUgPCBudW1SZWdpb25zWDsgdSsrKSB7XG4gICAgICAgIHZhciBjZW50ZXJ4ID0gMCxcbiAgICAgICAgICAgIGNlbnRlcnkgPSAwLFxuICAgICAgICAgICAgbWluRWRnZVZhbHVlID0gSW5maW5pdHksXG4gICAgICAgICAgICB4cCxcbiAgICAgICAgICAgIHlwO1xuICAgICAgICB4ID0gcGFyc2VJbnQoTWF0aC5yb3VuZChyZWdpb25TaXplICogKHUgKyAwLjUpKSwgMTApO1xuICAgICAgICB5ID0gcGFyc2VJbnQoTWF0aC5yb3VuZChyZWdpb25TaXplICogKHYgKyAwLjUpKSwgMTApO1xuICAgICAgICB4ID0gTWF0aC5tYXgoTWF0aC5taW4oeCwgaW1XLTEpLDApO1xuICAgICAgICB5ID0gTWF0aC5tYXgoTWF0aC5taW4oeSwgaW1ILTEpLDApO1xuICAgICAgICAvLyBTZWFyY2ggaW4gYSAzeDMgbmVpZ2hib3VyaG9vZCB0aGUgc21hbGxlc3QgZWRnZSByZXNwb25zZS5cbiAgICAgICAgZm9yICh5cCA9IE1hdGgubWF4KDAsIHktMSk7IHlwIDw9IE1hdGgubWluKGltSC0xLCB5KzEpOyArK3lwKSB7XG4gICAgICAgICAgZm9yICh4cCA9IE1hdGgubWF4KDAsIHgtMSk7IHhwIDw9IE1hdGgubWluKGltVy0xLCB4KzEpOyArK3hwKSB7XG4gICAgICAgICAgICB2YXIgdGhpc0VkZ2VWYWx1ZSA9IGVkZ2VNYXBbeXAgKiBpbVcgKyB4cF07XG4gICAgICAgICAgICBpZiAodGhpc0VkZ2VWYWx1ZSA8IG1pbkVkZ2VWYWx1ZSkge1xuICAgICAgICAgICAgICBtaW5FZGdlVmFsdWUgPSB0aGlzRWRnZVZhbHVlO1xuICAgICAgICAgICAgICBjZW50ZXJ4ID0geHA7XG4gICAgICAgICAgICAgIGNlbnRlcnkgPSB5cDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBuZXcgY2VudGVyIGF0IHRoaXMgbG9jYXRpb24uXG4gICAgICAgIGNlbnRlcnNbaSsrXSA9IHBhcnNlRmxvYXQoY2VudGVyeCk7XG4gICAgICAgIGNlbnRlcnNbaSsrXSA9IHBhcnNlRmxvYXQoY2VudGVyeSk7XG4gICAgICAgIC8vIDMgY2hhbm5lbHMuXG4gICAgICAgIGNlbnRlcnNbaSsrXSA9IGltYWdlW2NlbnRlcnkgKiBpbVcgKyBjZW50ZXJ4XTtcbiAgICAgICAgY2VudGVyc1tpKytdID0gaW1hZ2VbaW1XICogaW1IICsgY2VudGVyeSAqIGltVyArIGNlbnRlcnhdO1xuICAgICAgICBjZW50ZXJzW2krK10gPSBpbWFnZVsyICogaW1XICogaW1IICsgY2VudGVyeSAqIGltVyArIGNlbnRlcnhdO1xuICAgICAgICAvLyBUSElTIElTIFRIRSBWQVJJQUJMRSBWQUxVRSBPRiBNLCBqdXN0IHN0YXJ0IHdpdGggNS5cbiAgICAgICAgY2x1c3RlclBhcmFtc1tqKytdID0gMTAqMTA7XG4gICAgICAgIGNsdXN0ZXJQYXJhbXNbaisrXSA9IHJlZ2lvblNpemUgKiByZWdpb25TaXplO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFJlLWNvbXB1dGUgY2x1c3RlcnMuXG4gIGZ1bmN0aW9uIGNvbXB1dGVDZW50ZXJzKGltYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50YXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1hc3NlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtUmVnaW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaW1XLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBpbUgpIHtcbiAgICB2YXIgcmVnaW9uO1xuICAgIGZvciAodmFyIHkgPSAwOyB5IDwgaW1IOyB5KyspIHtcbiAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgaW1XOyB4KyspIHtcbiAgICAgICAgcmVnaW9uID0gc2VnbWVudGF0aW9uW3ggKyB5ICogaW1XXTtcbiAgICAgICAgbWFzc2VzW3JlZ2lvbl0rKztcbiAgICAgICAgY2VudGVyc1tyZWdpb24gKiA1ICsgMF0gKz0geDtcbiAgICAgICAgY2VudGVyc1tyZWdpb24gKiA1ICsgMV0gKz0geTtcbiAgICAgICAgY2VudGVyc1tyZWdpb24gKiA1ICsgMl0gKz0gaW1hZ2VbeSppbVcgKyB4XTtcbiAgICAgICAgY2VudGVyc1tyZWdpb24gKiA1ICsgM10gKz0gaW1hZ2VbaW1XKmltSCArIHkqaW1XICsgeF07XG4gICAgICAgIGNlbnRlcnNbcmVnaW9uICogNSArIDRdICs9IGltYWdlWzIqaW1XKmltSCArIHkqaW1XICsgeF07XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAocmVnaW9uID0gMDsgcmVnaW9uIDwgbnVtUmVnaW9uczsgcmVnaW9uKyspIHtcbiAgICAgIHZhciBpTWFzcyA9IDEuMCAvIE1hdGgubWF4KG1hc3Nlc1tyZWdpb25dLCAxZS04KTtcbiAgICAgIGNlbnRlcnNbcmVnaW9uKjVdID0gY2VudGVyc1tyZWdpb24qNV0gKiBpTWFzcztcbiAgICAgIGNlbnRlcnNbcmVnaW9uKjUrMV0gPSBjZW50ZXJzW3JlZ2lvbio1KzFdICogaU1hc3M7XG4gICAgICBjZW50ZXJzW3JlZ2lvbio1KzJdID0gY2VudGVyc1tyZWdpb24qNSsyXSAqIGlNYXNzO1xuICAgICAgY2VudGVyc1tyZWdpb24qNSszXSA9IGNlbnRlcnNbcmVnaW9uKjUrM10gKiBpTWFzcztcbiAgICAgIGNlbnRlcnNbcmVnaW9uKjUrNF0gPSBjZW50ZXJzW3JlZ2lvbio1KzRdICogaU1hc3M7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVtb3ZlIHNtYWxsIHN1cGVycGl4ZWxzIGFuZCBhc3NpZ24gdGhlbSB0aGUgbmVhcmVzdCBzdXBlcnBpeGVsIGxhYmVsLlxuICBmdW5jdGlvbiBlbGltaW5hdGVTbWFsbFJlZ2lvbnMoc2VnbWVudGF0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluUmVnaW9uU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVBpeGVscyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltVyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltSCkge1xuICAgIHZhciBjbGVhbmVkID0gbmV3IEludDMyQXJyYXkobnVtUGl4ZWxzKSxcbiAgICAgICAgc2VnbWVudCA9IG5ldyBJbnQzMkFycmF5KG51bVBpeGVscyksXG4gICAgICAgIGR4ID0gbmV3IEFycmF5KDEsIC0xLCAwLCAwKSxcbiAgICAgICAgZHkgPSBuZXcgQXJyYXkoMCwgMCwgMSwgLTEpLFxuICAgICAgICBzZWdtZW50U2l6ZSxcbiAgICAgICAgbGFiZWwsXG4gICAgICAgIGNsZWFuZWRMYWJlbCxcbiAgICAgICAgbnVtRXhwYW5kZWQsXG4gICAgICAgIHBpeGVsLFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB4cCxcbiAgICAgICAgeXAsXG4gICAgICAgIG5laWdoYm9yLFxuICAgICAgICBkaXJlY3Rpb247XG4gICAgZm9yIChwaXhlbCA9IDA7IHBpeGVsIDwgbnVtUGl4ZWxzOyArK3BpeGVsKSB7XG4gICAgICBpZiAoY2xlYW5lZFtwaXhlbF0pIGNvbnRpbnVlO1xuICAgICAgbGFiZWwgPSBzZWdtZW50YXRpb25bcGl4ZWxdO1xuICAgICAgbnVtRXhwYW5kZWQgPSAwO1xuICAgICAgc2VnbWVudFNpemUgPSAwO1xuICAgICAgc2VnbWVudFtzZWdtZW50U2l6ZSsrXSA9IHBpeGVsO1xuICAgICAgLyoqIEZpbmQgY2xlYW5lZExhYmVsIGFzIHRoZSBsYWJlbCBvZiBhbiBhbHJlYWR5IGNsZWFuZWQgcmVnaW9uIG5laWdoYm9yXG4gICAgICAgKiBvZiB0aGlzIHBpeGVsLlxuICAgICAgICovXG4gICAgICBjbGVhbmVkTGFiZWwgPSBsYWJlbCArIDE7XG4gICAgICBjbGVhbmVkW3BpeGVsXSA9IGxhYmVsICsgMTtcbiAgICAgIHggPSAocGl4ZWwgJSBpbVcpO1xuICAgICAgeSA9IE1hdGguZmxvb3IocGl4ZWwgLyBpbVcpO1xuICAgICAgZm9yIChkaXJlY3Rpb24gPSAwOyBkaXJlY3Rpb24gPCA0OyBkaXJlY3Rpb24rKykge1xuICAgICAgICB4cCA9IHggKyBkeFtkaXJlY3Rpb25dO1xuICAgICAgICB5cCA9IHkgKyBkeVtkaXJlY3Rpb25dO1xuICAgICAgICBuZWlnaGJvciA9IHhwICsgeXAgKiBpbVc7XG4gICAgICAgIGlmICgwIDw9IHhwICYmIHhwIDwgaW1XICYmIDAgPD0geXAgJiYgeXAgPCBpbUggJiYgY2xlYW5lZFtuZWlnaGJvcl0pXG4gICAgICAgICAgY2xlYW5lZExhYmVsID0gY2xlYW5lZFtuZWlnaGJvcl07XG4gICAgICB9XG4gICAgICAvLyBFeHBhbmQgdGhlIHNlZ21lbnQuXG4gICAgICB3aGlsZSAobnVtRXhwYW5kZWQgPCBzZWdtZW50U2l6ZSkge1xuICAgICAgICB2YXIgb3BlbiA9IHNlZ21lbnRbbnVtRXhwYW5kZWQrK107XG4gICAgICAgIHggPSBvcGVuICUgaW1XO1xuICAgICAgICB5ID0gTWF0aC5mbG9vcihvcGVuIC8gaW1XKTtcbiAgICAgICAgZm9yIChkaXJlY3Rpb24gPSAwOyBkaXJlY3Rpb24gPCA0OyArK2RpcmVjdGlvbikge1xuICAgICAgICAgIHhwID0geCArIGR4W2RpcmVjdGlvbl07XG4gICAgICAgICAgeXAgPSB5ICsgZHlbZGlyZWN0aW9uXTtcbiAgICAgICAgICBuZWlnaGJvciA9IHhwICsgeXAgKiBpbVc7XG4gICAgICAgICAgaWYgKDAgPD0geHAgJiZcbiAgICAgICAgICAgICAgeHAgPCBpbVcgJiZcbiAgICAgICAgICAgICAgMCA8PSB5cCAmJlxuICAgICAgICAgICAgICB5cCA8IGltSCAmJlxuICAgICAgICAgICAgICBjbGVhbmVkW25laWdoYm9yXSA9PT0gMCAmJlxuICAgICAgICAgICAgICBzZWdtZW50YXRpb25bbmVpZ2hib3JdID09PSBsYWJlbCkge1xuICAgICAgICAgICAgY2xlYW5lZFtuZWlnaGJvcl0gPSBsYWJlbCArIDE7XG4gICAgICAgICAgICBzZWdtZW50W3NlZ21lbnRTaXplKytdID0gbmVpZ2hib3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENoYW5nZSBsYWJlbCB0byBjbGVhbmVkTGFiZWwgaWYgdGhlIHNlbWdlbnQgaXMgdG9vIHNtYWxsLlxuICAgICAgaWYgKHNlZ21lbnRTaXplIDwgbWluUmVnaW9uU2l6ZSkge1xuICAgICAgICB3aGlsZSAoc2VnbWVudFNpemUgPiAwKVxuICAgICAgICAgIGNsZWFuZWRbc2VnbWVudFstLXNlZ21lbnRTaXplXV0gPSBjbGVhbmVkTGFiZWw7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFJlc3RvcmUgYmFzZSAwIGluZGV4aW5nIG9mIHRoZSByZWdpb25zLlxuICAgIGZvciAocGl4ZWwgPSAwOyBwaXhlbCA8IG51bVBpeGVsczsgKytwaXhlbClcbiAgICAgIC0tY2xlYW5lZFtwaXhlbF07XG4gICAgZm9yICh2YXIgaSA9MDsgaSA8IG51bVBpeGVsczsgKytpKVxuICAgICAgc2VnbWVudGF0aW9uW2ldID0gY2xlYW5lZFtpXTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSBjbHVzdGVyIHBhcmFtZXRlcnMuXG4gIGZ1bmN0aW9uIHVwZGF0ZUNsdXN0ZXJQYXJhbXMoc2VnbWVudGF0aW9uLCBtY01hcCwgbXNNYXAsIGNsdXN0ZXJQYXJhbXMpIHtcbiAgICB2YXIgbWMgPSBuZXcgRmxvYXQzMkFycmF5KGNsdXN0ZXJQYXJhbXMubGVuZ3RoLzIpLFxuICAgICAgICBtcyA9IG5ldyBGbG9hdDMyQXJyYXkoY2x1c3RlclBhcmFtcy5sZW5ndGgvMik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGk8c2VnbWVudGF0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcmVnaW9uID0gc2VnbWVudGF0aW9uW2ldO1xuICAgICAgaWYgKG1jW3JlZ2lvbl0gPCBtY01hcFtyZWdpb25dKSB7XG4gICAgICAgIG1jW3JlZ2lvbl0gPSBtY01hcFtyZWdpb25dO1xuICAgICAgICBjbHVzdGVyUGFyYW1zW3JlZ2lvbioyKzBdID0gbWNNYXBbcmVnaW9uXTtcbiAgICAgIH1cbiAgICAgIGlmIChtc1tyZWdpb25dIDwgbXNNYXBbcmVnaW9uXSkge1xuICAgICAgICBtc1tyZWdpb25dID0gbXNNYXBbcmVnaW9uXTtcbiAgICAgICAgY2x1c3RlclBhcmFtc1tyZWdpb24qMisxXSA9IG1zTWFwW3JlZ2lvbl07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQXNzaWduIHN1cGVycGl4ZWwgbGFiZWwuXG4gIGZ1bmN0aW9uIGFzc2lnblN1cGVycGl4ZWxMYWJlbChpbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1jTWFwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHVzdGVyUGFyYW1zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtUmVnaW9uc1gsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1SZWdpb25zWSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2lvblNpemUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbVcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbUgpIHtcbiAgICB2YXIgeCxcbiAgICAgICAgeTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpc3RhbmNlTWFwLmxlbmd0aDsgKytpKVxuICAgICAgZGlzdGFuY2VNYXBbaV0gPSBJbmZpbml0eTtcbiAgICB2YXIgUyA9IHJlZ2lvblNpemU7XG4gICAgZm9yICh2YXIgcmVnaW9uID0wOyByZWdpb248bnVtUmVnaW9uc1ggKiBudW1SZWdpb25zWTsgKytyZWdpb24pIHtcbiAgICAgIHZhciBjeCA9IE1hdGgucm91bmQoY2VudGVyc1tyZWdpb24qNSswXSksXG4gICAgICAgICAgY3kgPSBNYXRoLnJvdW5kKGNlbnRlcnNbcmVnaW9uKjUrMV0pO1xuICAgICAgZm9yICh5ID0gTWF0aC5tYXgoMCwgY3kgLSBTKTsgIHkgPCBNYXRoLm1pbihpbUgsIGN5ICsgUyk7ICsreSkge1xuICAgICAgICBmb3IgKHggPSBNYXRoLm1heCgwLCBjeCAtIFMpOyB4IDwgTWF0aC5taW4oaW1XLCBjeCArIFMpOyArK3gpIHtcbiAgICAgICAgICB2YXIgc3BhdGlhbCA9ICh4IC0gY3gpICogKHggLSBjeCkgKyAoeSAtIGN5KSAqICh5IC0gY3kpLFxuICAgICAgICAgICAgICBkUiA9IGltW3kqaW1XICsgeF0gLSBjZW50ZXJzWzUqcmVnaW9uICsgMl0sXG4gICAgICAgICAgICAgIGRHID0gaW1baW1XICogaW1IICsgeSppbVcgKyB4XSAtIGNlbnRlcnNbNSpyZWdpb24gKyAzXSxcbiAgICAgICAgICAgICAgZEIgPSBpbVsyICogaW1XICogaW1IICsgeSppbVcgKyB4XSAtIGNlbnRlcnNbNSpyZWdpb24gKyA0XSxcbiAgICAgICAgICAgICAgYXBwZWFyYW5jZSA9IGRSICogZFIgKyBkRyAqIGRHICsgZEIgKiBkQixcbiAgICAgICAgICAgICAgZGlzdGFuY2UgPSBNYXRoLnNxcnQoIGFwcGVhcmFuY2UgLyBjbHVzdGVyUGFyYW1zW3JlZ2lvbioyICsgMF0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNwYXRpYWwgLyBjbHVzdGVyUGFyYW1zW3JlZ2lvbioyICsgMV0pO1xuICAgICAgICAgIGlmIChkaXN0YW5jZSA8IGRpc3RhbmNlTWFwW3kqaW1XICsgeF0pIHtcbiAgICAgICAgICAgIGRpc3RhbmNlTWFwW3kqaW1XICsgeF0gPSBkaXN0YW5jZTtcbiAgICAgICAgICAgIHNlZ21lbnRhdGlvblt5KmltVyArIHhdID0gcmVnaW9uO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBVcGRhdGUgdGhlIG1heCBkaXN0YW5jZSBvZiBjb2xvciBhbmQgc3BhY2UuXG4gICAgZm9yICh5ID0gMDsgeSA8IGltSDsgKyt5KSB7XG4gICAgICBmb3IgKHggPSAwOyB4IDwgaW1XOyArK3gpIHtcbiAgICAgICAgaWYgKGNsdXN0ZXJQYXJhbXNbc2VnbWVudGF0aW9uW3kqaW1XICsgeF0qMl0gPCBtY01hcFt5KmltVyArIHhdKVxuICAgICAgICAgIGNsdXN0ZXJQYXJhbXNbc2VnbWVudGF0aW9uW3kqaW1XICsgeF0qMl0gPSBtY01hcFt5KmltVyArIHhdO1xuICAgICAgICBpZiAoY2x1c3RlclBhcmFtc1tzZWdtZW50YXRpb25beSppbVcgKyB4XSoyKzFdIDwgbXNNYXBbeSppbVcgKyB4XSlcbiAgICAgICAgICBjbHVzdGVyUGFyYW1zW3NlZ21lbnRhdGlvblt5KmltVyArIHhdKjIrMV0gPSBtc01hcFt5KmltVyArIHhdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIC4uLlxuICBmdW5jdGlvbiBjb21wdXRlUmVzaWR1YWxFcnJvcihwcmV2Q2VudGVycywgY3VycmVudENlbnRlcnMpIHtcbiAgICB2YXIgZXJyb3IgPSAwLjA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmV2Q2VudGVycy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGQgPSBwcmV2Q2VudGVyc1tpXSAtIGN1cnJlbnRDZW50ZXJzW2ldO1xuICAgICAgZXJyb3IgKz0gTWF0aC5zcXJ0KGQqZCk7XG4gICAgfVxuICAgIHJldHVybiBlcnJvcjtcbiAgfVxuXG4gIC8vIFJlbWFwIGxhYmVsIGluZGljZXMuXG4gIGZ1bmN0aW9uIHJlbWFwTGFiZWxzKHNlZ21lbnRhdGlvbikge1xuICAgIHZhciBtYXAgPSB7fSxcbiAgICAgICAgaW5kZXggPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VnbWVudGF0aW9uLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgbGFiZWwgPSBzZWdtZW50YXRpb25baV07XG4gICAgICBpZiAobWFwW2xhYmVsXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBtYXBbbGFiZWxdID0gaW5kZXgrKztcbiAgICAgIHNlZ21lbnRhdGlvbltpXSA9IG1hcFtsYWJlbF07XG4gICAgfVxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIC8vIEVuY29kZSBsYWJlbHMgaW4gUkdCLlxuICBmdW5jdGlvbiBlbmNvZGVMYWJlbHMoc2VnbWVudGF0aW9uLCBkYXRhKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWdtZW50YXRpb24ubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciB2YWx1ZSA9IE1hdGguZmxvb3Ioc2VnbWVudGF0aW9uW2ldKTtcbiAgICAgIGRhdGFbNCAqIGkgKyAwXSA9IHZhbHVlICYgMjU1O1xuICAgICAgZGF0YVs0ICogaSArIDFdID0gKHZhbHVlID4+PiA4KSAmIDI1NTtcbiAgICAgIGRhdGFbNCAqIGkgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpICYgMjU1O1xuICAgICAgZGF0YVs0ICogaSArIDNdID0gMjU1O1xuICAgIH1cbiAgfVxuXG4gIC8vIENvbXB1dGUgU0xJQyBTZWdtZW50YXRpb24uXG4gIGZ1bmN0aW9uIGNvbXB1dGVTTElDU2VnbWVudGF0aW9uKGltYWdlRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnaW9uU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluUmVnaW9uU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4SXRlcmF0aW9ucykge1xuICAgIHZhciBpLFxuICAgICAgICBpbVdpZHRoID0gaW1hZ2VEYXRhLndpZHRoLFxuICAgICAgICBpbUhlaWdodCA9IGltYWdlRGF0YS5oZWlnaHQsXG4gICAgICAgIG51bVJlZ2lvbnNYID0gTWF0aC5mbG9vcihpbVdpZHRoIC8gcmVnaW9uU2l6ZSksXG4gICAgICAgIG51bVJlZ2lvbnNZID0gTWF0aC5mbG9vcihpbUhlaWdodCAvIHJlZ2lvblNpemUpLFxuICAgICAgICBudW1SZWdpb25zID0gTWF0aC5mbG9vcihudW1SZWdpb25zWCAqIG51bVJlZ2lvbnNZKSxcbiAgICAgICAgbnVtUGl4ZWxzID0gTWF0aC5mbG9vcihpbVdpZHRoICogaW1IZWlnaHQpLFxuICAgICAgICBlZGdlTWFwID0gbmV3IEZsb2F0MzJBcnJheShudW1QaXhlbHMpLFxuICAgICAgICBtYXNzZXMgPSBuZXcgQXJyYXkobnVtUGl4ZWxzKSxcbiAgICAgICAgLy8gMiAoZ2VvbWV0cmljOiB4ICYgeSkgYW5kIDMgKFJHQiBvciBMYWIpXG4gICAgICAgIGN1cnJlbnRDZW50ZXJzID0gbmV3IEZsb2F0MzJBcnJheSgoMiszKSpudW1SZWdpb25zKSxcbiAgICAgICAgbmV3Q2VudGVycyA9IG5ldyBGbG9hdDMyQXJyYXkoKDIrMykqbnVtUmVnaW9ucyksXG4gICAgICAgIGNsdXN0ZXJQYXJhbXMgPSBuZXcgRmxvYXQzMkFycmF5KDIqbnVtUmVnaW9ucyksXG4gICAgICAgIG1jTWFwID0gbmV3IEZsb2F0MzJBcnJheShudW1QaXhlbHMpLFxuICAgICAgICBtc01hcCA9IG5ldyBGbG9hdDMyQXJyYXkobnVtUGl4ZWxzKSxcbiAgICAgICAgZGlzdGFuY2VNYXAgPSBuZXcgRmxvYXQzMkFycmF5KG51bVBpeGVscyksXG4gICAgICAgIHh5ekRhdGEgPSByZ2IyeHl6KGltYWdlRGF0YS5kYXRhLCBpbVdpZHRoLCBpbUhlaWdodCksXG4gICAgICAgIGxhYkRhdGEgPSB4eXoybGFiKHh5ekRhdGEsIGltV2lkdGgsIGltSGVpZ2h0KTtcbiAgICAvLyBDb21wdXRlIGVkZ2UuXG4gICAgY29tcHV0ZUVkZ2UobGFiRGF0YSwgZWRnZU1hcCwgaW1XaWR0aCwgaW1IZWlnaHQpO1xuICAgIC8vIEluaXRpYWxpemUgSy1NZWFucyBDZW50ZXJzLlxuICAgIGluaXRpYWxpemVLbWVhbnNDZW50ZXJzKGxhYkRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRnZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q2VudGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHVzdGVyUGFyYW1zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVJlZ2lvbnNYLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVJlZ2lvbnNZLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2lvblNpemUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1XaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbUhlaWdodCk7XG4gICAgdmFyIHNlZ21lbnRhdGlvbiA9IG5ldyBJbnQzMkFycmF5KG51bVBpeGVscyk7XG4gICAgLyoqIFNMSUNPIGltcGxlbWVudGF0aW9uOiBcIlNMSUMgU3VwZXJwaXhlbHMgQ29tcGFyZWQgdG8gU3RhdGUtb2YtdGhlLWFydFxuICAgICAqIFN1cGVycGl4ZWwgTWV0aG9kc1wiXG4gICAgICovXG4gICAgZm9yICh2YXIgaXRlciA9IDA7IGl0ZXIgPCBtYXhJdGVyYXRpb25zOyArK2l0ZXIpIHtcbiAgICAgIC8vIERvIGFzc2lnbm1lbnQuXG4gICAgICBhc3NpZ25TdXBlcnBpeGVsTGFiZWwobGFiRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50YXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWNNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2VNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENlbnRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2x1c3RlclBhcmFtcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1SZWdpb25zWCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1SZWdpb25zWSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWdpb25TaXplLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1IZWlnaHQpO1xuICAgICAgLy8gVXBkYXRlIG1heGltdW0gc3BhdGlhbCBhbmQgY29sb3IgZGlzdGFuY2VzIFsxXS5cbiAgICAgIHVwZGF0ZUNsdXN0ZXJQYXJhbXMoc2VnbWVudGF0aW9uLCBtY01hcCwgbXNNYXAsIGNsdXN0ZXJQYXJhbXMpO1xuICAgICAgLy8gQ29tcHV0ZSBuZXcgY2VudGVycy5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBtYXNzZXMubGVuZ3RoOyArK2kpXG4gICAgICAgIG1hc3Nlc1tpXSA9IDA7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbmV3Q2VudGVycy5sZW5ndGg7ICsraSlcbiAgICAgICAgbmV3Q2VudGVyc1tpXSA9IDA7XG4gICAgICBjb21wdXRlQ2VudGVycyhsYWJEYXRhLFxuICAgICAgICAgICAgICAgICAgICAgc2VnbWVudGF0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgbWFzc2VzLFxuICAgICAgICAgICAgICAgICAgICAgbmV3Q2VudGVycyxcbiAgICAgICAgICAgICAgICAgICAgIG51bVJlZ2lvbnMsXG4gICAgICAgICAgICAgICAgICAgICBpbVdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgaW1IZWlnaHQpO1xuICAgICAgLy8gQ29tcHV0ZSByZXNpZHVhbCBlcnJvciBvZiBhc3NpZ25tZW50LlxuICAgICAgdmFyIGVycm9yID0gY29tcHV0ZVJlc2lkdWFsRXJyb3IoY3VycmVudENlbnRlcnMsIG5ld0NlbnRlcnMpO1xuICAgICAgaWYgKGVycm9yIDwgMWUtNSlcbiAgICAgICAgYnJlYWs7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgY3VycmVudENlbnRlcnMubGVuZ3RoOyArK2kpXG4gICAgICAgIGN1cnJlbnRDZW50ZXJzW2ldID0gbmV3Q2VudGVyc1tpXTtcbiAgICB9XG4gICAgZWxpbWluYXRlU21hbGxSZWdpb25zKHNlZ21lbnRhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWluUmVnaW9uU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtUGl4ZWxzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBpbVdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBpbUhlaWdodCk7XG4gICAgLy8gUmVmcmVzaCB0aGUgY2FudmFzLlxuICAgIHZhciByZXN1bHQgPSBjb21wYXQuY3JlYXRlSW1hZ2VEYXRhKGltV2lkdGgsIGltSGVpZ2h0KTtcbiAgICByZXN1bHQubnVtU2VnbWVudHMgPSByZW1hcExhYmVscyhzZWdtZW50YXRpb24pO1xuICAgIGVuY29kZUxhYmVscyhzZWdtZW50YXRpb24sIHJlc3VsdC5kYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZXhwb3J0IHtTTElDIGFzIHNsaWN9O1xuIiwiLyoqIFNMSUNPIHNlZ21lbnRhdGlvbiBpbXBsZW1lbnRhdGlvbi5cbiAqXG4gKiAgICBTTElDIFN1cGVycGl4ZWxzXG4gKiAgICBSYWRoYWtyaXNobmEgQWNoYW50YSwgQXBwdSBTaGFqaSwgS2V2aW4gU21pdGgsIEF1cmVsaWVuIEx1Y2NoaSwgUGFzY2FsXG4gKiAgICBGdWEsIGFuZCBTYWJpbmUgU8O8c3N0cnVua1xuICogICAgSUVFRSBUcmFuc2FjdGlvbnMgb24gUGF0dGVybiBBbmFseXNpcyBhbmQgTWFjaGluZSBJbnRlbGxpZ2VuY2UsIHZvbC4gMzQsXG4gKiAgICBudW0uIDExLCBwLiAyMjc0IC0gMjI4MiwgTWF5IDIwMTIuXG4gKlxuICogIGh0dHA6Ly9pdnJsLmVwZmwuY2gvcmVzZWFyY2gvc3VwZXJwaXhlbHNcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNSAgS290YSBZYW1hZ3VjaGlcbiAqL1xuaW1wb3J0IHtCYXNlU2VnbWVudGF0aW9ufSBmcm9tIFwiLi9iYXNlXCI7XG5cbiAgZnVuY3Rpb24gU0xJQ08oaW1hZ2VEYXRhLCBvcHRpb25zKSB7XG4gICAgQmFzZVNlZ21lbnRhdGlvbi5jYWxsKHRoaXMsIGltYWdlRGF0YSwgb3B0aW9ucyk7XG4gICAgdGhpcy53aWR0aCAgPSB0aGlzLmltYWdlRGF0YS53aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2VEYXRhLmhlaWdodDtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLm1ldGhvZCA9IG9wdGlvbnMubWV0aG9kIHx8IFwiRml4ZWRLXCI7XG4gICAgdGhpcy5wZXJ0dXJiID0gKHR5cGVvZiBvcHRpb25zLnBlcnR1cmIgPT09IFwidW5kZWZpbmVkXCIpID9cbiAgICAgICAgICAgIHRydWUgOiBvcHRpb25zLnBlcnR1cmI7XG4gICAgdGhpcy5tYXhJdGVyYXRpb25zID0gb3B0aW9ucy5tYXhJdGVyYXRpb25zIHx8IDEwO1xuICAgIHRoaXMuSyA9IG9wdGlvbnMuSyB8fCAxMDI0O1xuICAgIHRoaXMuc3RlcCA9IG9wdGlvbnMuc3RlcCB8fCAyMDA7XG4gICAgdGhpcy5lbmZvcmNlQ29ubmVjdGl2aXR5ID0gKG9wdGlvbnMuZW5mb3JjZUNvbm5lY3Rpdml0eSA9PT0gZmFsc2UpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UgOiB0cnVlO1xuICAgIHRoaXMuX2NvbXB1dGUoKTtcbiAgfVxuXG4gIFNMSUNPLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFzZVNlZ21lbnRhdGlvbi5wcm90b3R5cGUpO1xuXG4gIFNMSUNPLnByb3RvdHlwZS5maW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbmV3SyA9IE1hdGgubWluKDg5NjIsIE1hdGgucm91bmQodGhpcy5LICogKDIuMCkpKTtcbiAgICBpZiAobmV3SyAhPT0gdGhpcy5LKSB7XG4gICAgICB0aGlzLksgPSBuZXdLO1xuICAgICAgdGhpcy5fY29tcHV0ZSgpO1xuICAgIH1cbiAgfTtcblxuICBTTElDTy5wcm90b3R5cGUuY29hcnNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbmV3SyA9IE1hdGgubWF4KDE2LCBNYXRoLnJvdW5kKHRoaXMuSyAvICgyLjApKSk7XG4gICAgaWYgKG5ld0sgIT09IHRoaXMuSykge1xuICAgICAgdGhpcy5LID0gbmV3SztcbiAgICAgIHRoaXMuX2NvbXB1dGUoKTtcbiAgICB9XG4gIH07XG5cbiAgU0xJQ08ucHJvdG90eXBlLl9jb21wdXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBsYWJlbHMgPSAodGhpcy5tZXRob2QgPT09IFwiRml4ZWRLXCIpID9cbiAgICAgICAgdGhpcy5wZXJmb3JtU0xJQ09Gb3JHaXZlbksoKSA6IHRoaXMucGVyZm9ybVNMSUNPRm9yR2l2ZW5TdGVwU2l6ZSgpO1xuICAgIHZhciByZXN1bHQgPSBuZXcgSW1hZ2VEYXRhKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICByZXN1bHQubnVtU2VnbWVudHMgPSByZW1hcExhYmVscyhsYWJlbHMpO1xuICAgIGVuY29kZUxhYmVscyhsYWJlbHMsIHJlc3VsdC5kYXRhKTtcbiAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgfTtcblxuICAvLyBzUkdCIChENjUgaWxsdW5pbmFudCBhc3N1bXB0aW9uKSB0byBYWVogY29udmVyc2lvbi5cbiAgU0xJQ08ucHJvdG90eXBlLnJnYjJ4eXogPSBmdW5jdGlvbiAoc1JHQikge1xuICAgIHZhciBSID0gcGFyc2VJbnQoc1JHQlswXSwgMTApIC8gMjU1LjAsXG4gICAgICAgIEcgPSBwYXJzZUludChzUkdCWzFdLCAxMCkgLyAyNTUuMCxcbiAgICAgICAgQiA9IHBhcnNlSW50KHNSR0JbMl0sIDEwKSAvIDI1NS4wLFxuICAgICAgICByID0gKFIgPD0gMC4wNDA0NSkgPyBSIC8gMTIuOTIgOiBNYXRoLnBvdygoUiArIDAuMDU1KSAvIDEuMDU1LCAyLjQpLFxuICAgICAgICBnID0gKEcgPD0gMC4wNDA0NSkgPyBHIC8gMTIuOTIgOiBNYXRoLnBvdygoUiArIDAuMDU1KSAvIDEuMDU1LCAyLjQpLFxuICAgICAgICBiID0gKEIgPD0gMC4wNDA0NSkgPyBCIC8gMTIuOTIgOiBNYXRoLnBvdygoUiArIDAuMDU1KSAvIDEuMDU1LCAyLjQpO1xuICAgIHJldHVybiBbXG4gICAgICByICogMC40MTI0NTY0ICsgZyAqIDAuMzU3NTc2MSArIGIgKiAwLjE4MDQzNzUsXG4gICAgICByICogMC4yMTI2NzI5ICsgZyAqIDAuNzE1MTUyMiArIGIgKiAwLjA3MjE3NTAsXG4gICAgICByICogMC4wMTkzMzM5ICsgZyAqIDAuMTE5MTkyMCArIGIgKiAwLjk1MDMwNDFcbiAgICBdO1xuICB9O1xuXG4gIC8vIHNSR0IgdG8gTGFiIGNvbnZlcnNpb24uXG4gIFNMSUNPLnByb3RvdHlwZS5yZ2IybGFiID0gZnVuY3Rpb24gKHNSR0IpIHtcbiAgICB2YXIgZXBzaWxvbiA9IDAuMDA4ODU2LCAgLy9hY3R1YWwgQ0lFIHN0YW5kYXJkXG4gICAgICAgIGthcHBhICAgPSA5MDMuMywgICAgIC8vYWN0dWFsIENJRSBzdGFuZGFyZFxuICAgICAgICBYciA9IDAuOTUwNDU2LCAgICAgICAvL3JlZmVyZW5jZSB3aGl0ZVxuICAgICAgICBZciA9IDEuMCwgICAgICAgICAgICAvL3JlZmVyZW5jZSB3aGl0ZVxuICAgICAgICBaciA9IDEuMDg4NzU0LCAgICAgICAvL3JlZmVyZW5jZSB3aGl0ZVxuICAgICAgICB4eXogPSB0aGlzLnJnYjJ4eXooc1JHQiksXG4gICAgICAgIHhyID0geHl6WzBdIC8gWHIsXG4gICAgICAgIHlyID0geHl6WzFdIC8gWXIsXG4gICAgICAgIHpyID0geHl6WzJdIC8gWnIsXG4gICAgICAgIGZ4ID0gKHhyID4gZXBzaWxvbikgP1xuICAgICAgICAgICAgTWF0aC5wb3coeHIsIDEuMC8zLjApIDogKGthcHBhICogeHIgKyAxNi4wKSAvIDExNi4wLFxuICAgICAgICBmeSA9ICh5ciA+IGVwc2lsb24pID9cbiAgICAgICAgICAgIE1hdGgucG93KHlyLCAxLjAvMy4wKSA6IChrYXBwYSAqIHlyICsgMTYuMCkgLyAxMTYuMCxcbiAgICAgICAgZnogPSAoenIgPiBlcHNpbG9uKSA/XG4gICAgICAgICAgICBNYXRoLnBvdyh6ciwgMS4wLzMuMCkgOiAoa2FwcGEgKiB6ciArIDE2LjApIC8gMTE2LjA7XG4gICAgcmV0dXJuIFtcbiAgICAgIDExNi4wICogZnkgLSAxNi4wLFxuICAgICAgNTAwLjAgKiAoZnggLSBmeSksXG4gICAgICAyMDAuMCAqIChmeSAtIGZ6KVxuICAgIF07XG4gIH07XG5cbiAgU0xJQ08ucHJvdG90eXBlLmRvUkdCdG9MQUJDb252ZXJzaW9uID0gZnVuY3Rpb24gKGltYWdlRGF0YSkge1xuICAgIHZhciBzaXplID0gdGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0LFxuICAgICAgICBkYXRhID0gaW1hZ2VEYXRhLmRhdGE7XG4gICAgdGhpcy5sdmVjID0gbmV3IEZsb2F0NjRBcnJheShzaXplKTtcbiAgICB0aGlzLmF2ZWMgPSBuZXcgRmxvYXQ2NEFycmF5KHNpemUpO1xuICAgIHRoaXMuYnZlYyA9IG5ldyBGbG9hdDY0QXJyYXkoc2l6ZSk7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBzaXplOyArK2opIHtcbiAgICAgIHZhciByID0gZGF0YVs0ICogaiArIDBdLFxuICAgICAgICAgIGcgPSBkYXRhWzQgKiBqICsgMV0sXG4gICAgICAgICAgYiA9IGRhdGFbNCAqIGogKyAyXTtcbiAgICAgIHZhciBsYWIgPSB0aGlzLnJnYjJsYWIoW3IsIGcsIGJdKTtcbiAgICAgIHRoaXMubHZlY1tqXSA9IGxhYlswXTtcbiAgICAgIHRoaXMuYXZlY1tqXSA9IGxhYlsxXTtcbiAgICAgIHRoaXMuYnZlY1tqXSA9IGxhYlsyXTtcbiAgICB9XG4gIH07XG5cbiAgU0xJQ08ucHJvdG90eXBlLmRldGVjdExhYkVkZ2VzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB3ID0gdGhpcy53aWR0aDtcbiAgICB0aGlzLmVkZ2VzID0gZmlsbEFycmF5KG5ldyBGbG9hdDY0QXJyYXkodGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0KSwgMCk7XG4gICAgZm9yICh2YXIgaiA9IDE7IGogPCB0aGlzLmhlaWdodCAtIDE7ICsraikge1xuICAgICAgZm9yICh2YXIgayA9IDE7IGsgPCB0aGlzLndpZHRoIC0gMTsgKytrKSB7XG4gICAgICAgIHZhciBpID0gcGFyc2VJbnQoaiAqIHRoaXMud2lkdGggKyBrLCAxMCksXG4gICAgICAgICAgICBkeCA9IE1hdGgucG93KHRoaXMubHZlY1tpIC0gMV0gLSB0aGlzLmx2ZWNbaSArIDFdLCAyKSArXG4gICAgICAgICAgICAgICAgIE1hdGgucG93KHRoaXMuYXZlY1tpIC0gMV0gLSB0aGlzLmF2ZWNbaSArIDFdLCAyKSArXG4gICAgICAgICAgICAgICAgIE1hdGgucG93KHRoaXMuYnZlY1tpIC0gMV0gLSB0aGlzLmJ2ZWNbaSArIDFdLCAyKSxcbiAgICAgICAgICAgIGR5ID0gTWF0aC5wb3codGhpcy5sdmVjW2kgLSB3XSAtIHRoaXMubHZlY1tpICsgd10sIDIpICtcbiAgICAgICAgICAgICAgICAgTWF0aC5wb3codGhpcy5hdmVjW2kgLSB3XSAtIHRoaXMuYXZlY1tpICsgd10sIDIpICtcbiAgICAgICAgICAgICAgICAgTWF0aC5wb3codGhpcy5idmVjW2kgLSB3XSAtIHRoaXMuYnZlY1tpICsgd10sIDIpO1xuICAgICAgICB0aGlzLmVkZ2VzW2ldID0gZHggKyBkeTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgU0xJQ08ucHJvdG90eXBlLnBlcnR1cmJTZWVkcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZHg4ID0gWy0xLCAtMSwgIDAsICAxLCAxLCAxLCAwLCAtMV0sXG4gICAgICAgIGR5OCA9IFsgMCwgLTEsIC0xLCAtMSwgMCwgMSwgMSwgIDFdLFxuICAgICAgICBudW1TZWVkcyA9IHRoaXMua1NlZWRzTC5sZW5ndGg7XG4gICAgZm9yICh2YXIgbiA9IDA7IG4gPCBudW1TZWVkczsgKytuKSB7XG4gICAgICB2YXIgb3ggPSBwYXJzZUludCh0aGlzLmtTZWVkc1hbbl0sIDEwKSwgIC8vb3JpZ2luYWwgeFxuICAgICAgICAgIG95ID0gcGFyc2VJbnQodGhpcy5rU2VlZHNZW25dLCAxMCksICAvL29yaWdpbmFsIHlcbiAgICAgICAgICBvaW5kID0gcGFyc2VJbnQob3kgKiB0aGlzLndpZHRoICsgb3gsIDEwKSxcbiAgICAgICAgICBzdG9yZWluZCA9IHBhcnNlSW50KG9pbmQsIDEwKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgKytpKSB7XG4gICAgICAgIHZhciBueCA9IHBhcnNlSW50KG94ICsgZHg4W2ldLCAxMCk7ICAvL25ldyB4XG4gICAgICAgIHZhciBueSA9IHBhcnNlSW50KG95ICsgZHk4W2ldLCAxMCk7ICAvL25ldyB5XG4gICAgICAgIGlmIChueCA+PSAwICYmIG54IDwgdGhpcy53aWR0aCAmJiBueSA+PSAwICYmIG55IDwgdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgICB2YXIgbmluZCA9IHBhcnNlSW50KG55ICogdGhpcy53aWR0aCArIG54LCAxMCk7XG4gICAgICAgICAgaWYgKHRoaXMuZWRnZXNbbmluZF0gPCB0aGlzLmVkZ2VzW3N0b3JlaW5kXSlcbiAgICAgICAgICAgIHN0b3JlaW5kID0gbmluZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN0b3JlaW5kICE9IG9pbmQpIHtcbiAgICAgICAgdGhpcy5rU2VlZHNYW25dID0gTWF0aC5mbG9vcihzdG9yZWluZCAlIHRoaXMud2lkdGgpO1xuICAgICAgICB0aGlzLmtTZWVkc1lbbl0gPSBNYXRoLmZsb29yKHN0b3JlaW5kIC8gdGhpcy53aWR0aCk7XG4gICAgICAgIHRoaXMua1NlZWRzTFtuXSA9IHRoaXMubHZlY1tzdG9yZWluZF07XG4gICAgICAgIHRoaXMua1NlZWRzQVtuXSA9IHRoaXMuYXZlY1tzdG9yZWluZF07XG4gICAgICAgIHRoaXMua1NlZWRzQltuXSA9IHRoaXMuYnZlY1tzdG9yZWluZF07XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIFNMSUNPLnByb3RvdHlwZS5nZXRMQUJYWVNlZWRzRm9yR2l2ZW5TdGVwU2l6ZSA9IGZ1bmN0aW9uKHN0ZXAsIHBlcnR1cmIpIHtcbiAgICB2YXIgbiA9IDAsXG4gICAgICAgIHhzdHJpcHMgPSBNYXRoLnJvdW5kKDAuNSArIHBhcnNlRmxvYXQodGhpcy53aWR0aCkgLyBwYXJzZUZsb2F0KHN0ZXApKSxcbiAgICAgICAgeXN0cmlwcyA9IE1hdGgucm91bmQoMC41ICsgcGFyc2VGbG9hdCh0aGlzLmhlaWdodCkgLyBwYXJzZUZsb2F0KHN0ZXApKSxcbiAgICAgICAgeGVyciA9IE1hdGgucm91bmQodGhpcy53aWR0aCAgLSBzdGVwICogeHN0cmlwcyksXG4gICAgICAgIHllcnIgPSBNYXRoLnJvdW5kKHRoaXMuaGVpZ2h0IC0gc3RlcCAqIHlzdHJpcHMpLFxuICAgICAgICB4ZXJycGVyc3RyaXAgPSBwYXJzZUZsb2F0KHhlcnIpIC8gcGFyc2VGbG9hdCh4c3RyaXBzKSxcbiAgICAgICAgeWVycnBlcnN0cmlwID0gcGFyc2VGbG9hdCh5ZXJyKSAvIHBhcnNlRmxvYXQoeXN0cmlwcyksXG4gICAgICAgIHhvZmYgPSBNYXRoLmZsb29yKHN0ZXAgLyAyKSxcbiAgICAgICAgeW9mZiA9IE1hdGguZmxvb3Ioc3RlcCAvIDIpLFxuICAgICAgICBudW1TZWVkcyA9IHhzdHJpcHMgKiB5c3RyaXBzO1xuICAgIHRoaXMua1NlZWRzTCA9IG5ldyBGbG9hdDY0QXJyYXkobnVtU2VlZHMpO1xuICAgIHRoaXMua1NlZWRzQSA9IG5ldyBGbG9hdDY0QXJyYXkobnVtU2VlZHMpO1xuICAgIHRoaXMua1NlZWRzQiA9IG5ldyBGbG9hdDY0QXJyYXkobnVtU2VlZHMpO1xuICAgIHRoaXMua1NlZWRzWCA9IG5ldyBGbG9hdDY0QXJyYXkobnVtU2VlZHMpO1xuICAgIHRoaXMua1NlZWRzWSA9IG5ldyBGbG9hdDY0QXJyYXkobnVtU2VlZHMpO1xuICAgIGZvciAodmFyIHkgPSAwOyB5IDwgeXN0cmlwczsgKyt5KSB7XG4gICAgICB2YXIgeWUgPSBNYXRoLmZsb29yKHkgKiB5ZXJycGVyc3RyaXApO1xuICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCB4c3RyaXBzOyArK3gpIHtcbiAgICAgICAgdmFyIHhlID0gTWF0aC5mbG9vcih4ICogeGVycnBlcnN0cmlwKTtcbiAgICAgICAgdmFyIGkgPSBNYXRoLmZsb29yKCh5ICogc3RlcCArIHlvZmYgKyB5ZSkgKiB0aGlzLndpZHRoICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICh4ICogc3RlcCArIHhvZmYgKyB4ZSkpO1xuICAgICAgICB0aGlzLmtTZWVkc0xbbl0gPSB0aGlzLmx2ZWNbaV07XG4gICAgICAgIHRoaXMua1NlZWRzQVtuXSA9IHRoaXMuYXZlY1tpXTtcbiAgICAgICAgdGhpcy5rU2VlZHNCW25dID0gdGhpcy5idmVjW2ldO1xuICAgICAgICB0aGlzLmtTZWVkc1hbbl0gPSAoeCAqIHN0ZXAgKyB4b2ZmICsgeGUpO1xuICAgICAgICB0aGlzLmtTZWVkc1lbbl0gPSAoeSAqIHN0ZXAgKyB5b2ZmICsgeWUpO1xuICAgICAgICArK247XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwZXJ0dXJiKVxuICAgICAgdGhpcy5wZXJ0dXJiU2VlZHMoKTtcbiAgfTtcblxuICBTTElDTy5wcm90b3R5cGUuZ2V0TEFCWFlTZWVkc0ZvckdpdmVuSyA9IGZ1bmN0aW9uKEssIHBlcnR1cmIpIHtcbiAgICB2YXIgc2l6ZSA9IE1hdGguZmxvb3IodGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0KTtcbiAgICB2YXIgc3RlcCA9IE1hdGguc3FydChwYXJzZUZsb2F0KHNpemUpIC8gcGFyc2VGbG9hdChLKSk7XG4gICAgdmFyIHhvZmYgPSBNYXRoLnJvdW5kKHN0ZXAgLyAyKTtcbiAgICB2YXIgeW9mZiA9IE1hdGgucm91bmQoc3RlcCAvIDIpO1xuICAgIHZhciBuID0gMDtcbiAgICB2YXIgciA9IDA7XG4gICAgdGhpcy5rU2VlZHNMID0gW107XG4gICAgdGhpcy5rU2VlZHNBID0gW107XG4gICAgdGhpcy5rU2VlZHNCID0gW107XG4gICAgdGhpcy5rU2VlZHNYID0gW107XG4gICAgdGhpcy5rU2VlZHNZID0gW107XG4gICAgZm9yICh2YXIgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgKyt5KSB7XG4gICAgICB2YXIgWSA9IE1hdGguZmxvb3IoeSAqIHN0ZXAgKyB5b2ZmKTtcbiAgICAgIGlmIChZID4gdGhpcy5oZWlnaHQgLSAxKVxuICAgICAgICBicmVhaztcbiAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgdGhpcy53aWR0aDsgKyt4KSB7XG4gICAgICAgIC8vdmFyIFggPSB4KnN0ZXAgKyB4b2ZmOyAgLy9zcXVhcmUgZ3JpZFxuICAgICAgICB2YXIgWCA9IE1hdGguZmxvb3IoeCAqIHN0ZXAgKyAoeG9mZiA8PCAociAmIDB4MSkpKTsgIC8vaGV4IGdyaWRcbiAgICAgICAgaWYgKFggPiB0aGlzLndpZHRoIC0gMSlcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgdmFyIGkgPSBNYXRoLmZsb29yKFkgKiB0aGlzLndpZHRoICsgWCk7XG4gICAgICAgIHRoaXMua1NlZWRzTC5wdXNoKHRoaXMubHZlY1tpXSk7XG4gICAgICAgIHRoaXMua1NlZWRzQS5wdXNoKHRoaXMuYXZlY1tpXSk7XG4gICAgICAgIHRoaXMua1NlZWRzQi5wdXNoKHRoaXMuYnZlY1tpXSk7XG4gICAgICAgIHRoaXMua1NlZWRzWC5wdXNoKFgpO1xuICAgICAgICB0aGlzLmtTZWVkc1kucHVzaChZKTtcbiAgICAgICAgKytuO1xuICAgICAgfVxuICAgICAgKytyO1xuICAgIH1cbiAgICBpZiAocGVydHVyYilcbiAgICAgIHRoaXMucGVydHVyYlNlZWRzKCk7XG4gIH07XG5cbiAgZnVuY3Rpb24gZmlsbEFycmF5KGFycmF5LCB2YWx1ZSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyArK2kpXG4gICAgICBhcnJheVtpXSA9IHZhbHVlO1xuICAgIHJldHVybiBhcnJheTtcbiAgfVxuXG4gIFNMSUNPLnByb3RvdHlwZS5wZXJmb3JtU3VwZXJwaXhlbFNlZ21lbnRhdGlvblZhcmlhYmxlU2FuZE0gPSBmdW5jdGlvbiAoXG4gICAga0xhYmVscyxcbiAgICBzdGVwLFxuICAgIG1heEl0ZXJhdGlvbnNcbiAgICApIHtcbiAgICB2YXIgc2l6ZSA9IE1hdGguZmxvb3IodGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0KSxcbiAgICAgICAgbnVtSyA9IHRoaXMua1NlZWRzTC5sZW5ndGgsXG4gICAgICAgIG51bUl0ZXIgPSAwLFxuICAgICAgICBvZmZzZXQgPSBNYXRoLmZsb29yKChzdGVwIDwgMTApID8gc3RlcCAqIDEuNSA6IHN0ZXApLFxuICAgICAgICBzaWdtYWwgPSBmaWxsQXJyYXkobmV3IEZsb2F0NjRBcnJheShudW1LKSwgMCksXG4gICAgICAgIHNpZ21hYSA9IGZpbGxBcnJheShuZXcgRmxvYXQ2NEFycmF5KG51bUspLCAwKSxcbiAgICAgICAgc2lnbWFiID0gZmlsbEFycmF5KG5ldyBGbG9hdDY0QXJyYXkobnVtSyksIDApLFxuICAgICAgICBzaWdtYXggPSBmaWxsQXJyYXkobmV3IEZsb2F0NjRBcnJheShudW1LKSwgMCksXG4gICAgICAgIHNpZ21heSA9IGZpbGxBcnJheShuZXcgRmxvYXQ2NEFycmF5KG51bUspLCAwKSxcbiAgICAgICAgY2x1c3RlclNpemUgPSBmaWxsQXJyYXkobmV3IEludDMyQXJyYXkobnVtSyksIDApLFxuICAgICAgICBkaXN0eHkgPSBmaWxsQXJyYXkobmV3IEZsb2F0NjRBcnJheShzaXplKSwgSW5maW5pdHkpLFxuICAgICAgICBkaXN0bGFiID0gZmlsbEFycmF5KG5ldyBGbG9hdDY0QXJyYXkoc2l6ZSksIEluZmluaXR5KSxcbiAgICAgICAgZGlzdHZlYyA9IGZpbGxBcnJheShuZXcgRmxvYXQ2NEFycmF5KHNpemUpLCBJbmZpbml0eSksXG4gICAgICAgIG1heGxhYiA9IGZpbGxBcnJheShuZXcgRmxvYXQ2NEFycmF5KG51bUspLCBNYXRoLnBvdygxMCwgMikpLFxuICAgICAgICBtYXh4eSA9IGZpbGxBcnJheShuZXcgRmxvYXQ2NEFycmF5KG51bUspLCBNYXRoLnBvdyhzdGVwLCAyKSksXG4gICAgICAgIGksIGosIGssIG4sIHgsIHk7XG4gICAgd2hpbGUgKG51bUl0ZXIgPCBtYXhJdGVyYXRpb25zKSB7XG4gICAgICArK251bUl0ZXI7XG4gICAgICAvLyBBc3NpZ24gdGhlIGNsb3Nlc3QgY2x1c3Rlci5cbiAgICAgIGZpbGxBcnJheShkaXN0dmVjLCBJbmZpbml0eSk7XG4gICAgICBmb3IgKG4gPSAwOyBuIDwgbnVtSzsgKytuKSB7XG4gICAgICAgIHZhciB5MSA9IE1hdGguZmxvb3IoTWF0aC5tYXgoMCwgdGhpcy5rU2VlZHNZW25dIC0gb2Zmc2V0KSksXG4gICAgICAgICAgICB5MiA9IE1hdGguZmxvb3IoTWF0aC5taW4odGhpcy5oZWlnaHQsIHRoaXMua1NlZWRzWVtuXSArIG9mZnNldCkpLFxuICAgICAgICAgICAgeDEgPSBNYXRoLmZsb29yKE1hdGgubWF4KDAsIHRoaXMua1NlZWRzWFtuXSAtIG9mZnNldCkpLFxuICAgICAgICAgICAgeDIgPSBNYXRoLmZsb29yKE1hdGgubWluKHRoaXMud2lkdGgsIHRoaXMua1NlZWRzWFtuXSArIG9mZnNldCkpO1xuICAgICAgICBmb3IgKHkgPSB5MTsgeSA8IHkyOyArK3kpIHtcbiAgICAgICAgICBmb3IgKHggPSB4MTsgeCA8IHgyOyArK3gpIHtcbiAgICAgICAgICAgIGkgPSBNYXRoLmZsb29yKHkgKiB0aGlzLndpZHRoICsgeCk7XG4gICAgICAgICAgICBpZiAoISh5IDwgdGhpcy5oZWlnaHQgJiYgeCA8IHRoaXMud2lkdGggJiYgeSA+PSAwICYmIHggPj0gMCkpXG4gICAgICAgICAgICAgIHRocm93IFwiQXNzZXJ0aW9uIGVycm9yXCI7XG4gICAgICAgICAgICB2YXIgbCA9IHRoaXMubHZlY1tpXSxcbiAgICAgICAgICAgICAgICBhID0gdGhpcy5hdmVjW2ldLFxuICAgICAgICAgICAgICAgIGIgPSB0aGlzLmJ2ZWNbaV07XG4gICAgICAgICAgICBkaXN0bGFiW2ldID0gTWF0aC5wb3cobCAtIHRoaXMua1NlZWRzTFtuXSwgMikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KGEgLSB0aGlzLmtTZWVkc0Fbbl0sIDIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhiIC0gdGhpcy5rU2VlZHNCW25dLCAyKTtcbiAgICAgICAgICAgIGRpc3R4eVtpXSA9IE1hdGgucG93KHggLSB0aGlzLmtTZWVkc1hbbl0sIDIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHkgLSB0aGlzLmtTZWVkc1lbbl0sIDIpO1xuICAgICAgICAgICAgdmFyIGRpc3QgPSBkaXN0bGFiW2ldIC8gbWF4bGFiW25dICsgZGlzdHh5W2ldIC8gbWF4eHlbbl07XG4gICAgICAgICAgICBpZiAoZGlzdCA8IGRpc3R2ZWNbaV0pIHtcbiAgICAgICAgICAgICAgZGlzdHZlY1tpXSA9IGRpc3Q7XG4gICAgICAgICAgICAgIGtMYWJlbHNbaV0gPSBuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy9jb25zb2xlLmxvZyhcIml0ZXIgPSBcIiArIG51bUl0ZXIgKyBcIiwgc3VtX2Rpc3QgPSBcIiArIHN1bShkaXN0dmVjKSk7XG4gICAgICAvLyBBc3NpZ24gdGhlIG1heCBjb2xvciBkaXN0YW5jZSBmb3IgYSBjbHVzdGVyLlxuICAgICAgaWYgKG51bUl0ZXIgPT09IDApIHtcbiAgICAgICAgZmlsbEFycmF5KG1heGxhYiwgMSk7XG4gICAgICAgIGZpbGxBcnJheShtYXh4eSwgMSk7XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgc2l6ZTsgKytpKSB7XG4gICAgICAgIGlmIChtYXhsYWJba0xhYmVsc1tpXV0gPCBkaXN0bGFiW2ldKVxuICAgICAgICAgIG1heGxhYltrTGFiZWxzW2ldXSA9IGRpc3RsYWJbaV07XG4gICAgICAgIGlmIChtYXh4eVtrTGFiZWxzW2ldXSA8IGRpc3R4eVtpXSlcbiAgICAgICAgICBtYXh4eVtrTGFiZWxzW2ldXSA9IGRpc3R4eVtpXTtcbiAgICAgIH1cbiAgICAgIC8vIFJlY2FsY3VsYXRlIHRoZSBjZW50cm9pZCBhbmQgc3RvcmUgaW4gdGhlIHNlZWQgdmFsdWVzLlxuICAgICAgZmlsbEFycmF5KHNpZ21hbCwgMCk7XG4gICAgICBmaWxsQXJyYXkoc2lnbWFhLCAwKTtcbiAgICAgIGZpbGxBcnJheShzaWdtYWIsIDApO1xuICAgICAgZmlsbEFycmF5KHNpZ21heCwgMCk7XG4gICAgICBmaWxsQXJyYXkoc2lnbWF5LCAwKTtcbiAgICAgIGZpbGxBcnJheShjbHVzdGVyU2l6ZSwgMCk7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgc2l6ZTsgKytqKSB7XG4gICAgICAgIHZhciB0ZW1wID0ga0xhYmVsc1tqXTtcbiAgICAgICAgaWYgKHRlbXAgPCAwKVxuICAgICAgICAgIHRocm93IFwiQXNzZXJ0aW9uIGVycm9yXCI7XG4gICAgICAgIHNpZ21hbFt0ZW1wXSArPSB0aGlzLmx2ZWNbal07XG4gICAgICAgIHNpZ21hYVt0ZW1wXSArPSB0aGlzLmF2ZWNbal07XG4gICAgICAgIHNpZ21hYlt0ZW1wXSArPSB0aGlzLmJ2ZWNbal07XG4gICAgICAgIHNpZ21heFt0ZW1wXSArPSAoaiAlIHRoaXMud2lkdGgpO1xuICAgICAgICBzaWdtYXlbdGVtcF0gKz0gKGogLyB0aGlzLndpZHRoKTtcbiAgICAgICAgY2x1c3RlclNpemVbdGVtcF0rKztcbiAgICAgIH1cbiAgICAgIGZvciAoayA9IDA7IGsgPCBudW1LOyArK2spIHtcbiAgICAgICAgaWYgKGNsdXN0ZXJTaXplW2tdIDw9IDApXG4gICAgICAgICAgY2x1c3RlclNpemVba10gPSAxO1xuICAgICAgICAvL2NvbXB1dGluZyBpbnZlcnNlIG5vdyB0byBtdWx0aXBseSwgdGhhbiBkaXZpZGUgbGF0ZXIuXG4gICAgICAgIHZhciBpbnYgPSAxLjAgLyBjbHVzdGVyU2l6ZVtrXTtcbiAgICAgICAgdGhpcy5rU2VlZHNMW2tdID0gc2lnbWFsW2tdICogaW52O1xuICAgICAgICB0aGlzLmtTZWVkc0Fba10gPSBzaWdtYWFba10gKiBpbnY7XG4gICAgICAgIHRoaXMua1NlZWRzQltrXSA9IHNpZ21hYltrXSAqIGludjtcbiAgICAgICAgdGhpcy5rU2VlZHNYW2tdID0gc2lnbWF4W2tdICogaW52O1xuICAgICAgICB0aGlzLmtTZWVkc1lba10gPSBzaWdtYXlba10gKiBpbnY7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIFNMSUNPLnByb3RvdHlwZS5lbmZvcmNlTGFiZWxDb25uZWN0aXZpdHkgPSBmdW5jdGlvbiAobGFiZWxzLCBubGFiZWxzLCBLKSB7XG4gICAgdmFyIGR4NCA9IFstMSwgIDAsICAxLCAgMF0sXG4gICAgICAgIGR5NCA9IFsgMCwgLTEsICAwLCAgMV0sXG4gICAgICAgIHNpemUgPSB0aGlzLndpZHRoICogdGhpcy5oZWlnaHQsXG4gICAgICAgIFNVUFNaID0gTWF0aC5mbG9vcihzaXplIC8gSyksXG4gICAgICAgIGMsIG4sIHgsIHksIG5pbmRleDtcbiAgICB2YXIgbGFiZWwgPSAwLFxuICAgICAgICB4dmVjID0gbmV3IEludDMyQXJyYXkoc2l6ZSksXG4gICAgICAgIHl2ZWMgPSBuZXcgSW50MzJBcnJheShzaXplKSxcbiAgICAgICAgb2luZGV4ID0gMCxcbiAgICAgICAgYWRqbGFiZWwgPSAwOyAgLy8gYWRqYWNlbnQgbGFiZWxcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuaGVpZ2h0OyArK2opIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy53aWR0aDsgKytrKSB7XG4gICAgICAgIGlmIChubGFiZWxzW29pbmRleF0gPCAwKSB7XG4gICAgICAgICAgbmxhYmVsc1tvaW5kZXhdID0gbGFiZWw7XG4gICAgICAgICAgLy8gU3RhcnQgYSBuZXcgc2VnbWVudC5cbiAgICAgICAgICB4dmVjWzBdID0gaztcbiAgICAgICAgICB5dmVjWzBdID0gajtcbiAgICAgICAgICAvLyAgUXVpY2tseSBmaW5kIGFuIGFkamFjZW50IGxhYmVsIGZvciB1c2UgbGF0ZXIgaWYgbmVlZGVkLlxuICAgICAgICAgIGZvciAobiA9IDA7IG4gPCA0OyArK24pIHtcbiAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKHh2ZWNbMF0gKyBkeDRbbl0pO1xuICAgICAgICAgICAgeSA9IE1hdGguZmxvb3IoeXZlY1swXSArIGR5NFtuXSk7XG4gICAgICAgICAgICBpZiAoKHggPj0gMCAmJiB4IDwgdGhpcy53aWR0aCkgJiYgKHkgPj0gMCAmJiB5IDwgdGhpcy5oZWlnaHQpKSB7XG4gICAgICAgICAgICAgIG5pbmRleCA9IE1hdGguZmxvb3IoeSAqIHRoaXMud2lkdGggKyB4KTtcbiAgICAgICAgICAgICAgaWYgKG5sYWJlbHNbbmluZGV4XSA+PSAwKVxuICAgICAgICAgICAgICAgIGFkamxhYmVsID0gbmxhYmVsc1tuaW5kZXhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgY291bnQgPSAxO1xuICAgICAgICAgIGZvciAoYyA9IDA7IGMgPCBjb3VudDsgKytjKSB7XG4gICAgICAgICAgICBmb3IgKG4gPSAwOyBuIDwgNDsgKytuKSB7XG4gICAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKHh2ZWNbY10gKyBkeDRbbl0pO1xuICAgICAgICAgICAgICB5ID0gTWF0aC5mbG9vcih5dmVjW2NdICsgZHk0W25dKTtcbiAgICAgICAgICAgICAgaWYgKCh4ID49IDAgJiYgeCA8IHRoaXMud2lkdGgpICYmICh5ID49IDAgJiYgeSA8IHRoaXMuaGVpZ2h0KSkge1xuICAgICAgICAgICAgICAgIG5pbmRleCA9IE1hdGguZmxvb3IoeSAqIHRoaXMud2lkdGggKyB4KTtcbiAgICAgICAgICAgICAgICBpZiAobmxhYmVsc1tuaW5kZXhdIDwgMCAmJiBsYWJlbHNbb2luZGV4XSA9PSBsYWJlbHNbbmluZGV4XSkge1xuICAgICAgICAgICAgICAgICAgeHZlY1tjb3VudF0gPSB4O1xuICAgICAgICAgICAgICAgICAgeXZlY1tjb3VudF0gPSB5O1xuICAgICAgICAgICAgICAgICAgbmxhYmVsc1tuaW5kZXhdID0gbGFiZWw7XG4gICAgICAgICAgICAgICAgICArK2NvdW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBJZiBzZWdtZW50IHNpemUgaXMgbGVzcyB0aGVuIGEgbGltaXQsIGFzc2lnbiBhblxuICAgICAgICAgIC8vIGFkamFjZW50IGxhYmVsIGZvdW5kIGJlZm9yZSwgYW5kIGRlY3JlbWVudCBsYWJlbCBjb3VudC5cbiAgICAgICAgICBpZiAoY291bnQgPD0gU1VQU1ogPj4gMikge1xuICAgICAgICAgICAgZm9yIChjID0gMDsgYyA8IGNvdW50OyBjKysgKSB7XG4gICAgICAgICAgICAgIHZhciBpbmQgPSBNYXRoLmZsb29yKHl2ZWNbY10gKiB0aGlzLndpZHRoICsgeHZlY1tjXSk7XG4gICAgICAgICAgICAgIG5sYWJlbHNbaW5kXSA9IGFkamxhYmVsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLS1sYWJlbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgKytsYWJlbDtcbiAgICAgICAgfVxuICAgICAgICArK29pbmRleDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxhYmVsO1xuICB9O1xuXG4gIFNMSUNPLnByb3RvdHlwZS5wZXJmb3JtU0xJQ09Gb3JHaXZlblN0ZXBTaXplID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNpemUgPSB0aGlzLndpZHRoICogdGhpcy5oZWlnaHQsXG4gICAgICAgIGtMYWJlbHMgPSBmaWxsQXJyYXkobmV3IEludDMyQXJyYXkoc2l6ZSksIC0xKTtcbiAgICB0aGlzLmRvUkdCdG9MQUJDb252ZXJzaW9uKHRoaXMuaW1hZ2VEYXRhKTtcbiAgICBpZiAodGhpcy5wZXJ0dXJiKVxuICAgICAgdGhpcy5kZXRlY3RMYWJFZGdlcygpO1xuICAgIHRoaXMuZ2V0TEFCWFlTZWVkc0ZvckdpdmVuU3RlcFNpemUodGhpcy5zdGVwLCB0aGlzLnBlcnR1cmIpO1xuICAgIHRoaXMucGVyZm9ybVN1cGVycGl4ZWxTZWdtZW50YXRpb25WYXJpYWJsZVNhbmRNKGtMYWJlbHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGVwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF4SXRlcmF0aW9ucyk7XG4gICAgdmFyIG51bWxhYmVscyA9IGtMYWJlbHMubGVuZ3RoO1xuICAgIGlmICh0aGlzLmVuZm9yY2VDb25uZWN0aXZpdHkpIHtcbiAgICAgIHZhciBubGFiZWxzID0gZmlsbEFycmF5KG5ldyBJbnQzMkFycmF5KHNpemUpLCAtMSk7XG4gICAgICBudW1sYWJlbHMgPSB0aGlzLmVuZm9yY2VMYWJlbENvbm5lY3Rpdml0eShrTGFiZWxzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmxhYmVscyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemUgLyAodGhpcy5zdGVwICogdGhpcy5lc3RlcCkpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyArK2kpXG4gICAgICAgIGtMYWJlbHNbaV0gPSBubGFiZWxzW2ldO1xuICAgIH1cbiAgICByZXR1cm4ga0xhYmVscztcbiAgfTtcblxuICBTTElDTy5wcm90b3R5cGUucGVyZm9ybVNMSUNPRm9yR2l2ZW5LID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNpemUgPSB0aGlzLndpZHRoICogdGhpcy5oZWlnaHQsXG4gICAgICAgIGtMYWJlbHMgPSBmaWxsQXJyYXkobmV3IEludDMyQXJyYXkoc2l6ZSksIC0xKTtcbiAgICB0aGlzLmRvUkdCdG9MQUJDb252ZXJzaW9uKHRoaXMuaW1hZ2VEYXRhKTtcbiAgICBpZiAodGhpcy5wZXJ0dXJiKVxuICAgICAgdGhpcy5kZXRlY3RMYWJFZGdlcygpO1xuICAgIHRoaXMuZ2V0TEFCWFlTZWVkc0ZvckdpdmVuSyh0aGlzLkssIHRoaXMucGVydHVyYik7XG4gICAgdmFyIHN0ZXAgPSBNYXRoLnNxcnQoc2l6ZSAvIHRoaXMuSykgKyAyLjA7XG4gICAgdGhpcy5wZXJmb3JtU3VwZXJwaXhlbFNlZ21lbnRhdGlvblZhcmlhYmxlU2FuZE0oa0xhYmVscyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF4SXRlcmF0aW9ucyk7XG4gICAgdmFyIG51bWxhYmVscyA9IGtMYWJlbHMubGVuZ3RoO1xuICAgIGlmICh0aGlzLmVuZm9yY2VDb25uZWN0aXZpdHkpIHtcbiAgICAgIHZhciBubGFiZWxzID0gZmlsbEFycmF5KG5ldyBJbnQzMkFycmF5KHNpemUpLCAtMSk7XG4gICAgICBudW1sYWJlbHMgPSB0aGlzLmVuZm9yY2VMYWJlbENvbm5lY3Rpdml0eShrTGFiZWxzLCBubGFiZWxzLCB0aGlzLkspO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyArK2kpXG4gICAgICAgIGtMYWJlbHNbaV0gPSBubGFiZWxzW2ldO1xuICAgIH1cbiAgICByZXR1cm4ga0xhYmVscztcbiAgfTtcblxuICBTTElDTy5wcm90b3R5cGUuZHJhd0NvbnRvdXJzQXJvdW5kU2VnbWVudHMgPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgdmFyIGltYWdlRGF0YSA9IG5ldyBJbWFnZURhdGEodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpLFxuICAgICAgICBkYXRhID0gZmlsbEFycmF5KGltYWdlRGF0YS5kYXRhLCAyNTUpLFxuICAgICAgICBjb2xvciA9IFsyNTUsIDAsIDBdLFxuICAgICAgICBkeDggPSBbLTEsIC0xLCAgMCwgIDEsIDEsIDEsIDAsIC0xXSxcbiAgICAgICAgZHk4ID0gWyAwLCAtMSwgLTEsIC0xLCAwLCAxLCAxLCAgMV0sXG4gICAgICAgIGlzdGFrZW4gPSBmaWxsQXJyYXkobmV3IFVpbnQ4QXJyYXkodGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0KSwgMCk7XG4gICAgdmFyIG1haW5pbmRleCA9IDA7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLmhlaWdodDsgKytqKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMud2lkdGg7ICsraykge1xuICAgICAgICB2YXIgbnAgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7ICsraSkge1xuICAgICAgICAgIHZhciB4ID0gayArIGR4OFtpXSxcbiAgICAgICAgICAgICAgeSA9IGogKyBkeThbaV07XG4gICAgICAgICAgaWYgKCh4ID49IDAgJiYgeCA8IHRoaXMud2lkdGgpICYmICh5ID49IDAgJiYgeSA8IHRoaXMuaGVpZ2h0KSkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0geSAqIHRoaXMud2lkdGggKyB4O1xuICAgICAgICAgICAgaWYgKGlzdGFrZW5baW5kZXhdID09PSAwICYmXG4gICAgICAgICAgICAgICAgcmVzdWx0LmxhYmVsc1ttYWluaW5kZXhdICE9PSByZXN1bHQubGFiZWxzW2luZGV4XSlcbiAgICAgICAgICAgICAgKytucDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5wID4gMSkge1xuICAgICAgICAgIGRhdGFbNCAqIG1haW5pbmRleCArIDBdID0gY29sb3JbMF07XG4gICAgICAgICAgZGF0YVs0ICogbWFpbmluZGV4ICsgMV0gPSBjb2xvclsxXTtcbiAgICAgICAgICBkYXRhWzQgKiBtYWluaW5kZXggKyAyXSA9IGNvbG9yWzJdO1xuICAgICAgICB9XG4gICAgICAgICsrbWFpbmluZGV4O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaW1hZ2VEYXRhO1xuICB9O1xuXG4gIC8vIFJlbWFwIGxhYmVsIGluZGljZXMuXG4gIGZ1bmN0aW9uIHJlbWFwTGFiZWxzKGxhYmVscykge1xuICAgIHZhciBtYXAgPSB7fSxcbiAgICAgICAgaW5kZXggPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFiZWxzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgbGFiZWwgPSBsYWJlbHNbaV07XG4gICAgICBpZiAobWFwW2xhYmVsXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBtYXBbbGFiZWxdID0gaW5kZXgrKztcbiAgICAgICAgbGFiZWxzW2ldID0gbWFwW2xhYmVsXTtcbiAgICB9XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgZnVuY3Rpb24gZW5jb2RlTGFiZWxzKGxhYmVscywgZGF0YSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFiZWxzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgbGFiZWwgPSBsYWJlbHNbaV07XG4gICAgICBkYXRhWzQgKiBpICsgMF0gPSAyNTUgJiBsYWJlbDtcbiAgICAgIGRhdGFbNCAqIGkgKyAxXSA9IDI1NSAmIChsYWJlbCA+PiA4KTtcbiAgICAgIGRhdGFbNCAqIGkgKyAyXSA9IDI1NSAmIChsYWJlbCA+PiAxNik7XG4gICAgICBkYXRhWzQgKiBpICsgM10gPSAyNTU7XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IHtTTElDTyBhcyBzbGljb307XG4iLCIvKiBNYWluIHBhZ2UgZGlzcGF0Y2hlci5cbiovXG5pbXBvcnQge3JlbmRlciBhcyBlZGl0UGFnZX0gIGZyb20gJy4vYXBwL2VkaXQnXG5cbiAgIGxldCBwYXJhbXMgPSB7XG4gICAgICBpZDowXG4gICAgfVxuICAgIHdpbmRvdy5nZXREYXRhID0ge1xuICAgICAgXCJtb2RlXCI6IDIsICAgICAgLy8x77ya5qCH5rOo77ybMu+8mui0qOajgCjlj6/kv67mlLkp77ybIDPvvJrov5Tkv64gIDTvvJrmn6XnnIvvvJs177ya6aqM5pS2IDDvvJrpooTnlZlcbiAgICAgIFwiZm9ybURhdGFcIjogeyAgICAgLy/ooajljZXkuJrliqHmlbDmja7lrprkuYnvvIzlj6/ov5vooYzmianlsZXlrprkuYkg77y75qCH5rOo5bmz5Y+w55qE6YWN572u6aG577y9XG4gICAgICAgIFwiZ3JvdXBMc3RcIjoge1xuICAgICAgICAgIFwicHJvcGVydHlJZFwiOiAzLFxuICAgICAgICAgIFwicHJvcGVydHlTdGF0dXNcIjogXCIzXCIsLy8z5qCH562+77yMNGxpc3RcbiAgICAgICAgICBcInByb3BlcnR5VHlwZVwiOiAyLCAgICAvL+S7o+ihqOagh+etvumAiemhuVxuICAgICAgICAgIFwicHJvcGVydHlOYW1lXCI6IFwi5qCH562+XCIsXG4gICAgICAgICAgXCJncm91cElkXCI6IDAsXG4gICAgICAgICAgXCJwcm9wZXJ0eVZhbHVlTHN0XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJwcm9wZXJ0eVZhbHVlXCI6IFwic2tpblwiLFxuICAgICAgICAgICAgICBcInByb3BlcnR5TGFiZWxcIjogXCLnmq7ogqRcIixcbiAgICAgICAgICAgICAgXCJib3hDb2xvclwiOiBbMjI2LCAxOTYsIDE5Nl0sICAgICAgIC8v5qGG6aKc6Imy5YC8XG4gICAgICAgICAgICAgIFwiYm94Q29sb3JPcGFjaXR5XCI6IFwiMVwiLCAgICAgICAvL+ahhuS4jemAj+aYjuW6puWAvO+8mjAtMVxuICAgICAgICAgICAgICBcImZpbGxDb2xvclwiOiBbMjAyLCAyNTUsIDExMl0sICAgICAvL+Whq+WFheiJsuWAvFxuICAgICAgICAgICAgICBcImZpbGxDb2xvck9wYWNpdHlcIjogXCIwLjJcIiwgICAgICAgLy/loavlhYXoibLkuI3pgI/mmI7luqblgLzvvJowLTFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwicHJvcGVydHlWYWx1ZVwiOiBcImhhaXJcIixcbiAgICAgICAgICAgICAgXCJwcm9wZXJ0eUxhYmVsXCI6IFwi5aS05Y+RXCIsXG4gICAgICAgICAgICAgIFwiYm94Q29sb3JcIjogWzY0LCAzMiwgMzJdLCAgICAgICAvL+ahhuminOiJsuWAvFxuICAgICAgICAgICAgICBcImJveENvbG9yT3BhY2l0eVwiOiBcIjFcIiwgICAgICAgLy/moYbkuI3pgI/mmI7luqblgLzvvJowLTFcbiAgICAgICAgICAgICAgXCJmaWxsQ29sb3JcIjogWzIwMiwgMjU1LCAxMTJdLCAgICAgLy/loavlhYXoibLlgLxcbiAgICAgICAgICAgICAgXCJmaWxsQ29sb3JPcGFjaXR5XCI6IFwiMC4yXCIsICAgICAgIC8v5aGr5YWF6Imy5LiN6YCP5piO5bqm5YC877yaMC0xXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInByb3BlcnR5VmFsdWVcIjogXCJkcmVzc1wiLFxuICAgICAgICAgICAgICBcInByb3BlcnR5TGFiZWxcIjogXCLov57ooaPoo5lcIixcbiAgICAgICAgICAgICAgXCJib3hDb2xvclwiOiBbMjU1LCAwLCAwXSwgICAgICAgLy/moYbpopzoibLlgLxcbiAgICAgICAgICAgICAgXCJib3hDb2xvck9wYWNpdHlcIjogXCIxXCIsICAgICAgIC8v5qGG5LiN6YCP5piO5bqm5YC877yaMC0xXG4gICAgICAgICAgICAgIFwiZmlsbENvbG9yXCI6IFsyMDIsIDI1NSwgMTEyXSwgICAgIC8v5aGr5YWF6Imy5YC8XG4gICAgICAgICAgICAgIFwiZmlsbENvbG9yT3BhY2l0eVwiOiBcIjAuMlwiLCAgICAgICAvL+Whq+WFheiJsuS4jemAj+aYjuW6puWAvO+8mjAtMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJwcm9wZXJ0eVZhbHVlXCI6IFwiZ2xhc3Nlc1wiLFxuICAgICAgICAgICAgICBcInByb3BlcnR5TGFiZWxcIjogXCLnnLznnZtcIixcbiAgICAgICAgICAgICAgXCJib3hDb2xvclwiOiBbMTI4LCAyNTUsIDBdLCAgICAgICAvL+ahhuminOiJsuWAvFxuICAgICAgICAgICAgICBcImJveENvbG9yT3BhY2l0eVwiOiBcIjFcIiwgICAgICAgLy/moYbkuI3pgI/mmI7luqblgLzvvJowLTFcbiAgICAgICAgICAgICAgXCJmaWxsQ29sb3JcIjogWzIwMiwgMjU1LCAxMTJdLCAgICAgLy/loavlhYXoibLlgLxcbiAgICAgICAgICAgICAgXCJmaWxsQ29sb3JPcGFjaXR5XCI6IFwiMC4yXCIsICAgICAgIC8v5aGr5YWF6Imy5LiN6YCP5piO5bqm5YC877yaMC0xXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInByb3BlcnR5VmFsdWVcIjogXCJqYWNrZXRcIixcbiAgICAgICAgICAgICAgXCJwcm9wZXJ0eUxhYmVsXCI6IFwi5LiK6KGjXCIsXG4gICAgICAgICAgICAgIFwiYm94Q29sb3JcIjogWzAsIDI1NSwgMjU1XSwgICAgICAgLy/moYbpopzoibLlgLxcbiAgICAgICAgICAgICAgXCJib3hDb2xvck9wYWNpdHlcIjogXCIxXCIsICAgICAgIC8v5qGG5LiN6YCP5piO5bqm5YC877yaMC0xXG4gICAgICAgICAgICAgIFwiZmlsbENvbG9yXCI6IFsyMDIsIDI1NSwgMTEyXSwgICAgIC8v5aGr5YWF6Imy5YC8XG4gICAgICAgICAgICAgIFwiZmlsbENvbG9yT3BhY2l0eVwiOiBcIjAuMlwiLCAgICAgICAvL+Whq+WFheiJsuS4jemAj+aYjuW6puWAvO+8mjAtMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJwcm9wZXJ0eVZhbHVlXCI6IFwic2tpcnRcIixcbiAgICAgICAgICAgICAgXCJwcm9wZXJ0eUxhYmVsXCI6IFwi5aSW6KGjXCIsXG4gICAgICAgICAgICAgIFwiYm94Q29sb3JcIjogWzEyOCwgMCwgMjU1XSwgICAgICAgLy/moYbpopzoibLlgLxcbiAgICAgICAgICAgICAgXCJib3hDb2xvck9wYWNpdHlcIjogXCIxXCIsICAgICAgIC8v5qGG5LiN6YCP5piO5bqm5YC877yaMC0xXG4gICAgICAgICAgICAgIFwiZmlsbENvbG9yXCI6IFsyMDIsIDI1NSwgMTEyXSwgICAgIC8v5aGr5YWF6Imy5YC8XG4gICAgICAgICAgICAgIFwiZmlsbENvbG9yT3BhY2l0eVwiOiBcIjAuMlwiLCAgICAgICAvL+Whq+WFheiJsuS4jemAj+aYjuW6puWAvO+8mjAtMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJwcm9wZXJ0eUxzdFwiOiBbXG4gICAgXG4gICAgICAgIF0sXG4gICAgICAgIFwiZm91bmRhdGlvbkNvbmZpZ1wiOiBbXG4gICAgXG4gICAgICAgIF0sXG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBcImxhYmVsc1wiOiBbXCJiYWNrZ3JvdW5kXCJdLFxuICAgICAgXCJsYWJlbHNDb250ZW50XCI6W1wi6IOM5pmvXCJdLFxuICAgICAgXCJpbWFnZVVSTHNcIjogW1xuICAgICAgICAvL1wiZGF0YS9pbWFnZXMvMi5qcGdcIlxuICAgICAgXSxcbiAgICAgIFwiYW5ub3RhdGlvblVSTHNcIjogW1xuICAgICAgICAvL1wiZGF0YS9hbm5vdGF0aW9ucy8xLnBuZ1wiXG4gICAgICBdLFxuICAgICAgY29sb3JtYXA6W1syNTUsIDI1NSwgMjU1XV1cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGNvbG9yRnVuKGluZGV4LGNvbG9yLGNvbnRlbnQsdmFsdWUpe1xuICAgICAgdmFyIGNvbG9ySHRtbEl0ZW0gPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwic3VwZXJwaXhlbF9jb2xvcl9pdGVtXCIgZGF0YS1pbmRleD1cIiR7aW5kZXh9XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3VwZXJwaXhlbF9jb2xvcl9pY29uXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOnJnYigke2NvbG9yLmpvaW4oJywnKX0pXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3VwZXJwaXhlbF9jb2xvcl9jb250XCIgZGF0YS12YWx1ZT1cIiR7dmFsdWV9XCI+JHtjb250ZW50fTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIGBcbiAgICAgIHJldHVybiBjb2xvckh0bWxJdGVtO1xuICAgIH1cblxuICAgIHdpbmRvdy5nZXREYXRhLmZvcm1EYXRhLmdyb3VwTHN0LnByb3BlcnR5VmFsdWVMc3QuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcbiAgICAgIGRhdGEubGFiZWxzLnB1c2goaXRlbS5wcm9wZXJ0eVZhbHVlKTtcbiAgICAgIGRhdGEubGFiZWxzQ29udGVudC5wdXNoKGl0ZW0ucHJvcGVydHlMYWJlbClcbiAgICAgIGRhdGEuY29sb3JtYXAucHVzaChpdGVtLmJveENvbG9yKTtcbiAgICAgXG4gICAgfSlcbiAgICB2YXIgY29sb3JIdG1sID0gXCJcIlxuICAgIGZvcihsZXQgaT0wLGxlbiA9ZGF0YS5jb2xvcm1hcC5sZW5ndGg7aTxsZW47aSsrKXtcbiAgICAgIGNvbG9ySHRtbCArPWNvbG9yRnVuKGksZGF0YS5jb2xvcm1hcFtpXSxkYXRhLmxhYmVsc0NvbnRlbnRbaV0sZGF0YS5sYWJlbHNbaV0pO1xuICAgIH1cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnU3VwZXJwaXhlbENvbG9yJykuaW5uZXJIVE1MID0gY29sb3JIdG1sO1xuICAgIHdpbmRvdy5UZW1wbGF0ZSA9IHt9XG4gICAgd2luZG93LlRlbXBsYXRlLnNldFRlbXBsYXRlRGF0YSA9IGZ1bmN0aW9uKG9iaix1cmwsY2FsbGJhY2spe1xuICAgICAgb2JqLmJhc2VJbWc/ZGF0YS5hbm5vdGF0aW9uVVJMcy5wdXNoKG9iai5iYXNlSW1nKTpcIlwiOyAgXG4gICAgICBkYXRhLmltYWdlVVJMcy5wdXNoKHVybClcbiAgICAgIGVkaXRQYWdlKGRhdGEsIHBhcmFtcyk7XG4gICAgICBjYWxsYmFjayYmY2FsbGJhY2soKTtcbiAgICB9O1xuICAgIHdpbmRvdy5UZW1wbGF0ZS5zZXRUZW1wbGF0ZURhdGEoe2Jhc2VJbWc6XCJcIn0sXCJkYXRhL2ltYWdlcy80LnBuZ1wiLGZ1bmN0aW9uKCl7XG4gICAgICBjb25zb2xlLmxvZygnZmluaXNoJylcbiAgICB9KVxuICAgIl0sInNvdXJjZVJvb3QiOiIifQ==