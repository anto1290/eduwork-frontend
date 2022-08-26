
import { Card } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { useSelector } from 'react-redux'

const Profile = () => {
    const auth = useSelector(state => state.userLogin.userInfo)
    return (
        <Card>
            <Card.Body>
                <DataTable
                    columns={[
                        { selector: row => row.label },
                        { selector: row => row.value },
                    ]}
                    data={[
                        { label: 'Nama', value: auth.user.fullName },
                        { label: 'Email', value: auth.user.email },
                    ]}
                />
            </Card.Body>
        </Card>
    )
}

export default Profile;