import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { LayoutDetail as DetailsLayout } from '../../layouts/dashboard/layoutDetail';
import { FuelConsumption } from 'src/sections/details/fuel-consumption';

const Page = () => (
  <>
    <Head>
      <title>
        Graphic Fuel Consumption | Intelship
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">
            Grafik Pemakaian BBM
          </Typography>
          <FuelConsumption />
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DetailsLayout>
    {page}
  </DetailsLayout>
);

export default Page;