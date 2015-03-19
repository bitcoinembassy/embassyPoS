Status = new Meteor.Collection(null);

Meteor.subscribe("xpubkey");

Template.settings.helpers({
	unitTypes: function (){

		var unitTypes = [
			{value:"bits", caption:"Bits"}, 
			{value:"btc", caption: "BTC"}
		];

	    return unitTypes;

    },
	isAdmin: function (){

		var isAdmin;

    	var user = Meteor.users.findOne({_id: Meteor.userId()});

    	if (user != null && user.profile != null && user.profile.role){
			if (user.profile.role == "admin")
				return true;
			else
				return false;
    	}

	    return isAdmin;

    },
	xpubkey: function (){

    	var settings = Settings.findOne();

    	console.log(settings);

    	if (settings != null && settings.xpubkey){
			return settings.xpubkey;
    	}

	    return "";

    },
    isSelected: function (){

    	var user = Meteor.users.findOne({_id: Meteor.userId()});

    	if (user != null && user.profile != null && user.profile.units){
			if (user.profile.units == this.value)
				return "selected";
			else
				return "";
    	}

    }
});

Template.settings.events({
	'click #saveChanges': function(event, template){
		var merchantName = document.getElementById('merchantName').value;
		var merchantLogo = document.getElementById('merchantLogo').value;
		var commission = document.getElementById('commission').value;
		var units = document.getElementById('units').value;

		//console.log(Meteor.userId());

		Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.merchantName': merchantName, 'profile.merchantLogo': merchantLogo, 'profile.commission': commission, 'profile.units': units}}, { validationContext: "updateForm" }, function(error, result) {
			Router.go('billing');
		});

    }

});
