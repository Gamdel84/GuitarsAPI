import { generateToken } from '../utils/token-generator.js';

const default_user = {
    id:1,
    email: 'gam@guitars.com',
    password: 'TocaLaViolaEnLaMayor'
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = { id: 1, email };

  if (email === default_user.email && password === default_user.password) {
    const token = generateToken(user);
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
};

export default {login};
