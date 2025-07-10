// controllers/imageController.js
import FormData from "form-data";
import userModel from "../models/userModel.js";
import axios from "axios";

export const genrateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.userId; // ✅ use from middleware

    if (!userId || !prompt) {
      return res.json({ success: false, message: 'Missing Details' });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    if (user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: 'No Credit Balance',
        creditBalance: user.creditBalance,
      });
    }

    const formData = new FormData();
    formData.append('prompt', prompt);

    const { data } = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,
          ...formData.getHeaders(),
        },
        responseType: 'arraybuffer',
      }
    );

    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;

    const newCredit = user.creditBalance - 1;
    await userModel.findByIdAndUpdate(user._id, { creditBalance: newCredit });

    res.json({
      success: true,
      message: "Image Generated",
      creditBalance: newCredit,
      resultImage,
    });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
export default genrateImage