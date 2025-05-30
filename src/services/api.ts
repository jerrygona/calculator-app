import axios from 'axios';

export interface ImageData {
  id: number;
  title: string;
  url: string;
  tags: string[];
  description: string;
}

const API_BASE_URL = 'http://localhost:3001';

export const api = {
  async getImages(): Promise<ImageData[]> {
    const response = await axios.get(`${API_BASE_URL}/images`);
    return response.data;
  },

  async searchImages(query: string): Promise<ImageData[]> {
    const response = await axios.get(`${API_BASE_URL}/images/search`, {
      params: { q: query }
    });
    return response.data;
  },

  async getImagesByTags(tags: string[]): Promise<ImageData[]> {
    const response = await axios.get(`${API_BASE_URL}/images/bytags`, {
      params: { tags: tags.join(',') }
    });
    return response.data;
  }
}; 