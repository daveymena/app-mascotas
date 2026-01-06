import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const createDeworming = async (req: Request, res: Response) => {
    const { petId, productName, date, nextDueDate, veterinarian } = req.body;
    try {
        const deworming = await prisma.deworming.create({
            data: {
                petId,
                productName,
                date: new Date(date),
                nextDueDate: nextDueDate ? new Date(nextDueDate) : null,
                veterinarian
            }
        });
        res.json(deworming);
    } catch (error) {
        res.status(500).json({ error: 'Error creating deworming record' });
    }
};
