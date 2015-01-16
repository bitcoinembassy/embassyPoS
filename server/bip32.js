//Prototype function to derive Bitcoin addresses from a xpubkey
if (Meteor.isServer){

	var deriveAddress = function(path, pubkey){

		var seed = pubkey;

		var bitcoin = Meteor.npmRequire("bitcoinjs-lib");
		var hdWalletGenerator = Meteor.npmRequire("hdkey");

		var baseWallet = hdWalletGenerator.fromExtendedKey(seed);
			
		var hdWallet = baseWallet.derive(path);
		var pubkey = hdWallet.publicKey.toString('hex');
		var ecpub = bitcoin.ECPubKey.fromHex(pubkey);

		console.log("Derived address is:", ecpub.getAddress().toString());

		return ecpub.getAddress().toString();

	}

	Meteor.methods({
	    test: function(order){
	      
	    	//ExtendedPubKey derived from "Correct horse battery staple"
			var seed = "xpub661MyMwAqRbcEnKbXcCqD2GT1di5zQxVqoHPAgHNe8dv5JP8gWmDproS6kFHJnLZd23tWevhdn4urGJ6b264DfTGKr8zjmYDjyDTi9U7iyT";

			var bitcoin = Meteor.npmRequire("bitcoinjs-lib");
			var hdWalletGenerator = Meteor.npmRequire("hdkey");

			var baseWallet = hdWalletGenerator.fromExtendedKey(seed);
			
			var path = "m";
			var hdWallet = baseWallet.derive(path);
			var pubkey = hdWallet.publicKey.toString('hex');
			var ecpub = bitcoin.ECPubKey.fromHex(pubkey);

			console.log("Derivation path:", path);
			console.log("Public key:", pubkey);
			console.log("Bitcoin address:", ecpub.getAddress().toString());

			for (var i = 0; i<10; i++){

				var path = "m/" + i;
				var hdWallet = baseWallet.derive(path);
				var pubkey = hdWallet.publicKey.toString('hex');
				var ecpub = bitcoin.ECPubKey.fromHex(pubkey);

				console.log("Derivation path:", path);
				console.log("Public key:", pubkey);
				console.log("Bitcoin address:", ecpub.getAddress().toString());

			}

	    },
		deriveNextPublicAddress: function(userID){

			var user = Meteor.users.findOne({"_id" : userID});
		    var settings = Settings.findOne({});

			if (user && settings){

		        var settings = Settings.findOne({});

				var currentTXIndex = user.profile.currentTXIndex;

				var path = "m/"

				if (user.profile.role=="admin"){

					path += 0 + "/" + currentTXIndex;

				}
				else if (user.profile.role=="merchant"){

					var currentTXIndex = user.profile.currentTXIndex;

					path += user.profile.assignedDerivationIndex + "/" + currentTXIndex;

				}
				else if (user.profile.role=="user"){

					var merchant = Meteor.user.findOne({"_id" : user.profile.merchantID})
					var currentTXIndex = user.profile.currentTXIndex;

					path += merchant.profile.assignedDerivationIndex + "/" + user.profile.assignedDerivationIndex + "/" + currentTXIndex;

				}

				Meteor.users.update(userID, {$set : {"profile.currentTXIndex" : currentTXIndex + 1}});

				console.log("Derivation path:", path);
				console.log("Deriving address...");

				var address = deriveAddress(path, settings.xpubkey);

				return address;

			}

	    }
	});

}