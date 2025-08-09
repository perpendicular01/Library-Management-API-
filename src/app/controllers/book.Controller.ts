import express, { Request, Response } from "express";
import { Book } from "../models/bookModel";
import { bookZod } from "../validations/bookValidation";

export const booksRouter = express.Router();

// Create a new book
booksRouter.post("/", async (req: Request, res: Response) => {
    const zodbody = await bookZod.safeParseAsync(req.body);
    // console.log(zodbody);
    // console.log("rohan")
    if(!zodbody.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid request data",
            error: zodbody.error
        });
    }


    try {
        const body = req.body;
        const book = await Book.create(body);


        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    }
    catch (e: any) {
        res.status(500).json({
            success: false,
            message: "Failed to create book",
            error: e.errors
        });
    }
})

// Get all books
booksRouter.get('/', async (req: Request, res: Response) => {
    try {
        const { filter, sortBy = 'createdAt', sort = 'asc', limit = 10 } = req.query;

        const filterQuery: any = {};
        if (filter) {
            filterQuery.genre = filter;
        }


        const books = await Book.find(filterQuery)
            .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
            .limit(parseInt(limit as string) || 10);


        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    }

    catch (e: any) {
        res.status(500).json({
            success: false,
            message: "Failed to get books",
            error: e.errors
        });
    }
})


// Get a single book by ID
booksRouter.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;

        const book = await Book.findOne({ _id: bookId });

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                data: null
            });
        }


        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        });
    }
    catch (e: any) {
        res.status(500).json({
            success: false,
            message: "failed to get book",
            error: e.errors
        });
    }

})


// Update a book by ID
booksRouter.put('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const updatedData = req.body;

        const book = await Book.findByIdAndUpdate(bookId, updatedData, { new: true });
        // const book = await Book.updateOne({_id: bookId}, updatedData);   // updateone new support kore na 

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book
        });
    }

    catch (e: any) {
        res.status(500).json({
            success: false,
            message: "failed to get book",
            error: e.errors
        });
    }
})


// Delete a book by ID
booksRouter.delete('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const book = await Book.findByIdAndDelete(bookId);
        // const book1 = await Book.findOneAndDelete({ _id: bookId });

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    }

    catch (e: any) {
        res.status(500).json({
            success: false,
            message: "failed to get book",
            error: e.errors
        });
    }
})