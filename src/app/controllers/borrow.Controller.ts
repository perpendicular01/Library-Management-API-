import express, { Request, Response } from "express";
import { Borrow } from "../models/borrowModel";
import { Book } from "../models/bookModel";
import { borrowZod } from "../validations/borrowValidation";
import is from "zod/v4/locales/is.cjs";

export const borrowRouter = express.Router();

// Create a new book
borrowRouter.post("/", async (req: Request, res: Response) => {
    const zodbody = await borrowZod.safeParseAsync(req.body);
    // console.log(zodbody.data);

    // if(zodbody.success) {
    //     console.log("doone")
    // }
    // console.log("rohan")
    if(!zodbody.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid request data",
            error: zodbody.error
        });
    }

    


    try {
        const body = zodbody.data;
        const {book: bID, quantity, dueDate } = body;

        const book = await Book.findById(bID);

        if(!book){
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        if(quantity > book.copies){
            return res.status(400).json({
                success: false,
                message: "Insufficient copies available",
            });
        }
            
        
        const borrow = await Borrow.create(body);

        res.status(201).json({
            success: true,
            message: "Borrow created successfully",
            data: borrow
        });

    }
    catch (e: any) {
        res.status(500).json({
            success: false,
            message: "Failed to create borrow",
            error: e.errors
        });
    }
})

borrowRouter.get("/", async (req: Request, res: Response) => {
    try {
        const borrwos = await Borrow.aggregate([
            {
                $group : {
                    _id : "$book",
                    total: { $sum: "$quantity" },
                }
            },
            {
                $lookup : {
                    from : "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails"
                }
            },
            { $unwind: "$bookDetails" },
            {
                $project: {
                    _id: 0,
                    book : {
                        title : "$bookDetails.title",
                        isbn : "$bookDetails.isbn",
                    },
                    totalQuantity: "$total",
                }
            }
        ])

        res.status(200).json({
            success: true,
            message: "Borrows retrieved successfully",
            data: borrwos
        });
    }

    catch (e: any) {
        res.status(500).json({
            success: false,
            message: "Failed to get borrows",
            error: e.errors
        });
    }
})
