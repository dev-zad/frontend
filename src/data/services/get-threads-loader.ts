// data/services/get-threads-loader.ts
export async function getThreadsLoader() {
    try {
        const response = await fetch("http://127.0.0.1:1337/api/threads");
        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            throw new Error("Failed to fetch threads");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching threads:", error);
        throw error;
    }
}
