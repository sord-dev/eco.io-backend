function protectRoute(req, res, next) {
  if (req.session.authenticated) {
    let { user } = req.session;

    console.log(`user ${user.username} just accessed a protected route.`);
    next();
  } else {
    res.status(401).json({ message: "You need to be logged in to see this route." });
  }
}

module.exports = protectRoute;