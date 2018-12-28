export class ProfileCtrl {
  constructor($http){
    'ngInject'
    this.http = $http;
    this.hello ="hello World!";
    this.info={};
    this.face={};
    ///localStorage.setItem('mykey','myvalue');
  }
  submit(){



    this.info.id = localStorage.getItem("id");
    this.http.post('api/removePassword', this.info)
      .then(function(res){
        this.res = res;
        this.info={};
      })
      .catch(function(error){
        this.error =error;
      });

  }

  removeFace(){
    let formData= new FormData;
    formData.append("id",localStorage.getItem("id"));
    for (var data in this.face){
      formData.append(data, this.face[data]);
      this.http.post('api/removeFace', formData,{
        transformRequest: angular.identity,
        headers: {
          'Content-Type':undefined
        }
      })
        .then(function(res){
          this.res = res;
          this.dataUsers={};
        })
        .catch(function(error){
          this.error =error;
        });
    }
  }
}