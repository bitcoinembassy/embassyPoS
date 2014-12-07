Schema = {};

Schema.UserProfile = new SimpleSchema({
    merchantName: {
        type: String,
        regEx: /^[a-zA-Z-]{2,25}$/,
        optional: true
    },
    merchantLogo: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    }, 
    commission: {
        type: Number,
        optional: true
    }, 
    displayUnits: {
        type: String,
        optional: true
    },
});

Schema.User = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    email: {
        type: [Object],
        optional: true
    },
    "email.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "email.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Note that when using this package, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

Meteor.users.attachSchema(Schema.User);
