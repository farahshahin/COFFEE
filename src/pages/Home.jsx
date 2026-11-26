import useProducts from '../hooks/useProducts';
import Hero from '../components/Hero';



export default function Home() {
  const { products, loading, error } = useProducts();
  console.log(products[0]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    
    <div>  
        <Hero />
        
        
     </div>
  );
}

