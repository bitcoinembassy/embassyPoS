Template.merchants.helpers({
	merchantsList: function(){

		var merchants = Meteor.users.find({"profile.merchantName": {$exists: true}});

		return merchants;

	},
	merchantName: function(){

		var user = Meteor.users.findOne({_id: this._id});

		if (user != null && user.profile != null && user.profile.merchantName) return user.profile.merchantName;
	
		return "";

	},
	merchantStatus: function(){

		var user = Meteor.users.findOne({_id: this._id});

		if (user != null && user.profile != null && user.profile.status) return user.profile.status;
	
		return "";

	}	
});