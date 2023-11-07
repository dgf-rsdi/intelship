import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
// import { Layout } from '../../layouts/dashboard/layout';
import { LayoutDetail as DetailsLayout } from '../../layouts/dashboard/layoutDetail';
import { VesselMonitor } from 'src/sections/vessel-monitor';

const Page = () => (
  <>
    <Head>
      <title>
        Monitor Kapal | Intelship
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
            Monitor Kapal
          </Typography>
          <VesselMonitor />
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