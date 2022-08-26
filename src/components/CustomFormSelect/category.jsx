import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryAction } from '../../api/actions/category';
import Select from 'react-select';
export const CategoryFormSelect = ({ onChange, isInvalid, value }) => {
    const dispatch = useDispatch();
    let categoryOptions = [];
    const categoryList = useSelector((state) => state.category);
    const { category } = categoryList;
    useEffect(() => {
        dispatch(getCategoryAction())
    }, [dispatch]);
    category.map((cgt) => categoryOptions.push({ label: cgt.name, value: cgt.name }))
    return (
        <Select
            isClearable
            name="category"
            onChange={e => onChange(e)}
            value={value}
            isInvalid={isInvalid}
            options={categoryOptions}
            className="basic-multi-select"
            classNamePrefix="select"
        />
    )

}

CategoryFormSelect.defaultProps = {
    category: 'category',
    isInvalid: false,
    value: ''
}

CategoryFormSelect.propTypes = {
    onChange: PropTypes.func.isRequired,
}