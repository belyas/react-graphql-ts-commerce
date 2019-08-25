import CategoryModel from '../models/category';
import ProductModel from '../models/product';
import { productsPresenter } from '../utils/presenter';

const Query = {
    categories: async () => {
        const categories = await CategoryModel.find({}).sort([
            ['createdAt', -1],
        ]);

        return categories;
    },
    products: async () => {
        const products = await ProductModel.find({}).sort([['createdAt', -1]]);
        const updatedProducts = productsPresenter(products);

        return updatedProducts;
    },
};

export { Query };
