// data/actions/thread-actions.ts
export async function createThreadAction(formData: FormData) {
    try {
        const response = await fetch("/api/threads", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        if (!response.ok) {
            throw data;
        }
        return data;
    } catch (error) {
        console.error("Error creating thread:", error);
        throw error;
    }
}
