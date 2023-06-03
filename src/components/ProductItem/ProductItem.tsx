import { FC, useState } from 'react';
import { Product } from '../../types/Product';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { boxStyle } from '../../style_utils/componentsStyles';
import client from '../../api/fetchingProducts';
import { Link } from 'react-router-dom';

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Modal,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/products';

type Props = {
  product: Product;
}

export const ProductItem: FC<Props> = ({ product }) => {
  const [toggle, setToggle] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  
  const handleToggleModal = () => {
    setToggle(prev => !prev);
  };

  const handleDeleteProduct = async() => {
    setIsLoading(true);

    try {
      await client.remove(product.id);
      dispatch(actions.remove(product.id))
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Card sx={{ maxWidth: 272, width: '100%' }}>
        <Link to={`/productInfo/${product.id}`}>
          <CardMedia
            image={product.imageUrl}
            component="img"
            height="200"
            alt={product.name}
          />
        </Link>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CardContent>
            <Typography variant='h5' color="text.secondary">
              {product.name}
            </Typography>

            <Typography variant='body2' color="text.secondary">
              {`Product quantity: ${product.count}`}
            </Typography>

          </CardContent>

          <div>
            <IconButton onClick={handleToggleModal}>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </Card>

      <Modal
        open={toggle}
        onClose={handleToggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Confirm product removal
            </Typography>

            <IconButton onClick={handleToggleModal}>
              <CloseIcon />
            </IconButton>
          </div>

          {hasError && (
            <p style={{ color: 'red' }}>Error occured</p>
          )}

          <Button
            variant="contained"
            color="success"
            onClick={handleDeleteProduct}
          >
            {isLoading && (
              <CircularProgress color="inherit" />
            )}

            {!isLoading && 'Confirm'}
          </Button>
        </Box>
      </Modal>
    </>
  );
};
