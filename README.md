
Install required tools yo, gulp and bower:

    npm install -g yo gulp bower

Install generator-gulp-angular:

    npm install -g generator-gulp-angular
 
Run

Create a new directory, and go into:

    mkdir my-new-project && cd $_

Run yo gulp-angular, and select desired technologies:
    
    yo gulp-angular

in the config, specify the password and paths to your database.

install  patch  - /yesno:

    npm install -i
    sequelize db:migrate

install patch -  /yesno/client:
    
    npm install -i
    bower install -i    

