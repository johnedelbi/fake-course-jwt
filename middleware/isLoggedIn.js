const isLoggedIn = (req, res, next) => {
    if (req.cookie.token) {
        console.log(req.cookie.token);
        next();
    } else {
        res.status(302).redirect('/login');
    }
};

export default isLoggedIn;
