var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const db = require("./db");
var app = express();
const port = 8080;
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'html');
app.get('/api', (req, res) => {
    res.send(`${new Date()}`);
});
app.get('/api/users', (req, res) => __awaiter(this, void 0, void 0, function* () {
    // res.send(['Aang', 'Katara', 'Momo', 'Sokka', 'Appa']);
    const results = yield db.query("select * from users");
    console.log(results);
    res.status(200).json('test');
}));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err,
    });
});
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
module.exports = app;
//# sourceMappingURL=app.js.map