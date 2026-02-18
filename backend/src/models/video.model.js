import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const VideoSchema = new Schema(
  {
    videoFile: {
      type: String, // cludinary url
      required: [true, "Video File is required"],
    },
    thumbnal: {
      type: String,
      required: [true, "Thumbnal is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
    },
    views: {
      type: Number, // number of views
      default: 0,
    },
    isPublished: {
      type: Boolean, // true or false
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
    },
  },
  {
    timestamps: true,
  }
);

VideoSchema.plugin(mongooseAggregatePaginate);

const Video = mongoose.model("Video", VideoSchema);
export default Video;
