import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { AuthRequest } from '../middleware/auth';

export const getPets = async (req: Request, res: Response) => {
    const userId = (req as AuthRequest).user.id;
    try {
        const pets = await prisma.pet.findMany({
            where: { ownerId: userId },
            include: { vaccines: true, appointments: true, allergies: true, dewormings: true }
        });
        res.json(pets);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching pets' });
    }
};

export const createPet = async (req: Request, res: Response) => {
    const userId = (req as AuthRequest).user.id;
    const { name, species, breed, birthDate, weight, imageUrl, microchipId } = req.body;

    try {
        const pet = await prisma.pet.create({
            data: {
                name,
                species,
                breed,
                birthDate: new Date(birthDate),
                weight: typeof weight === 'string' ? parseFloat(weight) : weight,
                imageUrl,
                microchipId,
                ownerId: userId
            }
        });
        res.json(pet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating pet' });
    }
};

export const getPetById = async (req: Request, res: Response) => {
    const userId = (req as AuthRequest).user.id;
    try {
        const pet = await prisma.pet.findFirst({
            where: { id: req.params.id, ownerId: userId },
            include: { vaccines: true, appointments: true, allergies: true, dewormings: true }
        });
        if (!pet) return res.status(404).json({ error: 'Pet not found' });
        res.json(pet);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching pet' });
    }
};
