import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
     
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    title : {
        type : String,
        required : true
    },

    description : {
        type: String,
        required: true
    },

    priority : {
        type : String,
        enum: ["low", "medium", "high"],
        default: "medium",
    },

    status : {
        type : String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending",
    }

}, { timestamps: true }
);

export const Task = mongoose.model("Task",taskSchema);