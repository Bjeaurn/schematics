# Getting Started With Schematics

This repository is a basic Schematic implementation that serves as a starting point to create and publish Schematics to NPM.

### Testing

To test locally, install `@angular-devkit/schematics` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with

```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!

### Running a schematic while in development

`schematics .:<schematic-name> --dry-run false`

The `dry-run false` is only necessary when you're doing relative path schematics, when developing. Dry running is on by default when using relative paths.

## Logs

#### Log 20180525 1448

I can parse and walk through a file (using `.toString()` and `JSON.parse()`).
But when I want to record updates (type UpdateRecorder) I only have `insertLeft` and `insertRight`.
So I think I'll have to calculate what index I have to pass it to insert it into the right spot. Kinda tricky? Maybe missing an API for mutations like this.

- AST transformations looks like something to look into.
- Maybe check what @angular/ did here? How they mutated the package.json etc.

#### Log 20180608 0952

JSON files are quite easy to parse and overwrite, looked up an example from the Angular/schematics.
Looking into file manipulation that isn't JSON, seems like more of what I described in the previous log.

Diving into that right now.


#### Log 20180608 1138

Generated a new Angular app, `ng new ng-test`. Used `npm link ../schematics/` to link my schematics. 

Now I could run `schematics schematics:packageupdate` to update my `package.json`.

Back to other file manipulation.


### URL references:

- https://github.com/angular/devkit/blob/master/packages/angular_devkit/schematics_cli/bin/schematics.ts
- https://github.com/angular/devkit/blob/master/packages/angular_devkit/schematics/README.md
- https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2
- https://github.com/angular/angular-cli/tree/master/packages
- https://github.com/maciejtreder/ng-toolkit/blob/master/schematics/_utils/index.ts