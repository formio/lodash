import { assert } from 'chai';
import * as _ from './index';

describe('Array', () => {
    it('_.chunk', () => {
        assert.deepEqual(_.chunk(['a', 'b', 'c', 'd'], 2), [['a', 'b'], ['c', 'd']]);
        assert.deepEqual(_.chunk(['a', 'b', 'c', 'd'], 3), [['a', 'b', 'c'], ['d']]);
    });

    it('_.compact', () => {
        assert.deepEqual(_.compact([0, 1, false, 2, '', 3]), [1, 2, 3]);
    });

    it('_.concat', () => {
        const array = [1];
        assert.deepEqual(_.concat(array, 2, [3], [[4]]), [1, 2, 3, [4]]);
        assert.deepEqual(array, [1]);
    });

    it('_.difference', () => {
        assert.deepEqual(_.difference([2, 1], [2, 3]), [1]);
    });

    it('_.drop', () => {
        assert.deepEqual(_.drop([1, 2, 3]), [2, 3]);
        assert.deepEqual(_.drop([1, 2, 3], 2), [3]);
        assert.deepEqual(_.drop([1, 2, 3], 5), []);
        assert.deepEqual(_.drop([1, 2, 3], 0), [1, 2, 3]);
    });

    it('_.dropRight', () => {
        assert.deepEqual(_.dropRight([1, 2, 3]), [1, 2]);
        assert.deepEqual(_.dropRight([1, 2, 3], 2), [1]);
        assert.deepEqual(_.dropRight([1, 2, 3], 5), []);
        assert.deepEqual(_.dropRight([1, 2, 3], 0), [1, 2, 3]);
    });

    it('_.findIndex', () => {
        const users = [
            { 'user': 'barney', 'active': false },
            { 'user': 'fred', 'active': false },
            { 'user': 'pebbles', 'active': true }
        ];

        assert.deepEqual(_.findIndex(users, function (o: any) { return o.user == 'barney'; }), 0);
        assert.deepEqual(_.findIndex(users, { 'user': 'fred', 'active': false }), 1);
        assert.deepEqual(_.findIndex(users, 'active'), 2);
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

    it('_.chain()', () => {
        assert.deepEqual(
            _.chain([
                { 'user': 'barney', 'age': 36 },
                { 'user': 'fred', 'age': 40 },
                { 'user': 'pebbles', 'age': 1 }
            ])
            .map((o: any) => {
                return `${o.user} is ${o.age}`;
            })
            .value()
        , [
            'barney is 36',
            'fred is 40',
            'pebbles is 1'
        ]);
    });
});