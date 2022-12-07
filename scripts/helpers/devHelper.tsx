let isDevEnvironment = false;

if (process && process.env.NODE_ENV === 'development') {
    isDevEnvironment = true;
}
export const dd = (...args) => {
    if (isDevEnvironment) {
        console.log("🖥️→",args.shift());
        console.log(...args)
    }
}
export const dlog = (...args) => { if (isDevEnvironment) { console.log("#",...args) } }
export const dtable = (args) => { if (isDevEnvironment) { console.table(args) } }
export {isDevEnvironment};

export const ddom = (type="array",...args) => {
    if (type == "array")
    {
        return args.map((X)=><div>{JSON.stringify(X)}</div>)
    }
    return <div className="ims-border-faded">empty ddom</div>
}