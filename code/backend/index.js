// setup express app
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

// required middleware
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// import JHU sso module and middleware
const sso = require("./sso/sso.js");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");

// import routes
const routes = require("./routes/routes.js");
const adminRoutes = require("./routes/admins.js");
const departmentRoutes = require("./routes/departments.js");
const jobRoutes = require("./routes/jobs.js");
const employeeRoutes = require("./routes/employees.js");
const employerRoutes = require("./routes/employers.js");
const timesheetRoutes = require("./routes/timesheets.js");
const periodRoutes = require("./routes/periods.js");

// load database, static assets, middleware, routes
app.use(express.static("assets"));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
// for sso
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({ secret: "use-any-secret", resave: false, saveUninitialized: true })
);
app.use(passport.initialize({}));
app.use(passport.session({}));
app.use(sso);
// routes
app.use(routes);
app.use(adminRoutes);
app.use(departmentRoutes);
app.use(jobRoutes);
app.use(employeeRoutes);
app.use(employerRoutes);
app.use(timesheetRoutes);
app.use(periodRoutes);

// start the server
app.listen(port, () => {
    console.log(`Express app listening at port: ${port}`);
});