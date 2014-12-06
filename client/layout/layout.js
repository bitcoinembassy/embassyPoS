if (Meteor.isClient){
	
  var login_functions = {
    loggedin: function (){
      console.log(Meteor.userId);
      return Meteor.userId();
    }
  }

  Template.layout.helpers(login_functions);

}