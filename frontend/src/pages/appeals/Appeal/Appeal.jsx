import { useEffect, useState } from "react";
import "./Appeal.css";

const BackendContent = ({ content }) => {
    return <div className='TextContent' dangerouslySetInnerHTML={{ __html: content }} />;
};

const Appeal = ({ appeal, getAppealId }) => {
    const [visibleContent, setVisibleContent] = useState(false);

    const [changedAppealStyle, setChangedAppealStyle] = useState({ minHeight:'100px', maxHeight: '100px' });

    useEffect(() => {
        setChangedAppealStyle(visibleContent ? {
            minHeight: '210px', maxHeight:'210px'
        } : {
            minHeight:'100px', maxHeight: '100px'
        });
    }, [visibleContent]);

    return (
        <div
            className='Appeal'
            style={changedAppealStyle}
            onClick={() => { getAppealId(appeal.id) }}
            onMouseEnter={() => setVisibleContent(true)}
            onMouseLeave={() => setVisibleContent(false)}
        >
            <div className='Theme'><b>{appeal.theme}</b></div>
            <BackendContent content={appeal.text} />
            <div className="AppealSettings">
                <button className='AppealSettings_button'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Appeal;
