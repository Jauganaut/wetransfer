interface DiscordWebhookPayload {
  content?: string;
  embeds?: Array<{
    title?: string;
    description?: string;
    color?: number;
    fields?: Array<{
      name: string;
      value: string;
      inline?: boolean;
    }>;
    timestamp?: string;
  }>;
}

async function getClientIP(): Promise<string> {
  try {
    const response = await fetch('/api/client-ip');
    const data = await response.json();
    return data.success ? data.data.ip : 'unknown';
  } catch (error) {
    console.warn('Failed to get client IP:', error);
    return 'unknown';
  }
}

export async function sendToDiscord(formData: Record<string, any>, formType: string): Promise<boolean> {
  const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('Discord webhook URL not configured');
    return false;
  }

  try {
    // Get client IP address
    const clientIP = await getClientIP();

    const payload: DiscordWebhookPayload = {
      embeds: [{
        title: `New ${formType} Submission`,
        description: `A new form has been submitted.`,
        color: 0x5865f2, // Discord blue
        fields: [
          ...Object.entries(formData).map(([key, value]) => ({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            value: String(value),
            inline: true
          })),
          {
            name: 'IP Address',
            value: clientIP,
            inline: true
          }
        ],
        timestamp: new Date().toISOString()
      }]
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Failed to send to Discord:', error);
    return false;
  }
}