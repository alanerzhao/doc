# jQuery Preload Plugin

A jQuery plugin that preloads images.



## Description

There are times that we need to preload images to bring better user experience. You will not want your users to wait for 2 seconds when they hover their mouse over the navigation menu before the background image actually appears; or keep them waiting too long when they switch a slideshow. This plugin can also be useful when you want to add more images on the page through a ajax call.



## Demo
 - Please see demo.html
 - Live demo please take a look at [this](http://dreamerslab.com/demos/preload-images-with-jquery-preload-plugin)



## Documentation
  - There is a syntax highlight version, please see [this post](http://dreamerslab.com/blog/en/preload-images-with-jquery-preload-plugin/)
  - For chinese version please go [here](http://dreamerslab.com/blog/tw/preload-images-with-jquery-preload-plugin/)



## Requires
  - jQuery 1.2.3+



## Browser Compatibility
  - [Firefox](http://mzl.la/RNaI) 2.0+
  - [Internet Explorer](http://bit.ly/9fMgIQ) 6+
  - [Safari](http://bit.ly/gMhzVR) 3+
  - [Opera](http://bit.ly/fWJzaC) 10.6+
  - [Chrome](http://bit.ly/ePHvYZ) 8+



## Installation
  - First, make sure you are using valid [DOCTYPE](http://bit.ly/hQK1Rk)
  - Include nessesary JS files

<!-- -->

      <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
      <script type="text/javascript" src="path-to-file/jquery.preload.js"></script>



## Usage
Example code:

      $.preload( '/img/space.gif',
        '/img/loading.gif',
        '/img/header-bg.png',
        '/img/avatar.jpg'
      );



## License

The expandable plugin is licensed under the MIT License (LICENSE.txt).

Copyright (c) 2011 [Ben Lin](http://dreamerslab.com)