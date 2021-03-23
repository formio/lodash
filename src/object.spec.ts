import { assert } from 'chai';
import * as _ from './object';

describe('Object', () => {
    it('_.get', () => {
        assert.equal(_.get({
            a: { b: { c: [null, null, { d: 'hello' }] } }
        }, 'a.b.c[2].d'), 'hello');
    });
    it('_.set', () => {
        assert.equal(_.set({}, 'a.b.c', 'hello').a.b.c, 'hello');
        assert.equal(_.set({}, 'a[2].b.c', 'hello').a[2].b.c, 'hello');
        assert.equal(_.set({}, 'a[2][1].b[3].c', 'hello').a[2][1].b[3].c, 'hello');
    });
    it('_.cloneDeep()', () => {
        const original: any = {
            method: (inp1: any, inp2: any) => inp1 * inp2,
            nestedObject: {
                someKey: {
                    someValues: [
                        { obj: 1 },
                        {
                            obj: {
                                furtherNested: { moreNested: { extremelyNested: (inp1: any, inp2: any) => inp1 ** inp2 } }
                            }
                        }
                    ]
                }
            }
        };
        const result = _.cloneDeep(original);

        // check equality
        assert.deepEqual(original, result);

        // check methods
        assert.equal(original.method(232, 59), result.method(232, 59));
        assert.equal(original.nestedObject.someKey.someValues[1].obj.furtherNested.moreNested.extremelyNested(232, 4), result.nestedObject.someKey.someValues[1].obj.furtherNested.moreNested.extremelyNested(232, 4));

        // check modifying reference
        result.nestedObject.someKey.someValues[0].obj = 99;
        assert.equal(original.nestedObject.someKey.someValues[0].obj, 1);

        // Verify that functions cannot be clobbered.
        const obj: any = {
            funcs: {
                sum: function (a: any, b: any) {
                    return a + b;
                }
            }
        };
        const cloned: any = _.cloneDeep(obj);
        cloned.funcs.sum = function (a: any, b: any) {
            return a - b;
        };
        assert.equal(obj.funcs.sum(2, 2), 4);
    });
    it('_.merge', () => {
        const object = {
            'a': [{ 'b': 2 }, { 'd': 4 }]
        };

        const other = {
            'a': [{ 'c': 3 }, { 'e': 5 }]
        };
        assert.deepEqual(_.merge(object, other), { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] });
        assert.deepEqual(_.merge(
            {key: ''},
            {key: 'firstName', label: 'First Name'}
        ), {key: 'firstName', label: 'First Name'})
    });
});