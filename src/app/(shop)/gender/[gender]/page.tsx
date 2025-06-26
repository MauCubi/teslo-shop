import { getPaginatedProductsWithImages } from '@/actions/product/product-pagination';
import { ProductGrid } from '@/components/products/products-grid/ProductGrid';
import { Title } from '@/components/ui/title/Title';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';
import { Gender } from '../../../../../generated/prisma';
import { Pagination } from '@/components/ui/pagination/pagination';


interface Props {
  params: {
    gender: Gender,
  },
  searchParams: {    
    page?: string;
  }
}


export default async function({searchParams, params}: Props) {

  const { gender } = await params;
  const sParams = await searchParams;

  const page = sParams.page ? parseInt( sParams.page ) : 1;  

  // const products = initialData.products.filter( product => product.gender === id);

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({page , gender});

  
  
  const categoria = gender === 'men' ? 'hombres' : gender === 'women' ? 'mujeres' : 'niños';

  // if ( id === 'kids') {
  //   notFound();
  // }


  return (
    <div>
      <Title 
          title='Tienda'
          subtitle={`Todos los productos para ${categoria}`}
          className='mb-2'
      />

      <ProductGrid 
        products={products}
      />

      <Pagination totalPages={ totalPages } />      
    </div>
  );
}