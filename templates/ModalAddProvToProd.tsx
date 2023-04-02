/* import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';

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

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Agregar Proveedor</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{color: 'black'}}>
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, color: 'black' }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
} */

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import React from "react";
import Swal from "sweetalert2";

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

type ModalProps = {
  selected : number[];
};

type Provider = {
    id: string;
    name: string;
    email: string
}

const MyModal: React.FC<ModalProps> = (products) => {
  const [providers, setProviders] = React.useState<Provider[]>([]);
  const [selectedProviders, setSelectedProviders] = React.useState<string[]>([]);
  const [isOpen, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const providersValue = event.target.value;
    if (Array.isArray(providersValue)) {
      const providersArray = providersValue as string[];
      setSelectedProviders(providersArray);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      providers: selectedProviders,
      products: products.selected
    };
    
    // Send form data to /api/addProvToProd endpoint
    const res = await fetch("/api/addProvToProd", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    handleClose();  // Close modal

    if (res.status === 200) {
      Swal.fire(
        'Providers added correctly to products!',
        '',
        'success'
      )
    } else {
      Swal.fire(
        'Error adding providers to products!',
        '',
        'error'
      )
    }
  };

  React.useEffect(() => {
    fetch("/api/providers")
      .then((response) => response.json())
      .then((data) => setProviders(data));
  }, []);

  return (
    <div>
    <Button onClick={handleOpen}>Add Provider</Button>
        <Modal open={isOpen} onClose={handleClose}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <h2 className="mb-1">Add Providers</h2>
                    <FormControl sx={{display: "flex", marginTop: "1rem"}}>
                        <InputLabel id="provider-label">Providers</InputLabel>
                        <Select<string[]>
                            label="provider-label"
                            id="provider-select"
                            value={selectedProviders}
                            onChange={handleSelectChange}
                            multiple={true}
                        >
                            {providers.map((provider) => (
                                <MenuItem key={provider.name} value={provider.id}>
                                    {provider.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit">Submit</Button>
                </form>
            </Box>
        </Modal>
    </div>
  );
};

export default MyModal;
