var express = require('express');
var router = express.Router();
const { expressjwt: jwt } = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    //userProperty: 'payload'
    userProperty: 'req.auth'
});
const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');
const ctrlAuth = require('../controllers/authentication');

//locations
router
    .route('/locations')
    .get(ctrlLocations.locationsListByDistance)
    .post(ctrlLocations.locationsCreate);
router
    .route('/locations/:locationid')
    .get(ctrlLocations.locationsReadOne)
    .post(ctrlLocations.locationsUpdateOne)
    .delete(ctrlLocations.locationsDeleteOne);

//reviews
router
    .route('/locations/:locationid/reviews')
    .post(auth, ctrlReviews.reviewCreate);
router
    .route('/locations/:locationid/reviews/:reviewid')
    .get(ctrlReviews.reviewsReadOne)
    .put(auth, ctrlReviews.reviewsUpdateOne)
    .delete(auth, ctrlReviews.reviewsDeleteOne);
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;