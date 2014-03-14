var patterns = {};

(function () {

    var DEF_ERR_ARITY = 3;
    var DEF_HANDLE_ARITY = 2;

    function GenericPipe(options) {
        this.errHandlerArity = DEF_ERR_ARITY || options.errArity;
        this.handlerArity = DEF_HANDLE_ARITY || options.handlerArity;
        this.plugins = [];

    }


    /**
     *The function registers the provided plugin
     */
    GenericPipe.prototype.plug = function (plugin) {
        //Only a function
        if (plugin instanceof Function) {
            this.plugins.push({
                handle: plugin
            });
        }
        //Is it a plugin object
        else if (plugin instanceof Object) {
            this.plugins.push(plugin);
        }
    };

    GenericPipe.prototype.resolve = function (context, req, res, session) {
        context._req = req;
        context._res = res;
        context._session = session;
        handle(context, this.plugins, this.errHandlerArity, this.handlerArity);
    };

    var handle = function (context, plugins, errArity, handlerArity) {
        var index = 0;
        var currentPlugin;

        var recursiveHandle = function (err) {

            currentPlugin = plugins[index];
            index++;

            //Check if there is a plugin
            if (!currentPlugin) {
                return;
            }

            //Check if an error has been provided
            if (err) {
                //Can the current plugin handle the err
                if (currentPlugin.handle.length == errArity) {
                    currentPlugin.handle(err, context, recursiveHandle);
                }
                else {
                    recursiveHandle(err);
                }
            }
            //There is no error so try to invoke the current plugin
            else {
                if (currentPlugin.handle.length == handlerArity) {
                    currentPlugin.handle(context, recursiveHandle);
                }
                else {
                    recursiveHandle();
                }
            }
        };

        recursiveHandle();
    };

    patterns.GenericPipe = GenericPipe;

}());
