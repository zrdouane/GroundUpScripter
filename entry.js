require("dotenv").config()

const express = require("express")
const expressLayouts = require('express-ejs-layouts')
const app = express()

/**
 * ENV PORT
 * Set it in .env
 */
const PORT = process.env.PORT

/**
 * set static files.
 */
app.use(express.static('public'))

/**
 * Templating Engine
 * use expressLayouts
 * set ejs
 */
app.use(expressLayouts)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

/**
 * routes
 */
app.use('/', require('./server/routes/main'))

/**
 * Listen app
 */
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});