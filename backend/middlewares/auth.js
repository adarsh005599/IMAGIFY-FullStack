import jwt from 'jsonwebtoken'


const userAuth = async (req, res, next) => {
  const token = req.headers.token || req.headers.authorization;

  if (!token) {
    return res.json({ success: true, message: '' });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.userId = tokenDecode.id; // ✅ assign directly to req, not req.body
      next();
    } else {
      return res.json({ success: false, message: 'Invalid token' });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export default userAuth