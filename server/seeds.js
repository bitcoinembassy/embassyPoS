if (Meteor.isServer){

   Meteor.startup(function () {

      //Leave this one in production
      var adminOptions = {
         "username": "admin",
         "password": "temp1234",
         "email" : "pos@bitcoinembassy.ca",
         "profile" : {
            "role" : "admin",
         }
      }

      //TODO: Remove these two in production
      var merchantOptions = {
         "username": "merchant",
         "password": "temp1234",
         "email" : "gbabint@msn.com",
         "profile" : {
            "role" : "merchant"
         }
      }

      var userOptions = {
         "username": "user",
         "password": "temp1234",
         "email" : "guillaume@bitcoinembassy.ca",
         "profile" : {
            "role" : "user"
         }
      }

      var settings = Settings.findOne();

      var admin = Meteor.users.findOne({username: "admin"});
      var merchant = Meteor.users.findOne({username: "merchant"});
      var user = Meteor.users.findOne({username: "user"});

      if (!settings){

         Settings.insert({
            //Derived from Correct horse battery staple : TODO: DO NOT USE TO RECEIVE FUNDS!!!!
            "xpubkey" : "xpub661MyMwAqRbcEnKbXcCqD2GT1di5zQxVqoHPAgHNe8dv5JP8gWmDproS6kFHJnLZd23tWevhdn4urGJ6b264DfTGKr8zjmYDjyDTi9U7iyT",
            //currentDerivationIndex is incremented every time a merchant is created and the current index is assigned to the merchant
            "currentDerivationIndex" : 1 //TODO: change to zero for production
         });

      }

      if (!admin){

         console.log("Adding default admin user...");
         
         adminOptions.profile.status = "active";
         adminOptions.profile.commission = "1",
         adminOptions.profile.merchantLogo = "http://bitcoinembassy.ca/img/logo.png",
         adminOptions.profile.merchantName = "Bitcoin Embassy",
         adminOptions.profile.units = "bits"
         adminOptions.profile.currentTXIndex = 0;

         Accounts.createUser(adminOptions);

         admin = Meteor.users.findOne({username: "admin"});

         console.log("Userid:", admin._id);

      }

      if (!merchant){

         console.log("Adding default merchant user...");

         merchantOptions.profile.status = "active";
         merchantOptions.profile.commission = "1",
         merchantOptions.profile.merchantLogo = "http://i.imgur.com/ToaUwCh.jpg",
         merchantOptions.profile.merchantName = "MAD DOG!",
         merchantOptions.profile.units = "bits"
         merchantOptions.profile.assignedDerivationIndex = 1;
         merchantOptions.profile.currentDerivationIndex = 1; //One user currently under this merchant, will be incremented for each new user
         merchantOptions.profile.currentTXIndex = 0;

         Accounts.createUser(merchantOptions);

         merchant = Meteor.users.findOne({username: "merchant"});

         console.log("Userid:", merchant._id);

      }

      if (!user){

         console.log("Adding default user...");
         
         if (merchant)
            userOptions.profile.merchantID = merchant._id;
         
         userOptions.profile.status = "active";
         userOptions.profile.assignedDerivationIndex = 1;
         userOptions.profile.currentTXIndex = 0;

         Accounts.createUser(userOptions);

         user = Meteor.users.findOne({username: "user"});

         console.log("Userid:", user._id);

      }

   });

}