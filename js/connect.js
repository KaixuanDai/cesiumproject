function connect() {

    var ws = new WebSocket('ws://' + '192.168.1.5' + ':3030');
    ws.onopen = function () {
        console.log("open WebSocket on server");

    };

    ws.onmessage = function (evt) {
        if (tf_a == 0) {
            getWidth(JSON.parse(evt.data));
        }
        updateStats(JSON.parse(evt.data));
    };

    ws.onclose = function () {
        // websocket is closed.
        console.log("Connection is closed...");
    };
}