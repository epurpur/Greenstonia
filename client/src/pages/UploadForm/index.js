import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function FilePreview(props) {
    if (props.file) {
        return <img alt={'Upload preview'} src={URL.createObjectURL(props.file)} height={120} className={'my-2'} />;
    } else {
        return <></>;
    }
}

function SuccessMessage(props) {
    if (props.successMessage !== '') {
        return <div className={'alert alert-success mt-2'}>{props.successMessage}</div>;
    } else {
        return <></>;
    }
}

const UploadForm = () => {

    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleFileChange = e => {
        const file = e.target.files[0];
        setFile(file);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (!file) { return; }

        setSuccessMessage('');

        const uploadUrl = 'http://localhost:3001/upload';
        const formData = new FormData();
        formData.append('image', file);
        formData.append('imageName', file.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios.post(uploadUrl, formData, config).then((response) => {
            setFile(null);
            setSuccessMessage('Image saved with filename ' + response.data);
        });
    }

    return (
        <>
            <form className={'p-3'} onSubmit={handleSubmit}>
                <h1> Upload file</h1>
                <input type="file" required onChange={handleFileChange}/>
                <br />
                <FilePreview file={file} />
                <br />
                <Button variant="primary" disabled={!file} type={"submit"}>Submit</Button>
                <br />
                <SuccessMessage successMessage={successMessage} />
            </form>
        </>
    )
}

export default UploadForm;
