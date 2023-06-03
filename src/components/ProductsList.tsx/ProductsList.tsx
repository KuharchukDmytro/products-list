import { useEffect, useState } from "react";
import client from '../../api/fetchingProducts';
import { CircularProgress } from "@mui/material";
import { ProductItem } from "../ProductItem";

import './ProductsList.scss';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { actions } from "../../features/products";

export const ProductsList = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products);

  useEffect(() => {
    const getProductsFromServer = async () => {
      try {
        const productsFromServer = await client.getAll();

        const sortedProducts = productsFromServer.sort(
          (product1, product2) => product1.name.localeCompare(product2.name),
        );

        dispatch(actions.setInitialState(sortedProducts));
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getProductsFromServer();
  }, [dispatch]);

  return (
    <div className="products-list">
      {hasError && (
        <p style={{ color: 'red' }}>
          Error occured when data loading
        </p>
      )}

      {isLoading && (
        <CircularProgress color="primary" />
      )}

      {!hasError && !isLoading && (
        products.map(product => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))
      )}
    </div>
  );
};
