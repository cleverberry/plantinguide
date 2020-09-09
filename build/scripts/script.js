/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

        $(".post-content").fitVids();
        
        // Calculates Reading Time
        $('.post-content').readingTime({
            readingTimeTarget: '.post-reading-time',
            wordCountTarget: '.post-word-count',
        });
        
        // Creates Captions from Alt tags
        $(".post-content img").each(function() {
            // Let's put a caption if there is one
            if($(this).attr("alt") && !$(this).hasClass("emoji"))
              $(this).wrap('<figure class="image"></figure>')
              .after('<figcaption>'+$(this).attr("alt")+'</figcaption>');
        });
        
    });

}(jQuery));

/*global jQuery */
/*jshint multistr:true browser:true */
/*!
* FitVids 1.0.3
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    if(!document.getElementById('fit-vids-style')) {

      var div = document.createElement('div'),
          ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0],
          cssStyles = '&shy;<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>';

      div.className = 'fit-vids-style';
      div.id = 'fit-vids-style';
      div.style.display = 'none';
      div.innerHTML = cssStyles;

      ref.parentNode.insertBefore(div,ref);

    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

(function ($) {"use strict";$(document).ready(function () {var $window = $(window),$image = $('.post-image-image, .teaserimage-image');$window.on('scroll', function () {var top = $window.scrollTop();if (top < 0 || top > 1500) { return; }$image.css('transform', 'translate3d(0px, ' + top / 3 + 'px, 0px)').css('opacity', 1 - Math.max(top / 700, 0));});$window.trigger('scroll');var height = $('.article-image').height();$('.post-content').css('padding-top', height + 'px');$('a[href*=#]:not([href=#])').click(function () {if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')&& location.hostname == this.hostname) {var target = $(this.hash);target=target.length?target:$('[name='+this.hash.slice(1)+']');if(target.length){$('html,body').animate({scrollTop: target.offset().top},500);return false;}}});});}(jQuery));
/*!

Name: Reading Time
Dependencies: jQuery
Author: Michael Lynch
Author URL: http://michaelynch.com
Date Created: August 14, 2013
Date Updated: January 24, 2014
Licensed under the MIT license

*/
(function(e){e.fn.readingTime=function(t){if(!this.length){return this}var n={readingTimeTarget:".eta",wordCountTarget:null,wordsPerMinute:270,round:true,lang:"en",lessThanAMinuteString:"",prependTimeString:"",prependWordString:"",remotePath:null,remoteTarget:null};var r=this;var i=e(this);r.settings=e.extend({},n,t);var s=r.settings.readingTimeTarget;var o=r.settings.wordCountTarget;var u=r.settings.wordsPerMinute;var a=r.settings.round;var f=r.settings.lang;var l=r.settings.lessThanAMinuteString;var c=r.settings.prependTimeString;var h=r.settings.prependWordString;var p=r.settings.remotePath;var d=r.settings.remoteTarget;if(f=="fr"){var v=l||"Moins d'une minute";var m="min"}else if(f=="de"){var v=l||"Weniger als eine Minute";var m="min"}else if(f=="es"){var v=l||"Menos de un minuto";var m="min"}else if(f=="nl"){var v=l||"Minder dan een minuut";var m="min"}else{var v=l||"Less than a minute";var m="min"}var g=function(e){var t=e.split(" ").length;var n=u/60;var r=t/n;var f=Math.round(r/60);var l=Math.round(r-f*60);if(a===true){if(f>0){i.find(s).text(c+f+" "+m)}else{i.find(s).text(c+v)}}else{var p=f+":"+l;i.find(s).text(c+p)}if(o!==""&&o!==undefined){i.find(o).text(h+t)}};i.each(function(){if(p!=null&&d!=null){e.get(p,function(t){g(e("<div>").html(t).find(d).text())})}else{g(i.text())}})}})(jQuery)