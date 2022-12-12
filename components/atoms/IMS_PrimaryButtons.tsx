import { ReactNode } from 'react'


export interface IMS_PrimaryButtonProps {
    precontent?: ReactNode | string; postcontent?: ReactNode | string; content?: string;
}
// ReactFunctionComponent
export const IMS_PrimaryButton = ({precontent, postcontent, content="", }: IMS_PrimaryButtonProps) => {
    return (<>
        <div className="px-4 py-8px opaci-hov--50 flex-center tx-md ims-bg-primary tx-white border-r-8">
            {precontent}
            {content}
            {postcontent}
        </div>
    </>)
}



export interface IMS_FadedButtonProps {content?: string; }
// ReactFunctionComponent
export const IMS_FadedButton = ({precontent, content="", }: IMS_PrimaryButtonProps) => {
    return (<>
        <div className="tx-md opaci-hov--50 ims-tx-faded tx-bold-6 py-2 px-4 ims-border-faded  border-r-8">
            {precontent}
            {content}
        </div>
    </>)
}