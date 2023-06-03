import { FC } from 'react';
import { Product } from '../../types/Product';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

type Props = {
  product: Product;
}

export const ProductInfo: FC<Props> = ({ product }) => {
  return (
    <Card>
        <CardMedia
          image={product.imageUrl}
          component="img"
          height="400"
          alt={product.name}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CardContent>
            <Typography
              variant='h3'
              color="text.secondary"
              sx={{ marginBottom: '20px' }}
            >
              {product.name}
            </Typography>

            <Typography variant='body2' color="text.secondary">
              {`Product quantity: ${product.count}`}
            </Typography>

            <Typography variant='body2' color="text.secondary">
              {`Product width: ${product.size.width}`}
            </Typography>

            <Typography variant='body2' color="text.secondary">
              {`Product height: ${product.size.height}`}
            </Typography>

            <Typography variant='body2' color="text.secondary">
              {`Product weight: ${product.weight}`}
            </Typography>
          </CardContent>
        </div>
      </Card>
  )
};
