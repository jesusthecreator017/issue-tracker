import HomeClient from './HomeClient';
import IssueChartWrapper from './IssueChartWrapper';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';

export default function Home() {
  return (
    <HomeClient>
      <IssueSummary />
      <LatestIssues />
      <IssueChartWrapper />
    </HomeClient>
  );
}
