import RedirectToDemo from '@/components/redirect';
import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { FRAME_BASE_URL, FrameImageUrls } from '../lib/farcaster';

const frameMetadata = getFrameMetadata({
  image: FrameImageUrls.START,
  buttons: ['Create a player', 'Login'],
  post_url: `${FRAME_BASE_URL}/api/wallet`,
});

export const metadata: Metadata = {
  title: 'Untitled Unmastered',
  description: 'Game In A Frame',
  openGraph: {
    title: 'Untitled Unmastered Game',
    description: 'A Game in frame built using OpenFort API',
    images: [FrameImageUrls.START],
  },
  other: {
    ...frameMetadata,
  },
};


export default function Page() {
  return (
    <>
      <h1>Untitled Unmastered</h1>
      <RedirectToDemo />
    </>);
}