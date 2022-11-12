import { Router, Request, Response } from 'express';

const router = Router();

router.get('/messages', (request: Request, response: Response) => {
    response.json({
        ok: true, 
        message: 'Todo esta perfecto por GET',
    });
});

router.post('/messages', (request: Request, response: Response) => {
    const cuerpo = request.body.cuerpo;
    const de = request.body.de;

    response.json({
        ok: true, 
        message: 'Todo esta perfecto por POST',
        cuerpo, 
        de
    });
});

router.post('/messages/:id', (request: Request, response: Response) => {
    const cuerpo = request.body.cuerpo;
    const de = request.body.de;
    const id = request.params.id;

    response.json({
        ok: true, 
        message: 'Todo esta perfecto por POST',
        cuerpo, 
        de,
        id
    });
});

export default router;