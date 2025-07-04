import { titleFont } from '@/app/config/fonts';
import { QuantitySelector } from '@/components/product/quantity-selector/QuantitySelector';
import { SizeSelector } from '@/components/product/size-selector/SizeSelector';
import MobileSlideShow from '@/components/product/slide-show/MobileSlideShow';
import SlideShow from '@/components/product/slide-show/SlideShow';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';


interface Props {
  params: {
    slug: string;
  }
}

export default async function({params}: Props) {

  const { slug } = await params;

  const product = initialData.products.find( product => product.slug === slug );

  if (!product) {
    notFound();
  }


  return (
    <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>
      
      {/* Slideshow */}
      <div className='col-span-1 md:col-span-2'>

        {/* Mobile */}
        <MobileSlideShow 
          title={product.title}
          images={product.images}
          className='block md:hidden'
        />

        {/* Desktop */}
        <SlideShow
          title={product.title}
          images={product.images}
          className='hidden md:block'
        />
      </div>


      {/* Detalles */}
      <div className='col-span-1 px-5'>
        
        <h1 className={` ${ titleFont.className } antialiased font-bold text-xl`}>
          { product.title }
        </h1>

        <p className='text-lg mb-5'>
          ${ product.price }
        </p>

        {/* Selector de tallas */}
        <SizeSelector 
          selectedSize={ product.sizes[0] }
          availableSizes={ product.sizes }
        />


        {/* Selector de cantidad */}
        <QuantitySelector 
          quantity={2}
        />


        {/* Boton */}
        <button className='btn-primary my-5'>
          Agregar al carrito
        </button>


        {/* Descripcion */}
        <h3 className='font-bold text-sm'>
          Descripcion
        </h3>
        <p className='font-light'>
          { product.description }
        </p>

      </div>

    </div>
  );
}