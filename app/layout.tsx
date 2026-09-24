import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'ApexLogic Digital Engineering LLC | Scalable Web Software & AI Systems',
  description: 'Production-ready digital product engineering and AI agency specializing in scalable web software, SaaS platforms, autonomous workflow agents, and enterprise cloud security.',
  openGraph: {
    title: 'ApexLogic Digital Engineering LLC | Scalable Web Software & AI Systems',
    description: 'Production-ready digital product engineering and AI agency specializing in scalable web software, SaaS platforms, autonomous workflow agents, and enterprise cloud security.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ApexLogic Digital Engineering LLC | Scalable Web Software & AI Systems',
    description: 'Production-ready digital product engineering and AI agency specializing in scalable web software, SaaS platforms, autonomous workflow agents, and enterprise cloud security.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#0F172A] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200"
      >
        {children}
      </body>
    </html>
  );
}
