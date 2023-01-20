angular
.module('app')
.controller('AppCtrl', AppCtrl);

AppCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector', '$state', '$window'];

function AppCtrl($scope, $ocLazyLoad, $injector, $state, $window) {
	var vm = this;
	vm.openMenu = '';
	vm.userName = '';
	vm.showSide = true;
	$ocLazyLoad.load([
		APPURL + 'app.service.js?v=' + VERSION,
	]).then(function (d) {
		AppSvc = $injector.get('AppSvc');
		NotAllowedMenuSvc = $injector.get("NotAllowedMenuSvc");
		vm.getUserCredentials();
		vm.openMenu = $state.current.params.urlGroup;
	});
	vm.getUserCredentials = function () {
		// LOADING.classList.add("open");
		AppSvc.get().then(function (response) {
			if (response) {
				vm.userName = response.record.user;
				vm.level = response.record.level;
				vm.pic = response.record.pic ? response.record.pic : 'assets/images/default.jpg';
				// vm.getMenus();
			} else {
				vm.logout();
			}
		})
	};
	vm.getMenus = function () {
		NotAllowedMenuSvc.get({ allowed: true }).then(function (response) {
			if (response.message) {
				vm.menuList = [];
			} else {
				var menuList = [];
				var menus = response.groupBy('FormGroup');
				for (var key in menus) {
					menuList.push({ group: key, value: menus[key] });
				};
				vm.menuList = menuList;
			}
			// LOADING.classList.remove("open");
		})
	}
	vm.dashboard = function () {
		vm.openMenu = '';
	}
	vm.openSubMenu = function (number) {
		var currentMenu = vm.openMenu;
		vm.openMenu = currentMenu === number ? '' : number;
	};
	vm.openSideMenu = function () {
		var body = angular.element(document.querySelector('body'));
		if (vm.showSide) {
			body.addClass('sidebar-mobile-show sidebar-hidden');
			vm.showSide = false;
		} else {
			body.removeClass('sidebar-mobile-show sidebar-hidden');
			vm.showSide = true;
		}
	};
	vm.okayButton = function (type) {
		if (type === 'idle') {
			$window.location.reload();
		} else {
			angular.element(document.getElementById('page-not-allowed')).removeClass('open');
		}

	}
	vm.logout = function () {
		window.location.href = PROJURL + '/login/logout';
	};
	Array.prototype.groupBy = function (prop) {
		return this.reduce(function (groups, item) {
			var val = item[prop];
			groups[val] = groups[val] || [];
			groups[val].push(item);
			return groups;
		}, {});
	};
}
