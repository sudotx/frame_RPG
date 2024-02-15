import RedirectToDemo from '@/components/redirect';
import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { FRAME_BASE_URL, FrameImageUrls } from '../services/farcaster';

const frameMetadata = getFrameMetadata({
  image: FrameImageUrls.START,
  buttons: ['Begin your Journey, Anon?'],
  post_url: `${FRAME_BASE_URL}/api/wallet`,
});

export const metadata: Metadata = {
  title: 'Fire and Fortune',
  description: 'Brave adventurers face off against a mighty dragon in its treacherous lair. Choose your actions wisely as you navigate through perilous encounters',
  openGraph: {
    title: 'Fire and Fortune',
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
      <h1>Fire and Fortune</h1>
      <RedirectToDemo />
    </>);
}