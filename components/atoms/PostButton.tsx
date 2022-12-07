// import { dd } from '@/scripts/helpers/devHelper';


export async function PostData(url = '', data = {}, method = "POST") {
    try {
        const response = await fetch(url, {
            // mode: 'no-cors', // mode: 'cors',
            headers: {"Content-Type": "application/json", },
            method,
            body: JSON.stringify(data),
        });
        // console.log("response")
        // console.log(response)
        const ress = await response;
        // console.log("*** Ress", ress)
        return ress
    } catch (err) {
        console.log("*** err", err)
        return err
    }
 }
// ReactFunctionComponent
export const PostButton =({
    method = "POST",
    theUrl = "https://ims.jinaron.com/api/v1/units/opts/model_styles/",
    // theUrl = "https://ims.jinaron.com/api/v1/units/opts/model_styles/create/",
    // theUrl = "https://ims.jinaron.com/api/v1/units/opts/model_styles/",
    theData = {label:"testlabel999",description:"testdescrip999"},
}) => {
    return(<><button className="_ddb tx-white opaci-hov-50 py-1 px-2 border-r-5 tx-xs" onClick={
        async () => {
            // dd("posting data",theUrl, theData)
            const res = await PostData(theUrl, theData, method);
            // console.log("post results", res);
            // if (res)
            // {
            //     console.log(res.body)
            // }
        }
    }>
    Post <br/> Button
</button></>)}