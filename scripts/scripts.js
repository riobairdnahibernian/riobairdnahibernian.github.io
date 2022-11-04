$(function() {

	// load header and set active class

	var path = window.location.pathname.split("/");
	var pages = path
	var page = path[path.length - 1]
	var concept = "concept"
	var center = "center"

	if(page.includes(concept)){_url = "/concept-header.html"}else{_url = "/header.html"}

	// _url = "/header.html"

	$.ajax({
		url: _url,
		cache: false
	})
	.done(function( html ) {
		$( "header" ).replaceWith( html );

		for (let i = 0; i < pages.length; i++) {
			let page = pages[i].split(".")[0]
			console.log('page',page)
			if (page != ""){
				let page_element = $("header").find('a[href*="'+page+'.html"]');
				page_element.addClass("active");
			}
		}
	});
});