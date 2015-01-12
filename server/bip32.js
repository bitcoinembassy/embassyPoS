//Prototype function to derive Bitcoin addresses from a xpubkey
if (Meteor.isServer){
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

	    }
	});

}