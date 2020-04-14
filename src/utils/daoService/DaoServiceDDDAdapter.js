import ds, { dsc, ___ } from './DaoServiceClientES6Adapter';

const autoTagging = ({ modelName, operator }) => `DS_${modelName}_${operator}`;

const { ModelExpression, DeleteCommand, SelectOneCommand } = ds.types;

ModelExpression.prototype.select = function() {
  return dsc.withModel(this).select(this.fieldContainer());
};

ModelExpression.prototype.selectOne = function() {
  return dsc.withModel(this).selectOne(this.fieldContainer());
};

SelectOneCommand.prototype.byId = function(pkValue) {
  const modelExpression = this.modelCommand.modelExpression;
  const _primaryKey = modelExpression._primaryKey;
  const modelName = modelExpression._modelName;
  const tag = autoTagging({
    modelName,
    operator: 'selectOneById',
  });
  return this.where(_primaryKey.eq$(pkValue))
    .tag(tag)
    .execute();
};

ModelExpression.prototype.saveOrUpdate = function(record) {
  const _primaryKey = this._primaryKey;
  const modelName = this._modelName;
  const pkName = _primaryKey.fieldName;
  if (record[pkName]) {
    return dsc
      .withModel(this)
      .update()
      .tag(
        autoTagging({
          modelName,
          operator: 'updateById',
        }),
      )
      .execute(record);
  } else {
    return dsc
      .withModel(this)
      .add()
      .tag(
        autoTagging({
          modelName,
          operator: 'saveNew',
        }),
      )
      .execute(record);
  }
};

ModelExpression.prototype.delete = function() {
  return dsc.withModel(this).delete();
};

DeleteCommand.prototype.byId = function(id) {
  const modelExpression = this.modelCommand.modelExpression;
  const modelName = modelExpression._modelName;
  const tag = autoTagging({
    modelName,
    operator: 'deleteById',
  });
  return this.id(id)
    .tag(tag)
    .execute();
};

export {
  ___,
  dsc
};

export default ds;
