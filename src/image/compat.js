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
  export {createImageData}

