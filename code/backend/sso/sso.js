/**
 * Module for JHU SSO authentication.
 *
 * @type {Authenticator|{}}
 */

// setup express app and router
const express = require("express");
const router = express.Router();

// import required packages for SSO
const passport = require("passport");
const saml = require("passport-saml");
const fs = require("fs");

// get public and private keys
const PbK = fs.readFileSync(__dirname + "/../certs/cert.pem", "utf8");
const PvK = fs.readFileSync(__dirname + "/../certs/key.pem", "utf8");
const idpCert = fs.readFileSync(__dirname + "/../certs/idp-cert.pem", "utf8");

// SAML configuration options
const JHU_SSO_URL =
    "https://idp.jh.edu/idp/profile/SAML2/Redirect/SSO";
const BASE_URL =
    "https://jaypay-lego-api.herokuapp.com";
const SP_NAME = "jaypay-lego-api";

// Setup SAML strategy
const samlStrategy = new saml.Strategy(
    {
        // config options here
        entryPoint: JHU_SSO_URL,
        issuer: SP_NAME,
        callbackUrl: `${BASE_URL}/jhu/login/callback`,
        decryptionPvk: PvK,
        privateCert: PvK,
        cert: idpCert
    },
    (profile, done) => {
        return done(null, profile);
    }
);

// Tell passport to use the samlStrategy
passport.use("samlStrategy", samlStrategy);

// Serialize and deserialize user for passport
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// import Admin DAO
const AdminDao = require("../models/AdminDao.js");
const admins = new AdminDao();

// import Employer DAO
const EmployerDao = require("../models/EmployerDao.js");
const employers = new EmployerDao();

// import Employee DAO
const EmployeeDao = require("../models/EmployeeDao.js");
const employees = new EmployeeDao();

/**
 * JHU SSO login route. Redirects to JHU SSO.
 */
router.get("/jhu/login",
    (req, res, next) => {
        next();
    },
    passport.authenticate("samlStrategy")
);

/**
 * JHU SSO callback function.
 */
router.post(
    "/jhu/login/callback",
    (req, res, next) => {
        next();
    },
    passport.authenticate("samlStrategy"),
    async (req, res) => {
        const jhed = req.user.username;
        const first_name = req.user.first_name;
        const last_name = req.user.last_name;
        const affiliation = req.user.user_field_affiliation;

        if (await admins.exists(jhed)) {
            await admins.updateByJhed(jhed, first_name, last_name, null);
            res.redirect(`https://jaypay-lego.herokuapp.com/admin?jhed=${jhed}&firstName=${first_name}&lastName=${last_name}`);
        } else if (affiliation.toLowerCase() == "student") {
            await employees.upsert(jhed, first_name, last_name, null);
            res.redirect(`https://jaypay-lego.herokuapp.com/employee?jhed=${jhed}&firstName=${first_name}&lastName=${last_name}`);
        } else {
            const job_title = req.user.user_field_job_title;
            await employers.upsert(jhed, first_name, last_name, job_title, null);
            res.redirect(`https://jaypay-lego.herokuapp.com/employer?jhed=${jhed}&firstName=${first_name}&lastName=${last_name}`);
        }
    }
);

/**
 * JHU SSO SAML metadata XML file generation route.
 */
router.get("/jhu/metadata", (req, res) => {
    res.type("application/xml");
    res.status(200);
    res.send(samlStrategy.generateServiceProviderMetadata(PbK, PbK));
});

module.exports = router;
