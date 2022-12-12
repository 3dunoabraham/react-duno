import { forwardRef, useImperativeHandle, useRef } from 'react'


// parent
    // const childRef = useRef(null);
    // const handleClick = () => {
    //     childRef.current.childFunction1();

    //     childRef.current.childFunction2();
    // };

// ReactFunctionComponent
const Child = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    childFunction1() {
      console.log('child function 1 called');
    },
    childFunction2() {
      console.log('child function 2 called');
    },
  }));

  return (
    <div>
      <small className="tx-xs">child content</small>
    </div>
  );
});
Child.displayName = 'Child'
export { Child }