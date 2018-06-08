import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addScriptPackageJson } from '../utilities/package-json';
import { addImportStatement } from '../utilities/file';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function packageupdate(options: any): Rule {
  return (tree: Tree, _context: SchematicContext): Tree => {
    // Prevents compiler whine about unused options.
    if (options) {
    }
    tree = addScriptPackageJson(tree, 'test:ci', 'bliep bloep this was added automatically');
    addImportStatement(tree, "src/app/app.component.ts", "test", "my-test");
    addImportStatement(tree, "src/app/app.component.ts", "test", "@angular/core");
    return tree;
  };
}
