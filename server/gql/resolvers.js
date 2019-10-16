import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import CategoryModel from '../models/category';
import ProductModel from '../models/product';
import UserModel from '../models/user';
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

const Mutation = {
    authLogin: async (_, { email, password }) => {
        try {
            const user = await UserModel.findOne({ email });

            if (!user) {
                return { error: 'Something went wrong.', user };
            }

            const isEqual = await bcrypt.compare(password, user.password);

            if (!isEqual) {
                return { error: 'Something went wrong.' };
            }

            const token = jwt.sign(
                {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    userId: user._id.toString(),
                },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            return { token, userId: user._id.toString() };
        } catch (err) {
            return { error: err.message };
        }
    },
};

export { Query, Mutation };
