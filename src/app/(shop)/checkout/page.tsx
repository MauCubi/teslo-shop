import { QuantitySelector } from '@/components/product/quantity-selector/QuantitySelector';
import { Title } from '@/components/ui/title/Title';
import { initialData } from '@/seed/seed';
import Image from 'next/image';
import Link from 'next/link';


const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],  
]

export default function() {
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>

      <div className='flex flex-col  w-[1000px] '>
        
        <Title title='Verificar Compre'/>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>

          {/* Carrito */}
          <div className='flex flex-col mt-5 '>

            <span className='text-xl'>Ajustar elementos</span>

            <Link href='/cart' className='underline mb-5'>
              Editar carrito
            </Link>

          

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

              

              <Link 
                className='flex btn-primary justify-center'
                href='/orders/123'
              >
                Colocar orden
              </Link>

            </div>

          </div>

        </div>
        
      </div>

    </div>
  );
}