import { Box, Modal, Typography } from "@mui/material";
import { ProductsList } from "../components/ProductsList.tsx";
import { useState } from "react";
import { NewProductForm } from "../components/NewProductForm";
import { IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import { boxStyle } from "../style_utils/componentsStyles.ts";

const addButtonStyle = {
  position: 'fixed' as 'fixed',
  bottom: '20px',
  right: '20px',
}

export const HomePage = () => {
  const [toggle, setToggle] = useState(false);
  
  const handleToggleModal = () => {
    setToggle(prev => !prev);
  }

  return (
    <div>
      <IconButton
        onClick={handleToggleModal}
        sx={addButtonStyle}
      >
        <AddCircleIcon fontSize="large" />
      </IconButton>

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
            }}
          >
            <Typography id="modal-modal-title" variant="h5" component="h2">
              New product form
            </Typography>

            <IconButton onClick={handleToggleModal}>
              <CloseIcon />
            </IconButton>
          </div>

          <NewProductForm onHandleToggle={handleToggleModal} />
        </Box>
      </Modal>

      <ProductsList />
    </div>
  );
};
