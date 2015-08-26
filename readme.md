# React-Presentation

Presentation structure forked from [slide](https://github.com/wridgers/slide)

To run,

```bash
git submodule init
git submodule update
npm install

# 7, 8, and 9 require individual installs as they are submodules.
$DIR = $(pwd)
cd $DIR/examples/7\ redux && npm install
cd $DIR/examples/8\ redux\ devtools && npm install
cd $DIR/examples/9\ universal && npm install

# Run the presentation
npm start
open localhost:8008
```
