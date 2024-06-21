interface ThreadFormData {
  title: string;
  content: string;
}

interface CreateThreadResponse {
  data: any;
  message: string;
  strapiErrors?: string;
}

export const createThreadAction = async (formData: ThreadFormData): Promise<CreateThreadResponse> => {
  try {
    console.log('Sending formData:', formData);

    const response = await fetch('/api/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });


    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create thread');
    }

    const data = await response.json();
    return { data, message: 'Thread created successfully!' };
  } catch (error) {
    console.error('Error creating thread:', error);

    return { data: null, message: '', strapiErrors: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
};
