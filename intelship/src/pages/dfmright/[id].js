import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { LayoutDetail as DetailsLayout } from '../../layouts/dashboard/layoutDetail';
import { DfmRight } from 'src/sections/details/dfm-right';

const Page = () => (
  <>
    <Head>
      <title>
        History DFM Right | Intelship
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
            History DFM Right
          </Typography>
          <DfmRight />
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