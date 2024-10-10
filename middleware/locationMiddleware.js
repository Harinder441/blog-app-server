const { getClientIp } = require('request-ip');
const geoip = require('geoip-lite');

const detectLocation = (req, res, next) => {
  const ip = getClientIp(req);
  const geo = geoip.lookup(ip);
  req.userLocation = geo ? geo.country : 'Unknown';
  next();
};

module.exports = detectLocation;