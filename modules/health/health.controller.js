export const getHealth = (req, res) => {
    req.log.info("health check called");
    res.status(200).json({
        status: 'ok',
        upTime: process.uptime(),
        timeStamp: new Date().toISOString()
    })
}