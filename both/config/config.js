Router.configure({
  layoutTemplate: 'layout',
});

SinglePageLogin.config({
  loginTitle: 'Sign In',
  signupTitle: 'Sign Up',
  forgotPasswordTitle: 'Retrieve password',
  canRetrievePassword: true,
  passwordSignupFields: 'EMAIL_ONLY',
  forbidClientAccountCreation: false,
  routeAfterLogin: '/billing',
  routeAfterSignUp: '/billing',
  forceLogin: true,
  exceptRoutes: ['home', 'signup', 'forgot-password']
});
