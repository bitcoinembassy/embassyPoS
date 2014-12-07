if (Meteor.isServer){

	Meteor.startup(function () {
		MonitorRates();
	});

	var MonitorRates = function(){

		HTTP.get("https://api.bitcoinaverage.com/ticker/global/all", function(err, res){
			
			console.log(res.data.CAD);

			Rates.upsert({
				currency: "CAD"
			},
			{
				$set: {
					currency: "CAD",
					data: res.data.CAD,
					time: Date.now()
				}
			});
		
		});

		Meteor.setTimeout(MonitorRates, 6000);

	}

	Meteor.publish("userdata", function(){
	  return Rates.find({})
	})

}