import { API, FileInfo } from 'jscodeshift';

const decoratorSortOrder = ['Input', 'Output', 'ViewChildren', 'HostListener'];
const accessibilitySortOrder = [null, 'protected', 'private'];
// The lifecycle hooks in the sequence they are executed
const lifeCycleHookSortOrder = ['constructor', 'ngOnChanges', 'ngOnInit', 'ngDoCheck', 'ngAfterContentInit',
    'ngAfterContentChecked', 'ngAfterViewInit', 'ngAfterViewChecked', 'ngOnDestroy'];

const transform = (fileInfo: FileInfo, api: API) => {
    const cs = api.jscodeshift;
    const root = cs(fileInfo.source);

    const props = root.find(cs.ClassProperty);
    const methods = root.find(cs.ClassMethod);

    const sortedProps = props
        .nodes()
        .sort((nodeA, nodeB) => {
            let sortResult = sortByDecorator(nodeA, nodeB);

            if (sortResult === null) {
                sortResult = sortyByAccessibility(nodeA, nodeB);
            }

            // In case we get null/undefined somehow, default to 0
            return sortResult ?? 0;
        });

    const sortedMethods = methods
        .nodes()
        .sort((nodeA, nodeB) => {
            let sortResult = sortByLifeCycleHook(nodeA, nodeB);

            if (sortResult === null) {
                sortResult = sortByDecorator(nodeA, nodeB);

                if (sortResult === null) {
                    sortResult = sortyByAccessibility(nodeA, nodeB);
                }
            }

            // In case we get null/undefined somehow, default to 0
            return sortResult ?? 0;
        });

    props.remove();
    methods.remove();

    const body = root.find(cs.ClassBody).get().value.body;

    sortedProps.forEach(prop => body.push(prop));
    sortedMethods.forEach(method => body.push(method));

    return root.toSource();
}

const sortyByAccessibility = (nodeA: any, nodeB: any) => {

    // Use implicit public accessibility
    if (nodeA.accessibility === 'public') nodeA.accessibility = null;
    if (nodeB.accessibility === 'public') nodeB.accessibility = null;

    const aSortOrder = accessibilitySortOrder.indexOf(nodeA.accessibility);
    const bSortOrder = accessibilitySortOrder.indexOf(nodeB.accessibility);
    
    return aSortOrder - bSortOrder;
}

const sortByDecorator = (nodeA: any, nodeB: any) => {
    const decoratorA = nodeA.decorators?.[0].expression.callee.name;
    const decoratorB = nodeB.decorators?.[0].expression.callee.name;

    let aSortOrder = decoratorSortOrder.indexOf(decoratorA);
    let bSortOrder = decoratorSortOrder.indexOf(decoratorB);

    // Move the unknowns to the end
    aSortOrder = defaultToLast(aSortOrder);
    bSortOrder = defaultToLast(bSortOrder);

    if (aSortOrder === 99 && bSortOrder === 99) {
        return null;
    } else {
        return aSortOrder - bSortOrder;
    }
}

const sortByLifeCycleHook = (nodeA: any, nodeB: any) => {
    let aSortOrder = lifeCycleHookSortOrder.indexOf(nodeA.key.name);
    let bSortOrder = lifeCycleHookSortOrder.indexOf(nodeB.key.name);

    // Move the unknowns to the end
    aSortOrder = defaultToLast(aSortOrder);
    bSortOrder = defaultToLast(bSortOrder);

    if (aSortOrder === 99 && bSortOrder === 99) {
        return null;
    } else {
        return aSortOrder - bSortOrder;
    }
}

const defaultToLast = (sortOrder: number): number => {
    return sortOrder === -1 ? 99 : sortOrder;
}

export default transform;