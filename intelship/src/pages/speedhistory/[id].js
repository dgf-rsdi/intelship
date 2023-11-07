import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { LayoutDetail as DetailsLayout } from '../../layouts/dashboard/layoutDetail';
import { Speed } from 'src/sections/details/speed';

const Page = () => (
  <>
    <Head>
      <title>
        History Speed | Intelship
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
            History Kecepatan
          </Typography>
          <Speed />
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