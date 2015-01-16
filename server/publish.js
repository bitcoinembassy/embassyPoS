Meteor.publish("userData", function () {
	return Meteor.users.find({}, {fields: {'emails': 1, 'profile': 1}});
});

Meteor.publish("xpubkey", function () {
	return Settings.find({}, {fields: {'xpubkey': 1}});
});