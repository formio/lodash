import * as _ from './math';
import { assert } from 'chai';

describe('Math', () => {
    it('_.add', () => {
        assert.equal(_.add(2, 3), 5);
    });
    it('_.ceil', () => {
        assert.equal(_.ceil(35.568, 1), 35.6);
        assert.equal(_.ceil(35.528, 1), 35.6);
        assert.equal(_.ceil(35.568, 2), 35.57);
        assert.equal(_.ceil(35.522, 2), 35.53);
        assert.equal(_.ceil(6040, -2), 6100);
    });
    it('_.divide', () => {
        assert.equal(_.divide(4, 2), 2);
    });
    it('_.floor', () => {
        assert.equal(_.floor(5.555), 5);
        assert.equal(_.floor(5.555, 1), 5.5);
        assert.equal(_.floor(5.555, 2), 5.55);
    });
    it('_.max', () => {
        assert.deepEqual(_.max([2, 4, 6, 10, 8]), 10);
    });
});