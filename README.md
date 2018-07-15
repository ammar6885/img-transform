Resize and crop uploaded images on the client side.

## Installation

```bash
$ npm install img-transform
```

## Usage


### imgTrasform

```js
imgTransform(uploadInput.files[0], 'image/jpeg')
  .done(function (dataUrl) {
    // your code here
  });
```

**imgTransform** is the main function that does nothing if it eas called individually.


#### arguments

**file**: input file object or a dataurl string including meta _"data:image/jpeg;base64,"_ or not.

**type**: exported mimeType default is input file mime type or dataurl meta mime type if found, otherwise _"image/jpeg"_ is the default mime type.



### Resize

```js
imgTransform(uploadInput.files[0])
  .resize(560, 340, 'cover')
  .done(function (dataUrl) {
    // your code here
  });
```


#### arguments

  **width** new width in pixels or 'auto'.

  **height** new height in pixels or 'auto'.

  **mode** _optional_ - preserve image ratio with two arguments 'cover' | 'contain'

  _note_: if one of dimensions was set to 'auto' the other dimension must be set to pixel value.



### Crop

```js
imgTransform(uploadInput.files[0])
  .crop(560, 340, 10, 10)
  .done(function (dataUrl) {
    // your code here
  });
```


#### arguments

  **width** crop width in pixels or 'auto'.

  **height** crop height in pixels or 'auto'.

  **leftOffset** crop left offset in pixels or 'auto'.

  **topOffset** crop top offset in pixels or 'auto'.

  Dimensions 'auto' option is to preserve the image ratio.
  Offsets 'auto' option is to center the crop size related to dimensions.



### Serial

```js
imgTransform(uploadInput.files[0])
  .crop(560, 340, 10, 10)
  .resize(560, 340, 'cover')
  .done(function (dataUrl) {
    // your code here
  });
```

You have the option to stack the two previous methods as in the example above.



### auto

```js
imgTransform(uploadInput.files[0])
  .auto(560, 340)
  .done(function (dataUrl) {
    // your code here
  });
```

#### arguments

  **width** new width and crop width in pixels or 'auto'.

  **height** new height and crop height in pixels or 'auto'.

The 'auto' method will perform the 'crop' and 'resize' operations togather with both offsets set to 'auto' and mode set to 'cover'.



### done
```js
imgTransform(uploadInput.files[0])
  .auto(560, 340)
  .done(function (dataUrl) {
    // your code here
  });
```

#### arguments

  **callback** callback function with the result image in 64string from as the first argument





Thank you.