import React from 'react';
import { useMutation, gql } from '@apollo/client';

const UPLOAD_FILE = gql`
    mutation uploadFile($file: Upload!){
        uploadFile(file: $file){
            url
        }
    }
`

const UploadForm = () => {

    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: data => console.log(data)
    })

    const handleFileChange = e => {
        const file = e.target.files[0]
        if(!file) return
        uploadFile({ variables: { file }})
    }

    return (
        <>
            <h1> Upload file</h1>
            <input type="file" onChange={handleFileChange}/>
        </>
    )
}

export default UploadForm;