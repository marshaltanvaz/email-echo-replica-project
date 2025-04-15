import axios from 'axios';

const API_BASE = 'https://api.mail.tm';

export const mailTMService = {
  async createAccount() {
    const password = 'TestPass123!';
    const timestamp = Date.now();

    try {
      // 1. Get a valid domain
      const domainRes = await axios.get(`${API_BASE}/domains`);
      const domain = domainRes.data['hydra:member'][0]?.domain;

      if (!domain) throw new Error('No valid Mail.tm domains found.');

      const email = `user${timestamp}@${domain}`;

      // 2. Create account
      await axios.post(`${API_BASE}/accounts`, {
        address: email,
        password,
      });

      // 3. Login
      const loginRes = await axios.post(`${API_BASE}/token`, {
        address: email,
        password,
      });

      const token = loginRes.data.token;
      
      // Store token in localStorage
      localStorage.setItem('mailtm_token', token);

      console.log('✅ Email created:', email);
      console.log('🔐 Access Token:', token);

      return { email, token };
    } catch (err: any) {
      console.error('❌ Mail.tm error:', err.response?.data || err.message);
      throw err;
    }
  }
};
