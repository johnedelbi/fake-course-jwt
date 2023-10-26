import chalk from 'chalk';

const logger = (req, res, next) => {
    const status = chalk.green(res.statusCode);
    const url = chalk.blue(req.url);
    const method = chalk.greenBright(req.method);
    console.log(
        `status:${status} and the url is ${url} and the method is ${method} `
    );
    next();
};

export default logger;
