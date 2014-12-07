if (Meteor.isClient) {

	var generateQrCode = function (btcAmount, template){

    	var qrcode = "bitcoin:1EXLg1tsC5jWA1TAYZy3hWFhgrxQgiNHAK?amount=" + btcAmount;

    	$('#qr').empty();
    	$('#qr').qrcode({text: qrcode, width: 200,height: 200,});

	}

	var recalculateAmount = function (template){

		var rate = 423; //get rate from server
    	var cadAmount = template.find("#amount").value.toString();
    	var tipAmount = template.find("input:radio[name=tip]:checked").value.toString();
    	var btcAmount = Math.round((cadAmount * (1+(tipAmount/100)) / rate) * 10000)  / 10000;;

    	document.getElementById("btcAmount").innerHTML = btcAmount;

    	return btcAmount;

	}

	Template.billing.helpers({
		merchant: function(){
			return "Some dude";
		},
		merchantLogo: function(){
			return "Some dude's logo";
		},
		rate: function(){
			return "423";
		},
		address: function(){
			return "1EXLg1tsC5jWA1TAYZy3hWFhgrxQgiNHAK";
		},
		status: function(){
			return "Some status";
		},
		unit: function(){
			return "BTC";
		}
	});

  Template.billing.rendered = function(){
    $('#qr').qrcode({text: 'bitcoin:1EXLg1tsC5jWA1TAYZy3hWFhgrxQgiNHAK?amount=0.00000000',width: 200,height: 200,});
  };

  Template.billing.events({
    'keyup #amount': function(event, template){
    	var btcAmount = recalculateAmount(template);
    	generateQrCode(btcAmount, template);
    },
    'change ': function (event, template) {
    	var btcAmount = recalculateAmount(template);
    	generateQrCode(btcAmount, template);
    }

  });

}
