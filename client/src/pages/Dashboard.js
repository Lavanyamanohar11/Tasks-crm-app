
import { useState, useEffect, useContext } from "react";
import TicketCard from "../components/TicketCard";
import axios from 'axios'
import CategoriesContext from "../context";

const Dashboard = () => {
    const baseUrl = 'https://tasks-crm-app-api.vercel.app'
    const [tickets, setTickets] = useState(null)
    const {categories, setCategories} = useContext(CategoriesContext)

    useEffect(() => {

      const getData = async () => {
        const response = await axios.get(`${baseUrl}/tickets`)
  
      //to get the documentId, inside of the object
      const dataObject = response.data.data
  
      const arrayOfKeys = Object.keys(dataObject)
      const arrayOfData = Object.keys(dataObject).map((key) => dataObject[key])

      const formattedArray = []
      arrayOfKeys.forEach((key, index) => {
        const formmatedData = { ...arrayOfData[index] }
        formmatedData['documentId'] = key
        formattedArray.push(formmatedData)
      })
  
      setTickets(formattedArray)
      }
      getData();
          }, [tickets])

      useEffect(() => {
        setCategories([...new Set(tickets?.map(({ category }) => category))])
      }, [tickets])

    
    const colors = [
      'rgb(255,179,186)',
      'rgb(255,223,186)',
      'rgb(255,255,186)',
      'rgb(186,255,201)',
      'rgb(186,225,255)',
    ]

    const uniqueCategories = [
        ...new Set(tickets?.map(({category}) => category))
    ]
    // console.log(uniqueCategories)

    return (
        <div className="dashboard">
            <h1>My Projects</h1>
            <div className="ticket-container">
            {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex}>
              <h3>{uniqueCategory}</h3>
              {tickets
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((filteredTicket, _index) => (
                  <TicketCard
                    key={_index}
                    color={colors[categoryIndex % 5]}
                    ticket={filteredTicket}
                  />
                ))}
            </div>
          ))}
            </div>
        </div>
    )
}

export default Dashboard;