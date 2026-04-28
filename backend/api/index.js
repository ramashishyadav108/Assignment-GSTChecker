import app, { connectDB } from '../app.js';

export default async (req, res) => {
  await connectDB();
  return app(req, res);
};
