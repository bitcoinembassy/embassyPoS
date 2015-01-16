
if (Meteor.isClient) {

	Meteor.autosubscribe(function (){
	  Meteor.subscribe("userdata")  
	})

	var recalculateAmount = function (template){

		var rate = getRate();
    	var cadAmount = template.find("#amount").value.toString();

    	var btcAmount = Math.round((cadAmount / rate) * 10000)  / 10000;;

    	template.find("#btcAmount").innerHTML = btcAmount;

    	return btcAmount;

	}

	var getRate = function() {

		var currentRate = Rates.findOne();

		console.log(currentRate);

		if (currentRate != null) return currentRate.data.bid;
	
		return "";

	}

	Template.billing.helpers({
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
			return getRate();
		}
	});

	Template.billing.rendered = function(){
    	recalculateAmount(this);
	};

	Template.billing.events({
		'keyup #amount': function(event, template){

			var btcAmount = recalculateAmount(template);

    	},
    	'click #billingOk ': function (event, template) {

    		Session.set("rate", getRate());
    		Session.set("amountCAD", template.find("#amount").value);

    		Router.go('payment');

    	},
    	'click #billingCancel ': function (event, template) {
			Router.go('/');
    	},
    	'click #test ': function (event, template) {
			
	    	Meteor.call("test", function(err, result){

	    	});

    	}

  	});

}
