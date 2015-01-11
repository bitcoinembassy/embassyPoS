Meteor.subscribe("userData");

Template.users.helpers({
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