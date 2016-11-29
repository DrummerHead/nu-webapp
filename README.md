# nu-webapp

This is a starting point for a new webapp, inspired by [generator-webapp](https://github.com/yeoman/generator-webapp). Replace this file with your own README afterwards.


## Differences between generator-webapp and nu-webapp

The first difference is that generator-webapp is a [Yeoman](http://yeoman.io/) generator, while nu-webapp is a repository you clone, like [web-starter-kit](https://github.com/google/web-starter-kit). generator-webapp will give you options to install jQuery, Modernizer, etc; while nu-webapp gives you no such options (this doesn't mean you can't install them yourself, just that there is not an initialization wizard).


|                      | nu-webapp | generator-webapp |
|---------------------:|:---------:|:----------------:|
|                 Gulp |     ✓     |         ✓        |
|  ES6 with Babel(ify) |     ✓     |         ✓        |
|    CSS Autoprefixing |     ✓     |         ✓        |
|          BrowserSync |     ✓     |         ✓        |
|                 SASS |     ✓     |         ✓        |
|   Automagically lint |           |         ✓        |
|          Source maps |     ✓     |         ✓        |
|   Image optimization |     ✓     |         ✓        |
|                Bower |           |         ✓        |
|           Browserify |     ✓     |                  |
| Airbnb eslint config |     ✓     |                  |
|         SASS linting |     ✓     |                  |
|         HTML linting |     ✓     |                  |

There are more features you can find by looking into the [package.json](https://github.com/DrummerHead/nu-webapp/blob/master/package.json) and [gulpfile.js](https://github.com/DrummerHead/nu-webapp/blob/master/gulpfile.js).

tl;dr: Bower-- Browserify++ lint_all_the_things++


## Requirements

Node v6.9.1

I recommend using [NVM](https://github.com/creationix/nvm) for installing and changing to different Node versions.

If you have NVM installed, upon switching to this project folder you can type `nvm use` to switch node to the `6.9.1` version.


## Installing

Put popcorn in microwave.

Change `name-of-your-app` to the name of your app or module in these commands:

```bash
git clone git@github.com:DrummerHead/nu-webapp.git name-of-your-app
cd name-of-your-app/
rm -rf .git
git add . && git commit -m "Fresh nu-webapp"
npm install --global gulp-cli
npm install
```

Go eat popcorn while NPM installs packages.

### Using Yarn instead of NPM

If you're popcorn-intolerant, you can use [Yarn](https://yarnpkg.com/) instead of NPM:

```bash
git clone git@github.com:DrummerHead/nu-webapp.git name-of-your-app
cd name-of-your-app/
rm -rf .git
git add . && git commit -m "Fresh nu-webapp"
yarn global add gulp-cli
yarn
```


## Workflows

### Develop

Start local server with:

```bash
gulp serve
```

Make changes to your HTML, SCSS and/or JS; add NPM Modules if you want. Go wild.

After you think the changes have achieved a specific goal (ready for commit), lint your HTML, CSS and/or JS with any of:

```bash
gulp scripts-lint
```

```bash
gulp sass-lint
```

```bash
gulp html-lint
gulp html-lint-2
```

Useful links for understanding more about lint errors:

- https://github.com/airbnb/javascript
- http://eslint.org/docs/rules/
- https://github.com/sasstools/sass-lint/tree/master/docs/rules
- https://github.com/yaniswang/HTMLHint/wiki/Rules

After making any corrections, add & commit your changes.

The second html linter is the official w3c one. Keeping both for now, will change in the future after I find a solution to its pretty bad console output.


### Build

When you're ready to make a transpiled, concatenated and minified version of your app ready for online consumption, run:

```bash
gulp build
```

And copy the contents of `dist` to your server.

