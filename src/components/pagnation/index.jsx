import Pagination from 'react-bootstrap/Pagination';
import { LinkContainer } from 'react-router-bootstrap';

const PaginationComponent = (props) => {
    const { limit = 10, total } = props;
    const pages = Math.ceil(total / limit);
    return (
        <Pagination className='mt-2'>
            {pages > 0 && Array.from({ length: pages }, (_, i) => (
                <LinkContainer key={i + 1}
                    to={`/skip/${limit * i}`
                    }
                >
                    <Pagination.Item key={i}>
                        {i + 1}
                    </Pagination.Item>
                </LinkContainer>
            ))}






        </Pagination>
    );
}

export default PaginationComponent;