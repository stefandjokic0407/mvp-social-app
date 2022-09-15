import dynamic from 'next/dynamic';
const LandingPageHeader = dynamic(() => import('./header'));
const LandingPageHero = dynamic(() => import('./hero'));
const LandingPageWhat = dynamic(() => import('./what'));
const LandingPageWhy = dynamic(() => import('./why'));
const LandingPageGetStarted = dynamic(() => import('./get-started'));
const LandingPageFooter = dynamic(() => import('./footer'));

export default function LandingPage() {
  return (
    <main>
      <LandingPageHeader />
      <LandingPageHero />
      <LandingPageWhat />
      <LandingPageWhy />
      <LandingPageGetStarted />
      <LandingPageFooter />
    </main>
  );
}
