import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { listTags } from '../../api/actions/tags';

export const TagsFormSelect = ({ onChange, isInvalid, value }) => {
    const optionsTag = []
    const dispatch = useDispatch();
    const tagList = useSelector((state) => state.tagsList);
    const { tags } = tagList;
    useEffect(() => {
        dispatch(listTags());
    }, [dispatch]);
    if (optionsTag.length === 0) {
        tags.map((tag) => optionsTag.push({ value: tag.name, label: tag.name }));
    }
    return (
        <Select
            isMulti
            isClearable
            name="tag"
            onChange={e => onChange(e)}
            value={value}
            isInvalid={isInvalid}
            options={optionsTag}
            className="basic-multi-select"
            classNamePrefix="select"
        />
    )

}

TagsFormSelect.defaultProps = {
    tag: 'tag',
    isInvalid: false,
    value: ''
}

TagsFormSelect.propTypes = {
    onChange: PropTypes.func.isRequired,
}