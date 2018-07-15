(function (global, factory) {
  if (typeof define === 'function' && define.amd) { // AMD
    define([], function () { return factory(); });
  } else if (typeof module !== 'undefined' && typeof exports === 'object') { // Node.js
    module.exports = factory();
  } else if (global !== undefined) { // Global variable
    global.imgTransform = factory();
  }
})(this || window, function () {

  var Mod = {},
    result, imgType,
    success, resizeImg, cropImg,
    resizeWidth, resizeHeight, mode,
    cropWidth, cropHeight, cropLeft, cropTop;

  function _createImg(src, callback) {
    var img = new Image();
    img.onload = callback.bind(img);
    img.src = src;
  }

  function _crop() {
    _createImg(result, function () {
      var ratio = this.width / this.height,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        marginLeft = cropLeft,
        marginTop = cropTop;

      if (cropWidth === 'auto' && cropHeight === 'auto') {
        cropWidth = this.width;
        cropHeight = this.height;
      } else if (cropWidth === 'auto') {
        cropWidth = ratio * cropHeight;
      } else if (cropHeight === 'auto') {
        cropHeight = cropWidth / ratio;
      }

      cropWidth = cropWidth > this.width ? this.width : cropWidth;
      cropHeight = cropHeight > this.height ? this.height : cropHeight;

      if (marginLeft === 'auto') marginLeft = (this.width - cropWidth) / 2;
      if (marginTop === 'auto') marginTop = (this.height - cropHeight) / 2;

      canvas.width = cropWidth;
      canvas.height = cropHeight;

      ctx.drawImage(this, marginLeft, marginTop, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
      result = canvas.toDataURL(imgType, 1);

      if (resizeImg && cropImg < resizeImg) _resize();
      else if (success) success(result);
    });
  }

  function _resize() {
    _createImg(result, function () {
      var ratio = this.width / this.height,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        scaleToWidth;

      if (resizeWidth === 'auto' && resizeHeight === 'auto') {
        resizeWidth = this.width;
        resizeHeight = this.height;
      } else if (resizeWidth === 'auto') {
        resizeWidth = ratio * resizeHeight;
      } else if (resizeHeight === 'auto') {
        resizeHeight = resizeWidth / ratio;
      } else if (mode) {
        scaleToWidth = ratio * resizeHeight < resizeWidth;

        if ((scaleToWidth && mode === 'cover') || (!scaleToWidth && mode === 'contain')) resizeHeight = resizeWidth / ratio;
        else resizeWidth = ratio * resizeHeight;
      }

      this.width = resizeWidth;
      this.height = resizeHeight;

      canvas.width = resizeWidth;
      canvas.height = resizeHeight;

      ctx.drawImage(this, 0, 0, resizeWidth, resizeHeight);
      result = canvas.toDataURL(imgType, 1);

      if (cropImg && resizeImg < cropImg) _crop();
      else if (success) success(result);
    });
  }

  /**
   * Grap image file or image 64string
   * @param {Object} file 
   * @param {String} type 
   */
  function imgTransform(file, type) {
    result = undefined;
    imgType = undefined;
    success = undefined;
    resizeImg = undefined;
    cropImg = undefined;
    resizeWidth = undefined;
    resizeHeight = undefined;
    mode = undefined;
    cropWidth = undefined;
    cropHeight = undefined;
    cropHeight = undefined;
    cropTop = undefined;

    if (typeof file === 'string') {
      imgType = type || 'image/jpeg';

      if (!type) {
        if (file.indexOf('data:') === -1)
          file = "data:" + imgType + ";base64," + file;
        else
          type = data.split(',')[0].split(';')[0].split(':')[1] || imgType;

      } else {
        if (file.indexOf('image') === -1)
          file = "data:" + imgType + ";base64," + file;
      }

      result = file;
      setTimeout(function () { next(); }, 5);
    } else {
      var reader = new FileReader();
      imgType = type || file.type;
      reader.onload = function (e) {
        result = e.target.result;
        next();
      }

      reader.readAsDataURL(file);
    }

    function next() {
      if (resizeImg && cropImg)
        if (resizeImg < cropImg) _resize();
        else _crop();
      else if (resizeImg) _resize();
      else if (cropImg) _crop();
      else if (success) success(result);
    }

    return Mod;
  }

  Mod.crop = function (w, h, x, y) {
    cropWidth = w || 'auto';
    cropHeight = h || 'auto';
    cropLeft = x || 'auto';
    cropTop = y || 'auto';
    cropImg = resizeImg ? 2 : 1;

    return Mod;
  };

  Mod.resize = function (w, h, resizeMode) {
    resizeWidth = w || 'auto';
    resizeHeight = h || 'auto';
    mode = resizeMode || null;
    resizeImg = cropImg ? 2 : 1;
    return Mod;
  };

  Mod.auto = function (w, h) {
    return Mod
      .resize(w, h, 'cover')
      .crop(w, h);
  };

  Mod.done = function (callback) {
    success = callback;
  };

  return imgTransform;
});