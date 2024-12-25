// Instagram API client
import axios from 'axios';

const INSTAGRAM_API_BASE = 'https://graph.instagram.com/v12.0';

export class InstagramClient {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getMediaItems() {
    const response = await axios.get(`${INSTAGRAM_API_BASE}/me/media`, {
      params: {
        access_token: this.accessToken,
        fields: 'id,caption,media_type,media_url,permalink,timestamp',
      },
    });
    return response.data.data;
  }

  async getComments(mediaId: string) {
    const response = await axios.get(`${INSTAGRAM_API_BASE}/${mediaId}/comments`, {
      params: {
        access_token: this.accessToken,
        fields: 'id,text,timestamp,username',
      },
    });
    return response.data.data;
  }

  async sendDirectMessage(userId: string, message: string) {
    const response = await axios.post(`${INSTAGRAM_API_BASE}/me/messages`, {
      recipient_id: userId,
      message: message,
      access_token: this.accessToken,
    });
    return response.data;
  }
}