import * as _ from './index';
import { assert } from 'chai';

describe('Lodash', () => {
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
    it('_.each(array)', () => {
        let i = 0;
        const arr = [
            { a: 'A' },
            { b: 'B' }
        ];
        _.each(arr, (obj: any, index: any) => {
            assert.strictEqual(index, i);
            assert.deepEqual(obj, arr[i]);
            i++;
        });
        assert.strictEqual(i, 2);
    });
    it('_.each(array): Break Early', () => {
        let i = 0;
        const arr = [
            { a: 'A' },
            { b: 'B' }
        ];
        _.each(arr, (obj: any, index: any) => {
            assert.strictEqual(index, i);
            assert.deepEqual(obj, arr[i]);
            i++;
            return true;
        });
        assert.strictEqual(i, 1);
    });
    it('_.each(object)', () => {
        let i = 0;
        const arr = {
            a: 'A',
            b: 'B',
            c: 'C'
        };
        const keys = Object.keys(arr);
        const values = Object.values(arr);
        _.each(arr, (obj: any, index: any) => {
            assert.strictEqual(index, keys[i]);
            assert.deepEqual(obj, values[i]);
            i++;
        });
        assert.strictEqual(i, 3);
    });
    it('_.each(object): Break Early', () => {
        let i = 0;
        const arr = {
            a: 'A',
            b: 'B',
            c: 'C'
        };
        const keys = Object.keys(arr);
        const values = Object.values(arr);
        _.each(arr, (obj: any, index: any) => {
            assert.strictEqual(index, keys[i]);
            assert.deepEqual(obj, values[i]);
            i++;
            return true;
        });
        assert.strictEqual(i, 1);
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
        }
        const result = _.cloneDeep(original)

        // check equality
        assert.deepEqual(original, result)

        // check methods
        assert.equal(original.method(232, 59), result.method(232, 59))
        assert.equal(original.nestedObject.someKey.someValues[1].obj.furtherNested.moreNested.extremelyNested(232, 4), result.nestedObject.someKey.someValues[1].obj.furtherNested.moreNested.extremelyNested(232, 4))

        // check modifying reference
        result.nestedObject.someKey.someValues[0].obj = 99
        assert.equal(original.nestedObject.someKey.someValues[0].obj, 1)
    });
    it('_.ceil()', () => {
        assert.equal(_.ceil(35.568, 1), 35.6);
        assert.equal(_.ceil(35.528, 1), 35.6);
        assert.equal(_.ceil(35.568, 2), 35.57);
        assert.equal(_.ceil(35.522, 2), 35.53);
        assert.equal(_.ceil(6040, -2), 6100);
    });
});