﻿using App.Models;
using App.Models.Bundles;
using Microvac.Web;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace App.Controllers.Services
{
    [Service]
    public class BundleController : ApiController
    {
        private DB db;
        public BundleController(DB db)
        {
            this.db = db;
        }

        private Region GetRegion(String regionId)
        {
            return db.Regions
                .Include(r => r.Parent.Parent)
                .Include(r => r.Parent.Parent.Parent)
                .Include(r => r.Parent.Parent.Parent.Parent)
                .FirstOrDefault(r => r.Id == regionId);
        }

        public TransferBundle GetTransferBundle(String apbnKey, String regionId)
        {
            var region = GetRegion(regionId);

            var result = new TransferBundle
            {
                Region = GetRegion(regionId),
            };

            if(region.Type < RegionType.DESA)
            {
                result.TransferRecapitulations = db.TransferRecapitulations
                    .Where(r => r.ApbnKey == apbnKey && (r.RegionId == regionId || r.ParentRegionId == regionId))
                    .ToList();
            } else
            {
                string syear = apbnKey;
                if (apbnKey.Length > 4)
                    syear = apbnKey.Substring(0, 4);
                int year = Convert.ToInt32(syear);
                result.Transfers = db.Transfers
                    .Where(e => e.Year == year && e.IsActivated && e.fkRegionId == regionId)
                    .ToList();
            }

            result.TransferProgress = db.TransferProgresses
                .Where(r => r.fkRegionId == regionId && r.ApbnKey == apbnKey)
                .ToList();


            return result;
        }

        public AllocationBundle GetAllocationBundle(String subtype, string apbnKey, String regionId)
        {
            var region = GetRegion(regionId);

            var type = DocumentUploadType.NationalDd;
            switch (subtype)
            {
                case "dd":
                    type = region.Type <= RegionType.KABUPATEN
                        ? DocumentUploadType.NationalDd
                        : DocumentUploadType.RegionalDd;
                    break;
                case "add":
                    type = region.Type <= RegionType.KABUPATEN
                        ? DocumentUploadType.NationalAdd
                        : DocumentUploadType.RegionalAdd;
                    break;
                case "bhpr":
                    type = region.Type <= RegionType.KABUPATEN
                        ? DocumentUploadType.NationalBhpr
                        : DocumentUploadType.RegionalBhpr;
                    break;
                default:
                    throw new ApplicationException("unsupported type: " + type);
            }
            
            var spreadsheet = db.Spreadsheets
                .Include(e => e.CreatedBy)
                .Include(e => e.Organization)
                .FirstOrDefault(d => d.Type == type && d.fkRegionId == regionId && d.ApbnKey == apbnKey && d.IsActivated);
            var sourceDocuments = db.SourceDocument
                .Include(e => e.File)
                .Where(d => d.Type == type && d.fkRegionId == regionId && d.ApbnKey == apbnKey)
                .ToList();

            var result = new AllocationBundle
            {
                Region = GetRegion(regionId),
                CurrentSpreadsheet = spreadsheet,
                SourceDocuments = sourceDocuments
            };

            switch (type)
            {
                case DocumentUploadType.NationalDd:
                    result.NationalDdRecapitulations = db.NationalDdRecapitulations
                        .Where(r => r.ApbnKey == apbnKey && (r.RegionId == regionId || r.ParentRegionId == regionId))
                        .ToList();
                    break;
                case DocumentUploadType.RegionalDd:
                    result.RegionalDdRecapitulations = db.RegionalDdRecapitulations
                        .Where(r => r.ApbnKey == apbnKey && (r.RegionId == regionId || r.ParentRegionId == regionId))
                        .ToList();
                    break;
                case DocumentUploadType.NationalAdd:
                    result.NationalAddRecapitulations = db.NationalAddRecapitulations
                        .Where(r => r.ApbnKey == apbnKey && (r.RegionId == regionId || r.ParentRegionId == regionId))
                        .ToList();
                    break;
                case DocumentUploadType.RegionalAdd:
                    result.RegionalAddRecapitulations = db.RegionalAddRecapitulations
                        .Where(r => r.ApbnKey == apbnKey && (r.RegionId == regionId || r.ParentRegionId == regionId))
                        .ToList();
                    break;
                case DocumentUploadType.NationalBhpr:
                    result.NationalBhprRecapitulations = db.NationalBhprRecapitulations
                        .Where(r => r.ApbnKey == apbnKey && (r.RegionId == regionId || r.ParentRegionId == regionId))
                        .ToList();
                    break;
                case DocumentUploadType.RegionalBhpr:
                    result.RegionalBhprRecapitulations = db.RegionalBhprRecapitulations
                        .Where(r => r.ApbnKey == apbnKey && (r.RegionId == regionId || r.ParentRegionId == regionId))
                        .ToList();
                    break;
            }

            return result;
        }

    }
}