'use server'

import { prisma } from '@/lib/prisma'


export const getStockBySlug = async (slug: string) => {

    const stock = await prisma.product.findFirst({
        select: {
            inStock: true
        },
        where: {
            slug: slug
        }
    })


    if (!stock) return null;

    return stock.inStock;    
    
    }