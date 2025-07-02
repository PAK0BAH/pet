import { useDispatch, useSelector } from 'react-redux';
import { changeLimit, changePage, fetchData } from '@/store/todoSlice';
import type { AppDispatch, RootState } from '@/store/store';
import classNames from 'classnames';
import { Button, Container } from '@mui/material';
const limits: number[] = [5, 10, 15, 20];

export default function Limit() {
    const dispatch = useDispatch<AppDispatch>();
    const store = useSelector((state: RootState) => state.data);

    const activeBtnStyle = (index: number) =>
        classNames({
            green: store.limit === index,
            black: store.limit !== index,
        });

    const x =

    const handleLimit = (limit: number) => {
        dispatch(changeLimit(limit));
        dispatch(changePage(1));
        dispatch(fetchData());
    };

    return (
        <Container className={'flex justify-between m-5 mt-10'}>
            {limits.map((el) => (
                <Button
                    key={el}
                    variant="outlined"
                    sx={{
                        width: 30,
                        height: 30,
                        minWidth: '30px',
                        color: activeBtnStyle(el),
                        borderColor: 'black',
                    }}
                    onClick={() => handleLimit(el)}
                >
                    {el}
                </Button>
            ))}
        </Container>
    );
}
