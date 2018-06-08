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