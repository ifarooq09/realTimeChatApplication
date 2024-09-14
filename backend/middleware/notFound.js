const notFound = (req, res) => res.status(404).send('Rpute does not exist');

module.exports = notFound;