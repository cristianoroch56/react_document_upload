import React, { useState, useEffect, useRef } from "react";
import ApiServices from "../services/index";


const Home = () => {

    const [documents, setDocuments] = useState([]);
    const [selectDocument, setSelectDocument] = useState({
        id: undefined,
        file: null
    });
    const inputFile = useRef(null);

    const handleDocumentChange = (document,index) => {
        setSelectDocument({
            id: index,
            file: document.file
        });
    }

    const fetchDocument = async () => {
        try {
            const response = await ApiServices.getAllDocuments();
            if (response.data.status) {
                setDocuments(response.data.data);
                handleDocumentChange(response.data.data[0],0)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const uplpadDocument = async (event) => {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        var formData = new FormData();
        formData.append('file', file);
        try {
            await ApiServices.saveDocument(formData);
            fetchDocument();
        } catch (error) {
            console.log(error);
        }
    }

    const onDocumentInputClick = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };

    useEffect(() => {
        fetchDocument();
    }, [])

    return (
        <>

            <div className="document_cover">
                <div className="row custom-row">
                    <div className="col-md-4 p-0">
                        <div className="left_sidebar">
                            <div className="top_header_left">
                                <input type='file' id='file' accept="application/pdf,image/*" ref={inputFile} onChange={uplpadDocument} style={{ display: 'none' }} />
                                <h4>files <span onClick={onDocumentInputClick} title="upload">upload <img className="upload_icon" src={`${process.env.PUBLIC_URL}/upload_icon.png`} /> </span></h4>
                            </div>
                            <ul>
                                {documents.length > 0 ? (
                                    documents.map((docObj, i) => {
                                        return (
                                            <li className={selectDocument.id === i ? 'active' : ''} onClick={() => handleDocumentChange(docObj,i)}>
                                                <h4>{`Document #${i + 1}`}</h4>
                                                <p>{docObj.name}</p>
                                            </li>
                                        )
                                    })
                                ) : <span className="col-12 text-center"><img src={`${process.env.PUBLIC_URL}/norecord.png`}/></span>}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8 p-0">
                        <div className="right_sidebar">
                            <div className="top_header_right">
                                {selectDocument.id !== undefined && (
                                    <h2>{`Document #${selectDocument.id+1}`}</h2>
                                )}

                            </div>
                            <div className="document_body">
                                {selectDocument.id !== undefined && (
                                    <embed className="document_reader" src={`${selectDocument.file}#toolbar=0&navpanes=0&scrollbar=0`} type="application/pdf" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;