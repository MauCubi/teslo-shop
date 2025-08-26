'use server';

import { prisma } from '@/lib/prisma';
import { title } from 'process';

export const getOrderById = async (id: string) => {
  
  try {
    const orderById = await prisma.order.findUnique({
      include: {
        OrderAddress: {
          include: {
            country: {
              select: {
                name: true,
              },
            },
          },
        },
        OrderItem: {
          include: {
            product: {
              select: {
                slug: true,
                title: true,
                ProductImage: { take: 1, select: { url: true } },
              },
            },
          },
        },
      },
      where: { id },
    });

    return { ok: true, orderById };
  } catch (error) {
    return {
      ok: false,
      msg: 'error' + error,
    };
  }
};
