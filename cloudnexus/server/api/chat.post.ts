import OpenAI from 'openai';
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);


    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        organization: process.env.OPENAI_ORGANIZATION,
    });

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // or the appropriate model you want to use
            messages: [
                { role: 'system', content: 'You are a helpful customer support assistant.' },
                { role: 'user', content: body.message },
            ],
        });

        return {
            message: response.choices[0].message.content
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: {
                message: 'There was an error processing your request.',
                error: error,
            },
        };
    }
});
