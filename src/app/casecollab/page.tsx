import { CaseCollabPage } from '@/components/pages/CaseCollabPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Collaborators | I/O Festival 2026',
  description: 'Berkolaborasi dengan kami untuk memberikan tantangan nyata bagi inovator muda di I/O Festival 2026 UNTAR.',
};

export default function Page() {
  return <CaseCollabPage />;
}
