import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
function App() {
    var _a = React.useState(null), data = _a[0], setData = _a[1];
    var getData = function () {
        fetch('/api')
            .then(function (result) { return result.text(); })
            .then(function (res) { return setData(res); });
    };
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement(Button, null, "HELLO WORLD"),
            React.createElement("p", null,
                "Edit ",
                React.createElement("code", null, "src/App.js"),
                " and save to reload."),
            React.createElement("button", { onClick: getData }, "Click Me For Data"),
            data)));
}
export default App;
//# sourceMappingURL=App.js.map