Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function(){
	this.route('billing', {path:'/'});
});

Router.map(function(){
	this.route('transactions', {path:'/transactions'});
});

Router.map(function(){
	this.route('account', {path:'/account'});
});

Router.map(function(){
	this.route('settings', {path:'/settings'});
});

Router.map(function(){
	this.route('users', {path:'/users'});
});

Router.map(function(){
	this.route('merchants', {path:'/merchants'});
});

Router.map(function(){
	this.route('viewUser', {path:'/viewUser'});
});

Router.map(function(){
	this.route('viewMerchant', {path:'/viewMerchant'});
});
