import { Schema, model } from 'mongoose';
import { IBorrow } from '../interfaces/borrow.interface';


// Schema
const borrowSchema = new Schema<IBorrow>({
    title: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1 
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true, 
    versionKey: false   
});

export const Borrow = model('Borrow', borrowSchema);