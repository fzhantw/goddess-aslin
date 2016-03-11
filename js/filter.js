/*
 * Trump Filter - Content Script
 * 
 * This is the primary JS file that manages the detection and filtration of Donald Trump from the web page.
 */

$.fn.scrollStopped = function(callback) {
  var that = this, $this = $(that);
  $this.scroll(function(ev) {
	clearTimeout($this.data('scrollTimeout'));
	$this.data('scrollTimeout', setTimeout(callback.bind(that), 250, ev));
  });
};


// Variables
function doFilter() {
  var regexEn = /Yu-Heng Lin/i;
  var regexZh = /林妤恒/i;
  var content = document.body.innerText
  var search = regexEn.exec(content) || regexZh.exec(content);

  // Implementation
  if (search) {
	chrome.storage.sync.get({
	  filter: 'aggro',
	}, function(items) {
	  elements = $(":contains('Yu-Heng Lin')").filter("h1,h2,h3,h4,h5,p,span,li");

	  elements.each(function(index, element){
		var originalContent = element.innerHTML
		var newContent = originalContent.replace(regexEn, 'Goddess')
		element.innerHTML = newContent
	  })

	  elements = $(":contains('林妤恒')").filter("h1,h2,h3,h4,h5,p,span,li");

	  elements.each(function(index, element){
		var originalContent = element.innerHTML
		var newContent = originalContent.replace(regexZh, '女神')
		element.innerHTML = newContent
	  })

	  chrome.runtime.sendMessage({method: "saveStats", trumps: elements.length}, function(response) {
	  });
	});
	chrome.runtime.sendMessage({}, function(response) {});
  }
}
doFilter()
$(window).scrollStopped(function(ev){
  doFilter()
});

setInterval(doFilter, 20000)
