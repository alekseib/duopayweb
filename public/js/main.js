$('.fullPrice .offer__plus').click( function() {
	calculateToUp('#fullPrice');
});

$('.preferentialPrice .offer__plus').click( function() {
	calculateToUp('#preferentialPrice');
});

$('.fullPrice .offer__minus').click( function() {
	calculateToDown('#fullPrice');
});

$('.preferentialPrice .offer__minus').click( function() {
	calculateToDown('#preferentialPrice');
});

var fullPriceCost = parseFloat($('#fullPrice').attr('data-price'));
var preferentialPrice = parseFloat($('#preferentialPrice').attr('data-price'));

function calculateToUp(input){
	var oldValue = parseFloat($(input).val());
	var newVal = oldValue + 1;
	$(input).val(newVal);
	$('.offer__total-item_all span').text(parseFloat($('#preferentialPrice').val()) + parseFloat($('#fullPrice').val()))
	$('.offer__total-item_sum span').text((parseFloat($('#preferentialPrice').val()) * preferentialPrice) + (parseFloat($('#fullPrice').val()) * fullPriceCost))

}

$('#preferentialPrice').on('input', function() {
	$('.offer__total-item_all span').text(parseFloat($('#preferentialPrice').val()) + parseFloat($('#fullPrice').val()))
	$('.offer__total-item_sum span').text((parseFloat($('#preferentialPrice').val()) * preferentialPrice) + (parseFloat($('#fullPrice').val()) * fullPriceCost))
})

$('#fullPrice').on('input', function() {
	$('.offer__total-item_all span').text(parseFloat($('#preferentialPrice').val()) + parseFloat($('#fullPrice').val()))
	$('.offer__total-item_sum span').text((parseFloat($('#preferentialPrice').val()) * preferentialPrice) + (parseFloat($('#fullPrice').val()) * fullPriceCost))
})

function calculateToDown(input){
	var oldValue = parseFloat($(input).val());
	var oldValueText = parseFloat($('.offer__total-item_all span').text());
	var oldValueSum = parseFloat($('.offer__total-item_sum span').text());
	var min = parseFloat($(input).attr('min'));

	if (oldValue <= min) {
		var newVal = oldValue;
	} else {
		var newVal = oldValue - 1;
	}

	if (parseFloat($(input).val() - 1) < 0) {
		var newValText = oldValueText;
		var newValSum = oldValueSum;
	} else {
		var newValText = oldValueText - 1;
		var newValSum = oldValueSum - parseFloat($(input).attr('data-price'));
	}

	$('.offer__total-item_all span').text(newValText)
	$('.offer__total-item_sum span').text(newValSum)
	$(input).val(newVal);
}


		
	$('.next-step-btn').on('click', function() {
		if($('input[name="agreement"]').is(':checked')) {
			$('.not-checked').removeClass('active');
		} else {
			$('.not-checked').addClass('active');
		}
	});

	$('input[name="agreement').on('change', function() {
		if($('input[name="agreement"]').is(':checked')) {
			$('.not-checked').removeClass('active');
		} else {
			$('.not-checked').addClass('active');
		}
	});










