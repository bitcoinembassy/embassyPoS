if (Meteor.isServer){

	Meteor.startup(function () {

		var self = this;
		
  		var Fiber = Meteor.npmRequire('fibers');

		var connect = function(){

			var WebSocket = Meteor.npmRequire("ws");
			self.ws = new WebSocket('wss://ws.blockchain.info/inv');

			ws.on('open', function(){
				
				//TODO : add rest support to verify balances upon connection / reconnection
				console.log("Blockchain.info socket open.");
				
				self.open = true;

	      		Fiber(function(){

					var addresses = Addresses.find().fetch();

					for (var i = 0; i < addresses.length; i++){

						console.log("Now monitoring address:", addresses[i].address);
						ws.send(JSON.stringify({"op":"addr_sub", "addr": addresses[i].address}));

					}

				}).run();

			});
			
			ws.on('close', function(){

				self.open = false;
				
				console.log("Blockchain.info socket was closed.");
				console.log("Trying to reconnect...")

        		setTimeout(connect, 2000);

			});

			ws.on('error', function(err){

				console.log("Error WS Blockchain.info:", err)
				
			});

			ws.on('message', function(data, flags) {

				var o = JSON.parse(data);

				console.log("Transaction received: ", o.x.hash);

				for (var i = 0;i< o.x.out.length; i++){

					var index = i;

					console.log(o.x.out[index].value + " satoshis", "received at address: " +  o.x.out[index].addr);
					
	      			Fiber(function(){

	      				var addressDoc = Addresses.findOne({address: o.x.out[index].addr});

						if (addressDoc != null){
							Addresses.update({address: o.x.out[index].addr}, {$set: {amountReceived: o.x.out[index].value, hash: o.x.hash}});
						}

					}).run();

				}

			});


		}

		Addresses.find().observe({
			added: function (document) {
				if (self.open && self.ws){
					self.ws.send(JSON.stringify({"op":"addr_sub", "addr": document.address}));
					console.log("Now monitoring address:", document.address);
				}
			},
			removed: function (oldDocument) {

			}
		});

		connect();

	});

}