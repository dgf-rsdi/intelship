import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Layout } from '../../layouts/dashboard/layout';
import { CreateCompany } from 'src/sections/admin/create-company';

const Page = () => (
  <>
    <Head>
      <title>
        Create Company | Intelship
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
            Create Company
          </Typography>
          <CreateCompany />
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
);

export default Page;