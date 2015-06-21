﻿/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="../KawalDesa.ts"/>


module App.Controllers {

    export interface ICurrentUser {
        Id: string;
        FacebookId: String;
        Name: String;
        Roles: String[];
        Scopes: string[];
    }

    interface MyWindow extends Window {
        CurrentUser: ICurrentUser;
    }

    declare var window: MyWindow;

    import Models = App.Models;
    import Controllers = App.Controllers.Models;

    var CHILD_NAMES = [
        "Daerah",
        "Provinsi",
        "Kabupaten / Kota",
        "Kecamatan",
        "Desa"
    ];

    export class IndexCtrl {

        regionTree: Models.Region[];
        region: Models.Region;
        childName: string;
        type = "transfer";
        currentUser: ICurrentUser;
        regionId: string;
        isPathReplacing = false;
        currentPath = null;

        static $inject = ["$scope", "$location"];

        constructor(public $scope, public $location){
            var ctrl = this;
            var scope = this.$scope;
            this.currentUser = window.CurrentUser;

            if(!ctrl.isPathReplacing)
                ctrl.onLocationChange();
            ctrl.isPathReplacing = false;

            $scope.$on('$locationChangeSuccess', function () {
                if(!ctrl.isPathReplacing)
                    ctrl.onLocationChange();
                ctrl.isPathReplacing = false;
            });

        }

        onLocationChange() {
            var path = this.$location.path();
            if (path == this.currentPath)
                return;
            var regionId:string = null;
            var regionKey = null;
            if (path == "/" || path == "") {
                regionId = "0";
                this.type = "transfer";
            } else if (path.indexOf("/p/") != -1) {
                regionId = this.$location.path().replace("/p/", "");
                this.type = "transfer";
            } else if (path.indexOf("/r/") != -1) {
                regionId = this.$location.path().replace("/r/", "");
                this.type = "realization";
            } else if (path.indexOf("/apbn/") != -1) {
                regionId = this.$location.path().replace("/apbn/", "");
                this.type = "apbn";
            } else if (path.indexOf("/add/") != -1) {
                regionId = this.$location.path().replace("/add/", "");
                this.type = "add";
            } else if (path.indexOf("/bhpr/") != -1) {
                regionId = this.$location.path().replace("/bhpr/", "");
                this.type = "bhpr";
            } else if (path.indexOf("/dashboard") != -1) {
                this.type = "dashboard";
            } else if (path.indexOf("/login") != -1) {
                this.type = "login";
            } else {
                this.type = "realization";
                regionKey = path.substring(1);
            }

            if(regionId != null || regionKey)
                this.loadRegion(regionId, regionKey);

            if (regionId == null && !regionKey)
                regionId = "0";
            this.regionId = regionId;
            this.currentPath = path;
        }

        changeType(type, $event) {
            if (this.type != 'dashboard') {
                $event.preventDefault();
                var t = "p"
                if (type == "realization")
                    t = "r";
                else if (type == "apbn")
                    t = "apbn";
                else if (type == "add")
                    t = "add";
                else if (type == "bhpr")
                    t = "bhpr";
                var path = "/" + t + "/" + this.region.Id;
                this.$location.path(path);
            }
        }

        changeRegion(regionId, $event) {
            $event.preventDefault();
            this.$scope.$broadcast("regionChangeBefore");
            var t = "p"
            if (this.type == "realization")
                t = "r";
            else if (this.type == "apbn")
                t = "apbn";
            else if (this.type == "add")
                t = "add";
            else if (this.type == "bhpr")
                t = "bhpr";
            var path = "/" + t + "/" + regionId;
            this.$location.path(path);
        }

        hasAnyVolunteerRoles() {
            return this.currentUser != null
                && this.currentUser.Roles.some(r => r.indexOf("volunteer_") != -1);
        }

        isInRole(roleName) {
            if (!this.currentUser) {
                return false;
            }
            return this.currentUser.Roles.some(r => roleName == r);
        }

        isInScope(entityId) {
            var regionId = this.regionTree.map(r => r.Id);
            regionId.push(entityId);
            return regionId.some(rid => this.currentUser.Scopes.some(id => rid == id));
        }

        isInRoleAndScope(roleName, entityId) {
            return this.isInRole(roleName) && this.isInScope(entityId);
        }

        loadRegion(parentId?: string, parentKey?: string) {
            var ctrl = this;

            this.regionTree = [];
            this.childName = CHILD_NAMES[0];

            var promise = null;
            if (parentId != null)
                promise = Controllers.RegionController.Get(parentId);
            else if (parentKey)
                promise = Controllers.RegionController.GetByURLKey(parentKey);

            promise.done((region: Models.Region) => {
                ctrl.$scope.$apply(() => {
                    ctrl.region = region;
                    ctrl.regionId = region.Id;
                    var regionTree = [];
                    var cur : Models.IRegion = region;
                    while (cur) {
                        regionTree.push(cur);
                        cur = cur.Parent;
                    }
                    ctrl.regionTree = regionTree.reverse();
                    if (regionTree.length < CHILD_NAMES.length)
                        ctrl.childName = CHILD_NAMES[regionTree.length];

                    setTimeout(() => {
                        ctrl.$scope.$apply(() => {
                            ctrl.$scope.$broadcast("regionChangeSuccess");
                        });
                    }, 0);
                    if (region.UrlKey && ctrl.$location.path() != "/" + region.UrlKey) {
                        ctrl.isPathReplacing = true;
                        ctrl.$location.path("/" + region.UrlKey);
                        ctrl.$location.replace();
                    }
                });
            });
        }

    }

    kawaldesa.controller("IndexCtrl", IndexCtrl);
}