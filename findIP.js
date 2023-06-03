const fs = require('fs')
const getIp4Address = () => {
  const os = require('os')
  const ifaces = os.networkInterfaces()
  let ip4 = ''
  Object.keys(ifaces).forEach(function (ifname) {
    ifaces[ifname].forEach(function (iface) {
      if (ip4 === '' && iface.family === 'IPv4' && !iface.internal) {
        ip4 = iface.address
        return
      }
    })
  })
  return ip4
}

const writeIpToEnv = () => {
  fs.writeFileSync('./apps/learning-buddy/.env', `IP=${ip}`);

const ip = getIp4Address()
writeIpToEnv()