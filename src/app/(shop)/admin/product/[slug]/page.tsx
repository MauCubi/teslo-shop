import { getProductBySlug } from '@/actions/product/get-product-by-slug';
import { Title } from '@/components/ui/title/Title';
import { redirect } from 'next/navigation';
import { ProductForm } from './ui/ProductForm';
import { getAllCategories } from '@/actions/categories/get-all-categories';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({params}: Props) {

  const { slug } = await params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug), 
    getAllCategories()
  ])


  if (!product && slug !== 'new') {
    redirect('/admin/products')
  }

  

  const title = (slug === 'new') ? 'Nuevo Producto' : 'Editar Producto'

  return (
    <>
      <Title title={title}></Title>
      <ProductForm product={ product ?? {}} categories={categories}/>
    </>
  );
}