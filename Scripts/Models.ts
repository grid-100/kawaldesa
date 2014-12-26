﻿// WARNING: T4 generated file  (it is related to CodeToServerProxy)
//

/// <reference path="../Scaffold/Scripts/typings/jquery/jquery.d.ts"/>

module Scaffold {
    export class AjaxSettings {
        async = true;
        cache = false;
        timeout = -1;

        public build(settings: JQueryAjaxSettings): JQueryAjaxSettings{
            return {
                async: this.async,
                cache: this.cache,
                timeout: this.timeout,
                dataType: 'json',
				contentType: 'application/json',
			    type: settings.type,
			    url: settings.url,
                data: settings.data
            }
        }

    }

	export interface IQuery {
		PageLength?: number;
		PageBegin?: number;
		SortField?: string;
		SortOrder?: string;
	}
}

module App.Models {
	import IQuery = Scaffold.IQuery;
    export interface IBaseAccountRecapitulation {
        ID: number;
        RegionID: number;
        APBNID: number;
        APBNYear: number;
        ParentRegionID: number;
        RegionName: string;
        BudgetedIncome: number;
        RealizedIncome: number;
        BudgetedExpense: number;
        RealizedExpense: number;
        EmployeeExpense: number;
        GoodsAndServicesExpense: number;
        CapitalExpense: number;
        OthersExpense: number;
        TotalVillage: number;
        AccountCompletedVillage: number;
    }

