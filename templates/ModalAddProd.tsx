import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import Swal from "sweetalert2";
import Copyright from "./copyright";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type SelectChangeEvent<T = string> =
  | (Event & { target: { value: T; name: string } })
  | React.ChangeEvent<HTMLInputElement>;


type Provider = {
    id: string;
    name: string;
    email: string
}

const MyModal: React.FC = () => {
  const [isOpen, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [productName, setProductName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [stock, setStock] = React.useState(0);

  const handleProductNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value);
  };
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const handleStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStock(Number(event.target.value));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
        name: productName,
        description: description,
        stock: stock
    };
    
    // Send form data to /api/addProvToProd endpoint
    const res = await fetch("/api/productAdd", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    handleClose();  // Close modal

    if (res.status === 200) {
      Swal.fire(
        'Product added correctly!',
        '',
        'success'
      )
      window.location.reload();
    } else {
      Swal.fire(
        'Error adding product!',
        '',
        'error'
      )
    }
  };

  return (
    <div>
    <Button onClick={handleOpen}>Add Product</Button>
        <Modal open={isOpen} onClose={handleClose}>
        <Box component="form" onSubmit={handleSubmit} sx={style}>
              <Typography sx={{color:'black', textDecorationLine:'underline'}}>
                Add Product
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="productName"
                label="Nombre del producto"
                name="productName"
                autoComplete="productName"
                autoFocus
                onChange={handleProductNameChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="description"
                label="Descripción del producto"
                type="text"
                id="description"
                autoComplete="current-description"
                onChange={handleDescriptionChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="stock"
                label="Stock del producto"
                type="number"
                id="stock"
                autoComplete="current-stock"
                onChange={handleStockChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add
              </Button>
            </Box>
        </Modal>
    </div>
  );
};

export default MyModal;
