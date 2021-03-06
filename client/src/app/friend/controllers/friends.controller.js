export class FriendController {
  constructor($timeout, friendsService, mainService, $http, $scope, toastr,$document) {
    'ngInject'
    var vm = this;
    vm.checkToken = mainService.checkAuth.checkToken()
    vm.checkMySub = false;
    vm.searchText = '';
    vm.toastr = toastr;
    vm.friendsService = friendsService;
    vm.tableKey = [1, 0, 0];
    vm.http = $http;
    vm.scope = $scope;
    vm.promise = $scope.pr;
    vm.TablePerson = [];
    vm.UserAction = mainService.UsersAction;
    vm.MyData = mainService.Mydata;
    vm.scope.items = [];
    vm.counter = 3;
    vm.checkMobilePost = false;
    vm.document =$document;



    this.DynamicItemsFriends = function (onlyFriends, searchText = null, key) {
      this.loadedPages = {};
      this.searchText = searchText;
      this.onlyFriends = onlyFriends
      this.numItems = 0;
      this.relationship = key;
      this.PAGE_SIZE = 5;
      this.fetchNumItems_();
      this.check = []
    };

    this.DynamicItemsFriends.prototype.getItemAtIndex = function (index) {
      var pageNumber = Math.floor(index / this.PAGE_SIZE);
      var page = this.loadedPages[pageNumber];

      if (page) {
        return page[index % this.PAGE_SIZE];
      } else if (page !== null) {
        this.fetchPage_(pageNumber);
      }
    };

    this.DynamicItemsFriends.prototype.getLength = function () {
      return this.numItems;
    };

    this.DynamicItemsFriends.prototype.fetchPage_ = function (pageNumber) {
      this.loadedPages[pageNumber] = null;
      var pageOffset = pageNumber * this.PAGE_SIZE;
      this.onlyFriends(pageOffset, this.searchText, this.relationship)
        .then(response => {
          this.loadedPages[pageNumber] = response.friends
        });

    };

    this.DynamicItemsFriends.prototype.fetchNumItems_ = function () {
      this.onlyFriends("length", this.searchText, this.relationship)
        .then(numPosts => {
          this.numItems = numPosts.length
        })
    };
    vm.onlyFriendsData = new vm.DynamicItemsFriends(friendsService.dataFollow.getmyFriends, null, 2)

    vm.DynamicItems = function (friendServ, id, dataFollows) {
      this.loadedPages = {};
      this.dataFollows = dataFollows
      this.id = id
      this.friendServ = friendServ
      this.numItems = 0;
      this.PAGE_SIZE = 5;
      this.fetchNumItems_();
      this.check = []
    };

    // Required.
    vm.DynamicItems.prototype.getItemAtIndex = function (index) {
      var pageNumber = Math.floor(index / this.PAGE_SIZE);
      var page = this.loadedPages[pageNumber];
      if (page) {
        return page[index % this.PAGE_SIZE];
      } else if (page !== null) {
        this.fetchPage_(pageNumber);
      }
    };

    // Required.
    vm.DynamicItems.prototype.getLength = function () {
      return this.numItems;
    };

    this.DynamicItems.prototype.fetchPage_ = function (pageNumber) {
      this.loadedPages[pageNumber] = null;
      var pageOffset = pageNumber * this.PAGE_SIZE;
      this.friendServ(pageOffset, this.id)
        .then(response => {
          this.loadedPages[pageNumber] = response.result;
        })

    };

    vm.DynamicItems.prototype.fetchNumItems_ = function () {
      this.dataFollows.getLength(this.id, 0)
        .then(numPosts => {
          this.numItems = numPosts.length;
        })
    };

    vm.showUser = function () {
      vm.checkMobilePost = false;
    }

    vm.deleteFollows = function (followers) {
      vm.UserAction.DeleteFollow(followers.id).then(res => {
        vm.res = res;
      })
      let bufer = {}
      for (let key in followers) {
        bufer[key] = followers[key]
        delete followers[key]
      }
      vm.subscriber.push(bufer)
      //post.User.follows[0]=null
    }
    vm.deleteFollows1 = function (followers) {
      vm.UserAction.DeleteFollow(followers.id).then(res => {
        vm.res = res;
        vm.onlyFriendsData.loadedPages={}
      })

      for (let key in followers) {
        delete followers[key]
      }
    }
    vm.follow = function (subs) {
      vm.UserAction.Follow(subs.id).then(res => {
        vm.res = res;
      })
      vm.toastr.info('Подписались на  <a  target="_blank"><b>' + subs.login + '</b></a>');
      let bufer = {};
      vm.onlyFriendsData.loadedPages={}
      for (let key in subs) {
        bufer[key] = subs[key];
        delete subs[key];
      }
      vm.friends.push(bufer)
    }
    vm.show = function (key) {
      for (let i in vm.tableKey) {
        vm.tableKey[i] = 0;
      }
      vm.tableKey[key] = 1;
    }
    vm.searchT = function () {
      vm.onlyFriendsData = new vm.DynamicItemsFriends(friendsService.dataFollow.getmyFriends, vm.searchText, 3);

    }

    vm.showUsers = function (key) {
      vm.key = key;
      if (key == 0) {
        vm.checkMySub = true
      } else if (key == 3) {
        vm.checkMySub = null;
      } else {
        vm.checkMySub = false;
      }
      vm.onlyFriendsData = new vm.DynamicItemsFriends(friendsService.dataFollow.getmyFriends, null, key);
    }

    vm.addRow = function () {
      vm.rows.push("Row" + vm.counter)
      vm.counter++;
    }

    vm.showPost = function (id) {

      if(this.document[0].body.clientWidth<=600) {
        vm.checkMobilePost = true;
      }
      vm.testOneDataPerson = new vm.DynamicItems(vm.friendsService.dataFollow.getPersonPosts, id, vm.friendsService.dataFollow);
    }

    vm.getReaction = function (reaction, posts) {
      posts.reactions.push({reaction: "true"})
      if (reaction == 0) {
        posts.no++;
      } else posts.yes++;

      vm.MyData.getReaction(reaction, posts, 0).then(res => {
        vm.scope.percent = res;
        posts.percent = res.percent;
      });
    }
  }
}
