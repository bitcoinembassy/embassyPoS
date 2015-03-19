/* var Schemas = {};

Schemas.UserProfile = new SimpleSchema({
    merchantName: {
        type: String,
        optional: true
    },
    merchantLogo: {
        type: String,
        optional: true
    },
    commission: {
        type: Number,
        optional: true
    },
    units: {
        type: String,
        optional: true
    }
});

Schemas.User = new SimpleSchema({
    emails: {
        type: [Object],
        // this must be optional if you also use other login services like facebook,
        // but if you use only accounts-password, then it can be required
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schemas.UserProfile,
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

UI.registerHelper("Schemas", Schemas);

Meteor.users.attachSchema(Schemas.User);

*/