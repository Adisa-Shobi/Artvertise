const Stripe = require('stripe')(process.env.SECRET_KEY);

app.post('/api/payment', async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
  console.log(token);
  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: 'usd',
    });
    status = 'success';
  } catch (error) {
    console.log(error);
    status = 'Failure';
  }
  res.json({ error, status });
});
