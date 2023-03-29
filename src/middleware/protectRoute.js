function protectRoute(req, res, next) {
  if (req.session.authenticated) {
    let { user } = req.session;
    let { _parsedOriginalUrl: { pathname } } = req;
    let date = new Date().toUTCString();

    console.log(`${date} - User ${user.username} just accessed ${pathname}.`);
    next();
  } else {
    res.status(401).json({ message: "You need to be logged in to see this route." });
  }
}

module.exports = protectRoute;