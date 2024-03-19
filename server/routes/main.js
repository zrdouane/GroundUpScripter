/**
 * Express router for handling main routes.
 * @module mainRouter
 */

const express = require('express');
const router = express.Router();
const Post = require('../models/SchemaPost.js');

/**
 * Object containing local variables for the main route.
 * @typedef {Object} Locals
 * @property {string} title - The title of the page.
 * @property {string} description - The description of the page.
 */

/**
 * GET request handler for the main route.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
router.get('', async (req, res) => {
    try {
        const locals = {
            title: "GroundUpScripter",
            description: "GroundUpScripter is a vibrant and hands-on programming platform with node.js and express and mongodb"
        }

        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();
        const count = await Post.countDocuments({});
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', { 
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/'
        });

    } catch (error) {
        console.log(error);
    }

});

/**
 * GET request handler for the post route.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
router.get('/post/:id', async (req, res) => {
    try {
        let slug = req.params.id;

        const data = await Post.findById({ _id: slug });

        const locals = {
                /**
                 * The title of the data.
                 * @type {string}
                 */
                title: data.title,

                /**
                 * The description of the data.
                 * @type {string}
                 */
                description: "GroundUpScripter is a vibrant and hands-on programming platform with node.js and express and mongodb",
        };

        res.render('post', { 
            locals,
            data,
            currentRoute: `/post/${slug}`
        });
    } catch (error) {
        console.log(error);
    }

});

/**
 * Represents the result of a database query.
 * @typedef {Object[]} Data
 * @property {string} title - The title of the post.
 * @property {string} body - The body of the post.
 */

/**
 * POST request handler for the search route.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
router.post('/search', async (req, res) => {
    try {
        const locals = {
            title: "Seach",
            description: "GroundUpScripter is a vibrant and hands-on programming platform with node.js and express and mongodb"
        }

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

        const data = await Post.find({
                $or: [
                        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
                        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
                ]
        });

        res.render("search", {
            data,
            locals,
            currentRoute: '/'
        });

    } catch (error) {
        console.log(error);
    }

});

/**
 * GET request handler for the about route.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} The response is sent.
 */
router.get('/about', (req, res) => {
    res.render('about', {
        currentRoute: '/about'
    });
});

module.exports = router;