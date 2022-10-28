$(function() {

	// load header and set active class
	$.ajax({
		url: "/header.html",
		cache: false
	})
	.done(function( html ) {
		$( "header" ).replaceWith( html );
		let path = window.location.pathname.split("/");
		
		let pages = path //[path.length - 1]
		console.log(pages)

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