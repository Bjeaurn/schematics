import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import { getFileContent } from '@schematics/angular/utility/test';

export function addImportLine(tree: Tree, filePath: string, importLine: string): void {
    if (getFileContent(tree, filePath).indexOf(importLine) == -1) {
        const changeRecorder = tree.beginUpdate(filePath);
        changeRecorder.insertLeft(0, importLine + '\n');
        tree.commitUpdate(changeRecorder);
    }
}

export function addImportStatement(tree: Tree, filePath: string, type: string, file: string ) {
    const fileContent = getFileContent(tree, filePath);
    let results: any = fileContent.match(new RegExp("import.*{.*(" + type + ").*}.*(" + file + ").*"));
    if (results) {
        return;
    }
    results = fileContent.match(new RegExp(`import.*{(.*)}.*(?:'|")(${file})(?:'|").*`));
    if (results) {
        let newImport = `import {${results[1]}, ${type}} from '${file}';`;
        tree.overwrite(filePath, fileContent.replace(results[0], newImport));
    } else {
        addImportLine(tree, filePath, `import { ${type} } from '${file}';`)
    }
}