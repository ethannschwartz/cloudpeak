export const useChatSupport = async (message) => {
    let conversationHistory = [];
    try {
        conversationHistory.push({
            sender: 'user',
            message: message,
        });
        const response = await $fetch('/api/chat', {
            method: 'POST',
            body: { message },
        });
        return response.message;
    } catch (error) {
        console.error('Error chatting with support:', error);
        throw error;
    }
};
