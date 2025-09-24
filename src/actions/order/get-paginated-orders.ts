'use server'

import { auth } from '@/auth.config';
import { prisma } from '@/lib/prisma';



export const getPaginatedOrders = async() => {

  const session = await auth();


  if ( session?.user.rol !== 'admin' ) {
    return {
      ok: false,
      msg: 'Debe estar autenticado con rol de administrador'
    }
  }

  

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      OrderAddress: {
        select: {
          firstName: true,
          lastName: true
        }
      }
    }
  })
  
  console.log(orders)

  return {
    ok: true,
    orders: orders
  }


}