    export class BaseAccountRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        ID: number;
        RegionID: number;
        APBNID: number;
        APBNYear: number;
        ParentRegionID: number;
        RegionName: string;
        BudgetedIncome: number;
        RealizedIncome: number;
        BudgetedExpense: number;
        RealizedExpense: number;
        EmployeeExpense: number;
        GoodsAndServicesExpense: number;
        CapitalExpense: number;
        OthersExpense: number;
        TotalVillage: number;
        AccountCompletedVillage: number;
        constructor(data?: IBaseAccountRecapitulation) {
            this.ID = data ? data.ID : null;
            this.RegionID = data ? data.RegionID : null;
            this.APBNID = data ? data.APBNID : null;
            this.APBNYear = data ? data.APBNYear : null;
            this.ParentRegionID = data ? data.ParentRegionID : null;
            this.RegionName = data ? data.RegionName : null;
            this.BudgetedIncome = data ? data.BudgetedIncome : null;
            this.RealizedIncome = data ? data.RealizedIncome : null;
            this.BudgetedExpense = data ? data.BudgetedExpense : null;
            this.RealizedExpense = data ? data.RealizedExpense : null;
            this.EmployeeExpense = data ? data.EmployeeExpense : null;
            this.GoodsAndServicesExpense = data ? data.GoodsAndServicesExpense : null;
            this.CapitalExpense = data ? data.CapitalExpense : null;
            this.OthersExpense = data ? data.OthersExpense : null;
            this.TotalVillage = data ? data.TotalVillage : null;
            this.AccountCompletedVillage = data ? data.AccountCompletedVillage : null;
        }

    }

    export interface IBaseEntity {
        ID: number;
        DateCreated: /** System.DateTime **/ any;
        DateModified: /** System.DateTime **/ any;
    }

    export class BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        ID: number;
        DateCreated: /** System.DateTime **/ any;
        DateModified: /** System.DateTime **/ any;
        constructor(data?: IBaseEntity) {
            this.ID = data ? data.ID : null;
            this.DateCreated = data ? data.DateCreated : null;
            this.DateModified = data ? data.DateModified : null;
        }

    }

    export interface IBaseTransferRecapitulation {
        ID: number;
        RegionID: number;
        APBNID: number;
        APBNYear: number;
        ParentRegionID: number;
        RegionName: string;
        BudgetedAPBN: number;
        TransferredAPBN: number;
        AcknowledgedAPBN: number;
        BudgetedADD: number;
        TransferredADD: number;
        AcknowledgedADD: number;
        BudgetedTotal: number;
        TransferredTotal: number;
        AcknowledgedTotal: number;
    }

    export class BaseTransferRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        ID: number;
        RegionID: number;
        APBNID: number;
        APBNYear: number;
        ParentRegionID: number;
        RegionName: string;
        BudgetedAPBN: number;
        TransferredAPBN: number;
        AcknowledgedAPBN: number;
        BudgetedADD: number;
        TransferredADD: number;
        AcknowledgedADD: number;
        BudgetedTotal: number;
        TransferredTotal: number;
        AcknowledgedTotal: number;
        constructor(data?: IBaseTransferRecapitulation) {
            this.ID = data ? data.ID : null;
            this.RegionID = data ? data.RegionID : null;
            this.APBNID = data ? data.APBNID : null;
            this.APBNYear = data ? data.APBNYear : null;
            this.ParentRegionID = data ? data.ParentRegionID : null;
            this.RegionName = data ? data.RegionName : null;
            this.BudgetedAPBN = data ? data.BudgetedAPBN : null;
            this.TransferredAPBN = data ? data.TransferredAPBN : null;
            this.AcknowledgedAPBN = data ? data.AcknowledgedAPBN : null;
            this.BudgetedADD = data ? data.BudgetedADD : null;
            this.TransferredADD = data ? data.TransferredADD : null;
            this.AcknowledgedADD = data ? data.AcknowledgedADD : null;
            this.BudgetedTotal = data ? data.BudgetedTotal : null;
            this.TransferredTotal = data ? data.TransferredTotal : null;
            this.AcknowledgedTotal = data ? data.AcknowledgedTotal : null;
        }

    }

    export interface IAccount extends IBaseEntity {
        Code: string;
        Name: string;
        Type: /** App.Models.AccountType **/ any;
        ExpenseType: /** App.Models.ExpenseType **/ any;
        ExpenseGroup: /** App.Models.ExpenseGroup **/ any;
        Target: number;
        IsActivated: boolean;
        DateDeactivated: /** System.DateTime **/ any;
        TargetSource: string;
        fkParentAccountID: number;
        ParentAccount: App.Models.IAccount;
        ChildAccounts: Array<App.Models.IAccount>;
        fkAPBDesID: number;
        APBDes: App.Models.IAPBDes;
        fkCreatedByID: string;
        CreatedBy: /** App.Models.User **/ any;
        fkModifiedByID: string;
        ModifiedBy: /** App.Models.User **/ any;
        fkDeactivatedByID: string;
        DeactivatedBy: /** App.Models.User **/ any;
        ParentCode: string;
    }

    export class Account extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        Code: string;
        Name: string;
        Type: /** App.Models.AccountType **/ any;
        ExpenseType: /** App.Models.ExpenseType **/ any;
        ExpenseGroup: /** App.Models.ExpenseGroup **/ any;
        Target: number;
        IsActivated: boolean;
        DateDeactivated: /** System.DateTime **/ any;
        TargetSource: string;
        fkParentAccountID: number;
        ParentAccount: App.Models.IAccount;
        ChildAccounts: Array<App.Models.IAccount>;
        fkAPBDesID: number;
        APBDes: App.Models.IAPBDes;
        fkCreatedByID: string;
        CreatedBy: /** App.Models.User **/ any;
        fkModifiedByID: string;
        ModifiedBy: /** App.Models.User **/ any;
        fkDeactivatedByID: string;
        DeactivatedBy: /** App.Models.User **/ any;
        ParentCode: string;
        constructor(data?: IAccount) {
            super(data);
            this.Code = data ? data.Code : null;
            this.Name = data ? data.Name : null;
            this.Type = data ? data.Type : null;
            this.ExpenseType = data ? data.ExpenseType : null;
            this.ExpenseGroup = data ? data.ExpenseGroup : null;
            this.Target = data ? data.Target : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.DateDeactivated = data ? data.DateDeactivated : null;
            this.TargetSource = data ? data.TargetSource : null;
            this.fkParentAccountID = data ? data.fkParentAccountID : null;
            this.ParentAccount = data ? data.ParentAccount : null;
            this.ChildAccounts = data ? data.ChildAccounts : null;
            this.fkAPBDesID = data ? data.fkAPBDesID : null;
            this.APBDes = data ? data.APBDes : null;
            this.fkCreatedByID = data ? data.fkCreatedByID : null;
            this.CreatedBy = data ? data.CreatedBy : null;
            this.fkModifiedByID = data ? data.fkModifiedByID : null;
            this.ModifiedBy = data ? data.ModifiedBy : null;
            this.fkDeactivatedByID = data ? data.fkDeactivatedByID : null;
            this.DeactivatedBy = data ? data.DeactivatedBy : null;
            this.ParentCode = data ? data.ParentCode : null;
        }

    }

    export interface IAccountRecapitulation extends IBaseAccountRecapitulation {
    }

    export class AccountRecapitulation extends BaseAccountRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        constructor(data?: IAccountRecapitulation) {
            super(data);
        }

        /* App.Controllers.AccountRecapitulationController */

        static GetAll(query?: IQuery): JQueryPromise<Array<AccountRecapitulation>> {
            var res = $.ajax(AccountRecapitulation.ajaxSettings.build({
                type: 'GET',
                url: '/api/AccountRecapitulation/GetAll',
				data: query,
            })).then((models) => {
                return models.map((model) => new AccountRecapitulation(model));
            });
            return res;
        }

        static Get(id: number): JQueryPromise<AccountRecapitulation> {
            var res = $.ajax(AccountRecapitulation.ajaxSettings.build({
                type: 'GET',
                url: '/api/AccountRecapitulation/Get/'+id,
            })).then((model) => new AccountRecapitulation(model));
            return res;
        }

		static Count(query?: IQuery): JQueryPromise<number> {
            var res = $.ajax(AccountRecapitulation.ajaxSettings.build({
                type: 'GET',
                url: '/api/AccountRecapitulation/GetCount',
				data: query,
            }));
            return res;
        }

                
    }

    export interface IFrozenAccountRecapitulation extends IBaseAccountRecapitulation {
    }

    export class FrozenAccountRecapitulation extends BaseAccountRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        constructor(data?: IFrozenAccountRecapitulation) {
            super(data);
        }

        /* App.Controllers.FrozenAccountRecapitulationController */

        static GetAll(query?: IQuery): JQueryPromise<Array<FrozenAccountRecapitulation>> {
            var res = $.ajax(FrozenAccountRecapitulation.ajaxSettings.build({
                type: 'GET',
                url: '/api/FrozenAccountRecapitulation/GetAll',
				data: query,
            })).then((models) => {
                return models.map((model) => new FrozenAccountRecapitulation(model));
            });
            return res;
        }

        static Get(id: number): JQueryPromise<FrozenAccountRecapitulation> {
            var res = $.ajax(FrozenAccountRecapitulation.ajaxSettings.build({
                type: 'GET',
                url: '/api/FrozenAccountRecapitulation/Get/'+id,
            })).then((model) => new FrozenAccountRecapitulation(model));
            return res;
        }

		static Count(query?: IQuery): JQueryPromise<number> {
            var res = $.ajax(FrozenAccountRecapitulation.ajaxSettings.build({
                type: 'GET',
                url: '/api/FrozenAccountRecapitulation/GetCount',
				data: query,
            }));
            return res;
        }

                
    }

    export interface IAPBD extends IBaseEntity {
        DAU: number;
        DBH: number;
        IsActivated: boolean;
        fkAPBNID: number;
        APBN: App.Models.IAPBN;
        fkRegionID: number;
        Region: App.Models.IRegion;
        fkAPBDFileID: number;
        APBDFile: App.Models.IAPBDFile;
    }

    export class APBD extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        DAU: number;
        DBH: number;
        IsActivated: boolean;
        fkAPBNID: number;
        APBN: App.Models.IAPBN;
        fkRegionID: number;
        Region: App.Models.IRegion;
        fkAPBDFileID: number;
        APBDFile: App.Models.IAPBDFile;
        constructor(data?: IAPBD) {
            super(data);
            this.DAU = data ? data.DAU : null;
            this.DBH = data ? data.DBH : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.fkAPBNID = data ? data.fkAPBNID : null;
            this.APBN = data ? data.APBN : null;
            this.fkRegionID = data ? data.fkRegionID : null;
            this.Region = data ? data.Region : null;
            this.fkAPBDFileID = data ? data.fkAPBDFileID : null;
            this.APBDFile = data ? data.APBDFile : null;
        }

    }

    export interface IAPBDes extends IBaseEntity {
        IsActivated: boolean;
        IsCompleted: boolean;
        DateCompleted: /** System.DateTime **/ any;
        SourceURL: string;
        fkSourceFileID: number;
        SourceFile: App.Models.IBlob;
        fkAPBNID: number;
        APBN: App.Models.IAPBN;
        fkRegionID: number;
        Region: App.Models.IRegion;
        Accounts: Array<App.Models.IAccount>;
        fkCompletedByID: string;
        CompletedBy: /** App.Models.User **/ any;
        fkModifiedByID: string;
        ModifiedBy: /** App.Models.User **/ any;
    }

    export class APBDes extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        IsActivated: boolean;
        IsCompleted: boolean;
        DateCompleted: /** System.DateTime **/ any;
        SourceURL: string;
        fkSourceFileID: number;
        SourceFile: App.Models.IBlob;
        fkAPBNID: number;
        APBN: App.Models.IAPBN;
        fkRegionID: number;
        Region: App.Models.IRegion;
        Accounts: Array<App.Models.IAccount>;
        fkCompletedByID: string;
        CompletedBy: /** App.Models.User **/ any;
        fkModifiedByID: string;
        ModifiedBy: /** App.Models.User **/ any;
        constructor(data?: IAPBDes) {
            super(data);
            this.IsActivated = data ? data.IsActivated : null;
            this.IsCompleted = data ? data.IsCompleted : null;
            this.DateCompleted = data ? data.DateCompleted : null;
            this.SourceURL = data ? data.SourceURL : null;
            this.fkSourceFileID = data ? data.fkSourceFileID : null;
            this.SourceFile = data ? data.SourceFile : null;
            this.fkAPBNID = data ? data.fkAPBNID : null;
            this.APBN = data ? data.APBN : null;
            this.fkRegionID = data ? data.fkRegionID : null;
            this.Region = data ? data.Region : null;
            this.Accounts = data ? data.Accounts : null;
            this.fkCompletedByID = data ? data.fkCompletedByID : null;
            this.CompletedBy = data ? data.CompletedBy : null;
            this.fkModifiedByID = data ? data.fkModifiedByID : null;
            this.ModifiedBy = data ? data.ModifiedBy : null;
        }

        /* App.Controllers.APBDesController */

        static GetAll(query?: IQuery): JQueryPromise<Array<APBDes>> {
            var res = $.ajax(APBDes.ajaxSettings.build({
                type: 'GET',
                url: '/api/APBDes/GetAll',
				data: query,
            })).then((models) => {
                return models.map((model) => new APBDes(model));
            });
            return res;
        }

        static Get(id: number): JQueryPromise<APBDes> {
            var res = $.ajax(APBDes.ajaxSettings.build({
                type: 'GET',
                url: '/api/APBDes/Get/'+id,
            })).then((model) => new APBDes(model));
            return res;
        }

		static Count(query?: IQuery): JQueryPromise<number> {
            var res = $.ajax(APBDes.ajaxSettings.build({
                type: 'GET',
                url: '/api/APBDes/GetCount',
				data: query,
            }));
            return res;
        }

                
        static UpdateSources(): JQueryPromise<void> {
            var res = $.ajax(APBDes.ajaxSettings.build({
                type: 'POST',
                url: '/api/APBDes/UpdateSources',
            }));
            return res;
        }

        static Complete(apbdesID: number): JQueryPromise<void> {
            var res = $.ajax(APBDes.ajaxSettings.build({
                type: 'POST',
                url: '/api/APBDes/Complete?apbdesID='+apbdesID+'',
            }));
            return res;
        }

        static AddAccounts(apbdesID: number, type: number, accounts: Array<App.Models.IAccount>): JQueryPromise<void> {
            var res = $.ajax(APBDes.ajaxSettings.build({
                type: 'POST',
                url: '/api/APBDes/AddAccounts?apbdesID='+apbdesID+'&type='+type+'&accounts='+accounts+'',
            }));
            return res;
        }

        static GetByRegionID(regionID: number): JQueryPromise<App.Models.IAPBDes> {
            var res = $.ajax(APBDes.ajaxSettings.build({
                type: 'GET',
                url: '/api/APBDes/GetByRegionID?regionID='+regionID+'',
            }));
            return res;
        }

    }

    export interface IAPBDFile extends IBaseEntity {
        FileName: string;
        IsActivated: boolean;
        APBDs: Array<App.Models.IAPBD>;
        fkFileID: number;
        File: App.Models.IBlob;
        APBDCount: number;
        TotalDAU: number;
        TotalDBH: number;
    }

    export class APBDFile extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        FileName: string;
        IsActivated: boolean;
        APBDs: Array<App.Models.IAPBD>;
        fkFileID: number;
        File: App.Models.IBlob;
        APBDCount: number;
        TotalDAU: number;
        TotalDBH: number;
        constructor(data?: IAPBDFile) {
            super(data);
            this.FileName = data ? data.FileName : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.APBDs = data ? data.APBDs : null;
            this.fkFileID = data ? data.fkFileID : null;
            this.File = data ? data.File : null;
            this.APBDCount = data ? data.APBDCount : null;
            this.TotalDAU = data ? data.TotalDAU : null;
            this.TotalDBH = data ? data.TotalDBH : null;
        }

        /* App.Controllers.APBDFileController */

        static GetAll(query?: IQuery): JQueryPromise<Array<APBDFile>> {
            var res = $.ajax(APBDFile.ajaxSettings.build({
                type: 'GET',
                url: '/api/APBDFile/GetAll',
				data: query,
            })).then((models) => {
                return models.map((model) => new APBDFile(model));
            });
            return res;
        }

        static Get(id: number): JQueryPromise<APBDFile> {
            var res = $.ajax(APBDFile.ajaxSettings.build({
                type: 'GET',
                url: '/api/APBDFile/Get/'+id,
            })).then((model) => new APBDFile(model));
            return res;
        }

		static Count(query?: IQuery): JQueryPromise<number> {
            var res = $.ajax(APBDFile.ajaxSettings.build({
                type: 'GET',
                url: '/api/APBDFile/GetCount',
				data: query,
            }));
            return res;
        }

                
        Save(): JQueryPromise<void> {
            var isNew = this.ID == null;
            var model = this;
            var res = $.ajax(APBDFile.ajaxSettings.build({
                type: isNew ? 'POST' : 'PUT',
                url: '/api/APBDFile/'+(isNew ? 'Post' : 'Put'),
                data: JSON.stringify(this)
            })).then((id) => {
                if(isNew){
                    this.ID = id;
                }
            });
            return res;
        }

        Delete(): JQueryPromise<void> {
            var res = $.ajax(APBDFile.ajaxSettings.build({
                type: 'DELETE',
                url: '/api/APBDFile/Delete/'+this.ID,
            }));
            return res;
        }

        static Delete(id: number): JQueryPromise<void> {
            var res = $.ajax(APBDFile.ajaxSettings.build({
                type: 'GET',
                url: '/api/APBDFile/Delete/'+id,
            }));
            return res;
        }
                
        static PostFile(): JQueryPromise</** System.Threading.Tasks.Task **/ any> {
            var res = $.ajax(APBDFile.ajaxSettings.build({
                type: 'POST',
                url: '/api/APBDFile/PostFile',
            }));
            return res;
        }

    }

    export interface IAPBN extends IBaseEntity {
        DanaPerDesa: number;
        Year: number;
    }

    export class APBN extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        DanaPerDesa: number;
        Year: number;
        constructor(data?: IAPBN) {
            super(data);
            this.DanaPerDesa = data ? data.DanaPerDesa : null;
            this.Year = data ? data.Year : null;
        }

        /* App.Controllers.APBNController */

        static GetAll(query?: IQuery): JQueryPromise<Array<APBN>> {
            var res = $.ajax(APBN.ajaxSettings.build({
                type: 'GET',
                url: '/api/APBN/GetAll',
				data: query,
            })).then((models) => {
                return models.map((model) => new APBN(model));
            });
            return res;
        }

        static Get(id: number): JQueryPromise<APBN> {
            var res = $.ajax(APBN.ajaxSettings.build({
                type: 'GET',
                url: '/api/APBN/Get/'+id,
            })).then((model) => new APBN(model));
            return res;
        }

		static Count(query?: IQuery): JQueryPromise<number> {
            var res = $.ajax(APBN.ajaxSettings.build({
                type: 'GET',
                url: '/api/APBN/GetCount',
				data: query,
            }));
            return res;
        }

                
        Save(): JQueryPromise<void> {
            var isNew = this.ID == null;
            var model = this;
            var res = $.ajax(APBN.ajaxSettings.build({
                type: isNew ? 'POST' : 'PUT',
                url: '/api/APBN/'+(isNew ? 'Post' : 'Put'),
                data: JSON.stringify(this)
            })).then((id) => {
                if(isNew){
                    this.ID = id;
                }
            });
            return res;
        }

        Delete(): JQueryPromise<void> {
            var res = $.ajax(APBN.ajaxSettings.build({
                type: 'DELETE',
                url: '/api/APBN/Delete/'+this.ID,
            }));
            return res;
        }

        static Delete(id: number): JQueryPromise<void> {
            var res = $.ajax(APBN.ajaxSettings.build({
                type: 'GET',
                url: '/api/APBN/Delete/'+id,
            }));
            return res;
        }
                
    }

    export interface IBlob extends IBaseEntity {
        Name: string;
        Type: string;
        Size: number;
        FilePath: string;
    }

    export class Blob extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        Name: string;
        Type: string;
        Size: number;
        FilePath: string;
        constructor(data?: IBlob) {
            super(data);
            this.Name = data ? data.Name : null;
            this.Type = data ? data.Type : null;
            this.Size = data ? data.Size : null;
            this.FilePath = data ? data.FilePath : null;
        }

        /* App.Controllers.BlobController */

        static GetAll(query?: IQuery): JQueryPromise<Array<Blob>> {
            var res = $.ajax(Blob.ajaxSettings.build({
                type: 'GET',
                url: '/api/Blob/GetAll',
				data: query,
            })).then((models) => {
                return models.map((model) => new Blob(model));
            });
            return res;
        }

        static Get(id: number): JQueryPromise<Blob> {
            var res = $.ajax(Blob.ajaxSettings.build({
                type: 'GET',
                url: '/api/Blob/Get/'+id,
            })).then((model) => new Blob(model));
            return res;
        }

		static Count(query?: IQuery): JQueryPromise<number> {
            var res = $.ajax(Blob.ajaxSettings.build({
                type: 'GET',
                url: '/api/Blob/GetCount',
				data: query,
            }));
            return res;
        }

                
        static Download(blobID: number): JQueryPromise</** System.Net.Http.HttpResponseMessage **/ any> {
            var res = $.ajax(Blob.ajaxSettings.build({
                type: 'GET',
                url: '/api/Blob/Download?blobID='+blobID+'',
            }));
            return res;
        }

    }

    export interface IFieldReport extends IBaseEntity {
        Notes: string;
        Date: /** System.DateTime **/ any;
        IsActivated: boolean;
        fkRealizationID: number;
        Realization: App.Models.IRealization;
        Pictures: Array<App.Models.IBlob>;
        fkCreatedByID: string;
        CreatedBy: /** App.Models.User **/ any;
    }

    export class FieldReport extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        Notes: string;
        Date: /** System.DateTime **/ any;
        IsActivated: boolean;
        fkRealizationID: number;
        Realization: App.Models.IRealization;
        Pictures: Array<App.Models.IBlob>;
        fkCreatedByID: string;
        CreatedBy: /** App.Models.User **/ any;
        constructor(data?: IFieldReport) {
            super(data);
            this.Notes = data ? data.Notes : null;
            this.Date = data ? data.Date : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.fkRealizationID = data ? data.fkRealizationID : null;
            this.Realization = data ? data.Realization : null;
            this.Pictures = data ? data.Pictures : null;
            this.fkCreatedByID = data ? data.fkCreatedByID : null;
            this.CreatedBy = data ? data.CreatedBy : null;
        }

        /* App.Controllers.FieldReportController */

        static GetAll(query?: IQuery): JQueryPromise<Array<FieldReport>> {
            var res = $.ajax(FieldReport.ajaxSettings.build({
                type: 'GET',
                url: '/api/FieldReport/GetAll',
				data: query,
            })).then((models) => {
                return models.map((model) => new FieldReport(model));
            });
            return res;
        }

        static Get(id: number): JQueryPromise<FieldReport> {
            var res = $.ajax(FieldReport.ajaxSettings.build({
                type: 'GET',
                url: '/api/FieldReport/Get/'+id,
            })).then((model) => new FieldReport(model));
            return res;
        }

		static Count(query?: IQuery): JQueryPromise<number> {
            var res = $.ajax(FieldReport.ajaxSettings.build({
                type: 'GET',
                url: '/api/FieldReport/GetCount',
				data: query,
            }));
            return res;
        }

                
        static AddFieldReport(): JQueryPromise</** System.Threading.Tasks.Task **/ any> {
            var res = $.ajax(FieldReport.ajaxSettings.build({
                type: 'POST',
                url: '/api/FieldReport/AddFieldReport',
            }));
            return res;
        }

    }

    export interface IRealization extends IBaseEntity {
        Description: string;
        Vendor: string;
        Sector: /** App.Models.Sector **/ any;
        fkTransactionID: number;
        Transaction: App.Models.ITransaction;
        fkCreatedByID: string;
        CreatedBy: /** App.Models.User **/ any;
    }

    export class Realization extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        Description: string;
        Vendor: string;
        Sector: /** App.Models.Sector **/ any;
        fkTransactionID: number;
        Transaction: App.Models.ITransaction;
        fkCreatedByID: string;
        CreatedBy: /** App.Models.User **/ any;
        constructor(data?: IRealization) {
            super(data);
            this.Description = data ? data.Description : null;
            this.Vendor = data ? data.Vendor : null;
            this.Sector = data ? data.Sector : null;
            this.fkTransactionID = data ? data.fkTransactionID : null;
            this.Transaction = data ? data.Transaction : null;
            this.fkCreatedByID = data ? data.fkCreatedByID : null;
            this.CreatedBy = data ? data.CreatedBy : null;
        }

        /* App.Controllers.RealizationController */

        static GetAll(query?: IQuery): JQueryPromise<Array<Realization>> {
            var res = $.ajax(Realization.ajaxSettings.build({
                type: 'GET',
                url: '/api/Realization/GetAll',
				data: query,
            })).then((models) => {
                return models.map((model) => new Realization(model));
            });
            return res;
        }

        static Get(id: number): JQueryPromise<Realization> {
            var res = $.ajax(Realization.ajaxSettings.build({
                type: 'GET',
                url: '/api/Realization/Get/'+id,
            })).then((model) => new Realization(model));
            return res;
        }

		static Count(query?: IQuery): JQueryPromise<number> {
            var res = $.ajax(Realization.ajaxSettings.build({
                type: 'GET',
                url: '/api/Realization/GetCount',
				data: query,
            }));
            return res;
        }

                
    }

    export interface IRegion extends IBaseEntity {
        ID: number;
        Name: string;
        Type: /** App.Models.RegionType **/ any;
        IsKelurahan: boolean;
        Website: string;
        UrlKey: string;
        fkParentID: number;
        Parent: App.Models.IRegion;
    }

    export class Region extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        ID: number;
        Name: string;
        Type: /** App.Models.RegionType **/ any;
        IsKelurahan: boolean;
        Website: string;
        UrlKey: string;
        fkParentID: number;
        Parent: App.Models.IRegion;
        constructor(data?: IRegion) {
            super(data);
            this.ID = data ? data.ID : null;
            this.Name = data ? data.Name : null;
            this.Type = data ? data.Type : null;
            this.IsKelurahan = data ? data.IsKelurahan : null;
            this.Website = data ? data.Website : null;
            this.UrlKey = data ? data.UrlKey : null;
            this.fkParentID = data ? data.fkParentID : null;
            this.Parent = data ? data.Parent : null;
        }

        /* App.Controllers.RegionController */

        static GetAll(query?: IQuery): JQueryPromise<Array<Region>> {
            var res = $.ajax(Region.ajaxSettings.build({
                type: 'GET',
                url: '/api/Region/GetAll',
				data: query,
            })).then((models) => {
                return models.map((model) => new Region(model));
            });
            return res;
        }

        static Get(id: number): JQueryPromise<Region> {
            var res = $.ajax(Region.ajaxSettings.build({
                type: 'GET',
                url: '/api/Region/Get/'+id,
            })).then((model) => new Region(model));
            return res;
        }

		static Count(query?: IQuery): JQueryPromise<number> {
            var res = $.ajax(Region.ajaxSettings.build({
                type: 'GET',
                url: '/api/Region/GetCount',
				data: query,
            }));
            return res;
        }

                
        static GetByURLKey(urlKey: string): JQueryPromise<App.Models.IRegion> {
            var res = $.ajax(Region.ajaxSettings.build({
                type: 'GET',
                url: '/api/Region/GetByURLKey?urlKey='+encodeURI(urlKey)+'',
            }));
            return res;
        }

    }

    export interface IBaseTransaction extends IBaseEntity {
        Amount: number;
        Date: /** System.DateTime **/ any;
        IsActivated: boolean;
        SourceURL: string;
        fkSourceFileID: number;
        SourceFile: App.Models.IBlob;
        fkAPBNID: number;
        APBN: App.Models.IAPBN;
        fkSourceID: number;
        Source: App.Models.IRegion;
        fkDestinationID: number;
        Destination: App.Models.IRegion;
        fkAccountID: number;
        Account: App.Models.IAccount;
        fkActorID: number;
        Actor: App.Models.IRegion;
        fkCreatedByID: string;
        CreatedBy: /** App.Models.User **/ any;
        fkTransactionFileID: number;
        TransactionFile: App.Models.ITransactionFile;
    }

    export class BaseTransaction extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        Amount: number;
        Date: /** System.DateTime **/ any;
        IsActivated: boolean;
        SourceURL: string;
        fkSourceFileID: number;
        SourceFile: App.Models.IBlob;
        fkAPBNID: number;
        APBN: App.Models.IAPBN;
        fkSourceID: number;
        Source: App.Models.IRegion;
        fkDestinationID: number;
        Destination: App.Models.IRegion;
        fkAccountID: number;
        Account: App.Models.IAccount;
        fkActorID: number;
        Actor: App.Models.IRegion;
        fkCreatedByID: string;
        CreatedBy: /** App.Models.User **/ any;
        fkTransactionFileID: number;
        TransactionFile: App.Models.ITransactionFile;
        constructor(data?: IBaseTransaction) {
            super(data);
            this.Amount = data ? data.Amount : null;
            this.Date = data ? data.Date : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.SourceURL = data ? data.SourceURL : null;
            this.fkSourceFileID = data ? data.fkSourceFileID : null;
            this.SourceFile = data ? data.SourceFile : null;
            this.fkAPBNID = data ? data.fkAPBNID : null;
            this.APBN = data ? data.APBN : null;
            this.fkSourceID = data ? data.fkSourceID : null;
            this.Source = data ? data.Source : null;
            this.fkDestinationID = data ? data.fkDestinationID : null;
            this.Destination = data ? data.Destination : null;
            this.fkAccountID = data ? data.fkAccountID : null;
            this.Account = data ? data.Account : null;
            this.fkActorID = data ? data.fkActorID : null;
            this.Actor = data ? data.Actor : null;
            this.fkCreatedByID = data ? data.fkCreatedByID : null;
            this.CreatedBy = data ? data.CreatedBy : null;
            this.fkTransactionFileID = data ? data.fkTransactionFileID : null;
            this.TransactionFile = data ? data.TransactionFile : null;
        }

    }

    export interface ITransaction extends IBaseTransaction {
    }

    export class Transaction extends BaseTransaction {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        constructor(data?: ITransaction) {
            super(data);
        }

        /* App.Controllers.TransactionController */

        static GetAll(query?: IQuery): JQueryPromise<Array<Transaction>> {
            var res = $.ajax(Transaction.ajaxSettings.build({
                type: 'GET',
                url: '/api/Transaction/GetAll',
				data: query,
            })).then((models) => {
                return models.map((model) => new Transaction(model));
            });
            return res;
        }

        static Get(id: number): JQueryPromise<Transaction> {
            var res = $.ajax(Transaction.ajaxSettings.build({
                type: 'GET',
                url: '/api/Transaction/Get/'+id,
            })).then((model) => new Transaction(model));
            return res;
        }

		static Count(query?: IQuery): JQueryPromise<number> {
            var res = $.ajax(Transaction.ajaxSettings.build({
                type: 'GET',
                url: '/api/Transaction/GetCount',
				data: query,
            }));
            return res;
        }

                
        static AddTransferTransaction(): JQueryPromise</** System.Threading.Tasks.Task **/ any> {
            var res = $.ajax(Transaction.ajaxSettings.build({
                type: 'POST',
                url: '/api/Transaction/AddTransferTransaction',
            }));
            return res;
        }

        static GetTransferTransactions(regionID: number): JQueryPromise<Array</** App.Controllers.TransferTransactionRow **/ any>> {
            var res = $.ajax(Transaction.ajaxSettings.build({
                type: 'GET',
                url: '/api/Transaction/GetTransferTransactions?regionID='+regionID+'',
            }));
            return res;
        }

        static AddAccountTransaction(transaction: App.Models.ITransaction, realization: App.Models.IRealization): JQueryPromise<void> {
            var res = $.ajax(Transaction.ajaxSettings.build({
                type: 'POST',
                url: '/api/Transaction/AddAccountTransaction?transaction='+transaction+'&realization='+realization+'',
            }));
            return res;
        }

        static GetRealizationTransactions(accountID: number): JQueryPromise<Array</** App.Controllers.RealizationTransactionRow **/ any>> {
            var res = $.ajax(Transaction.ajaxSettings.build({
                type: 'GET',
                url: '/api/Transaction/GetRealizationTransactions?accountID='+accountID+'',
            }));
            return res;
        }

    }

    export interface IFrozenTransaction extends IBaseTransaction {
    }

    export class FrozenTransaction extends BaseTransaction {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        constructor(data?: IFrozenTransaction) {
            super(data);
        }

    }

    export interface ITransactionFile extends IBaseEntity {
        FileName: string;
        IsActivated: boolean;
        Transactions: Array<App.Models.ITransaction>;
        fkFileID: number;
        File: App.Models.IBlob;
        TransactionCount: number;
        DesaCount: number;
        TotalAmount: number;
    }

    export class TransactionFile extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        FileName: string;
        IsActivated: boolean;
        Transactions: Array<App.Models.ITransaction>;
        fkFileID: number;
        File: App.Models.IBlob;
        TransactionCount: number;
        DesaCount: number;
        TotalAmount: number;
        constructor(data?: ITransactionFile) {
            super(data);
            this.FileName = data ? data.FileName : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.Transactions = data ? data.Transactions : null;
            this.fkFileID = data ? data.fkFileID : null;
            this.File = data ? data.File : null;
            this.TransactionCount = data ? data.TransactionCount : null;
            this.DesaCount = data ? data.DesaCount : null;
            this.TotalAmount = data ? data.TotalAmount : null;
        }

    }

    export interface ITransferRecapitulation extends IBaseTransferRecapitulation {
    }

    export class TransferRecapitulation extends BaseTransferRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        constructor(data?: ITransferRecapitulation) {
            super(data);
        }

        /* App.Controllers.TransferRecapitulationController */

        static GetAll(query?: IQuery): JQueryPromise<Array<TransferRecapitulation>> {
            var res = $.ajax(TransferRecapitulation.ajaxSettings.build({
                type: 'GET',
                url: '/api/TransferRecapitulation/GetAll',
				data: query,
            })).then((models) => {
                return models.map((model) => new TransferRecapitulation(model));
            });
            return res;
        }

        static Get(id: number): JQueryPromise<TransferRecapitulation> {
            var res = $.ajax(TransferRecapitulation.ajaxSettings.build({
                type: 'GET',
                url: '/api/TransferRecapitulation/Get/'+id,
            })).then((model) => new TransferRecapitulation(model));
            return res;
        }

		static Count(query?: IQuery): JQueryPromise<number> {
            var res = $.ajax(TransferRecapitulation.ajaxSettings.build({
                type: 'GET',
                url: '/api/TransferRecapitulation/GetCount',
				data: query,
            }));
            return res;
        }

                
    }

    export interface IFrozenTransferRecapitulation extends IBaseTransferRecapitulation {
    }

    export class FrozenTransferRecapitulation extends BaseTransferRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        constructor(data?: IFrozenTransferRecapitulation) {
            super(data);
        }

        /* App.Controllers.FrozenTransferRecapitulationController */

        static GetAll(query?: IQuery): JQueryPromise<Array<FrozenTransferRecapitulation>> {
            var res = $.ajax(FrozenTransferRecapitulation.ajaxSettings.build({
                type: 'GET',
                url: '/api/FrozenTransferRecapitulation/GetAll',
				data: query,
            })).then((models) => {
                return models.map((model) => new FrozenTransferRecapitulation(model));
            });
            return res;
        }

        static Get(id: number): JQueryPromise<FrozenTransferRecapitulation> {
            var res = $.ajax(FrozenTransferRecapitulation.ajaxSettings.build({
                type: 'GET',
                url: '/api/FrozenTransferRecapitulation/Get/'+id,
            })).then((model) => new FrozenTransferRecapitulation(model));
            return res;
        }

		static Count(query?: IQuery): JQueryPromise<number> {
            var res = $.ajax(FrozenTransferRecapitulation.ajaxSettings.build({
                type: 'GET',
                url: '/api/FrozenTransferRecapitulation/GetCount',
				data: query,
            }));
            return res;
        }

                
    }

    export interface IUserScope extends IBaseEntity {
        fkUserID: string;
        User: /** App.Models.User **/ any;
        fkRegionID: number;
        Region: App.Models.IRegion;
    }

    export class UserScope extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        fkUserID: string;
        User: /** App.Models.User **/ any;
        fkRegionID: number;
        Region: App.Models.IRegion;
        constructor(data?: IUserScope) {
            super(data);
            this.fkUserID = data ? data.fkUserID : null;
            this.User = data ? data.User : null;
            this.fkRegionID = data ? data.fkRegionID : null;
            this.Region = data ? data.Region : null;
        }

    }

}
