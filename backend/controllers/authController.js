import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import RefreshToken from '../models/RefreshToken.js';

const ACCESS_EXPIRES = '15m';
const REFRESH_EXPIRES_MS = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

const signAccessToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: ACCESS_EXPIRES });

const signRefreshToken = (id) =>
  jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

const issueTokens = async (user) => {
  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);

  // Hash before storing so a DB leak doesn't expose valid tokens
  const hashed = crypto.createHash('sha256').update(refreshToken).digest('hex');
  await RefreshToken.create({
    token: hashed,
    user: user._id,
    expiresAt: new Date(Date.now() + REFRESH_EXPIRES_MS),
  });

  return { accessToken, refreshToken };
};

const userPayload = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
});

export const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = await User.create({ name, email, password, phone });
    const { accessToken, refreshToken } = await issueTokens(user);

    res.status(201).json({
      message: 'Account created successfully',
      accessToken,
      refreshToken,
      user: userPayload(user),
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const { accessToken, refreshToken } = await issueTokens(user);

    res.json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: userPayload(user),
    });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token required' });
    }

    // Verify signature + expiry
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch {
      return res.status(401).json({ message: 'Invalid or expired refresh token' });
    }

    // Check it exists in DB (not revoked)
    const hashed = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const stored = await RefreshToken.findOne({ token: hashed, user: decoded.id });
    if (!stored) {
      return res.status(401).json({ message: 'Refresh token revoked or not found' });
    }

    // Rotate: delete old, issue new pair
    await RefreshToken.deleteOne({ _id: stored._id });

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    const { accessToken, refreshToken: newRefreshToken } = await issueTokens(user);

    res.json({
      message: 'Tokens refreshed',
      accessToken,
      refreshToken: newRefreshToken,
      user: userPayload(user),
    });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      const hashed = crypto.createHash('sha256').update(refreshToken).digest('hex');
      await RefreshToken.deleteOne({ token: hashed });
    }
    res.json({ message: 'Logged out successfully' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMe = async (req, res) => {
  res.json({ user: req.user });
};
