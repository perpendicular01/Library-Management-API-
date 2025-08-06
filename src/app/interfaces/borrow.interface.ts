import mongoose from "mongoose";

export interface IBorrow {
    title: mongoose.Types.ObjectId;
    quantity : number;
    dueDate : Date;
}