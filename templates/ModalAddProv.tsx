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

  const [providerName, setProviderName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleProviderNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProviderName(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
        name: providerName,
        email: email
    };
    
    // Send form data to /api/addProvToProd endpoint
    const res = await fetch("/api/providerAdd", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    handleClose();  // Close modal

    if (res.status === 200) {
      Swal.fire(
        'Provider added correctly!',
        '',
        'success'
      )
      window.location.reload();
    } else {
      Swal.fire(
        'Error adding provider!',
        '',
        'error'
      )
    }
  };

  return (
    <>
    <Button onClick={handleOpen}>Add Provider</Button>
        <Modal open={isOpen} onClose={handleClose}>
        <Box component="form" onSubmit={handleSubmit} sx={style}>
              <Typography sx={{color:'black', textDecorationLine:'underline'}}>
                Add Provider
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="providerName"
                label="Provider Name"
                name="providerName"
                autoComplete="providerName"
                autoFocus
                onChange={handleProviderNameChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Provider Email"
                type="text"
                id="email"
                autoComplete="current-email"
                onChange={handleEmailChange}
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
    </>
  );
};

export default MyModal;
