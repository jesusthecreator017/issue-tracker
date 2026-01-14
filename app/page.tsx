import HomeClient from './HomeClient';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';

export default function Home() {
  return (
    <HomeClient>
      <IssueSummary />
      <LatestIssues />
    </HomeClient>
  );
}
