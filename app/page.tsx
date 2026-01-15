import HomeClient from './HomeClient';
import IssueChart from './IssueChart';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';

export default function Home() {
  return (
    <HomeClient>
      <IssueSummary />
      <LatestIssues />
      <IssueChart open={2} closed={4} inProgress={2}/>
    </HomeClient>
  );
}
