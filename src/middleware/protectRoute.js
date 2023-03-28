function protectRoute(req, res, next) {
  if (req.session.authenticated) {
    let { user } = req.session;
    let { _parsedOriginalUrl: { pathname } } = req;

    console.log(`user ${user.username} just accessed the protected route ${pathname}.`);
    next();
  } else {
    res.status(401).json({ message: "You need to be logged in to see this route." });
  }
}

module.exports = protectRoute;