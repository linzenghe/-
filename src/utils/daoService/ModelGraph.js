(function(window) {
  /** @mixin */
  var ds = window.ds;
  if (!window.ds) ds = window.ds = {};
  ds.types = { field: Field, pk: PrimaryKeyField, combined: Combined };

  /** @type FieldExpression
  * @constructor */
  function Field() {}

  /** @type FieldExpression
  * @constructor */
  function PrimaryKeyField() {}

  /** @type ModelExpression
  * @param modelName
  * @constructor */
  function Combined(modelName) { this.modelName = modelName; }

  var f = new Field();
  var p = new PrimaryKeyField();
  var c = Combined;

  ds.QWaybillRouteNode = { arrivalSiteName: f, siteNum: f, startingSiteName: f, waybillId: f, waybillRouteNodeId: p };
  ds.QWaybillInfo = { collectDatetime: f, collectEmployeeCname: f, collectEmployeeId: f, collectEmployeeMobile: f, consigneeCname: f, consigneeMobile: f, deliveryAddressDetail: f, deliveryAreaCode: f, productTypeCode: f, sendAddressDetail: f, sendAreaCode: f, shipperCname: f, shipperMobile: f, waybillId: p };
  ds.QTimerVersion = { identifier: f, modifyTime: f, timerId: p, version: f };
  ds.QSupportedLocale = { country: f, display: f, id: p, language: f, state: f, variant: f };
  ds.QDept = { deptId: p, deptName: f };
  ds.QEmployee = { address: f, age: f, cname: f, createTime: f, creator: f, deptId: f, email: f, employeeId: p, mobile: f, modifier: f, password: f, sex: f, username: f, dept: new c('Dept') };
  ds.QAppNodes = { appName: f, id: p, nodeName: f, nodeNum: f };
  ds.QImportConfig = { allowParameter: f, async: f, childrenTable: f, className: f, dealService: f, defineColumn: f, dictionaryUrl: f, id: p, methodName: f, primaryColumns: f, template: f, validateHead: f, validateMethod: f };
  ds.QWaybillFee = { insuranceFee: f, totalFreight: f, volume: f, waybillId: p, weight: f };
  ds.QExportConfig = { async: f, className: f, columnSetting: f, dictionaryUrl: f, fileName: f, id: p, pageSize: f, printMode: f, sortType: f, sourceUrl: f, statisticsUrl: f, template: f };
  ds.QDict = { dictKey: f, dictKeyBool: f, dictName: f, dictValue: f, id: p };
  ds.QSysCountry = { countryCode: f, countryNameEn: f, countryNameZh: f, createOffice: f, createTime: f, createTimeZone: f, creator: f, id: p, lastModifyBy: f, lastModifyOffice: f, lastModifyTime: f, lastModifyTimeZone: f, recordVersion: f, validFlag: f };
  ds.QChangeLog = { changeData: f, dataSourceId: f, id: p, modelName: f, operateTime: f, operator: f, sqlStmt: f };
  ds.QI18nMessages = { id: p, key: f, localeId: f, message: f };
  ds.QGtxTrans = { gtxTransId: p, identifier: f, modifyTime: f, modifyTimeSec: f, participants: f, transName: f, tryCount: f, txCreateTime: f, txMode: f, txStatus: f, xid: f };
}(window));
