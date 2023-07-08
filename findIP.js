const fs = require('fs');
require('dotenv').config({ path: './apps/learning-buddy/.env' });

const getIp4Address = () => {
  const os = require('os');
  const ifaces = os.networkInterfaces();
  let ip4 = '';
  Object.keys(ifaces).forEach(function (ifname) {
    ifaces[ifname].forEach(function (iface) {
      if (ip4 === '' && iface.family === 'IPv4' && !iface.internal) {
        ip4 = iface.address;
        return;
      }
    });
  });
  return ip4;
};
const currentIP = process.env.IP;
const ip = getIp4Address();

const evaluateIP = () => {
  if (currentIP === ip) {
    console.log('IP match confirmed');
    return;
  } else {
    const supabaseURL = process.env.SUPABASEURL;
    const supabasePublicKey = process.env.SUPABASEKEY_PUBLIC;
    const supabaseSecretKey = process.env.SUPABASEKEY_SECRET;
    fs.writeFileSync(
      './apps/learning-buddy/.env',
      `IP=${ip}\nSUPABASEURL='${supabaseURL}'\nSUPABASEKEY_PUBLIC='${supabasePublicKey}'\nSUPABASEKEY_SECRET='${supabaseSecretKey}'`
    );
  }
};

evaluateIP();
