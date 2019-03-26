/**
 * Base class for over-segmentation algorithms.
 *
 * Copyright 2015  Kota Yamaguchi
 */
import * as compat from "../compat"

  function BaseSegmentation(imageData, options) {
    if (!(imageData instanceof ImageData))
      throw "Invalid ImageData";
    this.imageData = compat.createImageData(imageData.width, imageData.height);
    this.imageData.data.set(imageData.data);
  }

  BaseSegmentation.prototype.finer = function () {};

  BaseSegmentation.prototype.coarser = function () {};

  export {BaseSegmentation};
