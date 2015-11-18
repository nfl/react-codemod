module.exports = function (file, api, options) {
    var j = api.jscodeshift;
    var root = j(file.source);


    const ImportDeclaration = (value) => ({
        type: "ImportDeclaration",
        source: {
            type: "Literal",
            value
        }
    });

    const importStatement = (defaultImport, source) => j.importDeclaration(
        [j.importDefaultSpecifier(
            j.identifier(defaultImport)
        )],
        j.literal(source)
    );

    const superClass = (name) => ({
        superClass: {
            name
        }
    });

    const updateDecorators = p => {
        if (decorators.length === 0) {
            return;
        }

        //reset
        p.node.decorators = [];

        //readd
        decorators.forEach(d => {
            p.node.decorators.push(
                d.expression
            );
        });
    };

    // save a list of decorators
    let decorators = [];
    root.find(j.ClassDeclaration)
        .forEach(p => {
            if (p.node.decorators) {
                Object.keys(p.node.decorators).forEach(key => {
                    decorators.push(p.node.decorators[key]);
                });
            }
        });

    //remove gridiron decorators
    root.find(j.ImportDeclaration, ImportDeclaration("@nfl/gridiron"))
        .forEach(p => j(p).remove());


    //change superclass to React.Component
    root.find(j.ClassDeclaration, superClass("GridironComponent"))
        .forEach(p => p.node.superClass.name = "React.Component");

    //import react if there isn't one
    root.find(j.ClassDeclaration, superClass("React.Component"))
        .forEach(() => {
            const reactImport = root.find(j.ImportDeclaration, ImportDeclaration("react"));
            if (reactImport.paths().length === 0) {
                root.find(j.ClassDeclaration)
                    .insertBefore(importStatement("React", "react"));
            }
        });

    root.find(j.ClassDeclaration).forEach(updateDecorators);


    return root.toSource(options);
};
