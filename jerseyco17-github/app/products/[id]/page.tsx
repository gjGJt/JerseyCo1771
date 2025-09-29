import { Metadata } from 'next';
import { ProductDetail } from '@/app/components/ProductDetail';
import { RelatedProducts } from '@/app/components/RelatedProducts';
import { ProductReviews } from '@/app/components/ProductReviews';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  // In a real app, you would fetch the product data here
  const product = {
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with modern design and responsive cushioning',
    price: 129.99,
    images: ['/images/products/nike-air-max-270-1.jpg'],
  };

  return {
    title: `${product.name} - SportWear Hub`,
    description: product.description,
    keywords: [product.name, 'shoes', 'running', 'athletic', 'Nike'],
    openGraph: {
      title: `${product.name} - SportWear Hub`,
      description: product.description,
      type: 'product',
      images: product.images,
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        <ProductDetail productId={params.id} />
        <RelatedProducts />
        <ProductReviews productId={params.id} />
      </div>
    </div>
  );
}
