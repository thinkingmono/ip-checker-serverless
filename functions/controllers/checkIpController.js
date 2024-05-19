const { StatusCodes } = require('http-status-codes');

const Reader = require('@maxmind/geoip2-node').Reader;

const checkIpController = async (req, res) => {
    // const { body: { ip } } = req;
    // console.log(ip);
    // const userIp = ip;

    const userIp = req.socket.remoteAddress;
    console.log(userIp);

    const ipIsoCode = await Reader.open('dist/db/GeoLite2-Country.mmdb').then(reader => {
        const response = reader.country(userIp);
        console.log(response.country.isoCode);
        return response.country.isoCode;
    });

    res.status(StatusCodes.OK).json(ipIsoCode);
}

module.exports = checkIpController;