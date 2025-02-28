const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your event product name!"],
    },
    description: {
      type: String,
      required: [true, "Please enter your event product description!"],
    },
    category: {
      type: String,
      required: [true, "Please enter your event product category!"],
    },
    start_Date: {
      type: Date,
      required: true,
    },
    Finish_Date: { 
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "Running",
    },
    tags: {
      type: String,
    },
    originalPrice: {
      type: Number,
    },
    discountPrice: {
      type: Number,
      required: [true, "Please enter your event product price!"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter your event product stock!"],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
        },
        productId: {  // Optionally rename this to eventId if preferred
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    ratings: {
      type: Number,
      default: 0,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    sold_out: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
