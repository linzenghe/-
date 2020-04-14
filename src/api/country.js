import ds, { dsc, ___ } from '@/utils/daoService/DaoServiceDDDAdapter';

const sysCountry = ds.QSysCountry
console.log(sysCountry)
export function queryCountry(query) {
  console.log(query)
  return dsc.withModel(sysCountry).select(sysCountry.fieldContainer())
    .paging(query.page, query.limit)
    .where(sysCountry.countryCode.like(___).and(sysCountry.id.eq(___)).and(sysCountry.countryNameEn.like(___)).and(sysCountry.countryNameZh.like(___)).and(sysCountry.validFlag.like(___)))
    .tag('selectCountry')
    .execute(query)
}

export function getCountry(id) {
  return sysCountry.selectOne().byId(id);
}

export function addCountry(data) {
  return sysCountry.saveOrUpdate(data);
}

export function updateCountry(data) {
  return sysCountry.saveOrUpdate(data);
}

export function deleteCountry(data) {
  return sysCountry.delete().byId(data.id);
}

export function exportCountry(query) {
  return dsc
    .withModel(sysCountry)
    .forExport(sysCountry.id, sysCountry.countryCode, sysCountry.countryNameZh, sysCountry.countryNameEn, sysCountry.validFlag)
    .where(sysCountry.countryCode.like(___).and(sysCountry.id.eq(___)).and(sysCountry.countryNameEn.like(___)).and(sysCountry.countryNameZh.like(___)).and(sysCountry.validFlag.like(___)))
    .tag('Test_Country_Export_List_Xlsx')
    .execute(query);
}
