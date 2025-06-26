import { prisma } from '../lib/prisma';
import { initialData } from './seed';


async function main(){

    
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    

    const { categories, products } = initialData;


    // Categorias
    const categoriesData = categories.map( category => ({
        name: category
    }))

    await prisma.category.createMany({
        data: categoriesData
    });
    
    const categoriesDB = await prisma.category.findMany();

    const categoriesMap = categoriesDB.reduce( (map, category) => {

        map[ category.name.toLowerCase()] = category.id;

        return map;
    }, {} as Record<string, string>);


    // await prisma.product.create({
    //     data: {
    //         ...product1,
    //         categoryId: categoriesMap['shirts']
    //     }
    // })

    products.forEach( async (product) => {

        const { type, images, ...rest } = product;

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })

        // Images
        const imagesData = images.map( image => ({
            url: image,
            productId: dbProduct.id
        }));

        await prisma.productImage.createMany({
            data: imagesData
        })

    } )
    
    // await prisma.category.create({
    //     data: {
    //         name: 'Shirts',
    //     }
    // })



    
    console.log('SEED ejecutado')
}


(() => {
    main();

})();