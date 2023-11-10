## @formio/lodash
### Important Note: This library has been deprecated.
With our recent innovations with our 5.x @formio/js renderer, including the refactoring of the build process, this library is no longer needed. The "tree-shaking" ability of modern build engines has the ability to remove superfluous code from builds which now makes the purpopse of this library no longer needed. As of 5.x @formio/js renderer and 2.x @formio/core libraries, this library will no longer be needed.

This library is a tiny (3kb gzipped) reduced-set implementation of the Lodash library.

### Usage
To use this library, you will first need to install it into your own application.

    npm install --save @formio/lodash

Next, you can create a new component as follows.

```js
import * as _ from '@formio/lodash';
_.sum([2, 3])
```

Or you can import like so.

```js
import { sum } from '@formio/lodash';
_.sum([2, 3]);
```

### Implemented methods
This library is not intended to be a full featured Lodash implementation. It is tiny, and we want it to stay that way, so we have only included the set of methods that are utilized within the Form.io platform. These methods include the following:

[https://formio.github.io/lodash/modules/index.html](https://formio.github.io/lodash/modules/index.html)
