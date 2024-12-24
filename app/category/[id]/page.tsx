import { fetchProductList } from "@/apis/products.api";
import { ProductCard } from "@/components/ProductCard";
import { IProduct } from "@/types/product";
import { notFound } from "next/navigation";

const ProductPage: React.FC<IPageParams<{ id: string }>>= async ({ params }) =>{
  const id= (await params).id;
  const products= await fetchProductList(1, 0);

  return (
    <div className="flex flex-wrap">
        {
            products.data?.products.filter((product: IProduct) =>{
                if(product.subcategory=== id){
                    return true;
                }
                return false;
            }).map((product: IProduct, index: number) =>(
                <ProductCard key={index} image={product.images} name={product.name} price={product.price} quantity={product.quantity} id={product._id}/>
            ))
        }
    </div>
  )
}
export default ProductPage;