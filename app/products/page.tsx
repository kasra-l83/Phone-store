import { fetchProductList } from '@/apis/products.api';
import { ProductCard } from '@/components/ProductCard';
import { IProduct } from '@/types/product';

const Products= async() =>{
  const products= await fetchProductList(1, 0);
  
  return (
    <section className='flex flex-col gap-y-3'>
      <h3 className='text-3xl font-bold'>محصولات</h3>
      <hr />
      <div className='flex gap-5 flex-wrap'>
        {products.data?.products.map((product: IProduct, index: number) =>(
          <ProductCard key={index} id={product._id} image={product.images} name={product.name} price={product.price} quantity={product.quantity}/>
        ))}
      </div>
    </section>
  )
}
export default Products;