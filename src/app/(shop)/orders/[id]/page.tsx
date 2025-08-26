import { getOrderById } from '@/actions/order/get-order-by-id';
import { OrderStatus } from '@/components/orders/OrderStatus';
import { PayPalButton } from '@/components/paypal/PayPalButton';
import { Title } from '@/components/ui/title/Title';
import { currencyFormat } from '@/utils/currencyFormat';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}



export default async function ({ params }: Props) {
  const { id } = await params;

  const { ok, orderById} = await getOrderById(id);  

  if (!ok || !orderById) {
    notFound()
  }

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col  w-[1000px] '>
        <Title title={`Orden #${id.split('-').at(-1)}`} />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Carrito */}
          <div className='flex flex-col mt-5 '>
            <OrderStatus isPaid={orderById.isPaid}/>

            {/* Items */}
            {orderById?.OrderItem?.map((prod) => (
              <div key={`${prod.product.slug}-${prod.size}`} className='flex mb-5'>
                <Image
                  src={`/products/${prod.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  style={{
                    width: '100px',
                    height: '100px',
                  }}
                  alt={prod.product.title}
                  className='mr-5 rounded'
                />

                <div>
                  <p>{prod.product.title}</p>
                  <p>
                    ${prod.price} x {prod.quantity}
                  </p>
                  <p className='font-bold'>
                    Subtotal: ${prod.price * prod.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* checkout */}
          <div className='bg-white rounded-xl shadow-lg p-7'>
            <h2 className='text-2xl font-bold mb-2'>Direccion de entrega</h2>
            <div className='mb-10'>
              <p className='text-xl'>
                {orderById?.OrderAddress?.firstName}{' '}
                {orderById?.OrderAddress?.lastName}
              </p>
              <p>{orderById?.OrderAddress?.address}</p>
              <p>{orderById?.OrderAddress?.address2}</p>
              <p>{orderById?.OrderAddress?.postalCode}</p>
              <p>
                {orderById?.OrderAddress?.city},{' '}
                {orderById?.OrderAddress?.country.name}
              </p>
              <p>{orderById?.OrderAddress?.phone}</p>
            </div>

            {/* Divider */}
            <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />

            <h2 className='text-2xl mb-2'>Resumen de la orden</h2>

            <div className='grid grid-cols-2'>
              <span>No. Productos</span>
              <span className='text-right'>
                {orderById?.itemsInOrder} articulos
              </span>

              <span>Subtotal</span>
              <span className='text-right'>
                {currencyFormat(orderById?.subTotal as number)}
              </span>

              <span>Inpuestos (15%)</span>
              <span className='text-right'>
                {currencyFormat(orderById?.tax as number)}
              </span>

              <span className='mt-5 text-2xl'>Total</span>
              <span className='mt-5 text-right text-2xl'>
                {currencyFormat(orderById?.total as number)}
              </span>
            </div>

            {

              orderById.isPaid  
              ? <OrderStatus isPaid={orderById.isPaid}/>
              : <PayPalButton amount={orderById.total} orderId={orderById.id}/>
              

            }           


          </div>
        </div>
      </div>
    </div>
  );
}
