import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Copyright from '../templates/copyright';

const cards = [
    {id: 1, header: "Chicles", description:"Entrega en menos de 48hs en AMBA.", rating:4.2, image: "https://www.infobae.com/new-resizer/kIiXaM-8OgXj4Yff7JA0eSttEWM=/992x558/filters:format(webp):quality(85)/arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/AJU6WJWSENGV7AJXJZY5H5JNFQ"},
    {id: 2, header: "Nesquik", description:"", rating:5.0, image: "https://www.casa-segal.com/wp-content/uploads/2020/03/nesquik-cacao-180g-almacen-casa-segal-mendoza.jpg "},
    {id: 3, header: "Gaseosa Cola", description:"", rating:3.2, image: "https://peru21.pe/resizer/ch78K1r0gMkadc2p-9n4IEHrE3k=/580x330/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/HOOXFBCSCNGGTFRZ5RNTBLBVW4.jpg"},
    {id: 4, header: "Caramelos", description:"", rating:4.0, image: "https://www.leotertenerife.com/wp-content/uploads/2020/07/historia-y-origen-caramelos.jpg "},
    {id: 5, header: "Chupetines", description:"", rating:2.5, image: "https://distribuidoralaprimera.com.ar/files/chupetines2-84603.jpg"},
    {id: 6, header: "Gomitas", description:"", rating:1.5, image: "https://lascameliaslp.com.ar/wp-content/uploads/YADODFY5JVB7XJ2SIEDP4CN4TM.png"},];

const theme = createTheme();

export default function Album() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative" style={{ background: '#2E3B55' }}>
        <Toolbar>
          <HomeIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Providers MarketPlace
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Providers Marketplace
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Our marketplace connects customers with providers across various industries, making it easy to find trusted professionals for any product. With review systems, our platform offers a seamless and trustworthy experience for buyers and sellers alike.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" href="/dashboard">Back to Dashboard</Button>
              <Button variant="outlined">Search &nbsp;<SearchIcon></SearchIcon></Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height:"200px"
                    }}
                    image={card?.image ?? "https://source.unsplash.com/random"}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card?.header ?? "Header"}
                    </Typography>
                    <Typography sx={{minHeight:"50px"}}>
                      {card?.description ?? "Description"}
                    </Typography>
                    <Typography component="legend">Rating</Typography>
                    <Rating name="read-only" value={card?.rating ?? 5.0} readOnly />
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          This service is not responsabile for issues with providers.
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
