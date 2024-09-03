import { useEffect, useState } from 'react';
import Appeal from '../Appeal/Appeal';
import Request, { BACKEND_URLS } from 'src/utils/Request.ts';
import { useAuth } from 'src/context/AuthContext';
import Loading from 'src/components/Loading/Loading';
import './AppealsList.style.css';


const countAppealsForTaking = 6;

const AppealsList = ({ getChatId }) => {
    const { token } = useAuth();
    const request = token ? new Request(token) : undefined;
    const [loading, setLoading] = useState(false);

    const [appeals, setAppeals] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => { // запрос на получения заявок 
        async function fetchAppealsData() {
            if (loading || !request) { return; };
            setLoading(true);
            try {
                const url = BACKEND_URLS['APPEALS_LIST_FOR_CHAT'];
                const data = await request.get(
                    `${url}?items=${countAppealsForTaking}&page=${page}`
                );
                if (data.status === 'error') {
                    console.error(data.message);
                    setLoading(false);
                    return;
                };
                setMaxPage(data.results.count_pages);
                const newAppealsNotInData = data.results.appeals.filter(newAppeal =>
                    !appeals.some(existingAppeal => existingAppeal.id === newAppeal.id)
                );
                if (newAppealsNotInData.length > 0) {
                    setAppeals(prevData => [...prevData, ...newAppealsNotInData]);
                }
            } catch(error) {
                console.error('Ошибка при получении апелляций: ', error);
            } finally {
                setLoading(false);
            };
        };
        fetchAppealsData();
    }, [page]);

    const handleScroll = (e) => { // динамическая пагинация на объект. 
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        const scrolledToBottom = clientHeight + scrollTop >= scrollHeight;
        if (scrolledToBottom) {
            setPage(prevPage => prevPage + 1);
        };
    };

    return (
        <div className='AllAppeals' onScroll={page === maxPage ?  undefined : handleScroll}>
            {appeals.length <= 0 ? (
                <Loading LoadingBoxStyle={{height:'730px'}} />
            ) : (
                appeals.map(appeal => (
                    <Appeal
                        appeal={appeal}
                        getAppealId={(appeal_id) => { getChatId(appeal_id); }}
                    />
                ))
            )}
        </div>
    );
};

export default AppealsList;