'use client'
import { Issue } from '@/generated/prisma/client';
import { IssueStatus } from '@/app/validationSchema';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { toast } from 'sonner';

const statusLabels: Record<IssueStatus, string> = {
    OPEN: 'Open',
    IN_PROGRESS: 'In Progress',
    CLOSED: 'Closed',
};

const StatusSelect = ({ issue }: { issue: Issue }) => {
    const updateStatus = (status: string) => {
        axios.patch('/api/issues/' + issue.id, { status })
            .catch(() => {
                toast.error('Changes could not be saved.');
            });
    };

    return (
        <Select.Root defaultValue={issue.status} onValueChange={updateStatus}>
            <Select.Trigger />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Status</Select.Label>
                    {Object.values(IssueStatus).map(status => (
                        <Select.Item key={status} value={status}>
                            {statusLabels[status]}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default StatusSelect;
