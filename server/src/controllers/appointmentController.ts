import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { AuthRequest } from '../middleware/auth';

export const getAppointments = async (req: Request, res: Response) => {
    const userId = (req as AuthRequest).user.id;
    try {
        const appointments = await prisma.appointment.findMany({
            where: {
                pet: {
                    ownerId: userId
                }
            },
            include: {
                pet: true
            },
            orderBy: {
                date: 'asc'
            }
        });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching appointments' });
    }
};

export const createAppointment = async (req: Request, res: Response) => {
    const { petId, date, time, type, veterinarian, clinic, notes } = req.body;
    try {
        const appointment = await prisma.appointment.create({
            data: {
                petId,
                date: new Date(date),
                time,
                type,
                veterinarian,
                clinic,
                notes
            }
        });
        res.json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating appointment' });
    }
};
