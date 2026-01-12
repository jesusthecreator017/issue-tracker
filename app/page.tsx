import HomeClient from './HomeClient';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import { prisma } from '@/prisma/client';

export default function Home() {
  return (
    <HomeClient>
      <IssueSummary />
      <LatestIssues />
    </HomeClient>
  );
}
