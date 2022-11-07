import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from './../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);

    if (productExists)
      throw new AppError('There is already product with this name.');

    const product = productsRepository.create({ name, price, quantity }); // Criando
    await productsRepository.save(product); // Salvando

    return product;
  }
}

export default CreateProductService;
