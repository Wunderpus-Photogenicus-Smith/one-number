const { EventEmitter } = require('events');
// Aggregate all profiler results into an event emitter to make
// handling the results generic
const profiles = new EventEmitter();
profiles.on('route', ({ req, elapsedMS }) => {
    // console.log(req.method, req.url, `${elapsedMS}ms`);
});

function getMiddleware(app) {
    let collectedData = {};
    let isPrototypeChanged = false;

    const resetLayerPrototype = () => {
        collectedData = {};
        app._router.stack[0].__proto__.handle_request =
            originalLayerHandleRequest;
        isPrototypeChanged = false;
    };

    const updateLayerPrototype = () => {
        app._router.stack[0].__proto__.handle_request = newLayerHandleRequest;
        isPrototypeChanged = true;
    };

    const originalLayerHandleRequest = function handle(req, res, next) {
        var fn = this.handle;

        if (fn.length > 3) {
            // not a standard request handler
            return next();
        }

        try {
            fn(req, res, next);
        } catch (err) {
            next(err);
        }
    };

    const newLayerHandleRequest = function handle(req, res, next) {
        var fn = this.handle;

        if (fn.length > 3) {
            // not a standard request handler
            return next();
        }

        try {
            const beforeFunctionCal = Date.now(),
                fnName = this.name,
                reqId = req.headers.jagtesterreqid,
                reqRoute = req.url;

            // create a data object in the collected data if it doesnt already exist
            if (!collectedData[reqId]) {
                collectedData[reqId] = {
                    reqId,
                    reqRoute,
                    middlewares: [],
                };
            }

            // add layer information to the collectedData
            collectedData[reqId].middlewares.push({
                name: fnName,
                elapsedTime: 0,
            });

            // call the middleware and time it in the next function
            fn(req, res, function () {
                const lastElIndex = collectedData[reqId].middlewares.length - 1;
                collectedData[reqId].middlewares[lastElIndex].elapsedTime =
                    Date.now() - beforeFunctionCal;
                next();
            });
        } catch (err) {
            next(err);
        }
    };

    // this is the actual middleware that will take jagtestercommands
    return (req, res, next) => {
        // getting the command
        const jagtesterCommand = req.headers.jagtestercommand;
        switch (jagtesterCommand) {
            case 'running':
                //changing the prototype of the layer handle request
                if (!isPrototypeChanged) {
                    updateLayerPrototype();
                }
                break;

            case 'endtest':
                const copiedData = JSON.parse(JSON.stringify(collectedData));
                resetLayerPrototype();
                return res.json(copiedData);
            default:
                // changing layer prototype back to original
                if (isPrototypeChanged) {
                    resetLayerPrototype();
                }
                break;
        }

        return next();
    };
}

module.exports = getMiddleware;
