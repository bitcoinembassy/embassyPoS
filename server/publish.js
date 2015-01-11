Meteor.publish("userData", function () {
	return Meteor.users.find({}, {fields: {'emails': 1, 'profile': 1}});
});