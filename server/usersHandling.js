if (Meteor.isServer){
	Accounts.onCreateUser(function(options, user) {

		console.log("New user added :");
		console.log(options.profile);

		if (options.profile){

			user.profile = options.profile;
			
			if (user.profile.role != "admin" && !user.profile.assignedDerivationIndex)
        		user.profile.assignedDerivationIndex = 0; //TODO: Change to reflect the currentDerivationIndex of parent
        	
        	if (user.profile.currentIndex==0)
        		user.profile.currentTXIndex = 0;	

		}		

		return user;

	});
}