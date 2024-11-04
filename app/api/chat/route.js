// app/api/chat/route.js

import { Configuration, OpenAIApi } from 'openai';

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'No message provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // Llamar a la API de OpenAI
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', 
      messages: [{ role: 'user', content: message }],
    });

    const reply = completion.data.choices[0].message.content;

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error en la API de OpenAI:', error);
    return new Response(
      JSON.stringify({ error: 'Error con la API de OpenAI' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
