const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer  = require('multer');
const{ storage } = require("../cloudConfig.js");
const upload = multer({ storage });


// Route to get all listings with optional category filter
router.get("/listings", async (req, res) => {
  try {
    const { category } = req.query; // Get category from query parameters
    const filter = category ? { category } : {}; // Apply filter only if category exists
    const allListings = await Listing.find(filter);
    res.render("listings/index", { allListings });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


//index route
//create route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );


//New Route
router.get("/new", isLoggedIn, listingController.randerNewForm);



//Show Route
// Update Route
// delete route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.randerEditForm)
);

module.exports = router;
