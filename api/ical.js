export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url' });

  try {
    const response = await fetch(decodeURIComponent(url), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RivaSpace/1.0)',
        'Accept': 'text/calendar, application/ics, */*',
      },
    });
    
    if (!response.ok) return res.status(response.status).json({ error: 'Failed to fetch' });
    
    const text = await response.text();
    res.setHeader('Content-Type', 'text/calendar');
    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
