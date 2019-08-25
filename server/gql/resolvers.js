import CategoryModel from '../models/category';

const Query = {
    categories: async () => {
        const data = await CategoryModel.find({}).sort([['createdAt', -1]]);

        return data;
    },
};

export { Query };
