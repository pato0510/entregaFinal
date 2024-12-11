import OpenAI from 'openai';

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'No message provided' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    const reply = completion?.choices?.[0]?.message?.content || 'Sin respuesta disponible.';

    return new Response(
      JSON.stringify({ reply }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    if (error.response?.status === 429) {
      console.error('Error en la API de OpenAI: Límite de uso alcanzado.');
      return new Response(
        JSON.stringify({
          error: 'Has alcanzado el límite de uso de OpenAI. Por favor, revisa tu plan y facturación.',
        }),
        {
          status: 429,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.error('Error en la API de OpenAI:', error.message);
    return new Response(
      JSON.stringify({ error: 'Error con la API de OpenAI' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
