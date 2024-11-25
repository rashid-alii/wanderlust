const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const { ref, required } = require("joi");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  review: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
  },
  category: {
    type: String,
    enum: ["Trending",  "RoomS", "Iconic Cities",
    "Mountain", "Castles", "Amazing Pools", "Camping",
    "Farms", "Arctic", "Domes", "Boats", "New"],
    required: true
  }
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.review } });
  }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
