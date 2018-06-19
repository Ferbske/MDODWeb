const express = require('express');
const router = express.Router();

// Endpoint for login page
router.get('/login', (req, res) => {
   res.render('../views/login.ejs')
});

// Endpoint for registration
router.get('/register', (req, res) => {
    res.render('../views/register.ejs');
});

// Endpoint for the dashboard after login
router.get('/dashboard', (req, res) => {
    res.render('../views/dashboard.ejs')
});

// Endpoint for all clients in table
router.get('/clients', (req, res) => {
    res.render('../views/addclients.ejs')
});

// Endpoint for a specific selected client
router.get('/client', (req, res) => {
    res.render('../views/client.ejs')
});

// Endpoint for viewing Psychologist's profile
router.get('/profile', (req, res) => {
    res.render('../views/profile.ejs')
});

// Endpoint for changing Psychologist's Information
router.get('/change', (req, res) => {
    res.render('../views/changeprofile.ejs')
});

// Endpoint for the addiction from a client
router.get('/addiction', (req, res) => {
    res.render('../views/addiction.ejs')
});

// Endpoint for the usage from a client
router.get('/usage', (req, res) => {
    res.render('../views/usage.ejs')
});

// Endpoint for the chart for usage
router.get('/usagechart', (req, res) => {
   res.render('../views/usagechart.ejs')
});

// Endpoint for the difficult moments from a client
router.get('/difficultmoment', (req, res) => {
    res.render('../views/difficultmoment.ejs')
});

// Endpoint for the moods for a specific client
router.get('/mood', (req, res) => {
    res.render('../views/mood.ejs')
});

// Endpoint for the chart for mood
router.get('/moodchart', (req, res) => {
    res.render('../views/moodchart.ejs')
});

// Endpoint for viewing all messages between psychologist and client
router.get('/messages', (req, res) => {
    res.render('../views/messages.ejs')
});

// Endpoint for the notes for a specific client
router.get('/notes', (req, res) => {
    res.render('../views/notes.ejs')
});

// Endpoint for creating a note for a specific client
router.get('/notescreate', (req, res) => {
    res.render('../views/notes-create.ejs')
});

// Endpoint for updating a note for a specific client
router.get('/notesupdate', (req, res) => {
    res.render('../views/notes-update.ejs')
});

// Endpoint that is needed for adding the header in pages
router.get('/views/header', (req, res) => {
    res.render('../views/header.ejs')
});

// Endpoint that is needed for adding the footer in pages
router.get('/views/footer', (req, res) => {
    res.render('../views/footer.ejs')
});

module.exports = router;