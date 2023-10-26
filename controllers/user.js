import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import hashPassword from '../utils/hashPassword.js';

const userControllers = {
    signUp: (req, res) => {
        const { email, password } = req.body;
        // check if email exist
        const emailExist = User.getUserByEmail(email);
        if (!emailExist) {
            // validate email
            const isEmailValid = validateEmail(email);
            const isPasswordValid = validatePassword(password);
            if (isEmailValid && isPasswordValid) {
                const hashedPassword = hashPassword(password);
                const user = new User(email, hashedPassword);
                user.addUser();
                req.session.isLoggedIn = true;
                req.session.email = email;
                res.status(302).redirect('/');
            } else {
                res.status(409).render('message', {
                    title: 'Not valid',
                    message: 'the email or the password is not valid '
                });
            }
        } else {
            res.status(409).render('message', {
                title: 'Email already exists',
                message: 'this email is already taken'
            });
        }
    },
    logIn: (req, res) => {
        const { email, password } = req.body;

        // check id email exists
        const emailExist = User.getUserByEmail(email);
        if (!emailExist) {
            res.status(401).render('message', {
                title: 'No valid account',
                message: `the account is not valid`
            });
        } else {
            // check password
            bcrypt.compare(password, emailExist.password, (err, isValid) => {
                if (isValid) {
                    req.session.isLoggedIn = true;
                    req.session.email = email;
                    res.status(302).redirect('/');
                } else {
                    res.status(409).render('message', {
                        title: 'log in failed',
                        message: 'email or password is not correct'
                    });
                }
            });
        }
    },
    signUpForm: (req, res) => {
        res.status(200).render('form', {
            action: '/sign-up',
            button: 'Sign up',
            isLoggedIn: req.session.isLoggedIn
        });
    },
    loginForm: (req, res) => {
        res.status(200).render('form', {
            action: '/login',
            button: 'Log in',
            isLoggedIn: req.session.isLoggedIn
        });
    },
    logOut: (req, res) => {
        res.clearCookie('token');
        res.redirect('/');
    }
};

export default userControllers;
