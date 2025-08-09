import { Schema, model } from 'mongoose';
import { IBorrow } from '../interfaces/borrow.interface';
import { Book } from './bookModel';



// Schema
const borrowSchema = new Schema<IBorrow>({
    book: {
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

borrowSchema.post('save', async function(doc, next) {
    try {
        const book = await Book.findById(doc.book);
        if (book) {
            book.copies -= doc.quantity;
            await book.makeAvailable();
        }
        next();
    } catch (err) {
        next();
    }
});

export const Borrow = model('Borrow', borrowSchema);