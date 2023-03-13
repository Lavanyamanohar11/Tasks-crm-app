import axios from "axios"

const DeleteBlock = ({documentId}) => {
    const baseUrl = 'https://tasks-crm-app-api.vercel.app'
    const deleteTicket = async () => {
        const response = await axios.delete(`${baseUrl}/tickets/${documentId}`)
        const success = response.status == 200
        // if (success) window.location.reload()
    }

    return (
        <div className="delete-block">
            <div className="delete-icon" onClick={deleteTicket}>✖</div>
        </div>
    )
}

export default DeleteBlock;