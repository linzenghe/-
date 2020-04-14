import { Component } from 'react';

const rules = [
  {
    ruleKey: 'Pattern',
    paramCount: 1,
  },
  {
    ruleKey: 'Max',
    paramCount: 1,
  },
  {
    ruleKey: 'Min',
    paramCount: 1,
  },
  {
    ruleKey: 'Length',
    paramCount: 2,
  },
  {
    ruleKey: 'Range',
    paramCount: 2,
  },
  {
    ruleKey: 'DateMax',
    paramCount: 1,
  },
  {
    ruleKey: 'DateMin',
    paramCount: 1,
  },
  {
    ruleKey: 'NumberRange',
    paramCount: 2,
  },
  {
    ruleKey: 'RichLength',
    paramCount: 2,
  },
];

const transformMessage = i18nMessage => {
  let message = i18nMessage.message;
  const keys = i18nMessage.key.split('.');
  const rule = rules.find(val => keys[0] === val.ruleKey);

  message = message.replace('{0}', '${' + keys[keys.length - 1] + '}');
  if (rule) {
    if (rule.paramCount === 1) {
      message = message.replace('{1}', '@{' + rule.ruleKey.toLowerCase() + '}');
    } else {
      message = message.replace('{1}', '@{max}').replace('{2}', '@{min}');
    }
  }
  return message;
};

const reverseMessage = i18nMessage => {
  let message = i18nMessage.message;
  const keys = i18nMessage.key.split('.');
  const rule = rules.find(val => keys[0] === val.ruleKey);

  message = message.replace('${' + keys[keys.length - 1] + '}', '{0}');
  if (rule) {
    if (rule.paramCount === 1) {
      message = message.replace('@{' + rule.ruleKey.toLowerCase() + '}', '{1}');
    } else {
      message = message.replace('@{max}', '{1}').replace('{2}', '@{min}');
    }
  }
  return message;
};
export { transformMessage, reverseMessage };
