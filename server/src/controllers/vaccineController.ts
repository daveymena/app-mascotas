import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const createVaccine = async (req: Request, res: Response) => {
    const { petId, name, date, nextDueDate, veterinarian, batchNumber, notes } = req.body;
    try {
        const vaccine = await prisma.vaccine.create({
            data: {
                petId,
                name,
                date: new Date(date),
                nextDueDate: nextDueDate ? new Date(nextDueDate) : null,
                veterinarian,
                batchNumber,
                notes
            }
        });
        res.json(vaccine);
    } catch (error) {
        res.status(500).json({ error: 'Error creating vaccine' });
    }
};
