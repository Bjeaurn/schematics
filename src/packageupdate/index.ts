import {
  Rule,
  SchematicContext,
  Tree,
  UpdateRecorder
} from "@angular-devkit/schematics";

export interface PackageJson {
  scripts: { [key: string]: string };
}
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function packageupdate(options: any): Rule {
  return (tree: Tree, _context: SchematicContext): Tree => {
    // Prevents compiler whine about unused options.
    if (options) {
    }
    const file = tree.get("/package.json");
    if (file) {
      const json: PackageJson = JSON.parse(file.content.toString());
      const ciTest = json.scripts["test:ci"];
      if (ciTest) {
        console.warn("test:ci already exists");
      } else {
        json.scripts["test:ci"] = "bliep bloep I have been added automatically";
      }
    }
    const test: UpdateRecorder = tree.beginUpdate("/package.json");
    test.insertLeft(0, "test?");
    tree.commitUpdate(test);
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

// URL references:
/* https://github.com/angular/devkit/blob/master/packages/angular_devkit/schematics_cli/bin/schematics.ts 
   https://github.com/angular/devkit/blob/master/packages/angular_devkit/schematics/README.md
   https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2
*/
