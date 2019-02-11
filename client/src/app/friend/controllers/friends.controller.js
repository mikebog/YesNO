export class FriendController {
  constructor ($timeout, friendsService,mainService, webDevTec, $http, $scope,toastr) {
    'ngInject'
    var vm = this;
    friendsService.returnFriend().then(info=>{
      vm.friends = info.friends;
      vm.subscriber = info.subscriber;
      vm.followed = info.followed
    })
    vm.toastr = toastr
    vm.friendsService= friendsService;
    vm.tableKey=[1,0,0]
    vm.http = $http;
    vm.scope = $scope;
    vm.promise = $scope.pr;
    vm.TablePerson = [];
    vm.UserAction = mainService.UsersAction;
    vm.MyData = mainService.Mydata;
    vm.scope.items=[]
    vm.counter =3

    vm.DynamicItems = function(friendServ,id,dataFollows) {

      this.loadedPages = {};
      this.dataFollows=dataFollows
      this.id=id
      this.friendServ =friendServ
      this.numItems = 0;

      this.PAGE_SIZE = 5;

      this.fetchNumItems_();
      this.check = []
    };

    // Required.
    vm.DynamicItems.prototype.getItemAtIndex = function(index) {
      var pageNumber = Math.floor(index / this.PAGE_SIZE);
      var page = this.loadedPages[pageNumber];

      if (page) {
        return page[index % this.PAGE_SIZE];
      } else if (page !== null) {
        this.fetchPage_(pageNumber);
      }
    };

    // Required.
    vm.DynamicItems.prototype.getLength = function() {
      return this.numItems;
    };

    this.DynamicItems.prototype.fetchPage_ = function(pageNumber) {

      this.loadedPages[pageNumber] = null;

        var pageOffset = pageNumber * this.PAGE_SIZE;
        this.friendServ(pageOffset,this.id)
          .then(response=>{
            this.loadedPages[pageNumber] =response.result
          })

    };

    vm.DynamicItems.prototype.fetchNumItems_ = function() {
      this.dataFollows.getLength(this.id,0)
        .then(numPosts=>{
          this.numItems = numPosts.length
        })
      this.numItems = 50000;

    };
    vm.getDataFriends = function(friendsService, webDevTec){
      this.friendsData = friendsService.getFriends();
      this.TablePerson = webDevTec.getdata();

    }
    vm.deleteFollows = function(followers){
      vm.UserAction.DeleteFollow(followers.id).then(res=>{
        vm.res = res;
      })
      let bufer ={}
      for(let key in followers){
        bufer[key] = followers[key]
        delete followers[key]
      }
      vm.subscriber.push(bufer)
      //post.User.follows[0]=null
    }
    vm.deleteFollows1 = function(followers) {

      vm.UserAction.DeleteFollow(followers.id).then(res=>{
        vm.res = res;
      })
      for(let key in followers){
        delete followers[key]
      }
    }
    vm.follow = function(subs){
      //post.User.follows[0]=1

      vm.UserAction.Follow(subs.id).then(res =>{
        vm.res = res;
      })
      vm.toastr.info('Подписались на  <a  target="_blank"><b>'+subs.login+'</b></a>');
      let bufer ={}
      for(let key in subs){
        bufer[key] = subs[key]
        delete subs[key]
      }
      vm.friends.push(bufer)
    }
    // Follow(person){
    // }
    vm.testF = function(){
      vm.test=false;
    }
    vm.show = function(key){
      for(let i in vm.tableKey){
        vm.tableKey[i]=0
      }
      vm.tableKey[key]=1
    }
    vm.addRow = function(){
      vm.rows.push("Row"+vm.counter)
      vm.counter++;
    }
    vm.showPost = function(id){
      vm.testOneDataPerson=new vm.DynamicItems(vm.friendsService.dataFollow.getPersonPosts,id,vm.friendsService.dataFollow)

    }
    vm.getReaction = function(reaction,posts){

      posts.reactions.push({reaction:"true"})
      if(reaction==0){
        posts.no++;
      } else posts.yes++;

      vm.MyData.getReaction(reaction, posts,0).then(res=>{
        vm.scope.percent = res;
      });
    }

  }



}