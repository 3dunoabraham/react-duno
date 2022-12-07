import { ChangeEvent, useEffect, useState, useMemo, useRef } from 'react'


export interface OutputInputFileProps {
    label?: string;
    display?: string;
    value?: string;
    editMode?: boolean;
}
// ReactFunctionComponent
export const OutputInputFile = ({
    label,
    display,
    value,
    editMode,
}: OutputInputFileProps) => {
    return (<>
        <div className="w-100 ">
            <InputFile reference={value} display={display} />
        </div>
    </>)
}
// CORE ReactFunctionComponent
export const InputFile = ({
    reference,
    ...others
}) => {
    //-/* REF */-//
    const $theInput = useRef<HTMLInputElement>()

    //-/* STATE */-//
    const [firstFile, __set_firstFile] = useState<{name:string,type:string}>()

    //-/* MEMO */-//
    const foundExt = useMemo(() => firstFile?.type ? (firstFile.type.replace(/(.*)\//g, '')) : "", [firstFile])
    const foundExtInFilename = useMemo(() => firstFile?.name ? (firstFile.name.match(/\.[0-9a-z]+$/i)[0]) : "", [firstFile])
    const foundFilename = useMemo(() => firstFile?.name, [firstFile])

    //-/* LISTENERS */-//
    const handleChange = () => {
        console.log($theInput.current.files)
        const firstFile = $theInput.current.files[0]
        __set_firstFile(firstFile)
        const payload = new FormData();
        payload.append('user-file', firstFile, 'file.ext');

        if (firstFile.type == "") return alert("corrupt file, no type found")

        if (prompt(`upload ${firstFile.name}? type "y" to confirm...`) == "y")
        {
            const req = new XMLHttpRequest();
            req.open('POST', 'https://httpbin.org/post');

            req.upload.addEventListener('progress', function(e) {
                const percentComplete = (e.loaded / e.total)*100;
                console.log("percentComplete")
                console.log(percentComplete)
                // progress.setAttribute('value', percentComplete);
                // progress.nextElementSibling.nextElementSibling.innerText = Math.round(percentComplete)+"%";
            })

            req.addEventListener('load', function() {
                console.log(req.status);
                console.log(req.response);
            })

            console.log("POSITNGGGGGGG")
            req.send(payload);

        }
    }



    // COMPONENT PARTS
    //1: FILE DETAILS
    //2: FILE INPUT

    return (
        <div className="flex-col w-100 ims-border-faded pa-2 border-r-8">


            {/* //1: FILE DETAILS */}
            <span className="flex-col py-2">File: <small>{foundFilename}</small></span>
            <div className="flex gap-1 pa-1">
                <span>File Type: <b>{foundExtInFilename}</b></span>
                <i className="opaci-25">|</i>
                <span>File Ext.: <b>{foundExtInFilename}</b></span>
            </div>

            {/* //2: FILE INPUT */}
            <input type="file" onChange={handleChange} ref={$theInput} hidden
                className="py-2 px-4 w-100 ims-tx-dark ims-border-faded border-r-5 tx-mdl"
            />
            <div className="px-4 py-2 opaci-hov--50  tx-md ims-primary tx-white border-r-8 clickble" onClick={() => $theInput.current.click()}>
                Upload File
            </div>


        </div>
    )
}