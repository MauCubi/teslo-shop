'use server'
import { prisma } from '@/lib/prisma';

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {


  console.log(orderId, transactionId);

  const result = await prisma.order.update({
    where: { id: orderId },
    data: { transactionId: transactionId },
  });

  console.log('salio', { result });

  if (!result) {
    return {
      ok: false,
      msg: 'Error',
    };
  }

  return {
    ok: true,
    result: result,
  };
};
