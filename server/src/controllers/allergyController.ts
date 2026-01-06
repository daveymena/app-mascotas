import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const createAllergy = async (req: Request, res: Response) => {
    const { petId, allergen, severity, symptoms, diagnosedDate, notes } = req.body;
    try {
        const allergy = await prisma.allergy.create({
            data: {
                petId,
                allergen,
                severity,
                symptoms,
                diagnosedDate: diagnosedDate ? new Date(diagnosedDate) : null,
                notes
            }
        });
        res.json(allergy);
    } catch (error) {
        res.status(500).json({ error: 'Error creating allergy record' });
    }
};
