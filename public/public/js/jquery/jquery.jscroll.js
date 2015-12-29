// ####################################################################################
// #######                                                                      #######
// ####### Plugin:      jScroll                                                 #######
// ####### Author:      William Duffy                                           #######
// ####### Website:     http://www.wduffy.co.uk/jScroll                         #######
// ####### Version:     1.1	                                                    #######
// #######                                                                      #######
// ####### Copyright (c) 2011, William Duffy - www.wduffy.co.uk                 #######
// #######                                                                      #######
// ####### Permission is hereby granted, free of charge, to any person          #######
// ####### obtaining a copy of this software and associated documentation       #######
// ####### files (the "Software"), to deal in the Software without              #######
// ####### restriction, including without limitation the rights to use,         #######
// ####### copy, modify, merge, publish, distribute, sublicense, and/or sell    #######
// ####### copies of the Software, and to permit persons to whom the            #######
// ####### Software is furnished to do so, subject to the following             #######
// ####### conditions:                                                          #######
// #######                                                                      #######
// ####### The above copyright notice and this permission notice shall be       #######
// ####### included in all copies or substantial portions of the Software.      #######
// #######                                                                      #######
// ####### THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,      #######
// ####### EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES      #######
// ####### OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND             #######
// ####### NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT          #######
// ####### HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,         #######
// ####### WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING         #######
// ####### FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR        #######
// ####### OTHER DEALINGS IN THE SOFTWARE.                                      #######
// #######                                                                      #######
// ####################################################################################
(function(e){e.fn.jScroll=function(t){function r(e){this.min=e.offset().top;this.originalMargin=parseInt(e.css("margin-top"),10)||0;this.getMargin=function(t){var r=e.parent().height()-e.outerHeight();var i=this.originalMargin;if(t.scrollTop()>=this.min)i=i+n.top+t.scrollTop()-this.min;if(i>r)i=r;return{marginTop:i+"px"}}}var n=e.extend({},e.fn.jScroll.defaults,t);return this.each(function(){var t=e(this);var i=e(window);var s=new r(t);i.scroll(function(){t.stop().animate(s.getMargin(i),n.speed)})})};e.fn.jScroll.defaults={speed:"slow",top:10}})(jQuery)
