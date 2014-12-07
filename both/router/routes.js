Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/', function() {
	this.render('billing');
});

Router.route('/transactions');

Router.route('/account');

Router.route('/settings');

Router.route('/users');

Router.route('/merchants');

Router.route('/viewUser');

Router.route('/viewMerchant');
