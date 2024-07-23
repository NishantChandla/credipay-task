import { ProductEntity } from 'src/products/entities/product.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { PRODUCT_LIST } from './data';

export default class ProductSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const productRepository = dataSource.getRepository(ProductEntity);

    for (const product of PRODUCT_LIST) {
      const _product = productRepository.create(product);
      await productRepository.save(_product);
    }
  }
}
