import { assert } from 'chai';
import * as _ from './index';

describe('Lang', () => {
    it('_.isEqual', () => {
        assert.isOk(_.isEqual(1, 1));
        assert.isOk(_.isEqual({a: 1}, {a: 1}));
        assert.isNotOk(_.isEqual({a: 1}, {a: 2}));
        assert.isNotOk(_.isEqual({a: 1}, {a: 1, b: 2}));
        assert.isNotOk(_.isEqual([1, 2], [1, 2, 3]));
    });

    it('_.isString', () => {
        assert.isOk(_.isString('string'));
        assert.isNotOk(_.isString(123));
    });

    it('_.isEmpty', () => {
        assert.isOk(_.isEmpty([]));
        assert.isOk(_.isEmpty({}));
        assert.isNotOk(_.isEmpty([1]));
        assert.isNotOk(_.isEmpty({a: 1}));
    });

    it('_.isInteger', () => {
        assert.isOk(_.isInteger(12));
        assert.isNotOk(_.isInteger(12.3));
        assert.isNotOk(_.isInteger('string'));
    });

    it('_.isNaN', () => {
        assert.isOk(_.isNaN(NaN));
        assert.isNotOk(_.isNaN(12));
    });

    it('_.isNil', () => {
        assert.isOk(_.isNil(null));
        assert.isOk(_.isNil(undefined));
        assert.isNotOk(_.isNil({}));
    });

    it('_.isNull', () => {
        assert.isOk(_.isNull(null));
        assert.isNotOk(_.isNull(undefined));
        assert.isNotOk(_.isNull({}));
    });

    it('_.isArray', () => {
        assert.isOk(_.isArray([]));
        assert.isNotOk(_.isArray({}));
    });

    it('_.isObjectLike', () => {
        assert.isOk(_.isObjectLike({}));
        assert.isOk(_.isObjectLike([]));
        assert.isNotOk(_.isObjectLike(() => {}));
        assert.isNotOk(_.isObjectLike('string'));
    });

    it('_.isObject', () => {
        assert.isOk(_.isObject({}));
        assert.isOk(_.isObject([]));
        assert.isOk(_.isObject(() => {}));
        assert.isNotOk(_.isObject('string'));
    });

    it('_.isPlainObject', () => {
        assert.isOk(_.isPlainObject({a: 1}));
        assert.isNotOk(_.isPlainObject({a: {b: 1}}));
    });

    it('_.isNumber', () => {
        assert.isOk(_.isNumber(23));
        assert.isNotOk(_.isNumber('string'));
    });

    it('_.isBoolean', () => {
        assert.isOk(_.isBoolean(true));
        assert.isNotOk(_.isBoolean(12));
    });

    it('_.isRegExp', () => {
        assert.isOk(_.isRegExp(/./));
        assert.isOk(_.isRegExp(new RegExp('.')));
        assert.isNotOk(_.isRegExp('string'));
        assert.isNotOk(_.isRegExp({}));
    });
});
