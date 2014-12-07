if (Meteor.isServer){

	Meteor.startup(function () {
		
		var WebSocket = Meteor.npmRequire("ws");
  		var Fiber = Meteor.npmRequire('fibers');

		var ws = new WebSocket('ws://ws.blockchain.info/inv');

		ws.on('message', function(data, flags) {

			var o = JSON.parse(data);

			console.log("Transaction received: ", o.x.hash);

			for (var i = 0;i< o.x.out.length; i++){

				var index = i;

				console.log(o.x.out[index].value + " satoshis", "received at address: " +  o.x.out[index].addr);
				
      			Fiber(function(){

      				var addressDoc = Addresses.findOne({address: o.x.out[index].addr});

					if (addressDoc != null){
						Addresses.update({address: o.x.out[index].addr}, {$set: {amount: o.x.out[index].value, hash: o.x.hash}});
					}

				}).run();

			}

		});

		Addresses.find().observe({
			added: function (document) {
				ws.send(JSON.stringify({"op":"addr_sub", "addr": document.address}));
				console.log("Now monitoring address:", document.address);
			},
			removed: function (oldDocument) {

			}
		});

	});

}