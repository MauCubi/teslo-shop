'use server';

import type { ValidSizes } from '@/app/interfaces/product-interface';
import type { Address } from '@/app/interfaces/address-interface';
import { auth } from '@/auth.config';
import { prisma } from '@/lib/prisma';
import { Size } from '../../../generated/prisma/index';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: ValidSizes;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: 'No hay sesion de usuario',
    };
  }

  // console.log({productIds, address, userId});

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) {
        throw new Error('No existe producto!!!');
      }

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      const updateProductPromises = products.map((product) => {
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error('un producto no tiene cantidad definida');
        }

        return tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updateProductPromises);




      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error('Producto no tiene stock');
        }
      });

      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      const orderAddress = await tx.orderAddress.create({
        data: {
          countryId: address.country,
          orderId: order.id,
          firstName: address.firstName,
          lastName: address.lastName,
          address: address.address,
          address2: address.address2 ?? '',
          postalCode: address.postalCode,
          city: address.city,
          phone: address.phone,
        },
      });

      return {
        order: order,
        updatedProducts: updatedProducts,
        orderAddress: orderAddress,
      };
    });


    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx
    }

  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
