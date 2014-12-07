if (Meteor.isClient) {

	Template.settings.events({
    	'click #saveChanges': function(event, template){

	    	var merchantName = document.getElementById('merchantName').value;
			var merchantLogo = document.getElementById('merchantLogo').value;
	    	var commission = document.getElementById('commission').value;
	    	var units = document.getElementById('units').value;

	    	//console.log(Meteor.userId());

			Meteor.users.update({_id: Meteor.userId()}, {$set: {'UserProfile.merchantName': merchantName, 'UserProfile.merchantLogo': merchantLogo, 'UserProfile.commission': commission, 'UserProfile.units': units}}, { validationContext: "updateForm" }, function(error, result) {

			});

    	}

	});


}
