if (Meteor.isClient) {

	var self = this;

	var generateQrCode = function (btcAmount){

    	var qrcode = "bitcoin:1NUzDGxfweYooDgqVhTryaaccto4e2bKRp?amount=" + btcAmount;

    	$('#qr').empty();
    	$('#qr').qrcode({text: qrcode, width: 300,height: 300,});

	}

	var recalculateAmount = function (){

		var rate = Session.get("rate");
    	var cadAmount = Session.get("amountCAD");
    	var tipAmount = self.template.find("input:radio[name=tip]:checked").value.toString();
    	
    	var btcAmount = Math.round((cadAmount * (1+(tipAmount/100)) / rate) * 10000)  / 10000;
    	
    	self.template.find("#btcAmount").innerHTML = btcAmount;

    	return btcAmount;

	}

	var invoiceTick = function (){

		if (self.tick>=self.expiryCounter){

			console.log("Invoice expired");

	    	self.template.find("#invoiceStatus").innerHTML = "Invoice has expired. <a href='/billing'> Please click here to create a new one </a>";
	
			Session.set("status", "Expired");
			
		}
		else {

			var minutes = Math.floor((self.expiryCounter - self.tick) / 60000);
			var seconds = ((self.expiryCounter - (minutes * 60000)) - self.tick) / 1000;

			var expiry = "Invoice will expire in ";

			if (minutes!=0){
				expiry += minutes + " minutes, " + seconds + " seconds.";
			}
			else {
				expiry += seconds + " seconds.";
			}

			Session.set("status", expiry);

			self.tick+=1000;

			setTimeout(invoiceTick, 1000);

		}

	}

	Template.payment.helpers({	
		merchantName: function(){

			var user = Meteor.users.findOne({_id: Meteor.userId()});

			if (user != null && user.profile != null && user.profile.merchantName) return user.profile.merchantName;
	
			return "";

		},
		merchantLogo: function(){

			var user = Meteor.users.findOne({_id: Meteor.userId()});

			if (user != null && user.profile != null && user.profile.merchantLogo) return user.profile.merchantLogo;
	
			return "";

		},
		rate: function(){
			return Session.get("rate");
		},
		amountCAD: function(){
			return Session.get("amountCAD");
		},
		address: function(){
			return "1NUzDGxfweYooDgqVhTryaaccto4e2bKRp";
		},
		status: function(){
			return Session.get("status");
		},
		unit: function(){
			return "BTC";
		}

	}) 

	Template.payment.rendered = function(){

		if (!Session.get("rate") || !Session.get("amountCAD"))
	    	Router.go('billing');

		self.tick = 0;
		self.expiryCounter = 120000;

		Session.set("status", "");

    	self.template = this;

    	var btcAmount = recalculateAmount();
    	generateQrCode(btcAmount);

    	setTimeout(invoiceTick, 1000);
	};

	Template.payment.events({
	    'keyup #amount': function(event, template){
	    	var btcAmount = recalculateAmount();
	    	generateQrCode(btcAmount);
	    },
	    'change ': function (event, template) {
	    	var btcAmount = recalculateAmount();
	    	generateQrCode(btcAmount);
	    },
	    'click #billingOk ': function (event, template) {

	    	Session.set("rate", getRate());
	    	Session.set("amountCAD", self.template.find("#amount").value);

	    	Router.go('payment');

	    },
	    'click #billingCancel ': function (event, template) {
			Router.go('/');
		}
    });

}
