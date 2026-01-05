'use client'
import { Select, Skeleton } from '@radix-ui/themes'
import { Issue, User } from '@/generated/prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then(res => res.data),
        staleTime: 60 * 1000, // 60s,
        retry: 3,
    });

    if (isLoading) return <Skeleton height='1.5rem' />

    if (error) return null;

    return (
        <>
            <Select.Root
                defaultValue={issue.assignedToUserId || "unassigned"}
                onValueChange={(userId) => {
                    axios.patch('/api/issues/' + issue.id, {
                        assignedToUserId: userId === "unassigned" ? null : userId
                    })
                    .catch(() => {
                        toast.error('Changes could not be saved.')
                    });
                }}
            >
                <Select.Trigger placeholder='Assign...' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value="unassigned">Unassigned</Select.Item>
                        {
                            users?.map(user => (
                                <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                            ))
                        }
                    </Select.Group>
                </Select.Content>
            </Select.Root>
        </>
    )
}

export default AssigneeSelect
