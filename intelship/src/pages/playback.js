import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { LayoutDetail as DetailsLayout } from '../layouts/dashboard/layoutDetail';
import Playback from 'src/sections/details/playback';
// import { PlaybackSandbox } from 'src/sections/details/playback-sandbox';

const Page = () => (
  <>
    <Head>
      <title>
        Playback | Intelship
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
            Playback map
          </Typography>
          <Playback />
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