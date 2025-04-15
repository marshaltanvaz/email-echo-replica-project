import axios from 'axios';

const BASE_URL = 'https://api.mail.tm';

interface Account {
  address: string;
  password: string;
  token?: string;
}

interface Message {
  id: string;
  from: {
    address: string;
    name: string;
  };
  subject: string;
  intro: string;
  html: string[];
  text: string[];
  createdAt: string;
}

class MailTMService {
  private account: Account | null = null;

  async createAccount(): Promise<Account> {
    try {
      const response = await axios.post(`${BASE_URL}/accounts`, {
        address: `user${Math.random().toString(36).substring(2, 10)}@mail.tm`,
        password: Math.random().toString(36).substring(2, 10)
      });
      
      this.account = response.data;
      return this.account;
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  }

  async getToken(): Promise<string> {
    if (!this.account) {
      throw new Error('No account created');
    }

    try {
      const response = await axios.post(`${BASE_URL}/token`, {
        address: this.account.address,
        password: this.account.password
      });

      this.account.token = response.data.token;
      return this.account.token;
    } catch (error) {
      console.error('Error getting token:', error);
      throw error;
    }
  }

  async getMessages(): Promise<Message[]> {
    if (!this.account?.token) {
      throw new Error('No token available');
    }

    try {
      const response = await axios.get(`${BASE_URL}/messages`, {
        headers: {
          Authorization: `Bearer ${this.account.token}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  async getMessageById(id: string): Promise<Message> {
    if (!this.account?.token) {
      throw new Error('No token available');
    }

    try {
      const response = await axios.get(`${BASE_URL}/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${this.account.token}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching message:', error);
      throw error;
    }
  }

  getCurrentAccount(): Account | null {
    return this.account;
  }
}

export const mailTMService = new MailTMService(); 