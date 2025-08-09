import { Model, Schema, model } from 'mongoose';
import { BookInstanceMethods, IBook } from '../interfaces/book.interface';

// Schema
const bookSchema = new Schema<IBook>({
    title : {
        type: String,
        required: true,
        trim: true
    },
    author : {
        type: String,
        required: true,
        trim: true
    },
    genre : {
        type: String,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
        required: true
    },
    isbn : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description : {
        type: String,
        default: ''
    },
    copies : {
        type: Number,
        required: true,
        min: 0
    },
    available : {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true, 
    versionKey: false 
});

bookSchema.method("makeAvailable", async function()  {
    this.available = this.copies > 0;
    await this.save();
})


export const Book = model<IBook, Model<IBook, {}, BookInstanceMethods>>('Book', bookSchema);
