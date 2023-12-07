async function generateNotes(transcript) {
    // NOT CORRECT
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${YOUR_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: transcript,
        max_tokens: 1024
      })
    });
  
    const data = await response.json();
    return data.choices[0].text;
  }