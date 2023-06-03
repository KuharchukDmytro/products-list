import { Button, CircularProgress, TextField, Typography } from "@mui/material";

import './NewProductForm.scss';
import { FC, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Product } from "../../types/Product";

import client from '../../api/fetchingProducts';
import { actions } from "../../features/products";

type Props = {
  onHandleToggle: any;
}

export const NewProductForm: FC<Props> = ({ onHandleToggle }) => {
  const [name, setName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [count, setCount] = useState<number>();
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [weight, setWeight] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const products = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();

  const handleSubmitForm = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const maxId = Math.max(...products.map(
      item => item.id,
    ));
    const newProduct: Product = {
      id: maxId + 1,
      name,
      weight,
      imageUrl: imgUrl,
      count: count || 1,
      size: {
        width: width || 100,
        height: height || 100,
      },
      comments: [],
    };

    setIsLoading(true);

    try {
      await client.create(newProduct);
      dispatch(actions.add(newProduct));
      onHandleToggle((prev: any) => !prev);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="new-product-form"
      onSubmit={handleSubmitForm}
    >
      <TextField
        label="Enter product name"
        variant="outlined"
        value={name}
        onChange={(event) => setName(event.target.value)}
        autoComplete="off"
        required
      />

      <TextField
        label="Enter product image URL"
        variant="outlined"
        value={imgUrl}
        onChange={(event) => setImgUrl(event.target.value)}
        autoComplete="off"
        required
      />

      <TextField
        label="Enter product count"
        variant="outlined"
        type="number"
        value={count}
        autoComplete="off"
        required
        onChange={(event) => setCount(+event.target.value)}
      />

      <div className="new-product-form__sizes-container">
        <TextField

          label="Height"
          variant="outlined"
          type="number"
          value={height}
          autoComplete="off"
          required
          onChange={(event) => setHeight(+event.target.value)}
        />
        
        <TextField

          label="Width"
          variant="outlined"
          type="number"
          value={width}
          autoComplete="off"
          required
          onChange={(event) => setWidth(+event.target.value)}
        />
      </div>

      <TextField
        label="Enter product weight"
        variant="outlined"
        value={weight}
        onChange={(event) => setWeight(event.target.value)}
        autoComplete="off"
        required
      />

      {hasError && (
        <Typography variant="body1" color="red">
          Error occured when trying to add product
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        color="inherit"
        style={{ marginTop: '16px' }}
      >
        {isLoading && (
          <CircularProgress color="primary" />
        )}

        {!isLoading && 'Submit'}
      </Button>
    </form>
  );
};
