Meteor.subscribe("userData");

Template.users.helpers({
	currentMerchant: function(){

		var user = Meteor.users.findOne({_id: getMerchantID()});

		if (user != null && user.profile != null && user.profile.merchantName) return user.profile.merchantName;
	
		return "";

	},
	usersList: function(){

		var users = Meteor.users.find({"profile.merchantID": Meteor.userId()}).fetch();

		return users;

	},
	userAddress: function(){

		var user = Meteor.users.findOne({_id: this._id});

		if (user != null && user.emails != null) return user.emails[0].address;
	
		return "";

	},
	userStatus: function(){

		var user = Meteor.users.findOne({_id: this._id});

		if (user != null && user.profile != null && user.profile.status) return user.profile.status;
	
		return "";

	}	
});

var getMerchantID = function(){

	var merchantID = Session.get("merchantID");

	console.log(merchantID);

	if (!merchantID)
		merchantID = Meteor.userId();

	console.log(merchantID);

	return merchantID;

}

Template.users.rendered = function(){
	return getMerchantID();
};