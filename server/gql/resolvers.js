import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import mongoose from 'mongoose';

import CategoryModel from '../models/category';
import ProductModel from '../models/product';
import UserModel from '../models/user';
import { productsPresenter, productPresenter } from '../utils/presenter';

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
    categoryProducts: async (_, { category_id }) => {
        try {
            const category = mongoose.Types.ObjectId(category_id);
            const products = await ProductModel.find({ category }).sort([
                ['createdAt', -1],
            ]);
            const updatedProducts = productsPresenter(products);

            return updatedProducts;
        } catch (err) {
            return { error: err.message };
        }
    },
    product: async (_, { product_id }) => {
        try {
            const _id = mongoose.Types.ObjectId(product_id);
            const product = await ProductModel.findById(_id);
            const updatedProduct = productPresenter(product);

            return updatedProduct;
        } catch (err) {
            return { error: err.message };
        }
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
    authSignup: async (_, { firstname, lastname, email, password }) => {
        const response = { success: false };

        try {
            const user = await UserModel.findOne({ email });

            if (user) {
                return {
                    ...response,
                    error: 'You cannot create this account!',
                };
            }

            const lengthRange = { min: 3, max: 30 };
            // validate fields
            if (
                validator.isEmpty(firstname) ||
                !validator.isAlpha(firstname) ||
                !validator.isLength(firstname, lengthRange)
            ) {
                return {
                    ...response,
                    error: 'Invalid first name!',
                };
            }

            if (
                validator.isEmpty(lastname) ||
                !validator.isAlpha(lastname) ||
                !validator.isLength(lastname, lengthRange)
            ) {
                return { ...response, error: 'Invalid last name!' };
            }

            if (!validator.isEmail(email) || validator.isEmpty(email)) {
                return { ...response, error: 'Invalid email address!' };
            }

            if (
                validator.isEmpty(password) ||
                !password.match(/^[a-zA-Z0-9]{3,30}$/)
            ) {
                return {
                    ...response,
                    error:
                        'Invalid password, please use only letters and numbers!',
                };
            }

            try {
                const genSalt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, genSalt);
                const userObj = new UserModel({
                    firstname,
                    lastname,
                    email,
                    password: hash,
                });

                const savedUser = await userObj.save();

                if (savedUser) {
                    return { success: true, error: '' };
                }

                return {
                    ...response,
                    error: 'Ooops! could not save your data!',
                };
            } catch (err) {
                return {
                    ...response,
                    error: err.message,
                };
            }
        } catch (err) {
            return { ...response, error: err.message };
        }
    },
};

export { Query, Mutation };
