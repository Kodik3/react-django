import './Loading.style.css';

const Loading = ({LoadingBoxStyle}) => {
    return (
        <div style={{...LoadingBoxStyle}} class="LoadingBox">
            <div className='LoadingContainer'>
                <span className='LoadingCircle'></span>
                <span className='LoadingCircle'></span>
                <span className='LoadingCircle'></span>
                <span className='LoadingCircle'></span>
            </div>
        </div>
    );
};

export default Loading;