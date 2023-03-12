
import { useState, useEffect, useContext } from "react";
import TicketCard from "../components/TicketCard";
import axios from 'axios'
import CategoriesContext from "../context";

const Dashboard = () => {
    const [tickets, setTickets] = useState(null)
    const {categories, setCategories} = useContext(CategoriesContext)

    useEffect(() => {

      const getData = async () => {
        const response = await axios.get('http://localhost:8000/tickets')
  
      //to get the documentId, inside of the object
      const dataObject = response.data.data
      console.log(dataObject)
  
      const arrayOfKeys = Object.keys(dataObject)
      const arrayOfData = Object.keys(dataObject).map((key) => dataObject[key])

      console.log('array of keys', arrayOfKeys)
      console.log('array of data', arrayOfData)
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
                    id={_index}
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