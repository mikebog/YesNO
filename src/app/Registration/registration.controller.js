export class RegistrationController {
  constructor(registration, $scope, $http){
    'ngInject'
    var that =this;
    this.Hello = "Hello";
    this.scope=$scope;
    this.MyData=["siski"];
    this.dataUsers={}
    this.http = $http;
     this.Mydata = registration.Mydata;
     this.Mydata.getData().then(res=>{
       that.info = res;
     });


  }

  submit() {
    var that = this;

    this.Mydata.getUser(this.dataUsers).then(res => {
        that.ret = res;
      }
    )

    // this.http.post('http://localhost:8000/registration_user', this.dataUsers)
    //   .then(function(res){
    //       this.res = res;
    //       this.dataUsers=null;
    //     },
    //     function(error){
    //       this.error =error;
    //     });

  }
}
