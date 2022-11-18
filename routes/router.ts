import { Router, Request, Response } from 'express';
import Server from '../classes/server';

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

    const payload = {
        from: de, 
        body: cuerpo,
    }

    const server = Server.instance;
    server.io.emit('new-message', payload);

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

    const payload = {
        from: de, 
        body: cuerpo,
    }

    const server = Server.instance;
    server.io.in(id).emit('private-message', payload);

    response.json({
        ok: true, 
        message: 'Todo esta perfecto por POST',
        cuerpo, 
        de,
        id
    });
});

export default router;