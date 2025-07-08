import { Title } from '@/components/ui/title/Title';
import { initialData } from '@/seed/seed';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';


const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],  
]

interface Props {
  params: Promise<{ id: string }>
}

export default async function( {params}: Props ) {

  const {id} = await params;

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>

      <div className='flex flex-col  w-[1000px] '>
        
        <Title title={`Orden #${id}`}/>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>

          {/* Carrito */}
          <div className='flex flex-col mt-5 '>

            <div className={
              clsx(
                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                {
                  'bg-red-500': false,
                  'bg-green-700': true,
                }
              )}
            >
              <IoCartOutline size={30}/>
              <span className='mx-2'>Pagada</span>
            </div>



            {/* Items */}
            {
            productsInCart.map( prod => (
              
              <div key={prod.slug} className='flex mb-5'>
                <Image 
                  src={`/products/${prod.images[0]}`}
                  width={100}
                  height={100}
                  style={{
                    width: '100px',
                    height: '100px'
                  }}
                  alt={prod.title}
                  className='mr-5 rounded'
                />  

                <div>
                  <p>{prod.title}</p>
                  <p>${prod.price} x 3</p>
                  <p className='font-bold'>Subtotal: ${ prod.price * 3}</p>
                </div>

              </div>

            ))
          }

          </div>



          {/* checkout */}
          <div className='bg-white rounded-xl shadow-lg p-7'>

            <h2 className='text-2xl font-bold mb-2'>Direccion de entrega</h2>
            <div className='mb-10'>
              <p className='text-xl'>Fernando Herrera</p>
              <p>Av. Siempre viva 123</p>
              <p>Col. Centro</p>
              <p>Alcaldia quahatemoc</p>
              <p>Ciudad de Mexico</p>
              <p>CP 123123123</p>
              <p>123123123</p>
            </div>

            {/* Divider */}
            <div className='w-full h-0.5 rounded bg-gray-200 mb-10'/>

            <h2 className='text-2xl mb-2'>Resumen de la orden</h2>

            <div className='grid grid-cols-2'>

              <span>No. Productos</span>
              <span className='text-right'>3 Articulos</span>

              <span>Subtotal</span>
              <span className='text-right'>$ 100</span>

              <span>Inpuestos (15%)</span>
              <span className='text-right'>$ 100</span>

              <span className='mt-5 text-2xl'>Total</span>
              <span className='mt-5 text-right text-2xl'>$ 100</span>

            </div>

            <div className='mb-5 mt-5 w-full'>           
              
              <div className={
                clsx(
                  'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                  {
                    'bg-red-500': false,
                    'bg-green-700': true,
                  }
                )}
              >
                <IoCartOutline size={30}/>
                <span className='mx-2'>Pagada</span>
              </div>   

            </div>

          </div>

        </div>
        
      </div>

    </div>
  );
}