import IssueChart from './IssueChart';
import { getIssueStats } from './IssueData';

const IssueChartWrapper = async () => {
    const { open, inProgress, closed } = await getIssueStats();
    return <IssueChart open={open} inProgress={inProgress} closed={closed} />;
}

export default IssueChartWrapper;
