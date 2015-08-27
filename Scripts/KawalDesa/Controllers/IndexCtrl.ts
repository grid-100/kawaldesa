﻿/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="../KawalDesa.ts"/>


module App.Controllers {

    function safeApply(scope, fn) {
        (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
    }

    export interface ICurrentUser {
        Id: string;
        FacebookId: String;
        Name: String;
        fkOrganizationId: number;
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

    var ROUTES = [
        ["/dd/", "dd", true],
        ["/add/", "add", true],
        ["/bhpr/", "bhpr", true],
        ["/p/", "transfer", true],
        ["/r/", "realization", true],
        ["/dashboard", "dashboard", false],
        ["/orgs", "orgs", false],
        ["/u/", "users", false],
        ["/login", "login", false],
    ];

    export class IndexCtrl {

        regionTree: Models.Region[];
        region: Models.Region;
        childName: string;
        type = "transfer";
        currentUser: ICurrentUser;
        regionId: string;
        guessedRegionType: number;
        isPathReplacing = false;
        currentPath = null;

        activeUploadType: App.Models.DocumentUploadType;
        activeUploadRegionId: string;
        activeUpload: App.Models.Spreadsheet;
        newUploadFile: any;
        newUpload: App.Models.Spreadsheet;
        newUploadState = false;

        activeSources:  App.Models.SourceDocument[];
        newSourceFile: any;
        newSourceSubType: any;
        newSourceFunction: any;
        newSourceRegion: any;
        newSourceState = false;

        static $inject = ["$scope", "$location"];

        constructor(public $scope, public $location){
            $scope.App = App;
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
            this.type = null;
            if (path == "/" || path == "") {
                regionId = "0";
                this.type = "transfer";
            } else {
                var matched : any[] = ROUTES.filter(r => path.indexOf(r[0]) == 0);
                if (matched[0]) {
                    this.type = matched[0][1] ;
                    if (matched[0][2]) {
                        regionId = path.replace(matched[0][0], "");
                    }
                }
            }
            if (this.type == null) {
                this.type = "realization";
                regionKey = path.substring(1);
            }

            this.guessedRegionType = this.guessType(regionId);
            this.regionId = regionId;

            if(regionId != null || regionKey)
                this.loadRegion(regionId, regionKey);
            if (regionId == null && !regionKey)
                regionId = "0";

            this.guessedRegionType = this.guessType(regionId);
            this.regionId = regionId;
            this.currentPath = path;


        }

        changeType(type, $event) {

            for (var i = 0, len = ROUTES.length; i < len; i++) {
                var route = ROUTES[i];
                var useRegionId = route[2];
                var routeType = route[1];
                if (this.type == routeType && !useRegionId) {
                    return;
                }
            }

            if (this.type != 'dashboard') {
                $event.preventDefault();
                var matched : any[] = ROUTES.filter(r => r[1] == type);
                var path = matched[0][0] + this.region.Id;
                this.$location.path(path);
            }
        }

        changeRegion(regionId, $event) {
            $event.preventDefault();
            var type = this.type;
            var matched : any[] = ROUTES.filter(r => r[1] == type);
            var path = matched[0][0] + regionId;
            this.$location.path(path);
        }

        searchRegions(keyword) {
            return Controllers.RegionSearchResultController.GetAll({ "keyword": keyword });
        }

        onSearchSelected(item, model, label) {
            console.log(model);
            var regionId = model.Type == 4 ? model.ParentId : model.Id;
            var type = this.type;
            var matched : any[] = ROUTES.filter(r => r[1] == type);
            var path = matched[0][0] + regionId;
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

        modal(selector, action) {
            var modal: any = $(selector);
            modal.modal(action);
        }

        configureDocumentUpload(type: App.Models.DocumentUploadType, regionId: string) {
            this.activeUploadType = type;
            this.activeUploadRegionId = regionId;
            this.newUpload = new Models.Spreadsheet();
            var ctrl = this;
            ctrl.activeUpload = null;
            Controllers.SpreadsheetController.GetActive(type, regionId, "2015p").done(doc => {
                ctrl.$scope.$apply(() => {
                    ctrl.activeUpload = doc;
                    if (doc) {
                        ctrl.newUpload.DocumentName = doc.DocumentName;
                        ctrl.newUpload.Notes = doc.Notes;
                    }
                });
            });
            Controllers.SourceDocumentController.GetAll({"fkRegionId": regionId, "type": type, "apbnKey": "2015p"}).done(sources => {
                ctrl.$scope.$apply(() => {
                    ctrl.activeSources = sources;
                });
            });
        }

        upload() {
            var ctrl = this;
            var multipart = new Scaffold.Multipart({ files: this.newUploadFile, forms: this.newUpload });
            ctrl.newUploadState = true;
            Controllers.SpreadsheetController.Upload(multipart, this.activeUploadType, this.activeUploadRegionId, "2015p").success(() => {
                safeApply(ctrl.$scope, () => {
                    ctrl.modal('#document-upload-modal', 'hide');
                    ctrl.configureDocumentUpload(ctrl.activeUploadType, ctrl.activeUploadRegionId);
                    ctrl.$scope.$broadcast("regionChangeSuccess");
                });
            }).finally(() => {
                safeApply(ctrl.$scope, () => {
                    ctrl.newUploadState = false;
                });
            });;
        }

        uploadSource() {
            var typeStr = this.newSourceRegion.Id == "0" ? "National" : "Regional";
            typeStr = typeStr + this.newSourceSubType;
            var type = Models.DocumentUploadType[typeStr];
            var fn = parseInt(this.newSourceFunction);

            var ctrl = this;
            var multipart = new Scaffold.Multipart({ files: this.newSourceFile });
            ctrl.newSourceState = true;
            Controllers.SourceDocumentController.Upload(multipart, type, fn, this.newSourceRegion.Id, "2015p").success(() => {
                safeApply(ctrl.$scope, () => {
                    ctrl.modal('#source-upload-modal', 'hide');
                    ctrl.configureDocumentUpload(ctrl.activeUploadType, ctrl.activeUploadRegionId);
                });
            }).finally(() => {
                safeApply(ctrl.$scope, () => {
                    ctrl.newSourceState = false;
                });
            });;
        }

        guessType(regionId: string) {
            if (regionId == "0")
                return 0;
            if (!regionId)
                return null;
            return (regionId.match(/\./g) || []).length + 1;
        }

        loadRegion(parentId?: string, parentKey?: string) {
            setTimeout(() => {
                ctrl.$scope.$apply(() => {
                this.$scope.$broadcast("regionChangeBefore");
                });
            }, 0);
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

                    /* configure source upload defaults */
                    ctrl.newSourceRegion = region;
                    if (region.Type == 1 || region.Type == 3)
                        ctrl.newSourceRegion = region.Parent;
                    if (region.Type == 4)
                        ctrl.newSourceRegion = region.Parent.Parent;
                    ctrl.newSourceFunction = ctrl.type == "transfer" ? "1" : "0";
                    if (ctrl.type == "dd")
                        ctrl.newSourceSubType = "Dd";
                    if (ctrl.type == "add")
                        ctrl.newSourceSubType = "Add";
                    if (ctrl.type == "bhpr")
                        ctrl.newSourceSubType = "Bhpr";
                    /* end configure source upload defaults */

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

        /* Google Sheet */

        isLoadingUrl = false;

        openGoogleSheet() {
            if (this.isLoadingUrl)
                return;
            var ctrl = this;
            this.isLoadingUrl = true;
            Controllers.SpreadsheetController.GetCurrentSheetUrl(this.activeUploadType, this.activeUploadRegionId, "2015p").done(url => {
                ctrl.$scope.$apply(() => {
                    ctrl.isLoadingUrl = false;
                    window.open(url, "_blank");
                });
            });
        }
        /* End Google Sheet*/

        showSearch() {
            this.$scope.searchShown = true;
            setTimeout(function () {
                $(".search-input-group input").focus();
                $(".search-input-group input").select();
            }, 0);
        }

    }

    kawaldesa.controller("IndexCtrl", IndexCtrl);
}