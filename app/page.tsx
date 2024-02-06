import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { FrameImageUrls, FRAME_BASE_URL } from '../lib/farcaster';
import RedirectToDemo from '@/components/redirect';

const frameMetadata = getFrameMetadata({
  // change this to create a player
  // then this creates a player for the current connected user and performs an action
  buttons: ['Create a wallet', 'create another wallet'],
  image: FrameImageUrls.START,
  post_url: `${FRAME_BASE_URL}/api/wallet`,
});

export const metadata: Metadata = {
  title: 'Openfort Frames',
  description: 'Openfort Frames',
  openGraph: {
    title: 'Openfort Frames',
    description: 'Openfort Frames',
    images: [FrameImageUrls.START],
  },
  other: {
    ...frameMetadata,
  },
};


export default function Page() {
  return (
    <>
      <h1>Openfort Frames</h1>
      <RedirectToDemo />
    </>);
}