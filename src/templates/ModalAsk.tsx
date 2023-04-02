import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
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
  productNames : readonly string[]
};

type Provider = {
    id: string;
    name: string;
    email: string;
    providerId: number;
}

const MyModal: React.FC<ModalProps> = (products) => {
  const [providers, setProviders] = React.useState<Provider[]>([]);
  const [selectedProviders, setSelectedProviders] = React.useState<string[]>([]);
  const [isOpen, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [stock, setStock] = React.useState({});

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const providersValue = event.target.value;
    if (Array.isArray(providersValue)) {
      const providersArray = providersValue as string[];
      console.log(providersArray);
      
      setSelectedProviders(providersArray);
    }
  };

  const handleStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStock({ ...stock, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let formData = {
      products: products.productNames,
      providers: selectedProviders,
      stock: stock,
      mail: ''
    };

    // Send form data to /api/addProvToProd endpoint
    const res = await fetch("/api/generateMail", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    handleClose();  // Close modal

    if (res.status === 200) {
      let aux = await res.json(); 
      Swal.fire({
        title: 'Mail generated succesfully! Do you want to send it?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Send`,
        denyButtonText: `Don't send`,
        text: aux.mail
      }).then( async (result) => {
        if (result.isConfirmed) {
          formData.mail = aux.mail;
          const resSend = await fetch("/api/addRequestBudget", {
            method: "POST",
            body: JSON.stringify(formData),
          });
          Swal.fire('Mail sent succesfully!', '', 'success')
        }
      })
    }
  };

  React.useEffect(() => {
    fetch(`/api/providersByProduct`,
      {method: "POST", body: JSON.stringify(products.selected)
    })
      .then((response) => response.json())
      .then((data) => setProviders(data));
  }, [products.selected, isOpen]);

  return (
    <div>
    <Button onClick={handleOpen}>Ask for Budget</Button>
        <Modal open={isOpen} onClose={handleClose}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <h2 className="mb-1">Ask for Budget</h2>
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
                                <MenuItem key={provider.name} value={provider.providerId}>
                                    {provider.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {/* Iterate products.selected, and for each product create a textfield */}
                        {products.productNames.map((product) => (
                          <TextField
                            key={product}
                            margin="normal"
                            required
                            fullWidth
                            name={`stock-${product}`}
                            label={`Stock for product ${product}`}
                            type="number"
                            id={`stock-${product}`}
                            autoComplete="current-stock"
                            onChange={handleStockChange}
                          />
                        ))}
                    </FormControl>
                    <Button type="submit">Submit</Button>
                </form>
            </Box>
        </Modal>
    </div>
  );
};

export default MyModal;
