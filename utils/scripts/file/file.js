var file={};

(function () {

    var log=new Log();

    /**
     * The function  checks whether a directory contains a particular file
     * @param dir   The directory in which the file must be checked
     * @param file  A File object if the file exists,else null
     */
    file.getFileInDir = function (dir, fileName) {
        var isFilePresent = false;
        var files = dir.listFiles();

        for (var index in files) {
            if (files[index].getName() == fileName) {
                log.info('File: '+fileName+' found.');
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
    file.getExtension=function(file){

    };

    /**
     * The function returns the name of the file without the file extension
     * @param file A file object
     * @return: The name of the file without the extension
     */
    file.getFileName=function(file){

    };

    /**
     * The function returns a list of all sub directories in a given directory
     * @param dir The root directory
     * @return: An array containing all sub directories
     */
    file.getAllSubDirs=function(dir){
       var files=dir.listFiles();
       var subDirs=[];

       for(var index in files){
           if(files[index].isDirectory()){
                subDirs.push(files[index]);
           }
       }

       return subDirs;
    };

}());

