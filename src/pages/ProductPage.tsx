import { CircularProgress } from "@mui/material";
import { ProductInfo } from "../components/ProductInfo"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/Product";
import client from '../api/fetchingProducts';

export const ProductPage = () => {
  const { productId = 0 } = useParams();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const getProductById = async() => {
      try {
        const productFromServer = await client.getById(+productId);

        setProduct(productFromServer);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getProductById();
  }, [productId])

  console.log(product);
  

  return (
    <div>
      {isLoading && (
        <CircularProgress color="inherit" />
      )}

      {hasError && (
        <p style={{ color: 'red' }}>Error occured when loading data</p>
      )}

      {!isLoading && !hasError && product && (
        <ProductInfo product={product} />
      )}
    </div>
  );
};
