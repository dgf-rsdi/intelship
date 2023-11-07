import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { LayoutDetail as DetailsLayout } from '../../layouts/dashboard/layoutDetail';
import { ShipInfo } from 'src/sections/details/ship-info';

const Page = () => (
  <>
    <Head>
      <title>
        Details | Intelship
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
            Detail Kapal
          </Typography>
          <ShipInfo />
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