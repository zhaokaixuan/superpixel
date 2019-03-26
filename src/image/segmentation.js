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
import {pff} from "./segmentation/pff"
import {slic} from "./segmentation/slic"
import {slico} from "./segmentation/slico"

  var methods = {
    pff: pff,
    slic: slic,
    slico: slico,
  };

  methods.create = function (imageData, options) {
    options = options || {};
    options.method = options.method || "slic";
    if (!methods[options.method])
      throw "Invalid method: " + options.method;
    return new methods[options.method](imageData, options);
  };

  export {methods};
