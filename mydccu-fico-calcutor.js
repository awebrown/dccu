var apr740 = {visa: {purchase: '8.24', cash: '12.24'}, mc: {purchase: '8.90', cash: '12.90'}},
    apr700 = {visa: {purchase: '9.24', cash: '13.24'}, mc: {purchase: '9.90', cash: '13.90'}},
    apr660 = {visa: {purchase: '10.24', cash: '14.24'}, mc: {purchase: '10.90', cash: '14.90'}},
    apr620 = {visa: {purchase: '11.24', cash: '15.24'}, mc: {purchase: '11.90', cash: '15.90'}},
    apr570 = {visa: {purchase: '13.24', cash: '17.24'}, mc: {purchase: '13.90', cash: '17.90'}},
    aprLowCredit = {visa: {purchase: 'Please Contact Us', cash: ''}, mc: {purchase: 'Please Contact Us', cash: ''}},
    industryAvg = 15.30;
var $credit,
    $cardType,
    aprTier,
    purchaseApr,
    cashApr,
    aprDiff;

$('#creditScore').change(function(event) {
  if ($('input[name=creditScore]:checked').val()) {
		assignAprs();
	} else {
			$('.fico-calculator-aprs-row').hide();
      $('.fico-calculator-savings-slider').hide();
		}
});
$('#cardType').change(function(event){
    assignAprs();
  $cardType = $('input[name=cardType]:checked').val();
  $('.calculator-card-info-widget').hide();
  $('.calculator-card-info-widget[data-card-type=' + $cardType + ']').show();
});

$('#knowScore').change(function(event){
	if ($('input[name=knowScore]:checked').val() === 'yes') {
		$('.scoreQuiz').hide()
	}
	else if ($('input[name=knowScore]:checked').val() === 'no') {
		$('.scoreQuiz').show()
	}
});

$(document).ready(function () {
	if ($('input[name=creditScore]').val()) {
    console.log($('input[name=creditScore]:checked').val())
		assignAprs();
	}
});
function assignSavings() {
	var balanceAmt = $('#balanceSlider').val()
  $('#balanceSliderValue').text('$' + balanceAmt);
	var aprSavings = Math.round(aprDiff * balanceAmt) / 100;
	$('#fico-savings-amt').text('$' + aprSavings);
	$('.fico-calculator-savings-slider').show();
}
$('#balanceSlider').on('input change', function(event){
	assignSavings();
});
function assignAprs() {
  console.log($('input[name=creditScore]:checked').val());
    $credit = $('input[name=creditScore]:checked').val();
    if ($credit > 100) {
        $cardType = $('input[name=cardType]:checked').val();
        if ($credit >= 740) {
            aprTier = apr740;
        } else if ($credit >= 700) {
            aprTier = apr700;
        } else if ($credit >= 660) {
            aprTier = apr660;
        } else if ($credit >= 620) {
            aprTier = apr620;
        } else if ($credit >= 570) {
            aprTier = apr570;
        } else {
            aprTier = aprLowCredit;
			$('.fico-calculator-congrats').empty().append('<span>Please <a href="/contact#Contact">Contact Us</a> to get an APR estimate.</span>');
        }

		if ($credit >= 570) {
			$cardType = assignCardType($cardType);
      console.log($cardType);
			purchaseApr = aprTier[$cardType].purchase;
			cashApr = aprTier[$cardType].cash;
			$('#purchaseAprPerc').text(purchaseApr + '%');
			$('#cashAprPerc').text(cashApr + '%');
      $('.fico-calculator-aprs-row').show();

			if (purchaseApr < industryAvg){
				aprDiff = Math.round((industryAvg - purchaseApr) * 100) / 100;
				$('.fico-calculator-congrats').empty().append('<span>Congratulations! Your approximate Purchase APR is <strong>' + aprDiff + '% lower</strong> than the industry average.</span>');
				assignSavings();
			}
			else {
				$('.fico-calculator-congrats').empty();
				$('.fico-calculator-savings-slider').hide();
			}
		}else {
			$('.fico-calculator-aprs-row').hide();
			$('.fico-calculator-savings-slider').hide();
		}

		if ($('#cardType').val() === 'rewardscard'){
			$('.fico-calculator-card-message').empty().append('<span><a href="/lending/credit-cards#personal">Learn more</a> about the benefits of the DCCU MasterCard Personal Credit Card.</span>');
		} else if ($('#cardType').val() === 'mastercard') {
			$('.fico-calculator-card-message').empty().append('<span><a href="/lending/credit-cards#mastercard">Learn more</a> about the benefits of the DCCU Mastercard Cashback card.</span>');
		} else if ($('#cardType').val() === 'businesscard') {
			$('.fico-calculator-card-message').empty().append('<span><a href="/lending/credit-cards#business">Learn more</a> about the benefits of the DCCU MasterCard Business card.</span>');
		}
    } else {
        $('#purchaseAprPerc').text(' ');
        $('#cashAprPerc').text(' ');
        $('.fico-calculator-congrats').empty();
        $('.fico-calculator-card-message').empty();
    }
}
function assignCardType(cardType) {
    if (cardType === 'rewardscard' || cardType === 'businesscard') {
        return 'visa';
    } else if (cardType === 'mastercard') {
        return 'mc';
    } else {
        return null;
    }
}
