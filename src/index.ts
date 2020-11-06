import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";

const scanner = ts.createScanner(ts.ScriptTarget.Latest, true);
const fileName = path.resolve(__dirname, "../", "samples", "1.ts");
const sourceText = fs.readFileSync(fileName).toString();
const sourceFile = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest);

const tokens: string[] = [];
const additionalTokens: Record<number, ts.SyntaxKind> = {
	[ts.SyntaxKind.InterfaceDeclaration]: ts.SyntaxKind.InterfaceKeyword,
	[ts.SyntaxKind.ReturnStatement]: ts.SyntaxKind.ReturnKeyword,
	[ts.SyntaxKind.HeritageClause]: ts.SyntaxKind.ExtendsKeyword,
	[ts.SyntaxKind.NewExpression]: ts.SyntaxKind.NewKeyword,
	[ts.SyntaxKind.FunctionDeclaration]: ts.SyntaxKind.FunctionKeyword,
	[ts.SyntaxKind.IfStatement]: ts.SyntaxKind.IfKeyword,
	[ts.SyntaxKind.ThrowStatement]: ts.SyntaxKind.ThrowKeyword,
	[ts.SyntaxKind.CatchClause]: ts.SyntaxKind.CatchKeyword,
	[ts.SyntaxKind.TypeAliasDeclaration]: ts.SyntaxKind.TypeKeyword,
	[ts.SyntaxKind.TypeQuery]: ts.SyntaxKind.TypeOfKeyword,
	[ts.SyntaxKind.ConditionalType]: ts.SyntaxKind.ExtendsKeyword,
	[ts.SyntaxKind.InferType]: ts.SyntaxKind.InferKeyword,
	[ts.SyntaxKind.SwitchStatement]: ts.SyntaxKind.SwitchKeyword,
	[ts.SyntaxKind.CaseClause]: ts.SyntaxKind.CaseKeyword,
	[ts.SyntaxKind.DefaultClause]: ts.SyntaxKind.DefaultKeyword,
	[ts.SyntaxKind.BreakStatement]: ts.SyntaxKind.BreakKeyword
};

const formatSyntaxKind = (kind: ts.SyntaxKind) => ts.SyntaxKind[kind];

const addSyntaxKindToken = (token: ts.SyntaxKind): void => {
	const tokenString = ts.tokenToString(token);
	if (tokenString === undefined) {
		throw new Error(`${formatSyntaxKind(token)} is not a valid token`);
	}
	tokens.push(tokenString);
}

const tokenize = (node: ts.Node) => {
	const additionalToken = additionalTokens[node.kind];
	if (additionalToken) {
		addSyntaxKindToken(additionalToken);
	}

	const tokenString = ts.tokenToString(node.kind);
	if (tokenString !== undefined && node.kind!==ts.SyntaxKind.EqualsGreaterThanToken) {
		tokens.push(tokenString);
	} else {

		switch (node.kind) {
			case ts.SyntaxKind.ModuleDeclaration:
			case ts.SyntaxKind.VariableDeclarationList: {
				scanner.setText(node.getText(sourceFile));
				scanner.scan();
				tokens.push(scanner.getTokenText());
				break;
			}

			case ts.SyntaxKind.IfStatement: {
				const ifNode = node as ts.IfStatement;
				if (ifNode.elseStatement) {
					addSyntaxKindToken(ts.SyntaxKind.ElseKeyword);
				}
				break;
			}

			case ts.SyntaxKind.TryStatement: {
				const tryNode = node as ts.TryStatement;
				addSyntaxKindToken(ts.SyntaxKind.TryKeyword);
				if (tryNode.finallyBlock) {
					addSyntaxKindToken(ts.SyntaxKind.FinallyKeyword);
				}
				break;
			}

			case ts.SyntaxKind.NumericLiteral:
			case ts.SyntaxKind.Identifier:
			case ts.SyntaxKind.PrivateIdentifier:
			case ts.SyntaxKind.StringLiteral:
			case ts.SyntaxKind.LastTemplateToken: {
				tokens.push(node.getText(sourceFile));
				break;
			}

			default: {
				// console.log("====>", formatSyntaxKind(node.kind), node.getText(sourceFile));
			}
		}
	}

	ts.forEachChild(node, tokenize);
};


const main = () => {
	ts.forEachChild(sourceFile, tokenize);
	console.log(tokens);
};

main();
