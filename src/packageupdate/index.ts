import {
  Rule,
  SchematicContext,
  Tree,
  SchematicsException
} from "@angular-devkit/schematics";

export interface PackageJson {
  scripts: { [key: string]: string };
}

const packageJsonPath = "/package.json";
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function packageupdate(options: any): Rule {
  return (tree: Tree, _context: SchematicContext): Tree => {
    // Prevents compiler whine about unused options.
    if (options) {
    }
    _context.logger.debug('Checking and adding missing scripts to package.json');
    const buffer = tree.read(packageJsonPath);
    if(buffer === null) {
      throw new SchematicsException("Could not find package.json");
    }
    const packageJson: PackageJson = JSON.parse(buffer.toString());

    if(packageJson) {
      if (packageJson.scripts['test:ci']) {
        _context.logger.warn("test:ci already exists");
      } else {
        packageJson.scripts["test:ci"] = "bliep bloep I have been added automatically";
      }
    }
    
    tree.overwrite(packageJsonPath, JSON.stringify(packageJson, null, 2));

    return tree;
  };
}

/* // Star Log 20180525 1448
I can parse and walk through a file (using `.toString()` and `JSON.parse()`).
But when I want to record updates (type UpdateRecorder) I only have `insertLeft` and `insertRight`.
So I think I'll have to calculate what index I have to pass it to insert it into the right spot. Kinda tricky? Maybe missing an API for mutations like this.

- AST transformations looks like something to look into.
- Maybe check what @angular/ did here? How they mutated the package.json etc.
*/

/* 
// Star Log 20180608 0952
JSON files are quite easy to parse and overwrite, looked up an example from the Angular/schematics.
Looking into file manipulation that isn't JSON, seems like more of what I described in the previous log.

Diving into that right now.
*/

// URL references:
/* https://github.com/angular/devkit/blob/master/packages/angular_devkit/schematics_cli/bin/schematics.ts 
   https://github.com/angular/devkit/blob/master/packages/angular_devkit/schematics/README.md
   https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2
*/
