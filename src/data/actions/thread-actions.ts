// data/actions/thread-actions.ts

interface ThreadFormData {
  title: string;
  content: string;
}

export const createThreadAction = async (
  formData: ThreadFormData
): Promise<{ data: any; message: string; strapiErrors?: string }> => {
  try {
    const response = await fetch('/api/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to create thread');
    }

    const data = await response.json();
    return { data, message: 'Thread created successfully!' };
  } catch (error) {
    console.error('Error creating thread:', error);

    if (error instanceof Error) {
      return { data: null, message: '', strapiErrors: error.message };
    } else {
      return { data: null, message: '', strapiErrors: 'An unknown error occurred' };
    }
  };
};
