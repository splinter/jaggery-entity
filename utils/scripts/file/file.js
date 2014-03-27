var file = {};
(function() {
    var log = new Log('utils-file');
    /**
     * The function  checks whether a directory contains a particular file
     * @param dir   The directory in which the file must be checked
     * @param file  A File object if the file exists,else null
     */
    file.getFileInDir = function(dir, fileName) {
        var isFilePresent = false;
        var files = dir.listFiles();
        for (var index in files) {
            if (files[index].getName() == fileName) {
                return files[index];
            }
        }
        return null;
    };
    /**
     * The function returns the file extension of the file
     * @param file
     * @return: The extension of the file
     */
    file.getExtension = function(file) {};
    /**
     * The function returns the name of the file without the file extension
     * @param file A file object
     * @return: The name of the file without the extension
     */
    file.getFileName = function(file) {
        //Get the name of the file
        var baseFileName = file.getName();
        //Break up the name by .
        var baseNameComponents = baseFileName.split('.');
        //Get all of the components except the last one
       	baseNameComponents.splice(baseNameComponents.length - 1, 1);
       	
        return baseNameComponents.join('.');
    };
    /**
     * The function returns the contents of a directory as a JSON object.The name of the
     * file is used as the property names without the extensions.
     * NOTE: The method will not traverse sub folders.
     * @param  The directory to be inspected
     * @return A JSON object which contains the files in the directory
     */
    file.getDirectoryContents = function(dir) {
        var dirContents = {};
        //Check if it is a directory
        if (!dir.isDirectory()) {
            log.info('Not a directory');
            return dirContents;
        }
        //Obtain a list of all files
        var files = this.getAllFiles(dir);
        var name;
        log.info('Files: ' + files);
        //Create the directory object with each file been a property
        for (var index in files) {
            dirContents[this.getFileName(files[index])] = files[index];
        }
        return dirContents;
    };
    /**
     * The function obtains a list of files that are not directories
     * @param dir The directory to be inspected
     * @return An array with all of the files in the directory
     */
    file.getAllFiles = function(dir) {
        var filesInDir = [];
        if (!dir.isDirectory()) {
            return filesInDir;
        }
        //Obtain a list of all files
        var files = dir.listFiles();
        for (var index in files) {
            log.info('Checking file: ' + files[index].getName());
            //Check if the file is a directory
            if (!files[index].isDirectory()) {
                filesInDir.push(files[index]);
            }
        }
        return filesInDir;
    };
    /**
     * The function returns a list of all sub directories in a given directory
     * @param dir The root directory
     * @return: An array containing all sub directories
     */
    file.getAllSubDirs = function(dir) {
        var files = dir.listFiles();
        var subDirs = [];
        for (var index in files) {
            if (files[index].isDirectory()) {
                subDirs.push(files[index]);
            }
        }
        return subDirs;
    };
}());