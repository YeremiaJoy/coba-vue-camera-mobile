import axios from 'axios';

class UploadService {
  async upload(payload) {
    const res = await axios.post(`https://dev.werkules.systeric.com/api/uploads`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  }
}

export default UploadService;
