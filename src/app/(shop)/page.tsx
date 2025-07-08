export const revalidate = 60;

import { Title } from '@/components/ui/title/Title';
import { titleFont } from '../config/fonts';
import { ProductGrid } from '@/components/products/products-grid/ProductGrid';
import { getPaginatedProductsWithImages } from '@/actions/product/product-pagination';
import { redirect } from 'next/navigation';
import { Pagination } from '@/components/ui/pagination/pagination';


interface Props {
  searchParams: Promise<{ page?: string }>  
}

export default async function Home({ searchParams }: Props) {

  const params = await searchParams;

  const page = params.page ? parseInt( params.page ) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({page});



  if ( products.length === 0 ) {
    redirect('/')
  }

  return (
      <>
        <Title 
          title='Tienda'
          subtitle='Todos los productos'
          className='mb-2'
        />

        <ProductGrid 
          products={products}
        />

        <Pagination totalPages={ totalPages } />      
      </>
      
  );
}
