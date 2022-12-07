import Head from 'next/head'


// ReactFunctionComponent
export const FooterLayout = () => (<>


    <footer className="flex-center mq_xs_sm_flex-col py-8">
        <div className="pa-4 px-5  flex-center mq_xs_sm_flex-col">
          <span className="ims-tx-faded">ServicePad Customer Support:</span>
          <a href="mailto:support@servicepad.com"><span className="tx-deco ims-tx-primary tx-bold-5 tx-mdl pl-1 ">support@servicepad.com</span></a>
        </div>
        <div className="pa-4 px-5 opaci-75 tx-md ims-tx-faded">
          © 2022 ServicePad, Inc. All rights reserved.
        </div>
    </footer>

    
  </>
)

export default FooterLayout
