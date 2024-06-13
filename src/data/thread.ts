// data/threads.ts

export interface Thread {
    id: number;
    title: string;
    content: string;
    createdAt: string; // Use Date type if you want to handle dates
    updatedAt: string; // Use Date type if you want to handle dates
    publishedAt: string; // Use Date type if you want to handle dates
}

export const threadList: Thread[] = [
    {
        id: 1,
        title: 'The Power of Prayer',
        content: 'Discussing the importance and impact of prayer in the life of a Christian believer.',
        createdAt: '2024-06-12T18:25:13.962Z',
        updatedAt: '2024-06-12T18:26:04.150Z',
        publishedAt: '2024-06-12T18:26:04.147Z',
    },
    {
        id: 2,
        title: 'Overcoming Adversity with Faith',
        content: 'Stories and strategies for navigating challenges through faith and trust in God.',
        createdAt: '2024-06-12T18:27:36.923Z',
        updatedAt: '2024-06-12T18:27:37.683Z',
        publishedAt: '2024-06-12T18:27:37.680Z',
    },
    {
        id: 3,
        title: 'Living a Christ-Centered Life',
        content: 'Exploring what it means to live in accordance with Christ\'s teachings and values.',
        createdAt: '2024-06-12T18:30:00.000Z',
        updatedAt: '2024-06-12T18:31:00.000Z',
        publishedAt: '2024-06-12T18:31:00.000Z',
    },
    // Add more threads as needed
];
