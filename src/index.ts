import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";

const scanner = ts.createScanner(ts.ScriptTarget.Latest, true);
const fileName = path.resolve(__dirname, "../", "samples", "1.ts");

const main = () => {
	const sourceText = fs.readFileSync(fileName).toString();
	scanner.setText(sourceText);

	let token = scanner.scan();
	let insideTemplateExpression = false;
	let templateExpressionDepth = 0;

	while (token !== ts.SyntaxKind.EndOfFileToken) {
		if (token === ts.SyntaxKind.Identifier) {
			console.log(token, "identifier =", JSON.stringify(scanner.getTokenText()));
		} else if (token === ts.SyntaxKind.NoSubstitutionTemplateLiteral) {
			insideTemplateExpression=true;
			++templateExpressionDepth;
		} else if (token === ts.SyntaxKind.CloseBraceToken) {
			--templateExpressionDepth;
			if(templateExpressionDepth===0) {
				scanner.reScanTemplateToken(false);
			}
		} else {
			console.log(token, scanner.getTokenText());
		}
		
		token = scanner.scan();
	}
};

main();
