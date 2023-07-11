const { Schema, model } = require("mongoose");
const nanoId = require("nanoid");

const LinkSchema = new Schema(
  {
    originalLink: {
      type: String,
      required: [true, "Please enter the original url"],
    },
    shortLink: {
      type: String,
      // required: [true, 'short link is required'],
      unique: true,
    },
    fullLink: {
      type: String,
    },
  },
  { timestamps: true }
);

LinkSchema.pre("save", function () {
  this.shortLink = nanoId.nanoid(10);
  this.fullLink = `localhost:9000/${this.shortLink}`;
});

module.exports = model("Link", LinkSchema);
