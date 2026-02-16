const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    currency: {
      type: String,
      default: "GBP",
      trim: true,
      maxlength: 10,
    },
    purpose: {
      type: String,
      default: "SDG4_QUALITY_EDUCATION",
      immutable: true,
      trim: true,
      maxlength: 60,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },
    status: {
      type: String,
      enum: ["recorded", "paid", "failed"],
      default: "recorded",
    },
    paymentProvider: {
      type: String,
      trim: true,
      maxlength: 30,
      default: "",
    },
    paymentRef: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
