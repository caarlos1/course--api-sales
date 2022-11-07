import 'reflect-metadata'; // necessário para o typeorm
import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import routes from './routes';

import AppError from '@shared/errors/AppError';
import '@shared/typeorm'; // Criando a conexão do TypeORM

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());

// Tratamento de erros (middleware)
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Inernal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server on 3333');
});
