export function remarkMdxAutoImports() {
    return (tree) => {
        const components = [
            'sections/Setting',
            'sections/Rules',
            'sections/Feedback',
            'sections/Panoramic',
            'sections/FundingIntro',
            'sections/FundingBit',
            'sections/AdvisorIntro',
            'sections/AdvisorBit',
            'sections/ConBit',
            'sections/InterviewIntro',
            'sections/InterviewItem',
            'sections/OriginalReviewLink',
            'Link',
        ];

        // Crea i nodi di import per ogni componente
        const importNodes = components.map(path => {
            const name = path.split('/').pop();
            return {
                type: 'mdxjsEsm',
                value: `import ${name} from '../../../components/${path}.astro';`,
                data: {
                    estree: {
                        type: 'Program',
                        sourceType: 'module',
                        body: [{
                            type: 'ImportDeclaration',
                            specifiers: [{
                                type: 'ImportDefaultSpecifier',
                                local: {type: 'Identifier', name: name}
                            }],
                            source: {
                                type: 'Literal',
                                value: `../../../components/${path}.astro`,
                                raw: `'../../../components/${path}.astro'`
                            }
                        }]
                    }
                }
            }
        });

        // Crea il nodo di export
        const exportNode = {
            type: 'mdxjsEsm',
            value: `export const components = { ${components.join(', ')} };`,
            data: {
                estree: {
                    type: 'Program',
                    sourceType: 'module',
                    body: [{
                        type: 'ExportNamedDeclaration',
                        declaration: {
                            type: 'VariableDeclaration',
                            declarations: [{
                                type: 'VariableDeclarator',
                                id: {type: 'Identifier', name: 'components'},
                                init: {
                                    type: 'ObjectExpression',
                                    properties: components.map(path => {
                                        const name = path.split('/').pop();
                                        return {
                                            type: 'Property',
                                            key: {type: 'Identifier', name},
                                            value: {type: 'Identifier', name},
                                            kind: 'init',
                                            shorthand: true
                                        }
                                    })
                                }
                            }],
                            kind: 'const'
                        },
                        specifiers: [],
                        source: null
                    }]
                }
            }
        };

        // Aggiungi tutti i nodi all'inizio del file
        tree.children.unshift(...importNodes, exportNode);
    };
}