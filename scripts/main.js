// scripts 

$(function() {

	$(document).on("click","header a", function(e){
		// keeps the page from sliding when a menu item is clicked
		e.stopPropagation()
	})

	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
	const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
	// $.ajax({
	// 	url: "content/si-home.md",
	// 	cache: false
	// })
	// .done(function( html ) {
	// 	$( "#si_home" ).html( marked.parse(html) );
	// });

	$.ajax({
		url: "content/csi-home.md",
		cache: false
	})
	.done(function( html ) {
		$( "#csi_home" ).append( marked.parse(html) );
	});

	$.ajax({
		url: "content/tiers.md",
		cache: false
	})
	.done(function( html ) {
		$( "#tier_text" ).html( marked.parse(html) );
		$("#tier_text h3, #tier_text p").addClass("d-none")
	});

	
	
	
	
	$(document).on("click", ".si-concept",function() {


		var doc_w = $(document).outerWidth();

		if (doc_w >= 992) {
			var mw = $(".si-center").outerWidth();

			var center_style = {
				"margin-left":-(mw-10)+"px",
				"transition": "all .2s ease-in-out"
			}
			
			var concept_style = {
				// "padding-left":"15%",
				"transition": "all .2s ease-in-out",
				"background-position-x":"-40px",
    		"width": "100%",
    		"float": "none"
			}

			var svg_style = {
				"width":"120%",
				// "align-self": "flex-start"
			}

			$(".si-center").css( center_style );
			$(".si-concept").css( concept_style );
			//$("#concept").css( svg_style );

			$(".si-concept .row .col-lg-5").removeClass("d-none");
		}

	})


	$("#csi_tab").on("click", function(){

		var doc_w = $(document).outerWidth();
		if (doc_w >= 992) {
			var center_style = {
				"margin-left":"0",
				"width":"30%"
			}
			var concept_style = {
				"padding-left":"0px",
				"width":"70%",
				"background-position-x":"-180px",
				"float":"left"
				
			}
			var svg_style = {
				"width":"100%",
				// "align-self": "flex-start"
			}

			$(".si-center").css(center_style);
			$(".si-concept").css(concept_style);

			$(".si-concept .row .col-lg-5").addClass("d-none");
			//$("#concept").css( svg_style );
		}

	});



	$(document).on("click", "#csi_logo",function() {

		var doc_w = $(document).outerWidth();
		if (doc_w >= 992) {
			var mw = $(".si-center").outerWidth();
			var center_style = {
				"margin-left":"-20px",
				"width":"100%",
				"transition": "all .2s ease-in-out"
			}
			var concept_style = {
				"padding-left":"15%",
				"margin-left":(mw)+"px",
				"transition": "all .2s ease-in-out",
				"background-position-x":"-40px"
			}
			$(".si-center").css( center_style );
			$(".si-center").css( center_style );
		}
	})

	// mobile view
	var doc_w = $(document).outerWidth();
	if (doc_w <= 992) {
		$("#si_home h1").removeClass("pt-5").removeClass("ms-5")
		$(".si-concept .row .col-lg-5").removeClass("d-none");
		$("#tier_text h3, #tier_text p").removeClass("d-none")

		$("#si_home").removeClass("pt-4")
		$("#si_home div").removeClass("pt-5").removeClass("ms-5").removeClass("mt-2")

		$(".outline-text").css({"font-size":"2.5em"})
	}



});