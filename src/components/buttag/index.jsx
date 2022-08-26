import React from 'react'
import { ButtonGroup, ToggleButton } from 'react-bootstrap'

const Buttag = (props) => {
    const { title, id, ...rest } = props
    return (
        <ButtonGroup className="mb-2 me-2">
            <ToggleButton
                id={id}
                type="checkbox"
                variant="secondary"
                size="sm"
                {...rest}
            >
                {title}
            </ToggleButton>
        </ButtonGroup>
    )
}

export default Buttag